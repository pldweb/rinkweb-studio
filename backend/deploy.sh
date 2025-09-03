#!/bin/bash

# RinkWeb Studio Backend Deployment Script
# This script automates the deployment process for the Laravel backend

set -e  # Exit on any error

echo "🚀 Starting RinkWeb Studio Backend Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found. Copying from .env.example"
    cp .env.example .env
    print_warning "Please edit .env file with your configuration before continuing."
    read -p "Press enter to continue after editing .env file..."
fi

# Install/Update Composer dependencies
print_status "Installing Composer dependencies..."
composer install --no-dev --optimize-autoloader

# Install/Update Node.js dependencies
print_status "Installing Node.js dependencies..."
npm install

# Build frontend assets
print_status "Building frontend assets..."
npm run build

# Generate application key if not set
if grep -q "APP_KEY=$" .env; then
    print_status "Generating application key..."
    php artisan key:generate
fi

# Run database migrations
print_status "Running database migrations..."
php artisan migrate --force

# Seed database (optional, comment out if not needed)
read -p "Do you want to seed the database? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Seeding database..."
    php artisan db:seed --force
fi

# Create storage link
print_status "Creating storage link..."
php artisan storage:link

# Clear and cache configuration
print_status "Optimizing application..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set proper permissions (for Linux/Unix systems)
if [[ "$OSTYPE" == "linux-gnu"* ]] || [[ "$OSTYPE" == "darwin"* ]]; then
    print_status "Setting file permissions..."
    chmod -R 775 storage bootstrap/cache
    
    # If running as root or with sudo, change ownership to web server user
    if [ "$EUID" -eq 0 ]; then
        chown -R www-data:www-data storage bootstrap/cache
    fi
fi

# Run tests (optional)
read -p "Do you want to run tests? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Running tests..."
    php artisan test
fi

print_status "✅ Deployment completed successfully!"
print_status "Backend is ready at: $(php artisan route:list | grep '/' | head -1 | awk '{print $4}' || echo 'your-domain.com')"

# Display important post-deployment information
echo ""
echo "📋 Post-deployment checklist:"
echo "   1. Verify .env configuration"
echo "   2. Test database connection"
echo "   3. Check file permissions"
echo "   4. Test API endpoints"
echo "   5. Monitor application logs"
echo ""
echo "📁 Important paths:"
echo "   - Logs: storage/logs/"
echo "   - Config: .env"
echo "   - Public: public/"
echo ""
echo "🔧 Useful commands:"
echo "   - View logs: tail -f storage/logs/laravel.log"
echo "   - Clear cache: php artisan cache:clear"
echo "   - Queue work: php artisan queue:work"
echo ""

print_status "Deployment script finished. Happy coding! 🎉"