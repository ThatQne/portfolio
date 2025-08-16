#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting deployment process...');

try {
  // Check if we're in a git repository
  execSync('git status', { stdio: 'ignore' });
  
  // Check if we have a remote origin
  try {
    execSync('git remote get-url origin', { stdio: 'ignore' });
  } catch (remoteError) {
    console.log('⚠️  No git remote origin found.');
    console.log('📋 To set up deployment:');
    console.log('1. Create a repository on GitHub');
    console.log('2. Run: git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git');
    console.log('3. Run: git push -u origin main');
    console.log('4. Then run: npm run publish');
    process.exit(1);
  }
  
  // Check if there are any changes to commit
  try {
    execSync('git diff --quiet && git diff --cached --quiet', { stdio: 'ignore' });
    console.log('📝 No changes to commit, proceeding with deployment...');
  } catch (changesError) {
    // There are changes, let's commit them
    console.log('📝 Committing changes...');
    execSync('git add .', { stdio: 'inherit' });
    
    // Get current timestamp for commit message
    const timestamp = new Date().toLocaleString();
    execSync(`git commit -m "Update portfolio - ${timestamp}"`, { stdio: 'inherit' });
    
    console.log('⬆️  Pushing changes to main branch...');
    execSync('git push origin main', { stdio: 'inherit' });
  }
  
  // Build the project
  console.log('📦 Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Deploy to gh-pages
  console.log('🌐 Deploying to GitHub Pages...');
  execSync('npm run deploy', { stdio: 'inherit' });
  
  console.log('✅ Deployment successful!');
  console.log('🔗 Your site will be available at your GitHub Pages URL');
  console.log('📋 What happened:');
  console.log('   1. ✅ Committed and pushed your changes to main branch');
  console.log('   2. ✅ Built your project');
  console.log('   3. ✅ Deployed to GitHub Pages');
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}