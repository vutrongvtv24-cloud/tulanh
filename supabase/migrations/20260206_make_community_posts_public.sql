-- Migration to allow public access to community posts on "Public" visibility
-- User requirement: Community page public for everyone without login. 
-- "View by level" is handled by Frontend masking, so RLS must return the rows.

DROP POLICY IF EXISTS "Public/Community Post Visibility" ON public.posts;

CREATE POLICY "Public/Community Post Visibility" 
ON public.posts FOR SELECT 
USING (
    -- 1. Author can always see their own posts
    (auth.uid() = user_id) 
    
    OR 
    
    -- 2. Public can see any Approved & Public post (Global or Community)
    (
        status = 'approved' 
        AND visibility = 'public'
    ) 
    
    OR
    
    -- 3. Admins/Moderators of a community can see everything (Pending, Private, Rejected?) in that community
    (
        community_id IS NOT NULL 
        AND auth.uid() IS NOT NULL -- optimization
        AND EXISTS (
            SELECT 1 FROM public.community_members 
            WHERE community_id = posts.community_id 
            AND user_id = auth.uid() 
            AND role IN ('admin', 'moderator')
        )
    )
);
