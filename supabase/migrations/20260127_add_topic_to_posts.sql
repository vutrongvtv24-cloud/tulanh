ALTER TABLE posts ADD COLUMN topic text DEFAULT 'share';
ALTER TABLE posts ADD CONSTRAINT check_topic CHECK (topic IN ('youtube', 'mmo', 'share'));
