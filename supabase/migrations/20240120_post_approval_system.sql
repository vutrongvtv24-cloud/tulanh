-- 1. Add status column to posts table (safe check)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'status') THEN
        ALTER TABLE posts ADD COLUMN status TEXT DEFAULT 'approved';
    END IF;
END $$;

-- 2. Make new posts pending by default (but keep existing approved)
ALTER TABLE posts ALTER COLUMN status SET DEFAULT 'pending';
-- Ensure no nulls in existing
UPDATE posts SET status = 'approved' WHERE status IS NULL;

-- 3. Create table for tracking approval votes
CREATE TABLE IF NOT EXISTS post_approvals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(post_id, user_id)
);

-- 4. Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_approvals ENABLE ROW LEVEL SECURITY;

-- 5. Policies
-- Post Approvals Policies
DROP POLICY IF EXISTS "Anyone can view votes" ON post_approvals;
CREATE POLICY "Anyone can view votes" ON post_approvals FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can vote" ON post_approvals;
CREATE POLICY "Authenticated users can vote" ON post_approvals FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin Update Policy for Posts (Email Check)
DROP POLICY IF EXISTS "Admins can update any post" ON posts;
CREATE POLICY "Admins can update any post" ON posts FOR UPDATE
USING ((auth.jwt() ->> 'email') = 'vutrongvtv24@gmail.com');

-- 6. Function to check approval status
CREATE OR REPLACE FUNCTION check_post_approval()
RETURNS TRIGGER AS $$
DECLARE
  vote_count INTEGER;
  total_users INTEGER;
BEGIN
  -- Count total approval votes for the post
  SELECT count(*) INTO vote_count
  FROM post_approvals
  WHERE post_id = NEW.post_id;

  -- Count total active users (from profiles table)
  SELECT count(*) INTO total_users
  FROM profiles;

  -- IF votes > 50% of users
  IF total_users > 0 AND vote_count > (total_users / 2) THEN
    UPDATE posts
    SET status = 'approved'
    WHERE id = NEW.post_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Trigger
DROP TRIGGER IF EXISTS on_approval_vote ON post_approvals;
CREATE TRIGGER on_approval_vote
AFTER INSERT ON post_approvals
FOR EACH ROW
EXECUTE FUNCTION check_post_approval();
