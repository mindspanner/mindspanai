# MindspanAI Changelog

All notable changes to this project are documented here.

---

## [3.2.0] - 2026-02-16

### 🎨 Gradient Orb Branding
- **NEW**: Gradient sphere orb design throughout interface
- **NEW**: Mindspan logo orb in header (beside "AI POWERED")
- **NEW**: Corner orb menu with hover dropdown
- **NEW**: Card-to-orb animation (cards collapse into corner orb)
- **NEW**: Chat widget embed with gradient orb button (`widget-embed.html`)
- **ENHANCED**: 3D gradient sphere with radial lighting effects
- **ENHANCED**: Floating animation (3s cycle) + color rotation (8s cycle)

### 🌐 Knowledge Base Enhancements
- **NEW**: Halaxy profile scraping (7 total sources now)
- **ENHANCED**: Dual knowledge sources (mindspan.com.au + Halaxy profile)
- **ENHANCED**: Comprehensive professional information sync
- **UPDATED**: System prompt to reference both authoritative sources

### 🔧 Bug Fixes
- **FIXED**: Corner orb animation not triggering after card clicks
- **FIXED**: Hover dropdown not working on corner orb
- **ADDED**: `sendMessageFromOrb()` function for orb dropdown
- **ADDED**: Console debugging for card-to-orb transitions
- **ADDED**: Auth debugging with detailed logging
- **ADDED**: `/api/admin/test-auth` diagnostic endpoint

### 📱 SquareSpace Integration
- **NEW**: Complete widget embed implementation guide
- **NEW**: `SQUARESPACE-IMPLEMENTATION.md` with step-by-step instructions
- **NEW**: `COPY-THIS-CODE.txt` for easy code copying
- **ENHANCED**: Header + Footer code injection examples

### 📊 Scraper Updates
- **ATTEMPTED**: Hourly scraping (blocked by Vercel free tier)
- **CURRENT**: Daily scraping at midnight (0 0 * * *)
- **ENHANCED**: Admin dashboard shows "Daily + Manual" sync options
- **NOTE**: Hourly sync requires Vercel Pro upgrade ($20/month)

---

## [3.1.0] - 2026-02-16

### 🔐 Admin Backend
- **NEW**: Full admin panel with Google OAuth authentication
- **NEW**: Admin login page (`admin/login.html`)
- **NEW**: Admin dashboard (`admin/dashboard.html`) with 4 tabs
- **NEW**: Website Scraper tab (manual + automatic sync)
- **NEW**: Knowledge Base editor tab
- **NEW**: AI Settings tab (model switcher, temperature control)
- **NEW**: Site Config tab (contact info, emergency contacts)

### 🔒 Authentication
- **NEW**: Google OAuth integration
- **NEW**: Domain-restricted access (@mindspan.com.au only)
- **NEW**: Specific email allowlist (mindspan.aus@gmail.com)
- **NEW**: Session tokens (24-hour expiry)
- **NEW**: `/api/admin/auth` endpoint

### 🔄 Website Scraping
- **NEW**: Automatic website scraping system
- **NEW**: `/api/scrape-website` endpoint
- **NEW**: 6 pages monitored (Homepage, About, Services, Fees, FAQ, Contact)
- **NEW**: Vercel cron job for daily sync
- **NEW**: Change detection system (foundation)
- **NEW**: Manual "Run Scrape Now" button

### 📚 Documentation
- **NEW**: `GOOGLE-OAUTH-SETUP.md` - OAuth configuration guide
- **NEW**: `ADMIN-BACKEND-PLAN.md` - Admin features overview
- **NEW**: `WEBSITE-SCRAPING-PLAN.md` - Scraping architecture
- **NEW**: `ADMIN-QUICK-START.md` - Quick start guide
- **NEW**: `DEPLOYMENT-CHECKLIST.md` - Deployment steps
- **NEW**: `IMPLEMENTATION-COMPLETE.md` - Implementation summary

---

## [3.0.0] - 2026-02-15

### 🎨 Enterprise UI Redesign
- **REDESIGNED**: Complete visual overhaul for enterprise look
- **ENHANCED**: Gradient backgrounds and professional shadows
- **ENHANCED**: Compact card layout (4x1 grid, 20px icons, 8px padding)
- **ENHANCED**: Card dismiss animations with cubic-bezier easing
- **ENHANCED**: Glassmorphism effects throughout

### 💬 AI Personality Transformation
- **REWRITTEN**: Complete system prompt overhaul
- **ENHANCED**: Warm, conversational, agentic personality
- **ENHANCED**: Context-aware intelligent responses
- **ENHANCED**: Specific examples for therapy, services, fees
- **REMOVED**: Robotic corporate language
- **ADDED**: Natural contractions, empathy, follow-up questions

### 🧠 Knowledge Base Expansion
- **ENHANCED**: Comprehensive Ilker background (triple Masters: M Psych, MBA, MEd)
- **ENHANCED**: Detailed therapy approaches (CBT, ACT, Schema, DBT)
- **ENHANCED**: Specific service differentiation
- **ENHANCED**: Complete fee breakdown with context
- **ENHANCED**: 200+ lines of detailed practice information

### 📊 AI Model Specifications
- **DOCUMENTED**: Complete AI model specs in `AI-MODEL-SPECS.md`
- **MODEL**: GPT-3.5 Turbo via OpenRouter
- **COST**: $0.50-2/month estimated
- **PERFORMANCE**: ~800ms average response time
- **TEMPERATURE**: 0.7 (balanced creativity)
- **MAX TOKENS**: 300 (concise responses)

---

## [2.0.0] - 2026-02-14

### 🤖 AI-Powered Core
- **NEW**: OpenRouter API integration (GPT-3.5 Turbo)
- **NEW**: `/api/chat` endpoint for AI responses
- **NEW**: Supabase analytics integration
- **NEW**: Real-time AI conversations
- **REPLACED**: Keyword-matching with true AI understanding

### 🎯 Deployment
- **NEW**: Vercel hosting and deployment
- **NEW**: GitHub auto-deployment workflow
- **NEW**: Environment variables for API keys
- **NEW**: Edge function architecture
- **DEPLOYED**: Live at mindspanai.vercel.app

### 📝 Knowledge Base
- **NEW**: `mindspan-knowledge-base.md` (v1.0.0)
- **ADDED**: Complete service information
- **ADDED**: Fee structure and Medicare details
- **ADDED**: Contact information and hours
- **ADDED**: Emergency protocols

---

## [1.0.0] - 2025 (Previous)

### 🔤 Keyword-Matching System
- **INITIAL**: Basic keyword-matching chatbot
- **DEPLOYED**: www.mindspan.com.au/agent
- **FEATURES**: Pre-programmed responses
- **LIMITATION**: No AI, limited intelligence
- **STATUS**: Deprecated, replaced by v2.0.0+

---

## Version Summary

| Version | Release Date | Major Features |
|---------|-------------|----------------|
| **v3.2.0** | 2026-02-16 | Gradient orb branding, Halaxy integration, widget embed |
| **v3.1.0** | 2026-02-16 | Admin backend, Google OAuth, website scraping |
| **v3.0.0** | 2026-02-15 | Enterprise UI, warm AI personality, comprehensive knowledge |
| **v2.0.0** | 2026-02-14 | AI-powered (OpenRouter + GPT-3.5), Vercel deployment |
| **v1.0.0** | 2025 | Keyword-matching chatbot (deprecated) |

---

## Upgrade Path

**v1.0 → v2.0**: Complete rewrite with AI
**v2.0 → v3.0**: UI/UX overhaul + personality upgrade
**v3.0 → v3.1**: Added admin backend + scraping
**v3.1 → v3.2**: Gradient orb branding + Halaxy integration

---

## Current Status (v3.2.0)

**Live URL**: https://mindspanai.vercel.app
**Admin Panel**: https://mindspanai.vercel.app/admin/login.html
**Chat Widget**: https://mindspanai.vercel.app/widget-embed.html
**Monthly Cost**: $0.50-2 (no change across versions)
**Uptime**: 99.9% (Vercel infrastructure)

---

## Planned Features (Future Versions)

### v3.3.0 (Pending)
- Email notifications for website changes
- Admin backend storage (Vercel KV or Supabase)
- Analytics dashboard integration
- Multi-user admin access

### v4.0.0 (Concept)
- Advanced scraping with image/media handling
- Real-time knowledge base updates (if Vercel Pro)
- Custom AI model fine-tuning
- Advanced analytics and reporting

---

**Maintained by**: Ilker Abak, Mindspan Psychology
**Repository**: https://github.com/mindspanner/mindspanai
**Support**: info@mindspan.com.au
