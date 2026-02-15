# 🗄️ Supabase Database Setup (Optional - 2 minutes)

The analytics database is **optional** but recommended for tracking conversations and detecting patterns.

---

## Quick Setup:

### 1. Open Supabase SQL Editor
Visit: **https://supabase.com/dashboard/project/fwhukkbknkoalwerhhbm/sql**

### 2. Click "New Query"

### 3. Copy-Paste This SQL:

Open the file: `supabase/schema.sql` in your project folder

OR copy from below:

```sql
-- Supabase Schema for MindspanAI v2.0

-- Table: interactions
CREATE TABLE IF NOT EXISTS interactions (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    timestamp TIMESTAMPTZ NOT NULL,
    session_id TEXT NOT NULL,
    user_message TEXT NOT NULL,
    response_preview TEXT,
    is_emergency BOOLEAN DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_timestamp ON interactions (timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_session ON interactions (session_id);
CREATE INDEX IF NOT EXISTS idx_emergency ON interactions (is_emergency) WHERE is_emergency = TRUE;

-- Enable Row Level Security
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;

-- Allow API to insert
CREATE POLICY IF NOT EXISTS "Allow anon inserts" ON interactions
    FOR INSERT TO anon WITH CHECK (true);

-- Allow authenticated reads
CREATE POLICY IF NOT EXISTS "Allow authenticated reads" ON interactions
    FOR SELECT TO authenticated USING (true);

-- Emergency interactions view
CREATE OR REPLACE VIEW emergency_interactions AS
SELECT id, timestamp, session_id, user_message, created_at
FROM interactions
WHERE is_emergency = TRUE
ORDER BY timestamp DESC;

-- Daily stats view
CREATE OR REPLACE VIEW daily_stats AS
SELECT
    DATE(timestamp) as date,
    COUNT(*) as total_interactions,
    COUNT(DISTINCT session_id) as unique_sessions,
    SUM(CASE WHEN is_emergency THEN 1 ELSE 0 END) as emergency_count
FROM interactions
GROUP BY DATE(timestamp)
ORDER BY date DESC;
```

### 4. Click "Run" (or press Ctrl/Cmd + Enter)

You should see: ✅ **Success. No rows returned**

---

## What This Creates:

### Tables:
- **`interactions`** - Logs all conversations
  - Session ID
  - User message (first 200 chars)
  - Response preview
  - Emergency flag
  - Timestamp

### Views (for easy querying):
- **`emergency_interactions`** - Quick access to crisis situations
- **`daily_stats`** - Aggregated daily metrics

---

## View Your Analytics:

### Table Editor (Visual):
Visit: **https://supabase.com/dashboard/project/fwhukkbknkoalwerhhbm/editor**

Click on:
- `interactions` - See all conversations
- `emergency_interactions` - See crisis detections
- `daily_stats` - See daily aggregates

### SQL Queries:

```sql
-- Recent conversations (last 24 hours)
SELECT * FROM interactions
WHERE timestamp > NOW() - INTERVAL '24 hours'
ORDER BY timestamp DESC;

-- This week's stats
SELECT * FROM daily_stats
WHERE date > CURRENT_DATE - 7
ORDER BY date DESC;

-- Emergency interactions
SELECT * FROM emergency_interactions
ORDER BY timestamp DESC;

-- Most common questions this month
SELECT
    LEFT(user_message, 100) as question,
    COUNT(*) as frequency
FROM interactions
WHERE timestamp > NOW() - INTERVAL '30 days'
GROUP BY LEFT(user_message, 100)
ORDER BY frequency DESC
LIMIT 20;
```

---

## What Gets Logged:

### ✅ Logged:
- User messages (anonymized, truncated)
- Response categories
- Session IDs (random UUIDs)
- Timestamps
- Emergency detections

### ❌ NOT Logged:
- Names, DOB, addresses
- Medical information
- Email addresses
- Phone numbers
- IP addresses
- Full message content (only first 200 chars)

**Privacy compliant** - no PII collected!

---

## If You Skip This:

**The AI will still work perfectly!**

You just won't have:
- Conversation logs
- Analytics dashboard
- Emergency interaction tracking
- Usage statistics

The app gracefully handles missing Supabase - it just won't log anything.

---

**To set up later**: Just run the SQL above anytime!
