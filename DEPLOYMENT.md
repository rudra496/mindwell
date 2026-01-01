# MindWell Deployment Guide

This guide provides step-by-step instructions for deploying MindWell to various platforms.

## 🎯 Prerequisites

**None!** MindWell requires:
- ✅ No database setup
- ✅ No environment variables
- ✅ No API keys
- ✅ No external services

Simply build and deploy.

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**One-Click Deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rudra496/mindwell)

**Manual Deploy:**

1. Install Vercel CLI (optional):
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow prompts. Done!

**Configuration:**
- Build Command: `npm run build` (auto-detected)
- Output Directory: `.next` (auto-detected)
- Install Command: `npm install` (auto-detected)

### Option 2: Netlify

1. **Via Netlify UI:**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Configure:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy site"

2. **Via Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

### Option 3: Cloudflare Pages

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Connect your GitHub repository
3. Configure build:
   - Build command: `npm run build`
   - Build output directory: `.next`
4. Deploy

### Option 4: Railway

1. Go to [Railway](https://railway.app/)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway auto-detects Next.js and deploys

### Option 5: Render

1. Go to [Render](https://render.com/)
2. Create new "Web Service"
3. Connect repository
4. Configure:
   - Build Command: `npm run build`
   - Start Command: `npm start`
5. Deploy

## 🏠 Self-Hosting

### Using Node.js

```bash
# Clone repository
git clone https://github.com/rudra496/mindwell.git
cd mindwell

# Install dependencies
npm install

# Build
npm run build

# Start production server
npm start
```

Server runs on `http://localhost:3000`

### Using PM2 (Process Manager)

```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start npm --name "mindwell" -- start

# Make it run on system startup
pm2 startup
pm2 save
```

### With Reverse Proxy (Nginx)

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Using Docker

**Dockerfile:**

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

**Build and Run:**

```bash
# Build image
docker build -t mindwell .

# Run container
docker run -p 3000:3000 mindwell

# Or with docker-compose
```

**docker-compose.yml:**

```yaml
version: '3.8'
services:
  mindwell:
    build: .
    ports:
      - "3000:3000"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

### Using Static Export (Future Option)

Next.js 15 supports static export for hosting on any static file server:

1. Update `next.config.mjs`:
   ```javascript
   const nextConfig = {
     output: 'export',
   }
   ```

2. Build static files:
   ```bash
   npm run build
   ```

3. Deploy the `out/` directory to any static host:
   - AWS S3
   - Google Cloud Storage
   - Azure Static Web Apps
   - GitHub Pages
   - Any CDN

## 🔧 Advanced Configuration

### Custom Domain

**Vercel:**
- Go to project settings → Domains
- Add your custom domain
- Update DNS records as shown

**Netlify:**
- Go to Domain settings
- Add custom domain
- Configure DNS

**Self-hosted:**
- Update Nginx configuration with your domain
- Get SSL certificate (Let's Encrypt recommended):
  ```bash
  sudo certbot --nginx -d your-domain.com
  ```

### Environment-Specific Builds

MindWell doesn't need environment variables, but if you want to customize:

```bash
# Development
npm run dev

# Production
npm run build && npm start
```

### Performance Optimization

**For self-hosted deployments:**

1. **Enable Gzip compression** (Nginx):
   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript;
   gzip_min_length 1000;
   ```

2. **Set up caching headers**:
   ```nginx
   location /_next/static/ {
       add_header Cache-Control "public, max-age=31536000, immutable";
   }
   ```

3. **Use CDN** for static assets (optional)

## 📱 PWA Installation

After deployment, users can install MindWell as a Progressive Web App:

**Desktop (Chrome/Edge):**
- Click the install icon in the address bar
- Or: Menu → "Install MindWell..."

**Mobile (iOS Safari):**
- Tap Share button
- Select "Add to Home Screen"

**Mobile (Android Chrome):**
- Tap Menu (three dots)
- Select "Add to Home Screen"

## 🔐 Security Considerations

### HTTPS

Always deploy with HTTPS. Most platforms (Vercel, Netlify, etc.) provide free SSL automatically.

For self-hosted:
```bash
# Using Let's Encrypt
sudo certbot --nginx -d your-domain.com
```

### Headers

Add security headers (example for Nginx):

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

### Rate Limiting

For self-hosted deployments, consider rate limiting:

```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

location /api/ {
    limit_req zone=api burst=20;
}
```

## 🧪 Testing Your Deployment

After deployment, verify:

1. ✅ Homepage loads
2. ✅ All modals open (Disorders, Assessments, Games, etc.)
3. ✅ Chatbot responds
4. ✅ Community posts can be created
5. ✅ Assessments can be taken and saved
6. ✅ Mood tracker saves entries
7. ✅ Service worker registers (check DevTools → Application → Service Workers)
8. ✅ Site works offline (disconnect internet, refresh)

### Lighthouse Audit

Run Lighthouse audit in Chrome DevTools:
- Performance: Should be 90+
- Accessibility: Should be 95+
- Best Practices: Should be 100
- SEO: Should be 90+
- PWA: Should pass all checks

## 🔄 Updating Your Deployment

### For Platform Deployments (Vercel, Netlify, etc.)

Simply push to your GitHub repository - auto-deploys!

```bash
git add .
git commit -m "Update content"
git push
```

### For Self-Hosted

```bash
# Pull latest changes
git pull

# Rebuild
npm install
npm run build

# Restart service
pm2 restart mindwell

# Or restart Docker container
docker-compose down && docker-compose up -d
```

## ❓ Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use

```bash
# Use different port
PORT=3001 npm start
```

### Service Worker Not Registering

- Ensure HTTPS is enabled
- Check browser console for errors
- Verify `public/sw.js` exists

### PWA Not Installable

- Verify `public/manifest.json` exists
- Check HTTPS is enabled
- Ensure service worker is registered
- Add PWA icons to `public/` directory

## 📞 Support

For deployment issues:
1. Check [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
2. Open an issue on GitHub
3. Consult platform-specific documentation

---

**Remember:** MindWell is designed to be deployed anywhere, anytime, with zero configuration. Happy deploying! 🚀
