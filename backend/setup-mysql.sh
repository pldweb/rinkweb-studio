#!/bin/bash

# MySQL Database Setup Script for RinkWeb Studio Backend
# Run this script on your server to setup MySQL database

set -e

echo "🗄️  Setting up MySQL Database for RinkWeb Studio..."

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

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    print_error "MySQL is not installed. Please install MySQL first."
    echo "On Ubuntu/Debian: sudo apt install mysql-server"
    echo "On CentOS/RHEL: sudo yum install mysql-server"
    exit 1
fi

print_success "MySQL is installed."

# Database configuration
DB_NAME="rinkweb_admin"
DB_USER="rinkweb_user"

# Generate secure password
DB_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)

print_status "Database configuration:"
echo "  Database Name: $DB_NAME"
echo "  Username: $DB_USER"
echo "  Password: $DB_PASSWORD"
echo ""

# Prompt for MySQL root password
echo "Please enter MySQL root password:"
read -s MYSQL_ROOT_PASSWORD

# Test MySQL connection
print_status "Testing MySQL connection..."
if mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "SELECT 1;" &> /dev/null; then
    print_success "MySQL connection successful."
else
    print_error "Failed to connect to MySQL. Please check your root password."
    exit 1
fi

# Create database and user
print_status "Creating database and user..."

MYSQL_COMMANDS="
CREATE DATABASE IF NOT EXISTS \`$DB_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON \`$DB_NAME\`.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;
"

if mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "$MYSQL_COMMANDS"; then
    print_success "Database and user created successfully."
else
    print_error "Failed to create database and user."
    exit 1
fi

# Test new user connection
print_status "Testing new user connection..."
if mysql -u "$DB_USER" -p"$DB_PASSWORD" -e "USE $DB_NAME; SELECT 1;" &> /dev/null; then
    print_success "New user connection successful."
else
    print_error "Failed to connect with new user credentials."
    exit 1
fi

# Create .env file with database configuration
print_status "Updating .env file..."

if [ -f ".env" ]; then
    # Backup existing .env
    cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
    print_status "Existing .env file backed up."
fi

# Copy from .env.server template
if [ -f ".env.server" ]; then
    cp .env.server .env
else
    cp .env.example .env
fi

# Update database configuration in .env
sed -i "s/DB_DATABASE=.*/DB_DATABASE=$DB_NAME/" .env
sed -i "s/DB_USERNAME=.*/DB_USERNAME=$DB_USER/" .env
sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=$DB_PASSWORD/" .env

print_success ".env file updated with database configuration."

# Generate application key if not exists
if ! grep -q "APP_KEY=base64:" .env; then
    print_status "Generating application key..."
    php artisan key:generate --force
    print_success "Application key generated."
fi

# Test Laravel database connection
print_status "Testing Laravel database connection..."
if php artisan tinker --execute="DB::connection()->getPdo(); echo 'Database connection successful!';" 2>/dev/null; then
    print_success "Laravel can connect to the database."
else
    print_warning "Laravel database connection test failed. Please check configuration."
fi

# Run migrations
read -p "Do you want to run database migrations now? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Running database migrations..."
    if php artisan migrate --force; then
        print_success "Database migrations completed."
    else
        print_error "Database migrations failed."
        exit 1
    fi
    
    # Ask about seeding
    read -p "Do you want to seed the database with initial data? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Seeding database..."
        php artisan db:seed --force
        print_success "Database seeded."
    fi
fi

# MySQL optimization recommendations
print_status "MySQL optimization recommendations:"
echo ""
echo "Add these settings to your MySQL configuration (/etc/mysql/mysql.conf.d/mysqld.cnf):"
echo ""
echo "[mysqld]"
echo "# Performance settings"
echo "innodb_buffer_pool_size = 256M"
echo "innodb_log_file_size = 64M"
echo "innodb_flush_log_at_trx_commit = 2"
echo "innodb_flush_method = O_DIRECT"
echo ""
echo "# Connection settings"
echo "max_connections = 100"
echo "connect_timeout = 10"
echo "wait_timeout = 600"
echo "interactive_timeout = 600"
echo ""
echo "# Query cache (for MySQL 5.7 and below)"
echo "query_cache_type = 1"
echo "query_cache_size = 32M"
echo ""
echo "After adding these settings, restart MySQL: sudo systemctl restart mysql"
echo ""

# Security recommendations
print_status "Security recommendations:"
echo ""
echo "1. Run MySQL secure installation: sudo mysql_secure_installation"
echo "2. Consider enabling SSL for MySQL connections"
echo "3. Regularly backup your database"
echo "4. Monitor MySQL logs for suspicious activity"
echo ""

# Backup script
print_status "Creating database backup script..."
cat > backup-database.sh << EOF
#!/bin/bash
# Database backup script for RinkWeb Studio

BACKUP_DIR="../backups/database"
DATE=\$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="\$BACKUP_DIR/rinkweb_admin_\$DATE.sql"

mkdir -p "\$BACKUP_DIR"

echo "Creating database backup..."
mysqldump -u $DB_USER -p'$DB_PASSWORD' $DB_NAME > "\$BACKUP_FILE"

if [ \$? -eq 0 ]; then
    echo "Backup created successfully: \$BACKUP_FILE"
    
    # Compress backup
    gzip "\$BACKUP_FILE"
    echo "Backup compressed: \$BACKUP_FILE.gz"
    
    # Keep only last 7 days of backups
    find "\$BACKUP_DIR" -name "*.sql.gz" -mtime +7 -delete
    echo "Old backups cleaned up."
else
    echo "Backup failed!"
    exit 1
fi
EOF

chmod +x backup-database.sh
print_success "Database backup script created: backup-database.sh"

print_success "🎉 MySQL database setup completed!"

echo ""
echo "📋 Database Information:"
echo "   Database Name: $DB_NAME"
echo "   Username: $DB_USER"
echo "   Password: $DB_PASSWORD"
echo "   Host: localhost (127.0.0.1)"
echo "   Port: 3306"
echo ""
echo "⚠️  IMPORTANT: Save these credentials securely!"
echo ""
echo "🔧 Next steps:"
echo "   1. Run: ./deploy-server.sh (to complete application deployment)"
echo "   2. Setup regular database backups: ./backup-database.sh"
echo "   3. Configure MySQL optimization settings (see recommendations above)"
echo "   4. Run MySQL secure installation if not done yet"
echo ""
print_success "Database setup complete! 🚀"