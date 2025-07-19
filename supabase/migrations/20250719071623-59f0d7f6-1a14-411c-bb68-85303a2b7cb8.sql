-- Add is_hidden column to ads table for hide functionality
ALTER TABLE public.ads ADD COLUMN is_hidden BOOLEAN DEFAULT false;

-- Update RLS policies to handle hidden ads
DROP POLICY IF EXISTS "Anyone can view approved ads" ON public.ads;
CREATE POLICY "Anyone can view approved ads" 
ON public.ads 
FOR SELECT 
USING (status = 'approved' AND is_hidden = false);

-- Update users own ads policy to see hidden ads  
DROP POLICY IF EXISTS "Users can view their own ads" ON public.ads;
CREATE POLICY "Users can view their own ads" 
ON public.ads 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create index for better performance on hidden ads
CREATE INDEX IF NOT EXISTS idx_ads_hidden ON public.ads(is_hidden);

-- Add foreign key constraint from comments to profiles for proper relationships
ALTER TABLE public.comments 
ADD CONSTRAINT fk_comments_user_profile 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;