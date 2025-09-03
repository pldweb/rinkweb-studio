# Deployment Secrets Configuration

This document lists all the secrets and environment variables that need to be configured in your GitHub repository settings for automated deployments.

## GitHub Repository Secrets

Go to your repository → Settings → Secrets and variables → Actions → New repository secret

### Backend Deployment Secrets

#### Docker Hub (for Docker deployment)
```
DOCKER_USERNAME=your-dockerhub-username
DOCKER_PASSWORD=your-dockerhub-password
```

#### Vercel (for serverless backend deployment)
```
VERCEL_TOKEN=your-vercel-token
```

#### Railway (for container backend deployment)
```
RAILWAY_TOKEN=your-railway-token
```

### Frontend Deployment Secrets

#### Netlify
```
NETLIFY_AUTH_TOKEN=your-netlify-auth-token
NETLIFY_SITE_ID=your-netlify-site-id
```

#### Vercel (for frontend)
```
VERCEL_TOKEN=your-vercel-token
```

#### FTP Deployment
```
FTP_SERVER=your-ftp-server.com
FTP_USERNAME=your-ftp-username
FTP_PASSWORD=your-ftp-password
```

### Application Environment Variables

#### Frontend Environment Variables
```
VITE_API_URL=https://your-backend-domain.com/api
VITE_APP_NAME="RinkWeb Studio"
```

#### Backend Environment Variables (for CI/CD)
```
APP_KEY=base64:your-generated-app-key
DB_CONNECTION=mysql
DB_HOST=your-database-host
DB_PORT=3306
DB_DATABASE=your-database-name
DB_USERNAME=your-database-username
DB_PASSWORD=your-database-password
```

## How to Get These Tokens

### Docker Hub
1. Create account at https://hub.docker.com
2. Go to Account Settings → Security → New Access Token
3. Copy the token and username

### Vercel
1. Create account at https://vercel.com
2. Go to Settings → Tokens → Create Token
3. Copy the token

### Railway
1. Create account at https://railway.app
2. Go to Account Settings → Tokens → Create Token
3. Copy the token

### Netlify
1. Create account at https://netlify.com
2. Go to User settings → Applications → Personal access tokens → New access token
3. Create a new site and copy the Site ID from Site settings → General

### FTP
1. Get FTP credentials from your hosting provider
2. Usually includes server, username, and password

## Database Setup

For production deployments, you'll need a MySQL database. Recommended providers:

### PlanetScale (Recommended)
1. Create account at https://planetscale.com
2. Create database
3. Get connection string
4. Use in your backend environment variables

### Railway Database
1. Create MySQL service in Railway
2. Get connection details
3. Use in your backend environment variables

### Traditional Hosting
1. Create MySQL database in cPanel/hosting panel
2. Get connection details
3. Use in your backend environment variables

## SSL Certificates

Most deployment platforms (Vercel, Netlify, Railway) provide automatic HTTPS.

For traditional hosting:
1. Use Let's Encrypt with Certbot
2. Configure your web server (Nginx/Apache)
3. Update your domain DNS settings

## Domain Configuration

### Frontend Domain
- Point your domain to your frontend deployment platform
- Configure DNS A/CNAME records
- Enable HTTPS

### Backend Domain
- Use a subdomain like `api.yourdomain.com`
- Point to your backend deployment
- Configure CORS settings in Laravel

## Security Checklist

- [ ] All secrets are stored in GitHub Secrets (never in code)
- [ ] Database credentials are secure
- [ ] HTTPS is enabled on both frontend and backend
- [ ] CORS is properly configured
- [ ] Environment variables are set correctly
- [ ] File permissions are correct (for traditional hosting)
- [ ] Backup strategy is in place

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables
   - Verify dependencies in package.json/composer.json
   - Check build logs

2. **Database Connection Issues**
   - Verify database credentials
   - Check database server accessibility
   - Ensure database exists

3. **CORS Errors**
   - Configure `config/cors.php` in Laravel
   - Add frontend domain to allowed origins
   - Check middleware configuration

4. **File Permission Issues**
   - Ensure storage and cache directories are writable
   - Set correct ownership (www-data for Apache/Nginx)
   - Use 755 for directories, 644 for files

### Getting Help

- Check deployment platform documentation
- Review GitHub Actions logs
- Check Laravel logs in `storage/logs/`
- Verify environment variables are set correctly

## Monitoring

Set up monitoring for your deployments:

1. **Uptime Monitoring**
   - Use services like UptimeRobot, Pingdom
   - Monitor both frontend and backend

2. **Error Tracking**
   - Laravel: Use Sentry, Bugsnag
   - Frontend: Use Sentry for React

3. **Performance Monitoring**
   - Use Laravel Telescope (development)
   - Monitor database performance
   - Check frontend Core Web Vitals

4. **Log Management**
   - Centralize logs with services like Papertrail
   - Set up log rotation
   - Monitor error rates