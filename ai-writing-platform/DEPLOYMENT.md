# Deployment Guide

## 🚀 Quick Deploy to Vercel (Recommended)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: NovaCode AI Writing Platform"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Click "Deploy"

Your app will be live in minutes!

## 🌐 Alternative Deployment Options

### Netlify
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Click "Deploy site"

### AWS Amplify
1. Push to GitHub
2. Go to AWS Amplify Console
3. Click "New app" → "Host web app"
4. Connect your repository
5. Build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
6. Click "Save and deploy"

### Manual Server Deployment
1. Build the application:
   ```bash
   npm run build
   npm run start
   ```
2. Use PM2 or similar process manager:
   ```bash
   npm install -g pm2
   pm2 start npm --name "ai-writing-platform" -- start
   pm2 startup
   pm2 save
   ```

## 🔧 Environment Variables

Create a `.env.local` file for local development:

```env
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# AI Service Configuration
AI_SERVICE_API_KEY=your_api_key_here

# Database Configuration (if using)
DATABASE_URL=your_database_url_here
```

For production, set these in your hosting platform's environment variables section.

## 📱 Custom Domain

### Vercel
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Netlify
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow DNS configuration instructions

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env.local` files
2. **API Keys**: Use environment variables for all sensitive data
3. **HTTPS**: Ensure your hosting platform provides SSL certificates
4. **CORS**: Configure CORS settings if needed for API calls

## 📊 Performance Optimization

1. **Build Optimization**:
   ```bash
   npm run build
   npm run start
   ```

2. **Image Optimization**: Use Next.js Image component for automatic optimization

3. **Code Splitting**: Next.js automatically handles code splitting

4. **Caching**: Implement proper caching headers for static assets

## 🚨 Troubleshooting

### Build Errors
- Check Node.js version (18+ required)
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Runtime Errors
- Check browser console for client-side errors
- Check server logs for server-side errors
- Verify environment variables are set correctly

### Performance Issues
- Use Lighthouse for performance auditing
- Implement lazy loading for components
- Optimize images and assets

## 📈 Monitoring

### Vercel Analytics
- Built-in performance monitoring
- Real-time analytics
- Error tracking

### Custom Monitoring
- Implement error tracking (Sentry, LogRocket)
- Performance monitoring (Web Vitals)
- User analytics (Google Analytics, Mixpanel)

## 🔄 Continuous Deployment

### GitHub Actions
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🎯 Production Checklist

- [ ] Environment variables configured
- [ ] Build successful
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Performance optimized
- [ ] Error monitoring active
- [ ] Analytics configured
- [ ] Backup strategy in place

## 📞 Support

For deployment issues:
1. Check the hosting platform's documentation
2. Review build logs for errors
3. Verify environment configuration
4. Contact platform support if needed

---

**Happy Deploying! 🚀**