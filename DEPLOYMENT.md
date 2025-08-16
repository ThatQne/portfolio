# Deployment Guide

## Setup Instructions

### 1. Update Configuration
Before deploying, update these files with your actual GitHub information:

**vite.config.ts:**
```typescript
base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
```

**package.json:**
```json
"homepage": "https://your-username.github.io/your-repo-name"
```

Replace:
- `your-username` with your GitHub username
- `your-repo-name` with your repository name

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **gh-pages** branch
6. Click **Save**

## Deployment Commands

### Manual Deployment
```bash
npm run publish
```
This will:
- Build your project
- Deploy to GitHub Pages
- Show you the deployment URL

### Individual Steps
```bash
# Build only
npm run build

# Deploy only (after building)
npm run deploy
```

### Automatic Deployment
The GitHub Actions workflow will automatically deploy when you push to the main branch.

## Troubleshooting

### Common Issues:
1. **404 Error**: Make sure the `base` path in `vite.config.ts` matches your repository name
2. **Assets not loading**: Check that the homepage URL in `package.json` is correct
3. **Build fails**: Run `npm run build` locally first to check for errors

### Manual GitHub Pages Setup:
If automatic deployment doesn't work:
1. Run `npm run build` locally
2. Push the `dist` folder contents to the `gh-pages` branch manually
3. Enable GitHub Pages from the repository settings

## URLs
- **Development**: http://localhost:5173
- **Production**: https://your-username.github.io/your-repo-name