#!/bin/bash

# RinkWeb Studio Backend Deployment Script
# For traditional server deployment (no Docker)

set -e

echo "🚀 Starting RinkWeb Studio Backend Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_error "Please don't run this script as root. Use a regular user with sudo privileges."
    exit 1
fi

# Check if we're in the backend directory
if [ ! -f "artisan" ]; then
    print_error "This script must be run from the Laravel backend directory."
    print_error "Please cd to the backend directory and run: ./deploy-server.sh"
    exit 1
fi

print_status "Checking system requirements..."

# Check PHP version
if ! command -v php &> /dev/null; then
    print_error "PHP is not installed. Please install PHP 8.2 or higher."
    exit 1
fi

PHP_VERSION=$(php -r "echo PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION;")
if [ "$(echo "$PHP_VERSION < 8.2" | bc)" -eq 1 ]; then
    print_error "PHP version $PHP_VERSION is not supported. Please install PHP 8.2 or higher."
    exit 1
fi
print_success "PHP version $PHP_VERSION is supported."

# Check Composer
if ! command -v composer &> /dev/null; then
    print_error "Composer is not installed. Please install Composer first."
    exit 1
fi
print_success "Composer is available."

# Check Node.js and NPM
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "NPM is not installed. Please install NPM."
    exit 1
fi
print_success "Node.js and NPM are available."

# Check MySQL connection
print_status "Checking database connection..."
if [ -f ".env" ]; then
    # Try to connect to database
    if php artisan tinker --execute="DB::connection()->getPdo();" &> /dev/null; then
        print_success "Database connection successful."
    else
        print_warning "Database connection failed. Please check your .env configuration."
    fi
else
    print_warning ".env file not found. Please create it from .env.example"
fi

# Backup current deployment (if exists)
print_status "Creating backup..."
BACKUP_DIR="../backups/$(date +%Y%m%d_%H%M%S)"
if [ -d "storage" ]; then
    mkdir -p "$BACKUP_DIR"
    cp -r storage "$BACKUP_DIR/"
    if [ -f ".env" ]; then
        cp .env "$BACKUP_DIR/"
    fi
    print_success "Backup created at $BACKUP_DIR"
fi

# Pull latest changes
print_status "Pulling latest changes from repository..."
if [ -d ".git" ]; then
    git pull origin main || git pull origin master
    print_success "Repository updated."
else
    print_warning "Not a git repository. Skipping git pull."
fi

# Install/Update Composer dependencies
print_status "Installing/updating Composer dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction
print_success "Composer dependencies updated."

# Install/Update NPM dependencies
print_status "Installing/updating NPM dependencies..."
npm ci --only=production
print_success "NPM dependencies updated."

# Build frontend assets
print_status "Building frontend assets..."
npm run build
print_success "Frontend assets built."

# Environment file setup
if [ ! -f ".env" ]; then
    print_status "Creating .env file from .env.example..."
    cp .env.example .env
    print_warning "Please edit .env file with your production settings before continuing."
    read -p "Press Enter after you've configured .env file..."
fi

# Generate application key if not exists
if ! grep -q "APP_KEY=base64:" .env; then
    print_status "Generating application key..."
    php artisan key:generate --force
    print_success "Application key generated."
fi

# Clear all caches
print_status "Clearing application caches..."
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear
print_success "Caches cleared."

# Run database migrations
print_status "Running database migrations..."
if php artisan migrate --force; then
    print_success "Database migrations completed."
else
    print_error "Database migrations failed. Please check your database configuration."
    exit 1
fi

# Ask about seeding database
read -p "Do you want to seed the database? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Seeding database..."
    php artisan db:seed --force
    print_success "Database seeded."
fi

# Create storage link
print_status "Creating storage symbolic link..."
php artisan storage:link
print_success "Storage link created."

# Cache configurations for production
print_status "Caching configurations for production..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
print_success "Configurations cached."

# Set proper permissions
print_status "Setting file permissions..."
if command -v sudo &> /dev/null; then
    sudo chown -R www-data:www-data storage bootstrap/cache
    sudo chmod -R 775 storage bootstrap/cache
    print_success "Permissions set for www-data."
else
    chmod -R 775 storage bootstrap/cache
    print_warning "Set as current user. You may need to adjust permissions for web server."
fi

# Run tests (optional)
read -p "Do you want to run tests? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Running tests..."
    if php artisan test; then
        print_success "All tests passed."
    else
        print_warning "Some tests failed. Please review the output above."
    fi
fi

# Restart services (if available)
print_status "Restarting web services..."
if command -v systemctl &> /dev/null; then
    if systemctl is-active --quiet nginx; then
        sudo systemctl reload nginx
        print_success "Nginx reloaded."
    fi
    
    if systemctl is-active --quiet php8.2-fpm; then
        sudo systemctl reload php8.2-fpm
        print_success "PHP-FPM reloaded."
    elif systemctl is-active --quiet php8.1-fpm; then
        sudo systemctl reload php8.1-fpm
        print_success "PHP-FPM reloaded."
    fi
fi

print_success "🎉 Deployment completed successfully!"

echo ""
echo "📋 Post-deployment checklist:"
echo "   ✅ Application deployed"
echo "   ✅ Database migrated"
echo "   ✅ Caches optimized"
echo "   ✅ Permissions set"
echo ""
echo "🔗 Useful commands:"
echo "   View logs: tail -f storage/logs/laravel.log"
echo "   Clear cache: php artisan optimize:clear"
echo "   Run queue: php artisan queue:work"
echo "   Check status: php artisan about"
echo ""
echo "🌐 Your application should now be available at your configured domain."
echo "   Backend Admin: https://admin.rinkwebstudio.com"
echo ""
print_success "Happy coding! 🚀"