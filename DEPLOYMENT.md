# Deployment Guide

This guide covers deploying the Asset Management System to production.

## Frontend Deployment (Next.js on Vercel)

### 1. Prepare Your Repository

Ensure your code is committed to GitHub:
```bash
git add .
git commit -m "Full-stack AMS with authentication and backend"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Configure project settings:
   - Framework: Next.js
   - Build Command: `pnpm build`
   - Install Command: `pnpm install`

### 3. Set Environment Variables in Vercel

In Vercel Project Settings > Environment Variables, add:

```
NEXTAUTH_SECRET=<your-nextauth-secret>
NEXTAUTH_URL=https://your-domain.vercel.app
GOOGLE_ID=<your-google-client-id>
GOOGLE_SECRET=<your-google-client-secret>
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

### 4. Update Google OAuth Redirect URIs

In Google Cloud Console, add your Vercel domain:
- `https://your-domain.vercel.app/api/auth/callback/google`

## Backend Deployment (Express on Railway/Render/Heroku)

### Option A: Deploy to Railway (Recommended)

1. Go to [Railway.app](https://railway.app)
2. Click "New Project" > "GitHub Repo"
3. Select your repository
4. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT=5000`
   - `NODE_ENV=production`

5. Configure start command:
   ```
   tsx server/index.ts
   ```

### Option B: Deploy to Render

1. Go to [Render.com](https://render.com)
2. Click "New +" > "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Build Command: `pnpm install`
   - Start Command: `tsx server/index.ts`
5. Add environment variables as listed above

### Option C: Deploy to Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=<your-uri>
   heroku config:set JWT_SECRET=<your-secret>
   ```

5. Deploy:
   ```bash
   git push heroku main
   ```

## MongoDB Atlas Configuration for Production

1. Ensure your MongoDB cluster is configured for production:
   - Use strong passwords
   - Enable encryption
   - Set up automated backups
   - Configure IP whitelist for your backend servers

2. Monitor your database:
   - Use MongoDB Atlas monitoring tools
   - Set up alerts for performance issues
   - Review logs regularly

## Security Checklist

- [ ] All environment variables set in production
- [ ] HTTPS enabled for all domains
- [ ] Google OAuth credentials from production app
- [ ] MongoDB credentials are strong
- [ ] CORS properly configured
- [ ] Rate limiting implemented (recommended)
- [ ] Regular backups scheduled
- [ ] Error logs monitored
- [ ] SSL certificates valid

## Monitoring & Logging

### Frontend (Vercel)
- Monitor builds and deployments
- View performance analytics
- Check error logs
- Use Next.js Analytics

### Backend
- Monitor API response times
- Track error rates
- Monitor database queries
- Set up uptime monitoring

## Scaling Considerations

1. **Database**: MongoDB Atlas auto-scaling
2. **Backend**: Deploy multiple instances behind load balancer
3. **Frontend**: Vercel automatically scales
4. **Caching**: Implement Redis for frequently accessed data
5. **CDN**: Configure CloudFlare or Vercel CDN

## Domain Configuration

1. Update your domain DNS records to point to:
   - Frontend: Vercel nameservers
   - Backend: Your deployment provider

2. Update all environment variables with correct domain URLs

3. Update Google OAuth with production domain

## Post-Deployment

1. Test all authentication flows
2. Verify API endpoints are accessible
3. Test barcode scanning functionality
4. Generate a test report
5. Monitor error logs
6. Check performance metrics

## Troubleshooting Deployment

### Frontend Issues
- Check build logs in Vercel
- Verify environment variables
- Clear cache and rebuild

### Backend Issues
- Check application logs
- Verify MongoDB connection
- Test API endpoints manually
- Check server status

### MongoDB Issues
- Verify connection string
- Check IP whitelist
- Monitor database resources
- Check for connection pool limits

## Rollback Procedure

### Vercel
1. Go to Deployments
2. Click the previous version
3. Click "Promote to Production"

### Railway/Render
1. Go to Deployment History
2. Select previous version
3. Redeploy

## Continuous Improvement

1. Monitor performance metrics
2. Gather user feedback
3. Plan feature updates
4. Regular security audits
5. Keep dependencies updated
