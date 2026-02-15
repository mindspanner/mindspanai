# ✅ MindspanAI v2.0 Deployment Checklist

**Version**: 2.0.0  
**Build**: 20250215-0800  
**Status**: Ready to Deploy

---

## 📦 Pre-Deployment (One-Time Setup)

### API Keys & Services (15 minutes)

- [ ] **OpenRouter Account**
  - [ ] Sign up: https://openrouter.ai/keys
  - [ ] Copy API key (starts with `sk-or-v1-`)
  - [ ] Verify free tier active
  - [ ] Save key securely

- [ ] **Supabase Account**
  - [ ] Sign up: https://supabase.com/dashboard
  - [ ] Create new project (name: `mindspanai`)
  - [ ] Wait for project initialization (~2 min)
  - [ ] Project Settings → API → Copy:
    - [ ] Project URL
    - [ ] `anon` public key
    - [ ] `service_role` secret key
  - [ ] Save all keys securely

- [ ] **Vercel Account**
  - [ ] Sign up: https://vercel.com/signup
  - [ ] Connect GitHub account
  - [ ] Verify email
  - [ ] Install Vercel CLI: `npm install -g vercel`
  - [ ] Login: `vercel login`

### Database Setup (5 minutes)

- [ ] Open Supabase SQL Editor
- [ ] Paste contents of `supabase/schema.sql`
- [ ] Execute query
- [ ] Verify tables created:
  - [ ] `interactions`
  - [ ] `faq_candidates`
  - [ ] `daily_stats`
- [ ] Check RLS policies enabled

### Local Environment (5 minutes)

- [ ] Navigate to `~/Projects/mindspanai/`
- [ ] Copy v2.0 files from outputs
- [ ] Run: `cp .env.example .env.local`
- [ ] Edit `.env.local` with your keys:
  - [ ] `OPENROUTER_API_KEY=sk-or-v1-...`
  - [ ] `SUPABASE_URL=https://...supabase.co`
  - [ ] `SUPABASE_ANON_KEY=eyJh...`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY=eyJh...`
- [ ] Save file
- [ ] Verify `.env.local` in `.gitignore` (DO NOT COMMIT)

---

## 🧪 Local Testing (10 minutes)

- [ ] Install dependencies: `npm install`
- [ ] Start dev server: `vercel dev`
- [ ] Open browser: `http://localhost:3000`

### Test Cases:

- [ ] **UI Loads**
  - [ ] Header displays "AI-Powered" badge
  - [ ] 4 prompt cards visible
  - [ ] Chat input field present
  - [ ] Footer shows v2.0.0

- [ ] **Prompt Cards**
  - [ ] Click "Our Services" → AI responds
  - [ ] Click "Book Now" → AI responds with booking link
  - [ ] Click "Fees & Medicare" → AI responds with pricing
  - [ ] Click "First Visit" → AI responds with checklist

- [ ] **Natural Chat**
  - [ ] Type: "what services do you provide"
  - [ ] Verify typing indicator appears
  - [ ] Verify AI response (not keyword fallback)
  - [ ] Type follow-up: "tell me more about trauma therapy"
  - [ ] Verify context retained (references previous message)

- [ ] **Emergency Protocol**
  - [ ] Type: "I'm suicidal"
  - [ ] Verify emergency banner appears (red, pulsing)
  - [ ] Verify crisis contacts displayed (000, Lifeline, Beyond Blue)
  - [ ] Check console: `isEmergency: true` logged

- [ ] **Mobile View**
  - [ ] Resize browser to 375px wide (iPhone SE)
  - [ ] Verify prompt cards scroll horizontally
  - [ ] Verify chat bubbles readable
  - [ ] Verify input field not hidden by keyboard
  - [ ] Verify touch targets ≥44px

- [ ] **Analytics**
  - [ ] Open browser console (F12)
  - [ ] Check `localStorage` → `mindspanai_logs` exists
  - [ ] Verify log structure: timestamp, message, sessionId
  - [ ] Open Supabase → Table Editor → `interactions`
  - [ ] Verify row inserted for your test message

- [ ] **Error Handling**
  - [ ] Edit `.env.local` → Set `OPENROUTER_API_KEY=invalid`
  - [ ] Restart dev server
  - [ ] Send message
  - [ ] Verify fallback: "AI temporarily unavailable" + contact info
  - [ ] Restore correct API key

---

## 🚀 Production Deployment (10 minutes)

### Git Commit & Push

- [ ] Stop dev server (Ctrl+C)
- [ ] Review changes: `git status`
- [ ] Stage all files: `git add .`
- [ ] Verify `.env.local` NOT staged (should be in `.gitignore`)
- [ ] Commit: `git commit -m "v2.0: AI-powered upgrade"`
- [ ] Create v2.0 branch (optional): `git checkout -b v2.0`
- [ ] Push: `git push origin v2.0` (or `main`)

### Vercel Deployment

**Option A: Using deploy script (recommended)**
```bash
chmod +x deploy-v2.sh
./deploy-v2.sh
```

**Option B: Manual commands**
```bash
# First deployment
vercel

# Add environment variables (production)
vercel env add OPENROUTER_API_KEY production
vercel env add SUPABASE_URL production
vercel env add SUPABASE_ANON_KEY production

# Deploy to production
vercel --prod
```

### Post-Deployment Verification

- [ ] Copy deployment URL (e.g., `https://mindspanai-abc123.vercel.app`)
- [ ] Open URL in browser
- [ ] Re-run all test cases from Local Testing section
- [ ] Verify analytics logging to Supabase (not just localStorage)
- [ ] Check Vercel function logs: Vercel Dashboard → Functions → Logs
- [ ] Verify no errors in Vercel logs

---

## 🔗 Update Live Site (5 minutes)

### SquareSpace Integration

- [ ] Log into mindspan.com.au admin
- [ ] Navigate to page: `/agent`
- [ ] Edit Code Block
- [ ] Replace iframe `src` with Vercel URL:
```html
<iframe 
    src="https://mindspanai-abc123.vercel.app/" 
    width="100%" 
    height="900px" 
    frameborder="0"
    style="border: none; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
    title="MindspanAI - AI Assistant"
></iframe>
```
- [ ] Save
- [ ] **Publish**
- [ ] Visit mindspan.com.au/agent in incognito window
- [ ] Verify v2.0 loads (check footer: "v2.0.0")

**OR** keep GitHub Pages (push v2.0 to main):
- [ ] `git checkout main`
- [ ] `git merge v2.0`
- [ ] `git push origin main`
- [ ] Wait 2 minutes for GitHub Pages rebuild
- [ ] Visit mindspan.com.au/agent (iframe still points to GitHub Pages)
- [ ] Verify v2.0 loads

---

## 📊 Post-Launch Monitoring (First 24 Hours)

### Immediately After Launch (0-1 hour)

- [ ] Send 5 test messages from different devices
- [ ] Verify all responses are AI-generated (not fallback)
- [ ] Check Supabase → `interactions` table → Verify 5+ rows
- [ ] Check Vercel → Functions → Logs → Verify no errors
- [ ] Test emergency keyword → Verify logging

### After 6 Hours

- [ ] Export analytics:
```sql
SELECT COUNT(*) as total_interactions,
       COUNT(DISTINCT session_id) as unique_users,
       COUNT(*) FILTER (WHERE is_emergency = true) as emergencies
FROM interactions
WHERE timestamp > NOW() - INTERVAL '6 hours';
```
- [ ] Review top queries:
```sql
SELECT user_message, COUNT(*) as frequency
FROM interactions
WHERE timestamp > NOW() - INTERVAL '6 hours'
GROUP BY user_message
ORDER BY frequency DESC
LIMIT 10;
```
- [ ] Check OpenRouter usage: https://openrouter.ai/activity
- [ ] Verify cost still $0 (free tier)

### After 24 Hours

- [ ] Run full analytics review
- [ ] Export FAQ candidates:
```sql
SELECT * FROM faq_candidates
WHERE status = 'pending_review'
ORDER BY frequency DESC;
```
- [ ] Identify any repeat failures (API errors)
- [ ] Check Vercel bandwidth usage (should be <1GB)
- [ ] Review Supabase database size (should be <10MB)

---

## 🔄 Rollback Procedure (If Issues)

### Emergency Rollback (1 minute)

**If v2.0 breaks production:**

1. **Vercel Dashboard Rollback**
   - [ ] Go to: https://vercel.com/dashboard
   - [ ] Select `mindspanai` project
   - [ ] Click "Deployments" tab
   - [ ] Find last v1.0 deployment (look for older date)
   - [ ] Click "..." menu → **Promote to Production**
   - [ ] Confirm
   - [ ] Wait 30 seconds
   - [ ] Test: Visit deployment URL → Should show v1.0

2. **SquareSpace Rollback (if using Vercel URL)**
   - [ ] Change iframe `src` back to GitHub Pages:
   ```html
   <iframe src="https://mindspanner.github.io/mindspanai/" ...></iframe>
   ```
   - [ ] Save & Publish
   - [ ] Test: Visit mindspan.com.au/agent → v1.0 loads

### Git Rollback (5 minutes)

**If you want to revert code:**

```bash
# Find v1.0 commit
git log --oneline | grep "v1.0"

# Revert to that commit
git revert <commit-hash>

# Push
git push origin main
```

---

## ✅ Success Criteria

v2.0 deployment is successful when:

- [x] **UI**: Compact mobile design, AI branding visible
- [x] **AI**: All responses generated by OpenRouter (not keyword fallback)
- [x] **Context**: Follow-up questions reference previous messages
- [x] **Analytics**: Supabase logging 100% of interactions
- [x] **Emergency**: Crisis protocol triggers correctly
- [x] **Mobile**: All features work on iPhone/Android
- [x] **Desktop**: All features work Chrome/Safari/Firefox
- [x] **Cost**: Vercel + OpenRouter + Supabase = $0 (free tiers)
- [x] **Errors**: No 500 errors in Vercel function logs
- [x] **Speed**: AI responses <3 seconds (95th percentile)

---

## 📞 Support Resources

**If deployment fails:**

1. **Check UPGRADE-GUIDE.md** Troubleshooting section
2. **Vercel Logs**: https://vercel.com/dashboard → Functions → Logs
3. **Supabase Logs**: https://supabase.com/dashboard → Logs
4. **OpenRouter Status**: https://openrouter.ai/status
5. **Continue Claude conversation** for debugging help

**Common Issues & Quick Fixes:**

| Issue | Fix |
|-------|-----|
| "AI temporarily unavailable" | Check `OPENROUTER_API_KEY` in Vercel env vars |
| Analytics not logging | Verify Supabase RLS policies allow insert |
| Slow responses (>5s) | Switch to faster model (Gemini Flash) |
| Deployment fails | Run `npm install` → `vercel --prod` |
| 404 on API routes | Verify `vercel.json` committed |

---

## 🎉 Completion

**When all checkboxes above are ticked:**

✅ **v2.0 is LIVE and fully operational**

**Next Steps**:
1. Monitor analytics daily (first week)
2. Review FAQ candidates weekly
3. Plan v2.1 features (admin dashboard, etc.)
4. Consider upgrading AI model if free tier insufficient

---

**Deployed by**: _________________  
**Date**: _________________  
**Deployment URL**: _________________  
**Vercel Project**: _________________  
**Supabase Project**: _________________
