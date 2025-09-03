# Panduan Deployment Sederhana - RinkWeb Studio

Panduan deployment untuk setup yang Anda inginkan:
- **Backend Laravel Inertia**: Server sendiri (admin.rinkwebstudio.com) dengan MySQL
- **Frontend React**: Vercel (rinkwebstudio.com)

## 🚀 Backend Laravel - Server Sendiri

### 1. Persiapan Server

#### Requirements Server:
- PHP 8.2+
- MySQL 8.0+
- Nginx/Apache
- Composer
- Node.js & NPM
- Git

#### Install Dependencies (Ubuntu/Debian):
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install PHP 8.2
sudo apt install php8.2 php8.2-fpm php8.2-mysql php8.2-xml php8.2-gd php8.2-curl php8.2-mbstring php8.2-zip php8.2-bcmath -y

# Install MySQL
sudo apt install mysql-server -y

# Install Nginx
sudo apt install nginx -y

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Setup Database MySQL

```bash
# Login ke MySQL
sudo mysql -u root -p

# Buat database dan user
CREATE DATABASE rinkweb_admin;
CREATE USER 'rinkweb_user'@'localhost' IDENTIFIED BY 'password_yang_kuat';
GRANT ALL PRIVILEGES ON rinkweb_admin.* TO 'rinkweb_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Deploy Backend ke Server

#### A. Clone Repository:
```bash
# Masuk ke directory web
cd /var/www/

# Clone repository
sudo git clone https://github.com/your-username/rinkweb-studio.git
sudo chown -R www-data:www-data rinkweb-studio
cd rinkweb-studio/backend
```

#### B. Setup Laravel:
```bash
# Install dependencies
composer install --no-dev --optimize-autoloader
npm install
npm run build

# Copy environment file
cp .env.example .env

# Edit .env file
nano .env
```

#### C. Konfigurasi .env untuk Production:
```env
APP_NAME="RinkWeb Admin"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://admin.rinkwebstudio.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=rinkweb_admin
DB_USERNAME=rinkweb_user
DB_PASSWORD=password_yang_kuat

SESSION_DRIVER=database
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
```

#### D. Finalisasi Setup:
```bash
# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate --force

# Seed database (optional)
php artisan db:seed

# Create storage link
php artisan storage:link

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set permissions
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### 4. Konfigurasi Nginx

#### Buat Virtual Host:
```bash
sudo nano /etc/nginx/sites-available/admin.rinkwebstudio.com
```

#### Konfigurasi Nginx:
```nginx
server {
    listen 80;
    server_name admin.rinkwebstudio.com;
    root /var/www/rinkweb-studio/backend/public;
    index index.php index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Handle Laravel routes
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # PHP processing
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }

    # Cache static files
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Aktifkan Site:
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/admin.rinkwebstudio.com /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart services
sudo systemctl restart nginx
sudo systemctl restart php8.2-fpm
```

### 5. SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Generate SSL certificate
sudo certbot --nginx -d admin.rinkwebstudio.com

# Auto-renewal
sudo crontab -e
# Add line: 0 12 * * * /usr/bin/certbot renew --quiet
```

### 6. Update Script untuk Backend

Buat script update di server:
```bash
sudo nano /var/www/rinkweb-studio/update-backend.sh
```

```bash
#!/bin/bash
cd /var/www/rinkweb-studio

# Pull latest changes
git pull origin main

# Update backend
cd backend

# Install/update dependencies
composer install --no-dev --optimize-autoloader
npm install
npm run build

# Run migrations
php artisan migrate --force

# Clear and cache
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set permissions
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache

echo "Backend updated successfully!"
```

```bash
# Make executable
sudo chmod +x /var/www/rinkweb-studio/update-backend.sh
```

---

## 🌐 Frontend React - Vercel

### 1. Setup Vercel

#### A. Connect Repository ke Vercel:
1. Login ke [vercel.com](https://vercel.com)
2. Import project dari GitHub
3. Pilih repository `rinkweb-studio`
4. Set **Root Directory** ke `/` (root project, bukan backend)
5. Vercel akan auto-detect sebagai Vite project

#### B. Environment Variables di Vercel:
```env
VITE_API_BASE_URL=https://admin.rinkwebstudio.com/api
VITE_APP_NAME=RinkWeb Studio
VITE_APP_ENV=production
```

#### C. Build Settings (Auto-detected):
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 2. Custom Domain di Vercel

1. Go to Project Settings → Domains
2. Add domain: `rinkwebstudio.com`
3. Configure DNS:
   - Type: `A`
   - Name: `@`
   - Value: `76.76.19.61` (Vercel IP)
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

### 3. Auto Deployment

Setiap push ke branch `main` akan otomatis:
1. Trigger build di Vercel
2. Deploy ke `rinkwebstudio.com`
3. Invalidate CDN cache

---

## 🔄 Workflow Update

### Update Backend (Manual di Server):
```bash
# SSH ke server
ssh user@your-server-ip

# Run update script
/var/www/rinkweb-studio/update-backend.sh
```

### Update Frontend (Otomatis):
```bash
# Local development
git add .
git commit -m "Update frontend"
git push origin main

# Vercel akan auto-deploy
```

### Update Both:
```bash
# Push changes
git add .
git commit -m "Update both frontend and backend"
git push origin main

# Update backend di server
ssh user@your-server-ip
/var/www/rinkweb-studio/update-backend.sh

# Frontend akan auto-update via Vercel
```

---

## 🔧 Maintenance

### Backup Database:
```bash
# Create backup
mysqldump -u rinkweb_user -p rinkweb_admin > backup_$(date +%Y%m%d).sql

# Restore backup
mysql -u rinkweb_user -p rinkweb_admin < backup_20240101.sql
```

### Monitor Logs:
```bash
# Laravel logs
tail -f /var/www/rinkweb-studio/backend/storage/logs/laravel.log

# Nginx logs
tail -f /var/log/nginx/error.log

# PHP-FPM logs
tail -f /var/log/php8.2-fpm.log
```

### Performance Optimization:
```bash
# Enable OPcache
sudo nano /etc/php/8.2/fpm/php.ini
# opcache.enable=1
# opcache.memory_consumption=128
# opcache.max_accelerated_files=4000

# Restart PHP-FPM
sudo systemctl restart php8.2-fpm
```

---

## 📋 Checklist Deployment

### Backend (Server):
- [ ] Server setup dengan PHP 8.2, MySQL, Nginx
- [ ] Database created dan configured
- [ ] Repository cloned ke `/var/www/rinkweb-studio`
- [ ] Dependencies installed
- [ ] `.env` configured untuk production
- [ ] Migrations run
- [ ] Nginx virtual host configured
- [ ] SSL certificate installed
- [ ] Permissions set correctly
- [ ] Update script created

### Frontend (Vercel):
- [ ] Repository connected ke Vercel
- [ ] Environment variables set
- [ ] Custom domain configured
- [ ] DNS records updated
- [ ] Auto-deployment working

### Testing:
- [ ] Backend accessible via `https://admin.rinkwebstudio.com`
- [ ] Frontend accessible via `https://rinkwebstudio.com`
- [ ] Database connection working
- [ ] Authentication working
- [ ] API endpoints responding
- [ ] SSL certificates valid

Dengan setup ini, Anda akan memiliki:
- **Backend Laravel**: Di server sendiri dengan kontrol penuh
- **Frontend React**: Di Vercel dengan CDN global dan auto-deployment
- **Database**: MySQL di server yang sama dengan backend
- **Update Process**: Manual untuk backend, otomatis untuk frontend

Setup ini memberikan fleksibilitas maksimal dan performa optimal! 🚀