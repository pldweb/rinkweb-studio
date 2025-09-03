# Panduan Update Deployment - RinkWeb Studio

Panduan ini menjelaskan cara melakukan update deployment untuk backend (admin.rinkwebstudio.com) dan frontend (rinkwebstudio.com) secara terpisah.

## 🔧 Update Backend (admin.rinkwebstudio.com)

Backend Laravel dengan admin panel dapat di-update dengan beberapa cara:

### Metode 1: Automatic Deployment (Recommended)

#### Via GitHub Actions (Otomatis)
```bash
# 1. Commit perubahan ke repository
git add .
git commit -m "Update backend: [deskripsi perubahan]"
git push origin main

# GitHub Actions akan otomatis:
# - Menjalankan tests
# - Build aplikasi
# - Deploy ke platform yang dikonfigurasi
```

#### Platform yang Didukung:
- **Vercel**: Deploy otomatis ke serverless
- **Railway**: Deploy otomatis ke container
- **Docker Hub**: Build dan push image otomatis

### Metode 2: Manual Deployment

#### A. Vercel (Serverless)
```bash
cd backend

# Install Vercel CLI jika belum ada
npm install -g vercel

# Login ke Vercel
vercel login

# Deploy ke production
vercel --prod
```

#### B. Railway (Container)
```bash
cd backend

# Install Railway CLI
curl -fsSL https://railway.app/install.sh | sh

# Login ke Railway
railway login

# Deploy
railway up
```

#### C. Docker (Manual)
```bash
cd backend

# Build Docker image
docker build -t rinkweb-backend .

# Run container
docker run -d -p 8000:80 \
  -e APP_ENV=production \
  -e DB_HOST=your-db-host \
  -e DB_DATABASE=your-db-name \
  -e DB_USERNAME=your-db-user \
  -e DB_PASSWORD=your-db-password \
  rinkweb-backend
```

#### D. Traditional Server (VPS/Shared Hosting)
```bash
# 1. Upload files via FTP/SFTP atau git pull
git pull origin main

# 2. Jalankan deployment script
cd backend
./deploy.sh

# Atau manual:
composer install --no-dev --optimize-autoloader
npm install && npm run build
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Metode 3: Quick Update (Tanpa Downtime)

#### Untuk perubahan kecil (code, views, config):
```bash
cd backend

# Update code
git pull origin main

# Update dependencies jika ada perubahan
composer install --no-dev --optimize-autoloader

# Build assets jika ada perubahan frontend
npm run build

# Clear cache
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

# Cache ulang untuk performance
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

#### Untuk perubahan database:
```bash
# Jalankan migrasi
php artisan migrate --force

# Jika ada seeder baru
php artisan db:seed --class=NewSeederClass
```

---

## 🌐 Update Frontend (rinkwebstudio.com)

Frontend React SPA dapat di-update dengan cara:

### Metode 1: Automatic Deployment (Recommended)

#### Via GitHub Actions (Otomatis)
```bash
# 1. Commit perubahan ke repository
git add .
git commit -m "Update frontend: [deskripsi perubahan]"
git push origin main

# GitHub Actions akan otomatis:
# - Menjalankan linting dan type checking
# - Build aplikasi React
# - Deploy ke platform yang dikonfigurasi
```

#### Platform yang Didukung:
- **Netlify**: Deploy otomatis dengan CDN global
- **Vercel**: Deploy otomatis dengan edge functions
- **GitHub Pages**: Deploy gratis ke GitHub Pages

### Metode 2: Manual Deployment

#### A. Netlify
```bash
# Via Netlify CLI
npm install -g netlify-cli
netlify login

# Build dan deploy
npm run build
netlify deploy --prod --dir=dist

# Atau drag & drop folder dist/ ke Netlify dashboard
```

#### B. Vercel
```bash
# Via Vercel CLI
npm install -g vercel
vercel login

# Deploy
vercel --prod
```

#### C. GitHub Pages
```bash
# Build aplikasi
npm run build

# Push ke branch gh-pages (jika menggunakan manual)
git checkout -b gh-pages
cp -r dist/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

#### D. Traditional Server (VPS/Shared Hosting)
```bash
# 1. Build aplikasi
npm run build

# 2. Upload folder dist/ ke server via FTP/SFTP
# Atau jika ada akses SSH:
git pull origin main
npm install
npm run build

# 3. Copy files ke web directory
cp -r dist/* /var/www/html/
# atau
cp -r dist/* /public_html/
```

### Metode 3: Quick Update (Hanya File Statis)

#### Untuk perubahan kecil (text, styling, images):
```bash
# Build ulang
npm run build

# Upload hanya files yang berubah
# Atau gunakan rsync untuk sync otomatis
rsync -avz --delete dist/ user@server:/var/www/html/
```

---

## 🔄 Update Workflow yang Disarankan

### Untuk Development:
```bash
# 1. Buat branch baru untuk fitur
git checkout -b feature/nama-fitur

# 2. Lakukan perubahan dan test lokal
# Backend: php artisan serve
# Frontend: npm run dev

# 3. Commit dan push
git add .
git commit -m "Add: nama fitur"
git push origin feature/nama-fitur

# 4. Buat Pull Request
# 5. Setelah review, merge ke main
# 6. Deployment otomatis akan berjalan
```

### Untuk Hotfix:
```bash
# 1. Langsung ke main branch
git checkout main
git pull origin main

# 2. Lakukan perbaikan
# 3. Test cepat
# 4. Commit dan push
git add .
git commit -m "Hotfix: deskripsi perbaikan"
git push origin main

# 5. Monitor deployment
```

---

## 🔍 Monitoring Update

### Cek Status Deployment:
```bash
# Jalankan health check script
./scripts/check-deployment.sh https://rinkwebstudio.com https://admin.rinkwebstudio.com
```

### Monitor Logs:

#### Backend (Laravel):
```bash
# Local/Server
tail -f storage/logs/laravel.log

# Vercel
vercel logs

# Railway
railway logs
```

#### Frontend:
- **Netlify**: Check deploy logs di dashboard
- **Vercel**: Check function logs di dashboard
- **Server**: Check web server logs (nginx/apache)

---

## 🚨 Troubleshooting

### Backend Issues:

#### 1. Database Migration Error:
```bash
# Reset dan migrate ulang (HATI-HATI: akan hapus data)
php artisan migrate:fresh --seed

# Atau rollback dan migrate ulang
php artisan migrate:rollback
php artisan migrate
```

#### 2. Cache Issues:
```bash
# Clear semua cache
php artisan optimize:clear

# Atau satu per satu
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear
```

#### 3. Permission Issues (Linux/Unix):
```bash
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### Frontend Issues:

#### 1. Build Error:
```bash
# Clear node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 2. Routing Issues (SPA):
- Pastikan server dikonfigurasi untuk SPA routing
- Check file `.htaccess`, `nginx.conf`, atau `_redirects`

#### 3. Environment Variables:
```bash
# Pastikan .env file ada dan benar
cp .env.example .env
# Edit sesuai environment
```

---

## 📋 Checklist Update

### Sebelum Update:
- [ ] Backup database (untuk backend)
- [ ] Test di local environment
- [ ] Check dependency updates
- [ ] Review breaking changes

### Setelah Update:
- [ ] Verify deployment berhasil
- [ ] Test functionality utama
- [ ] Check error logs
- [ ] Monitor performance
- [ ] Update documentation jika perlu

### Emergency Rollback:
```bash
# Git rollback
git revert HEAD
git push origin main

# Atau rollback ke commit tertentu
git reset --hard <commit-hash>
git push --force origin main
```

---

## 🔗 Quick Links

- **Frontend**: https://rinkwebstudio.com
- **Backend Admin**: https://admin.rinkwebstudio.com
- **GitHub Repository**: https://github.com/your-username/rinkweb-studio
- **Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Secrets Configuration**: [.github/DEPLOYMENT_SECRETS.md](.github/DEPLOYMENT_SECRETS.md)

---

## 💡 Tips

1. **Gunakan staging environment** untuk test sebelum production
2. **Monitor deployment** dengan health check script
3. **Backup database** sebelum update besar
4. **Update dependencies** secara berkala
5. **Document changes** untuk team collaboration
6. **Use semantic versioning** untuk release management

Dengan mengikuti panduan ini, Anda dapat melakukan update deployment dengan aman dan efisien! 🚀