# 🛠️ Panduan Development RinkWeb Studio

Panduan ini menjelaskan cara menjalankan aplikasi RinkWeb Studio di environment development.

## 📋 Persiapan Development

### 1. Persyaratan Sistem
```bash
# PHP 8.1 atau lebih tinggi
php --version

# Composer
composer --version

# Node.js & NPM
node --version
npm --version

# MySQL
mysql --version
```

### 2. Clone Repository
```bash
# Clone repository
git clone [repository-url]
cd rinkweb-studio
```

## 🗄️ Setup Database Development

### 1. Buat Database MySQL
```bash
# Login ke MySQL
mysql -u root -p

# Buat database
CREATE DATABASE rinkweb_admin;

# Buat user (opsional)
CREATE USER 'rinkweb_dev'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON rinkweb_admin.* TO 'rinkweb_dev'@'localhost';
FLUSH PRIVILEGES;

# Exit MySQL
exit;
```

### 2. Setup Environment
```bash
# Masuk ke folder backend
cd backend

# Copy file environment
cp .env.example .env
```

### 3. Edit File .env
Buka file `.env` dan sesuaikan konfigurasi database:

```env
APP_NAME="RinkWeb Admin"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database Configuration
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=rinkweb_admin
DB_USERNAME=root
DB_PASSWORD=your_mysql_password

# Atau jika menggunakan user khusus:
# DB_USERNAME=rinkweb_dev
# DB_PASSWORD=password123
```

## 🚀 Menjalankan Backend Development

### 1. Install Dependencies
```bash
# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install
```

### 2. Setup Laravel
```bash
# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate

# Seed database dengan data awal (opsional)
php artisan db:seed

# Create storage link
php artisan storage:link
```

### 3. Build Frontend Assets
```bash
# Build assets untuk development
npm run dev

# Atau untuk production build
npm run build
```

### 4. Jalankan Development Server

#### Opsi 1: Laravel Development Server (Recommended)
```bash
# Jalankan server Laravel
php artisan serve

# Server akan berjalan di: http://localhost:8000
```

#### Opsi 2: Dengan Vite Hot Reload
```bash
# Terminal 1: Jalankan Laravel server
php artisan serve

# Terminal 2: Jalankan Vite dev server untuk hot reload
npm run dev

# Akses aplikasi di: http://localhost:8000
```

#### Opsi 3: Menggunakan Laravel Sail (Docker)
```bash
# Jika ingin menggunakan Docker (opsional)
./vendor/bin/sail up -d

# Server akan berjalan di: http://localhost
```

## 🔧 Development Workflow

### 1. Struktur Development
```
backend/
├── app/                 # Logic aplikasi
├── resources/js/        # Frontend React/Inertia
├── resources/css/       # Styles
├── routes/web.php       # Routes
├── database/migrations/ # Database migrations
└── .env                 # Environment config
```

### 2. Menjalankan Migrasi Baru
```bash
# Buat migration baru
php artisan make:migration create_example_table

# Jalankan migration
php artisan migrate

# Rollback migration (jika diperlukan)
php artisan migrate:rollback
```

### 3. Membuat Controller/Model
```bash
# Buat controller
php artisan make:controller ExampleController

# Buat model dengan migration
php artisan make:model Example -m

# Buat resource controller
php artisan make:controller ExampleController --resource
```

### 4. Frontend Development (Inertia.js)
```bash
# File React components ada di:
# resources/js/Pages/
# resources/js/Components/

# Setelah edit frontend, build ulang:
npm run dev

# Atau jalankan watch mode:
npm run dev -- --watch
```

## 🐛 Debugging & Testing

### 1. Debug Mode
```bash
# Pastikan APP_DEBUG=true di .env untuk development

# Lihat log Laravel
tail -f storage/logs/laravel.log

# Clear cache saat development
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### 2. Database Debugging
```bash
# Test koneksi database
php artisan tinker
> DB::connection()->getPdo();
> exit

# Lihat query yang dijalankan (tambahkan di AppServiceProvider)
# DB::listen(function($query) {
#     Log::info($query->sql, $query->bindings);
# });
```

### 3. Running Tests
```bash
# Jalankan semua tests
php artisan test

# Jalankan test spesifik
php artisan test --filter ExampleTest

# Test dengan coverage
php artisan test --coverage
```

## 🔄 Development Commands

### Artisan Commands Berguna
```bash
# Lihat semua routes
php artisan route:list

# Buat seeder
php artisan make:seeder ExampleSeeder

# Jalankan seeder
php artisan db:seed --class=ExampleSeeder

# Buat factory
php artisan make:factory ExampleFactory

# Buat middleware
php artisan make:middleware ExampleMiddleware

# Buat request validation
php artisan make:request ExampleRequest
```

### NPM Scripts
```bash
# Development build dengan watch
npm run dev

# Production build
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

## 📱 Akses Development

Setelah server berjalan, akses aplikasi melalui:

- **Main Application**: `http://localhost:8000`
- **Admin Login**: `http://localhost:8000/login`
- **Dashboard**: `http://localhost:8000/dashboard`

### Default Login (setelah seeding)
```
Email: admin@example.com
Password: password
```

## 🚨 Troubleshooting Development

### Common Issues

#### 1. Database Connection Error
```bash
# Check MySQL service
sudo systemctl status mysql

# Restart MySQL
sudo systemctl restart mysql

# Verify database exists
mysql -u root -p -e "SHOW DATABASES;"
```

#### 2. Permission Issues
```bash
# Fix storage permissions
sudo chmod -R 775 storage bootstrap/cache
sudo chown -R $USER:www-data storage bootstrap/cache
```

#### 3. Composer Issues
```bash
# Update composer
composer self-update

# Clear composer cache
composer clear-cache

# Reinstall dependencies
rm -rf vendor
composer install
```

#### 4. NPM Issues
```bash
# Clear NPM cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 5. Vite Issues
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Restart Vite dev server
npm run dev
```

## 📝 Development Checklist

### Setup Awal ✅
- [ ] PHP, Composer, Node.js, MySQL terinstall
- [ ] Repository di-clone
- [ ] Database MySQL dibuat
- [ ] File .env dikonfigurasi
- [ ] Dependencies terinstall (composer + npm)
- [ ] Application key di-generate
- [ ] Database migration dijalankan
- [ ] Storage link dibuat

### Development Ready ✅
- [ ] Laravel server berjalan (php artisan serve)
- [ ] Vite dev server berjalan (npm run dev)
- [ ] Database connection working
- [ ] Admin login accessible
- [ ] Hot reload working
- [ ] Debug mode enabled

---

## 💡 Tips Development

1. **Gunakan Vite Hot Reload**: Jalankan `npm run dev` untuk auto-refresh saat edit frontend
2. **Debug dengan dd()**: Gunakan `dd($variable)` untuk debug di Laravel
3. **Use Tinker**: `php artisan tinker` untuk testing code secara interaktif
4. **Monitor Logs**: Selalu monitor `storage/logs/laravel.log` untuk error
5. **Clear Cache**: Sering-sering clear cache saat development dengan `php artisan cache:clear`

🎉 **Happy Coding!** 🚀