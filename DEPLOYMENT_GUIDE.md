# MindWell Deployment Guide

Complete guide for deploying MindWell to Vercel with PostgreSQL database.

## Prerequisites

- GitHub account with your mindwell repository
- Vercel account (sign up at [vercel.com](https://vercel.com))
- 5-10 minutes of setup time

---

## Option 1: Vercel Postgres (Recommended - Easiest)

### Step 1: Create Vercel Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your `rudra496/mindwell` repository
4. Click "Import"

### Step 2: Configure Build Settings

Vercel should auto-detect Next.js, but verify:

- **Framework Preset**: Next.js
- **Build Command**: `prisma generate && npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

Click "Deploy" (it will fail initially - this is expected)

### Step 3: Add PostgreSQL Database

1. In your Vercel project dashboard, go to the **Storage** tab
2. Click **Create Database**
3. Select **Postgres**
4. Choose a database name (e.g., `mindwell-db`)
5. Select a region (choose closest to your users)
6. Click **Create**

Vercel will automatically add these environment variables to your project:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_URL_NO_SSL`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

### Step 4: Add DATABASE_URL Environment Variable

1. Go to **Settings** → **Environment Variables**
2. Add a new variable:
   - **Name**: `DATABASE_URL`
   - **Value**: Copy the value from `POSTGRES_PRISMA_URL`
   - **Environments**: Select all (Production, Preview, Development)
3. Click **Save**

### Step 5: Run Database Migrations

Option A - Via Vercel CLI (Recommended):
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link to your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run Prisma migrations
npx prisma migrate deploy

# Run seed data
npm run prisma:seed
```

Option B - Via Project Settings:
1. Go to **Settings** → **General** → **Build & Development Settings**
2. Add to **Build Command**: 
   ```bash
   prisma generate && prisma migrate deploy && npm run build
   ```

### Step 6: Redeploy

1. Go to **Deployments** tab
2. Click the three dots on the latest deployment
3. Click **Redeploy**
4. Select "Use existing Build Cache" (unchecked)
5. Click **Redeploy**

Your site should now be live! 🎉

---

## Option 2: Supabase PostgreSQL (Free Tier Available)

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up and create a new project
3. Set a strong database password (save it!)
4. Wait for project to initialize (~2 minutes)

### Step 2: Get Connection Strings

1. In Supabase dashboard, go to **Project Settings** → **Database**
2. Find the **Connection String** section
3. Copy the following (replace `[YOUR-PASSWORD]` with your password):

**Connection pooling** (for Prisma):
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres?pgbouncer=true
```

**Direct connection** (for migrations):
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

### Step 3: Add to Vercel Environment Variables

In Vercel Project → **Settings** → **Environment Variables**, add:

1. **DATABASE_URL**
   - Value: Direct connection string
   - Environments: Production, Preview, Development

2. **POSTGRES_PRISMA_URL**
   - Value: Connection pooling string
   - Environments: Production, Preview, Development

3. **POSTGRES_URL_NON_POOLING**
   - Value: Direct connection string  
   - Environments: Production, Preview, Development

### Step 4: Deploy and Migrate

1. Redeploy your Vercel project
2. Use Vercel CLI to run migrations:

```bash
vercel env pull .env.local
npx prisma migrate deploy
npm run prisma:seed
```

---

## Option 3: Neon PostgreSQL (Generous Free Tier)

### Step 1: Create Neon Project

1. Go to [neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Choose a region
4. Note your connection details

### Step 2: Get Connection String

1. In Neon Console, go to **Dashboard**
2. Click **Connection Details**
3. Copy the connection string (it looks like):
```
postgresql://[user]:[password]@[host]/[dbname]?sslmode=require
```

### Step 3: Add to Vercel

In Vercel → **Settings** → **Environment Variables**:

1. **DATABASE_URL**: Your Neon connection string
2. **POSTGRES_PRISMA_URL**: Same as DATABASE_URL + `&pgbouncer=true`
3. **POSTGRES_URL_NON_POOLING**: Same as DATABASE_URL

### Step 4: Deploy

Redeploy your Vercel project and run migrations as shown above.

---

## Troubleshooting

### Error: "Environment Variable references Secret that does not exist"

**Solution**: Remove the `env` section from `vercel.json`. Environment variables should be set in Vercel Dashboard, not in the config file.

### Error: "Can't reach database server"

**Solutions**:
1. Verify connection string is correct
2. Check database is running
3. Verify SSL settings (`?sslmode=require`)
4. For Supabase: use connection pooling URL for PRISMA_URL
5. Check firewall/IP allowlist settings

### Error: "Prisma Client did not initialize yet"

**Solution**: Make sure build command includes `prisma generate`:
```bash
prisma generate && npm run build
```

### Error: "Table doesn't exist"

**Solution**: Run migrations:
```bash
vercel env pull .env.local
npx prisma migrate deploy
npm run prisma:seed
```

### Build succeeds but app crashes

**Check**:
1. Environment variables are set for Production environment
2. Database is accessible from Vercel's servers
3. Check Vercel Function Logs for detailed errors

---

## Environment Variables Checklist

Before deploying, ensure you have:

- [ ] `DATABASE_URL` - Main database connection
- [ ] `POSTGRES_PRISMA_URL` - Connection pooling URL (optional but recommended)
- [ ] `POSTGRES_URL_NON_POOLING` - Direct connection for migrations (optional)
- [ ] `NEXT_PUBLIC_APP_URL` - Your Vercel deployment URL
- [ ] `OPENAI_API_KEY` - Only if using AI chatbot (optional)

---

## Post-Deployment

### Verify Deployment

1. Visit your Vercel URL
2. Test the homepage loads
3. Check that disorders data appears
4. Test the assessment feature
5. Verify meditation and therapy sections work

### Monitor

1. Check Vercel Analytics for traffic
2. Monitor Vercel Function Logs for errors
3. Review database usage in your provider's dashboard

### Custom Domain (Optional)

1. In Vercel → **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_APP_URL` environment variable

---

## Database Seeding

After deployment, seed your database with initial data:

```bash
# Pull environment variables
vercel env pull .env.local

# Run seed script
npm run prisma:seed
```

This will populate:
- 33+ mental health disorders
- 8 mental health assessments  
- 9 guided meditations
- 23 therapy techniques
- 12 crisis resources

---

## Updating Production

When you push changes to your GitHub repository:

1. Vercel automatically deploys
2. Environment variables persist
3. Database remains unchanged unless you run migrations

To update database schema:
```bash
# Create migration
npx prisma migrate dev --name your_migration_name

# Deploy to production
vercel env pull .env.local
npx prisma migrate deploy
```

---

## Security Best Practices

- ✅ Never commit `.env` files to Git
- ✅ Use strong database passwords
- ✅ Enable SSL for database connections
- ✅ Rotate API keys periodically
- ✅ Use environment-specific variables
- ✅ Monitor Vercel logs for suspicious activity
- ✅ Keep dependencies updated (`npm audit`)

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **GitHub Issues**: https://github.com/rudra496/mindwell/issues
- **Vercel Community**: https://github.com/vercel/vercel/discussions

---

## Quick Reference

### Vercel CLI Commands
```bash
vercel                    # Deploy to preview
vercel --prod            # Deploy to production
vercel env ls            # List environment variables
vercel env pull          # Pull env vars locally
vercel logs             # View deployment logs
vercel domains           # Manage domains
```

### Prisma Commands
```bash
npx prisma generate      # Generate Prisma Client
npx prisma migrate dev   # Create and apply migrations (dev)
npx prisma migrate deploy # Apply migrations (production)
npx prisma studio        # Open Prisma Studio GUI
npx prisma db push       # Push schema without migrations
```

---

Made with ❤️ for mental health awareness
