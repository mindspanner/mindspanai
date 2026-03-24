# 🧠 MindspanAI v2.0
**AI-Powered Administrative Assistant**

**Live**: [mindspan.com.au/agent](https://mindspan.com.au/agent)  
**Version**: 2.0.0 | **Build**: 20250214-2000

---

## 🎯 What's New

### v2.0 Upgrades from v1.0
✅ **True AI responses** – GPT-3.5-turbo via OpenRouter  
✅ **Compact mobile UI** – Optimized for small screens  
✅ **Conversational design** – Typing indicators, chat bubbles  
✅ **Persistent analytics** – Supabase PostgreSQL database  
✅ **Serverless backend** – Vercel Edge Functions  
✅ **Graceful fallback** – Works even if API fails

**Cost**: $0-5/month (vs v1.0: $0)

---

## 🚀 Quick Deploy

### Prerequisites
- OpenRouter API key: https://openrouter.ai/keys (free tier)
- Supabase project: https://supabase.com (optional)
- Vercel account: https://vercel.com (free)

### Deploy Steps
```bash
# 1. Clone repo
git clone https://github.com/mindspanner/mindspanai.git
cd mindspanai

# 2. Set environment variables
cp .env.example .env
# Edit .env with your API keys

# 3. Deploy
npm install -g vercel
vercel --prod

# Done! Live in ~60 seconds
```

**Full guide**: [V2-UPGRADE-GUIDE.md](V2-UPGRADE-GUIDE.md)

---

## 📦 Structure

```
/
├── index.html          # Compact mobile UI
├── app.js              # Client logic
├── api/
│   ├── chat.js        # AI endpoint
│   └── analytics.js   # Logging
└── supabase/
    └── schema.sql     # Database
```

---

## 📊 Analytics (Supabase)

```sql
-- Daily stats
SELECT * FROM daily_stats;

-- Emergency triggers
SELECT * FROM emergency_interactions;

-- Unmatched queries
SELECT * FROM get_unmatched_queries();
```

---

## 🔧 Local Dev

```bash
vercel dev
# Visit http://localhost:3000
```

---

## 📞 Support

**Deployment issues**: Continue Claude conversation  
**Questions**: [V2-UPGRADE-GUIDE.md](V2-UPGRADE-GUIDE.md)

---

**License**: Proprietary | **Owner**: Mindspan Psychology Pty Ltd
