-- Supabase Schema for MindspanAI v2.0
-- Run this in Supabase SQL Editor

-- Table: interactions
CREATE TABLE IF NOT EXISTS interactions (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    timestamp TIMESTAMPTZ NOT NULL,
    session_id TEXT NOT NULL,
    user_message TEXT NOT NULL,
    response_preview TEXT,
    is_emergency BOOLEAN DEFAULT FALSE,
    
    -- Indexes for common queries
    INDEX idx_timestamp (timestamp DESC),
    INDEX idx_session (session_id),
    INDEX idx_emergency (is_emergency) WHERE is_emergency = TRUE
);

-- Enable Row Level Security (RLS)
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow inserts from API (anon key)
CREATE POLICY "Allow anon inserts" ON interactions
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Policy: Allow reads for authenticated users only (admin dashboard)
CREATE POLICY "Allow authenticated reads" ON interactions
    FOR SELECT
    TO authenticated
    USING (true);

-- Table: suggested_faqs (AI-generated suggestions)
CREATE TABLE IF NOT EXISTS suggested_faqs (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    question TEXT NOT NULL,
    suggested_answer TEXT,
    frequency INT DEFAULT 1,
    approved BOOLEAN DEFAULT FALSE,
    approved_at TIMESTAMPTZ,
    approved_by TEXT,
    
    UNIQUE(question)
);

ALTER TABLE suggested_faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated on suggested_faqs" ON suggested_faqs
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- View: Emergency interactions
CREATE OR REPLACE VIEW emergency_interactions AS
SELECT 
    id,
    timestamp,
    session_id,
    user_message,
    created_at
FROM interactions
WHERE is_emergency = TRUE
ORDER BY timestamp DESC;

-- View: Daily stats
CREATE OR REPLACE VIEW daily_stats AS
SELECT 
    DATE(timestamp) as date,
    COUNT(*) as total_interactions,
    COUNT(DISTINCT session_id) as unique_sessions,
    SUM(CASE WHEN is_emergency THEN 1 ELSE 0 END) as emergency_count
FROM interactions
GROUP BY DATE(timestamp)
ORDER BY date DESC;

-- Function: Get unmatched queries (fallback triggers)
CREATE OR REPLACE FUNCTION get_unmatched_queries()
RETURNS TABLE (
    query TEXT,
    count BIGINT,
    last_seen TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        user_message as query,
        COUNT(*) as count,
        MAX(timestamp) as last_seen
    FROM interactions
    WHERE response_preview LIKE '%I can help with%' -- Fallback response pattern
    GROUP BY user_message
    HAVING COUNT(*) >= 3 -- Minimum 3 occurrences
    ORDER BY count DESC, last_seen DESC
    LIMIT 50;
END;
$$ LANGUAGE plpgsql;

-- Function: Suggest new FAQ from patterns
CREATE OR REPLACE FUNCTION suggest_faq_from_pattern(
    p_question TEXT,
    p_answer TEXT
) RETURNS VOID AS $$
BEGIN
    INSERT INTO suggested_faqs (question, suggested_answer, frequency)
    VALUES (p_question, p_answer, 1)
    ON CONFLICT (question)
    DO UPDATE SET 
        frequency = suggested_faqs.frequency + 1;
END;
$$ LANGUAGE plpgsql;

-- Comments
COMMENT ON TABLE interactions IS 'All chat interactions with timestamp, session, message preview';
COMMENT ON TABLE suggested_faqs IS 'AI-generated FAQ suggestions based on common queries';
COMMENT ON VIEW emergency_interactions IS 'Quick access to crisis situations';
COMMENT ON VIEW daily_stats IS 'Daily aggregated statistics';

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON interactions TO anon;
GRANT SELECT ON daily_stats TO authenticated;
GRANT SELECT ON emergency_interactions TO authenticated;
GRANT EXECUTE ON FUNCTION get_unmatched_queries() TO authenticated;
