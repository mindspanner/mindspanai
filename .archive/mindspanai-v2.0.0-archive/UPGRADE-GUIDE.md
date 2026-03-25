# 🚀 MindspanAI v1.0 → v2.0 Upgrade Guide

**Current**: v1.0 (keyword-matching, zero-cost)  
**Target**: v2.0 (AI-powered, $0-5/month)  
**Migration Time**: 30 minutes  
**Downtime**: Zero (parallel deployment strategy)

---

## ✨ What's New in v2.0

### UI Improvements
✅ **Compact mobile design** – 40% less vertical space, better for phones  
✅ **Conversational AI branding** – Clear "AI-Powered" badge, typing indicators  
✅ **Improved chat bubbles** – Modern messenger-style design  
✅ **Auto-resizing input** – Textarea grows with message length  
✅ **Better touch targets** – 44px minimum (Apple HIG compliant)

### Backend Upgrades
✅ **True AI responses** – OpenRouter API with Llama 3.2 (free tier)  
✅ **Context awareness** – Remembers last 3 exchanges per session  
✅ **Persistent analytics** – Supabase PostgreSQL database  
✅ **Dynamic FAQ learning** – Suggests new FAQs based on usage  
✅ **Rate limiting ready** – Upstash Redis integration (optional)

### Developer Experience
✅ **Vercel auto-deploy** – Git push = live in 30 seconds  
✅ **Environment variables** – Secure API key management  
✅ **Instant rollback** – One-click via Vercel dashboard  
✅ **Error monitoring** – Graceful fallbacks, Sentry-ready

---

## 📋 Prerequisites

### 1. Sign Up for Free Services (5 min)

**OpenRouter** (AI Provider):
1. Go to https://openrouter.ai/keys
2. Sign up (GitHub/Google/Email)
3. Copy API key (starts with `sk-or-v1-`)
4. Cost: **$0/month** (free tier)

**Supabase** (Database):
1. Go to https://supabase.com/dashboard
2. Create new project (free tier)
3. Project Settings → API → Copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key (for backend only)
4. Cost: **$0/month** (500MB database free)

**Vercel** (Hosting):
1. Go to https://vercel.com/signup
2. Sign up with GitHub
3. Cost: **$0/month** (100GB bandwidth free)

### 2. Install Vercel CLI (Mac)

```bash
# Install via Homebrew
brew install vercel-cli

# Or via npm
npm install -g vercel

# Login
vercel login
```

---

## 🔧 Step-by-Step Migration

### Step 1: Clone v2.0 Files Locally

```bash
# Navigate to your repo
cd ~/Projects/mindspanai

# Pull latest (if you've already committed v1.0)
git pull origin main

# Create v2.0 branch
git checkout -b v2.0

# Copy v2.0 files (provided by Claude)
# - index.html (new UI)
# - api/chat.js (AI endpoint)
# - api/analytics.js (logging endpoint)
# - supabase/schema.sql (database schema)
# - package.json (dependencies)
# - vercel.json (deployment config)
# - .env.example (API keys template)
# - .gitignore (updated)
```

### Step 2: Set Up Supabase Database

```bash
# 1. Go to Supabase dashboard → SQL Editor
# 2. Paste contents of supabase/schema.sql
# 3. Run query
# 4. Verify tables created: interactions, faq_candidates, daily_stats
```

### Step 3: Configure Environment Variables

```bash
# Copy template
cp .env.example .env.local

# Edit .env.local with your actual keys
nano .env.local
```

Paste in your keys:
```env
OPENROUTER_API_KEY=sk-or-v1-your-actual-key
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**CRITICAL**: Never commit `.env.local` to Git (already in `.gitignore`)

### Step 4: Test Locally

```bash
# Install dependencies
npm install

# Start local dev server
vercel dev

# Open browser: http://localhost:3000
# Test:
# - Click prompt cards
# - Send a message
# - Check typing indicator appears
# - Verify AI response
# - Check browser console for errors
```

### Step 5: Deploy to Vercel

```bash
# First deployment (creates project)
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: mindspanai
# - Directory: ./
# - Override settings? No

# Add environment variables via CLI
vercel env add OPENROUTER_API_KEY
# Paste key when prompted

vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY

# Deploy to production
vercel --prod

# Output: https://mindspanai-xxx.vercel.app
```

### Step 6: Update GitHub Repo

```bash
# Commit v2.0 files
git add .
git commit -m "v2.0: AI-powered agent with Vercel + OpenRouter + Supabase"

# Push to v2.0 branch
git push origin v2.0

# Create pull request (review changes)
# Merge to main once tested

# Delete v2.0 branch (optional)
git checkout main
git branch -d v2.0
```

### Step 7: Update SquareSpace Embed

```html
<!-- OLD v1.0 iframe (GitHub Pages) -->
<iframe src="https://mindspanner.github.io/mindspanai/" ...></iframe>

<!-- NEW v2.0 iframe (Vercel) -->
<iframe 
    src="https://mindspanai-xxx.vercel.app/" 
    width="100%" 
    height="900px" 
    frameborder="0"
    style="border: none; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
    title="MindspanAI - AI Assistant"
></iframe>
```

**OR keep GitHub Pages** and push v2.0 to main:
```bash
# After merging v2.0 to main
git push origin main

# GitHub Pages will auto-update
# mindspanner.github.io/mindspanai now serves v2.0
```

---

## 🎛️ Configuration Options

### AI Model Selection (OpenRouter)

Edit `/api/chat.js` line 65:

```javascript
// FREE TIER OPTIONS:
model: 'meta-llama/llama-3.2-3b-instruct:free'  // Default (fast, good quality)
model: 'google/gemini-2.0-flash-thinking-exp:free'  // Google's latest (slower, better)
model: 'gryphe/mythomax-l2-13b:free'  // Creative responses

// PAID OPTIONS (~$0.50/1M tokens):
model: 'openai/gpt-3.5-turbo'  // OpenAI (best general quality)
model: 'anthropic/claude-3-haiku'  // Anthropic (concise, professional)
model: 'meta-llama/llama-3.1-8b-instruct'  // Llama 3.1 (balanced)
```

### Rate Limiting (Optional – Upstash Redis)

1. Sign up: https://upstash.com
2. Create Redis database (free tier)
3. Copy REST URL + Token
4. Add to `.env.local`:
```env
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

5. Uncomment rate limiting code in `/api/chat.js`

---

## 📊 Analytics Dashboard Access

### Viewing Analytics (SQL Queries)

```sql
-- Total interactions today
SELECT COUNT(*) FROM interactions 
WHERE DATE(timestamp) = CURRENT_DATE;

-- Top 10 questions this week
SELECT user_message, COUNT(*) as frequency
FROM interactions
WHERE timestamp > NOW() - INTERVAL '7 days'
GROUP BY user_message
ORDER BY frequency DESC
LIMIT 10;

-- Emergency triggers (last 30 days)
SELECT user_message, timestamp
FROM interactions
WHERE is_emergency = true
AND timestamp > NOW() - INTERVAL '30 days'
ORDER BY timestamp DESC;

-- FAQ candidates (most frequent unmatched queries)
SELECT question, frequency, last_seen
FROM faq_candidates
WHERE status = 'pending_review'
ORDER BY frequency DESC
LIMIT 20;
```

### Building Custom Admin Dashboard (Future)

See `admin-dashboard-spec.md` for Next.js + Supabase dashboard build guide.

---

## 🔄 Rollback Procedure (If Issues Arise)

### Option 1: Vercel Instant Rollback (1 minute)
1. Go to https://vercel.com/dashboard
2. Select `mindspanai` project
3. Go to Deployments
4. Find last working deployment (v1.0)
5. Click "..." → **Promote to Production**
6. Done. Live in ~30 seconds.

### Option 2: Git Rollback (5 minutes)
```bash
# Revert to v1.0 commit
git log --oneline  # Find v1.0 commit hash
git revert <commit-hash>
git push origin main

# GitHub Pages/Vercel auto-deploys v1.0
```

### Option 3: Emergency Fallback (SquareSpace)
```html
<!-- Revert iframe to v1.0 GitHub Pages URL -->
<iframe src="https://mindspanner.github.io/mindspanai/" ...></iframe>
```

---

## ✅ Post-Deployment Checklist

- [ ] Test all 4 prompt cards → AI responds
- [ ] Type custom question → AI responds with context
- [ ] Test emergency keyword ("I'm suicidal") → crisis banner appears
- [ ] Check Supabase dashboard → interactions table populated
- [ ] Mobile test (iPhone/Android) → UI compact, responsive
- [ ] Desktop test (Chrome, Safari, Firefox) → all features work
- [ ] Check Vercel dashboard → no errors in function logs
- [ ] Export analytics (Supabase SQL) → data looks correct
- [ ] Update SquareSpace iframe (if using Vercel URL)
- [ ] Notify team/stakeholders of upgrade

---

## 💰 Cost Tracking

### Month 1 (Expected):
- **OpenRouter**: $0 (free tier, ~500 queries)
- **Supabase**: $0 (database <100MB)
- **Vercel**: $0 (bandwidth <50GB)
- **Total**: **$0/month**

### Month 3 (If Popular – 2000+ queries/month):
- **OpenRouter**: ~$3-5 (paid tier)
- **Supabase**: $0 (still under 500MB)
- **Vercel**: $0 (still under 100GB)
- **Total**: **~$5/month**

### Scaling Thresholds:
- **5,000 queries/month**: ~$10-15/month
- **20,000 queries/month**: ~$30-50/month (consider batching, caching)

---

## 🆘 Troubleshooting

### Issue: "AI temporarily unavailable"
**Cause**: OpenRouter API key invalid or missing  
**Fix**: 
1. Check `.env.local` → OPENROUTER_API_KEY correct?
2. Verify key at https://openrouter.ai/keys
3. Redeploy: `vercel env add OPENROUTER_API_KEY` → `vercel --prod`

### Issue: Analytics not logging
**Cause**: Supabase credentials wrong or RLS blocking  
**Fix**:
1. Check `.env.local` → SUPABASE_URL and keys correct?
2. Supabase dashboard → Table Editor → Verify RLS policies
3. Check Vercel function logs for errors

### Issue: Slow responses (>5 seconds)
**Cause**: Free tier model overloaded or cold start  
**Fix**:
1. Switch to faster free model (Gemini Flash)
2. OR upgrade to paid tier (GPT-3.5-turbo ~$0.50/1M tokens)
3. Add loading text: "This may take a moment..."

### Issue: Deployment fails on Vercel
**Cause**: Missing `package.json` or `vercel.json`  
**Fix**:
1. Ensure all files committed to Git
2. Run `npm install` locally first
3. Re-run `vercel --prod`

---

## 🎓 Best Practices

### Security
✅ Never commit `.env.local` to Git  
✅ Use Vercel environment variables for production  
✅ Rotate API keys quarterly  
✅ Monitor Supabase RLS policies (prevent data leaks)

### Performance
✅ Keep conversation history to last 6 messages (3 exchanges)  
✅ Cache frequent queries (future: add Redis layer)  
✅ Monitor OpenRouter usage dashboard  
✅ Set max_tokens to 500 (prevents runaway costs)

### Analytics
✅ Review FAQ candidates weekly (approve/reject)  
✅ Export daily_stats monthly for trend analysis  
✅ Monitor emergency triggers (follow up if patterns emerge)  
✅ A/B test AI models (track user satisfaction)

---

## 📞 Support

**Technical Issues**: Continue this Claude conversation  
**API Issues**: OpenRouter Discord (https://discord.gg/openrouter)  
**Database Issues**: Supabase Discord (https://discord.supabase.com)  
**Deployment Issues**: Vercel Support (https://vercel.com/support)

---

**🎉 Congratulations! You're now running MindspanAI v2.0 with true AI capabilities.**

**Next Steps**:
1. Monitor analytics for 1 week
2. Review FAQ candidates
3. Adjust AI model if needed (quality vs cost)
4. Build admin dashboard (optional, see roadmap)
5. Plan v3.0 features (voice, multi-language, etc.)
