# 🚀 Panduan Deployment RinkWeb Studio

Panduan ini menjelaskan cara deploy aplikasi RinkWeb Studio dengan konfigurasi:
- **Backend Laravel**: Deploy ke server sendiri di `admin.rinkwebstudio.com`
- **Database**: MySQL di server sendiri
- **Frontend React**: Bagian dari Laravel (Inertia.js)

## 📋 Persiapan Server

### 1. Persyaratan Server
```bash
# Update sistem
sudo apt update && sudo apt upgrade -y

# Install PHP 8.1+
sudo apt install php8.1 php8.1-fpm php8.1-mysql php8.1-xml php8.1-curl php8.1-zip php8.1-mbstring php8.1-gd php8.1-intl php8.1-bcmath -y

# Install MySQL
sudo apt install mysql-server -y

# Install Nginx
sudo apt install nginx -y

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Install Node.js & NPM
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# Install Git
sudo apt install git -y
```

### 2. Setup SSL dengan Let's Encrypt
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Generate SSL certificate
sudo certbot --nginx -d admin.rinkwebstudio.com
```

## 🗄️ Setup Database MySQL

### 1. Clone Repository ke Server
```bash
# Clone repository
cd /var/www
sudo git clone https://github.com/username/rinkweb-studio.git
sudo chown -R www-data:www-data rinkweb-studio
cd rinkweb-studio/backend
```

### 2. Setup Database
```bash
# Jalankan script setup MySQL
./setup-mysql.sh
```

Script ini akan:
- Membuat database `rinkweb_admin`
- Membuat user `rinkweb_user` dengan password yang aman
- Mengupdate file `.env` dengan konfigurasi database
- Generate application key
- Test koneksi database

### 3. Deploy Backend Laravel
```bash
# Jalankan script deployment
./deploy-server.sh
```

Script ini akan:
- Install dependencies (Composer & NPM)
- Build assets
- Run migrations
- Setup permissions
- Clear cache
- Restart services

## 🌐 Konfigurasi Nginx

### 1. Copy Konfigurasi Nginx
```bash
# Copy konfigurasi nginx
sudo cp nginx-server.conf /etc/nginx/sites-available/admin.rinkwebstudio.com
sudo ln -s /etc/nginx/sites-available/admin.rinkwebstudio.com /etc/nginx/sites-enabled/

# Test konfigurasi
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 2. Verifikasi Backend
Buka browser dan akses:
- `https://admin.rinkwebstudio.com` - Halaman login admin
- `https://admin.rinkwebstudio.com/api/health` - Health check API

## 🌐 Akses Aplikasi

Setelah deployment selesai, aplikasi dapat diakses melalui:
- **Admin Panel**: `https://admin.rinkwebstudio.com`
- **Website Utama**: `https://admin.rinkwebstudio.com` (frontend terintegrasi dengan backend)

## 🔄 Workflow Update

### Update Backend (Server)
```bash
# SSH ke server
ssh user@your-server-ip

# Masuk ke directory project
cd /var/www/rinkweb-studio/backend

# Pull perubahan terbaru
git pull origin main

# Jalankan deployment
./deploy-server.sh
```

### Update Aplikasi Lengkap
```bash
# SSH ke server
ssh user@your-server-ip

# Masuk ke directory project
cd /var/www/rinkweb-studio/backend

# Pull perubahan terbaru (backend + frontend)
git pull origin main

# Jalankan deployment
./deploy-server.sh
```

## 🔧 Maintenance & Monitoring

### 1. Backup Database
```bash
# Jalankan backup (otomatis dibuat saat setup)
./backup-database.sh

# Setup cron job untuk backup harian
crontab -e
# Tambahkan: 0 2 * * * /var/www/rinkweb-studio/backend/backup-database.sh
```

### 2. Monitor Logs
```bash
# Laravel logs
tail -f storage/logs/laravel.log

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# MySQL logs
sudo tail -f /var/log/mysql/error.log
```

### 3. Health Check
```bash
# Jalankan health check
../scripts/check-deployment.sh
```

## 🚨 Troubleshooting

### Backend Issues
```bash
# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Fix permissions
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache

# Restart services
sudo systemctl restart nginx
sudo systemctl restart php8.1-fpm
```

### Database Issues
```bash
# Check MySQL status
sudo systemctl status mysql

# Restart MySQL
sudo systemctl restart mysql

# Check database connection
php artisan tinker
> DB::connection()->getPdo();
```

### Frontend Issues
- Check browser console untuk error JavaScript
- Verify Vite build process
- Check Inertia.js configuration

## 📞 Support

Jika mengalami masalah:
1. Check logs di server dan Vercel
2. Verify DNS settings
3. Check SSL certificates
4. Verify database connectivity
5. Check file permissions

---

## 📝 Checklist Deployment

### Server Deployment ✅
- [ ] Server requirements installed
- [ ] Repository cloned
- [ ] MySQL database setup
- [ ] Environment variables configured
- [ ] Dependencies installed (Composer & NPM)
- [ ] Database migrated
- [ ] Nginx configured
- [ ] SSL certificate installed
- [ ] Permissions set correctly
- [ ] Health check passed

### Application ✅
- [ ] Admin login working
- [ ] Frontend assets built
- [ ] Inertia.js working properly
- [ ] Database backup scheduled
- [ ] Monitoring setup
- [ ] Documentation updated

🎉 **Deployment Complete!**

- Admin Panel & Website: https://admin.rinkwebstudio.com