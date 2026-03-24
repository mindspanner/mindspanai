# MindspanAI - Intelligence Enhancement Roadmap

**Project**: MindspanAI Agent  
**Current Status**: ✅ Live with AI (GPT-3.5 Turbo via OpenRouter)  
**Next Phase**: Intelligence Improvement Plan  
**Created**: 2026-03-24

---

## 📋 Current AI State

### ✅ What's Working
- **Model**: GPT-3.5 Turbo (via OpenRouter)
- **Knowledge Base**: ~2,500 token comprehensive knowledge about Ilker Abak and Mindspan services
- **Fallback**: Gemini free tier → OpenRouter → Keyword matching
- **System Prompt**: Defines warm, helpful, psychology-informed personality
- **Context Window**: 4,096 tokens (~3,000 words per conversation)
- **Response Length**: Max 300 tokens (~225 words)

### 🔍 Current Intelligence Level
- ✅ Can answer questions about Mindspan services
- ✅ Can discuss Ilker's qualifications and therapy approaches
- ✅ Emergency keyword detection (suicide, crisis, self-harm)
- ✅ Can handle booking inquiries
- ⚠️ Limited contextual understanding
- ⚠️ No learning from conversation history

---

## 🎯 Intelligence Enhancement Plan

### Phase 1: Baseline Optimization (Low Intelligence → Better Responses)
- [ ] **Expand Knowledge Base**
  - Add FAQs about therapy process
  - Add pricing information
  - Add common client questions
  - Add success stories/testimonials

- [ ] **Improve System Prompt**
  - Add tone guidance (empathetic but professional)
  - Add conversation flow rules
  - Add boundary setting guidelines
  - Add escalation procedures

- [ ] **Add Conversation Context**
  - Store conversation history in session
  - Use previous messages to inform responses
  - Track user intent across turns
  - Maintain context window across messages

### Phase 2: Intelligence Improvements (Smart Responses)
- [ ] **Response Quality**
  - Increase temperature for natural language
  - Fine-tune max_tokens based on question type
  - Add response validation/filtering
  - Implement confidence scoring

- [ ] **Understanding**
  - Add intent recognition (booking vs. info vs. emergency)
  - Classify user emotional state
  - Detect follow-up questions
  - Recognize unclear queries and ask for clarification

- [ ] **Knowledge Enhancement**
  - Web scraping of mindspan.com.au content
  - Automatic knowledge base updates
  - Add FAQ feedback loop
  - Track common unanswered questions

### Phase 3: Advanced Intelligence (Smart Agent)
- [ ] **Multi-turn Conversations**
  - Session memory (store user name, preferences)
  - Context carryover across conversations
  - Conversational flow optimization
  - User profiling

- [ ] **Analytics & Learning**
  - Track question types and success rate
  - Monitor user satisfaction
  - Identify knowledge gaps
  - A/B test system prompts

- [ ] **Integration**
  - Connect to booking system
  - Send leads to email
  - Schedule follow-ups
  - Integrate with Supabase for persistence

---

## 🔧 Technical Tasks

### Immediate (This Sprint)
- [ ] Review chat.js knowledge base completeness
- [ ] Test AI responses for accuracy
- [ ] Verify API integration (OpenRouter keys)
- [ ] Check fallback chain (Gemini → OpenRouter → Keywords)
- [ ] Monitor API costs

### Short-term (Next 2 weeks)
- [ ] Add FAQ section to knowledge base
- [ ] Implement conversation history storage
- [ ] Add user intent classification
- [ ] Create response quality metrics
- [ ] Set up logging for debugging

### Medium-term (Next month)
- [ ] Web scrape mindspan.com.au for dynamic knowledge
- [ ] Implement session persistence (Supabase)
- [ ] Add booking form integration
- [ ] Create admin dashboard to review conversations
- [ ] Set up analytics dashboard

---

## 📊 Success Metrics

- **Response Quality**: % of helpful responses (target: 80%+)
- **User Satisfaction**: Post-chat rating (target: 4.5+/5)
- **Coverage**: % of questions answered (target: 90%+)
- **Cost**: Keep per-response cost < $0.01
- **Latency**: Keep response time < 2 seconds

---

## 🚀 Current Configuration

### API Keys & Setup
- **OpenRouter API**: Configured ✅
- **Gemini Free Tier**: Configured ✅
- **Vercel Env Vars**: OPENROUTER_API_KEY set ✅
- **Knowledge Base**: Located in /api/chat.js ✅

### Files to Update
- `/api/chat.js` - Main AI logic
- `/index.html` - Frontend UI
- `/public/index.html` - Deployed version
- AI-MODEL-SPECS.md - Documentation

---

## 📝 Notes

- Start with Phase 1 (low intelligence improvements)
- Each phase builds on previous
- Test thoroughly before deploying
- Monitor API costs (crucial for sustainability)
- Get user feedback early and often
- Document any changes to system prompt

---

**Next Action**: Review knowledge base and identify gaps
