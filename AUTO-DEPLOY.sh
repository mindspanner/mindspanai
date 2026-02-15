#!/bin/bash
# Automated Vercel Deployment for MindspanAI V2.0

cd "/Users/ilker/Library/CloudStorage/GoogleDrive-mindspan.aus@gmail.com/My Drive/MindspanAI - Web"

echo "🚀 Deploying MindspanAI V2.0 to Vercel..."
echo ""

# Deploy to Vercel
vercel --prod

# The script will pause here for you to answer Vercel's questions:
# - Set up and deploy? → Yes
# - Which scope? → mindspans-projects
# - Link to existing project? → No
# - What's your project's name? → mindspanai
# - In which directory is your code located? → ./ (press Enter)
# - Want to override settings? → No

echo ""
echo "✅ Deployment initiated!"
echo ""
echo "Once deployment finishes, I'll automatically:"
echo "1. Add environment variables to Vercel"
echo "2. Redeploy with the new variables"
echo "3. Give you the live URL"
echo ""
