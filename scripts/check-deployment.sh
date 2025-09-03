#!/bin/bash

# RinkWeb Studio Deployment Health Check Script
# This script checks the health of both frontend and backend deployments

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
FRONTEND_URL="https://rinkwebstudio.com"
BACKEND_URL="https://api.rinkwebstudio.com"
TIMEOUT=10

# Function to print colored output
print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[i]${NC} $1"
}

# Function to check URL health
check_url() {
    local url=$1
    local name=$2
    local expected_status=${3:-200}
    
    print_info "Checking $name at $url..."
    
    # Make HTTP request and capture response
    response=$(curl -s -o /dev/null -w "%{http_code},%{time_total},%{size_download}" \
               --max-time $TIMEOUT \
               --connect-timeout $TIMEOUT \
               "$url" 2>/dev/null || echo "000,0,0")
    
    # Parse response
    IFS=',' read -r status_code response_time size <<< "$response"
    
    if [ "$status_code" = "$expected_status" ]; then
        print_status "$name is healthy (${status_code}, ${response_time}s, ${size} bytes)"
        return 0
    else
        print_error "$name is unhealthy (Status: $status_code)"
        return 1
    fi
}

# Function to check API endpoints
check_api_endpoints() {
    local base_url=$1
    local endpoints=("" "/health" "/api/health" "/api/status")
    local healthy=false
    
    for endpoint in "${endpoints[@]}"; do
        local full_url="${base_url}${endpoint}"
        if check_url "$full_url" "API Endpoint ($endpoint)" 200; then
            healthy=true
            break
        fi
    done
    
    if [ "$healthy" = false ]; then
        print_error "No API endpoints are responding"
        return 1
    fi
    
    return 0
}

# Function to check database connectivity (if health endpoint exists)
check_database() {
    local health_url="$1/api/health"
    
    print_info "Checking database connectivity..."
    
    response=$(curl -s --max-time $TIMEOUT "$health_url" 2>/dev/null || echo "{}")
    
    if echo "$response" | grep -q "database.*ok\|db.*ok\|mysql.*ok"; then
        print_status "Database connection is healthy"
        return 0
    else
        print_warning "Database health status unknown (no health endpoint or data)"
        return 1
    fi
}

# Function to check SSL certificate
check_ssl() {
    local url=$1
    local domain=$(echo "$url" | sed 's|https\?://||' | sed 's|/.*||')
    
    print_info "Checking SSL certificate for $domain..."
    
    # Check SSL certificate expiry
    cert_info=$(echo | openssl s_client -servername "$domain" -connect "$domain:443" 2>/dev/null | \
                openssl x509 -noout -dates 2>/dev/null || echo "")
    
    if [ -n "$cert_info" ]; then
        expiry_date=$(echo "$cert_info" | grep "notAfter" | cut -d= -f2)
        if [ -n "$expiry_date" ]; then
            print_status "SSL certificate is valid (expires: $expiry_date)"
            return 0
        fi
    fi
    
    print_warning "Could not verify SSL certificate"
    return 1
}

# Function to check DNS resolution
check_dns() {
    local url=$1
    local domain=$(echo "$url" | sed 's|https\?://||' | sed 's|/.*||')
    
    print_info "Checking DNS resolution for $domain..."
    
    if nslookup "$domain" >/dev/null 2>&1; then
        ip=$(nslookup "$domain" | grep "Address:" | tail -1 | awk '{print $2}')
        print_status "DNS resolution successful ($domain -> $ip)"
        return 0
    else
        print_error "DNS resolution failed for $domain"
        return 1
    fi
}

# Main execution
echo "🔍 RinkWeb Studio Deployment Health Check"
echo "==========================================="
echo ""

# Check if URLs are provided as arguments
if [ $# -ge 1 ]; then
    FRONTEND_URL=$1
fi

if [ $# -ge 2 ]; then
    BACKEND_URL=$2
fi

print_info "Frontend URL: $FRONTEND_URL"
print_info "Backend URL: $BACKEND_URL"
print_info "Timeout: ${TIMEOUT}s"
echo ""

# Initialize counters
total_checks=0
passed_checks=0

# Frontend checks
echo "🌐 Frontend Checks"
echo "------------------"

if check_dns "$FRONTEND_URL"; then
    ((passed_checks++))
fi
((total_checks++))

if [[ $FRONTEND_URL == https://* ]]; then
    if check_ssl "$FRONTEND_URL"; then
        ((passed_checks++))
    fi
    ((total_checks++))
fi

if check_url "$FRONTEND_URL" "Frontend"; then
    ((passed_checks++))
fi
((total_checks++))

echo ""

# Backend checks
echo "🔧 Backend Checks"
echo "-----------------"

if check_dns "$BACKEND_URL"; then
    ((passed_checks++))
fi
((total_checks++))

if [[ $BACKEND_URL == https://* ]]; then
    if check_ssl "$BACKEND_URL"; then
        ((passed_checks++))
    fi
    ((total_checks++))
fi

if check_api_endpoints "$BACKEND_URL"; then
    ((passed_checks++))
fi
((total_checks++))

if check_database "$BACKEND_URL"; then
    ((passed_checks++))
fi
((total_checks++))

echo ""

# Summary
echo "📊 Summary"
echo "----------"
echo "Total checks: $total_checks"
echo "Passed: $passed_checks"
echo "Failed: $((total_checks - passed_checks))"

if [ $passed_checks -eq $total_checks ]; then
    print_status "All checks passed! 🎉"
    exit 0
elif [ $passed_checks -gt $((total_checks / 2)) ]; then
    print_warning "Some checks failed, but system is mostly healthy ⚠️"
    exit 1
else
    print_error "Multiple checks failed, system may be unhealthy ❌"
    exit 2
fi