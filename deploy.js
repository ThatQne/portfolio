#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment process...');

try {
  // Check if we're in a git repository
  execSync('git status', { stdio: 'ignore' });
  
  // Build the project
  console.log('📦 Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Deploy to gh-pages
  console.log('🌐 Deploying to GitHub Pages...');
  execSync('npm run deploy', { stdio: 'inherit' });
  
  console.log('✅ Deployment successful!');
  console.log('🔗 Your site will be available at: https://your-username.github.io/your-repo-name');
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}