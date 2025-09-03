# Deployment Guide - RinkWeb Studio

This guide covers deploying the backend (Laravel API) and frontend (React SPA) as separate applications.

## Project Structure

```
rinkweb-studio/
├── backend/          # Laravel API application
├── src/             # React frontend application
├── public/          # Frontend static assets
└── DEPLOYMENT.md    # This file
```

## Backend Deployment (Laravel API)

The backend is a Laravel application with Inertia.js that serves as an API and admin panel.

### Option 1: Docker Deployment

1. **Prerequisites:**
   - Docker and Docker Compose installed
   - MySQL database (can use the included docker-compose setup)

2. **Steps:**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your database and app settings
   docker-compose up -d
   docker-compose exec app php artisan key:generate
   docker-compose exec app php artisan migrate --seed
   ```

3. **Access:**
   - Backend API: http://localhost:8000
   - phpMyAdmin: http://localhost:8080

### Option 2: Vercel Deployment

1. **Prerequisites:**
   - Vercel CLI installed
   - External MySQL database (PlanetScale, Railway, etc.)

2. **Steps:**
   ```bash
   cd backend
   vercel --prod
   ```

3. **Environment Variables (set in Vercel dashboard):**
   ```
   APP_NAME="RinkWeb Studio API"
   APP_ENV=production
   APP_KEY=base64:your-app-key-here
   APP_DEBUG=false
   APP_URL=https://your-backend-domain.vercel.app
   
   DB_CONNECTION=mysql
   DB_HOST=your-db-host
   DB_PORT=3306
   DB_DATABASE=your-db-name
   DB_USERNAME=your-db-user
   DB_PASSWORD=your-db-password
   ```

### Option 3: Railway Deployment

1. **Prerequisites:**
   - Railway account
   - GitHub repository

2. **Steps:**
   - Connect your GitHub repository to Railway
   - Railway will automatically detect the `railway.json` and `Dockerfile`
   - Add environment variables in Railway dashboard
   - Deploy automatically on git push

3. **Environment Variables:**
   Same as Vercel option above

### Option 4: Traditional Server (VPS/Dedicated)

1. **Prerequisites:**
   - Ubuntu/CentOS server with PHP 8.2+, MySQL, Nginx/Apache
   - Composer installed
   - Node.js and npm installed

2. **Steps:**
   ```bash
   # Clone repository
   git clone https://github.com/your-username/rinkweb-studio.git
   cd rinkweb-studio/backend
   
   # Install dependencies
   composer install --no-dev --optimize-autoloader
   npm install && npm run build
   
   # Setup environment
   cp .env.example .env
   php artisan key:generate
   php artisan migrate --seed
   
   # Set permissions
   sudo chown -R www-data:www-data storage bootstrap/cache
   sudo chmod -R 775 storage bootstrap/cache
   ```

3. **Nginx Configuration:**
   ```nginx
   server {
       listen 80;
       server_name api.rinkwebstudio.com;
       root /var/www/rinkweb-studio/backend/public;
       index index.php;
       
       location / {
           try_files $uri $uri/ /index.php?$query_string;
       }
       
       location ~ \.php$ {
           fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
           fastcgi_index index.php;
           fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
           include fastcgi_params;
       }
   }
   ```

## Frontend Deployment (React SPA)

The frontend is a React application built with Vite.

### Option 1: Netlify Deployment

1. **Automatic Deployment:**
   - Connect your GitHub repository to Netlify
   - Netlify will use the existing `netlify.toml` configuration
   - Builds automatically on git push

2. **Manual Deployment:**
   ```bash
   npm run build
   # Upload dist/ folder to Netlify
   ```

### Option 2: Vercel Deployment

1. **Steps:**
   ```bash
   vercel --prod
   ```
   - Vercel will use the existing `vercel.json` configuration

### Option 3: Traditional Server

1. **Steps:**
   ```bash
   npm install
   npm run build
   # Upload dist/ folder to your web server
   ```

2. **Nginx Configuration:**
   ```nginx
   server {
       listen 80;
       server_name rinkwebstudio.com www.rinkwebstudio.com;
       root /var/www/rinkweb-studio/dist;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # Cache static assets
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

## Environment Configuration

### Backend Environment Variables

Create `.env` file in the `backend/` directory:

```env
APP_NAME="RinkWeb Studio"
APP_ENV=production
APP_KEY=base64:your-generated-key
APP_DEBUG=false
APP_URL=https://your-backend-domain.com

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_PORT=3306
DB_DATABASE=rinkweb_studio
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_APP_NAME="${APP_NAME}"
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

### Frontend Environment Variables

Create `.env` file in the root directory:

```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_APP_NAME="RinkWeb Studio"
```

## SSL/HTTPS Setup

For production deployments, ensure HTTPS is enabled:

1. **Netlify/Vercel:** Automatic HTTPS
2. **Traditional Server:** Use Let's Encrypt with Certbot
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

## Database Setup

After deployment, run these commands to set up the database:

```bash
# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate

# Seed database with default data
php artisan db:seed

# Create storage link
php artisan storage:link

# Clear and cache config
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Monitoring and Maintenance

1. **Logs:** Check Laravel logs in `storage/logs/`
2. **Performance:** Use Laravel Telescope for debugging (development only)
3. **Backups:** Set up automated database backups
4. **Updates:** Regularly update dependencies and Laravel version

## Troubleshooting

### Common Issues:

1. **500 Error:** Check Laravel logs and ensure proper file permissions
2. **Database Connection:** Verify database credentials and host accessibility
3. **CORS Issues:** Configure CORS settings in `config/cors.php`
4. **File Uploads:** Check `upload_max_filesize` and `post_max_size` in PHP configuration

### Support

For deployment issues, check:
- Laravel documentation: https://laravel.com/docs
- Platform-specific guides (Vercel, Netlify, Railway)
- Server logs and error messages