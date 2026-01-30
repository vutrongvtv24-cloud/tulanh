-- Migration: Create Notes Module Tables (Tủ Lạnh)
-- Date: 2026-01-30
-- Content: tables (notes, tags, note_tags), indexes, RLS policies, triggers

-- 1. Create NOTES table
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Core fields
  title TEXT NOT NULL DEFAULT '',
  content TEXT DEFAULT '', -- Markdown content
  
  -- URL bookmark fields
  is_url BOOLEAN DEFAULT FALSE,
  url TEXT,
  url_title TEXT,
  url_description TEXT,
  url_fetched_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Create TAGS table (Hierarchical)
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Tag info
  name TEXT NOT NULL, -- Full path: work/project-a/task-1
  slug TEXT NOT NULL, -- Normalized: work-project-a-task-1
  parent_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  level INTEGER DEFAULT 0, -- 0 = root, 1 = child, etc.
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Unique tag name per user
  UNIQUE(user_id, name)
);

-- 3. Create NOTE_TAGS table (Many-to-Many)
CREATE TABLE IF NOT EXISTS note_tags (
  note_id UUID REFERENCES notes(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  PRIMARY KEY (note_id, tag_id)
);

-- 4. Create Indexes for Performance
-- Notes indexes
CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id);
CREATE INDEX IF NOT EXISTS idx_notes_updated_at ON notes(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_notes_is_url ON notes(is_url);

-- Tags indexes
CREATE INDEX IF NOT EXISTS idx_tags_user_id ON tags(user_id);
CREATE INDEX IF NOT EXISTS idx_tags_parent_id ON tags(parent_id);  
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);

-- Full-text search index (Title + Content)
CREATE INDEX IF NOT EXISTS idx_notes_search 
ON notes USING GIN(to_tsvector('english', 
  COALESCE(title, '') || ' ' || COALESCE(content, '')
));

-- 5. Enable Row Level Security (RLS)
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE note_tags ENABLE ROW LEVEL SECURITY;

-- 6. Define RLS Policies
-- NOTES Policies
CREATE POLICY "Users can view own notes" 
ON notes FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes" 
ON notes FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes" 
ON notes FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes" 
ON notes FOR DELETE 
USING (auth.uid() = user_id);

-- TAGS Policies
CREATE POLICY "Users can view own tags" 
ON tags FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tags" 
ON tags FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tags" 
ON tags FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own tags" 
ON tags FOR DELETE 
USING (auth.uid() = user_id);

-- NOTE_TAGS Policies (Access depends on Note ownership)
CREATE POLICY "Users can view own note_tags" 
ON note_tags FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM notes WHERE notes.id = note_tags.note_id AND notes.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert own note_tags" 
ON note_tags FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM notes WHERE notes.id = note_tags.note_id AND notes.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete own note_tags" 
ON note_tags FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM notes WHERE notes.id = note_tags.note_id AND notes.user_id = auth.uid()
  )
);

-- 7. Updated_at Trigger
-- Create function if not exists
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to notes table
DROP TRIGGER IF EXISTS notes_updated_at ON notes;
CREATE TRIGGER notes_updated_at
BEFORE UPDATE ON notes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Success message
SELECT 'Migration completed successfully: Notes, Tags, Note_Tags created.' as result;
