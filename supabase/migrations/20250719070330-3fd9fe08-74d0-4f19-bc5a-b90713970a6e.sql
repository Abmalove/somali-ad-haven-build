-- Add CASCADE DELETE to properly handle ad deletion
-- First, add foreign key constraints if they don't exist

-- Add foreign key for comments
ALTER TABLE comments 
ADD CONSTRAINT fk_comments_ad 
FOREIGN KEY (ad_id) REFERENCES ads(id) ON DELETE CASCADE;

-- Add foreign key for favorites  
ALTER TABLE favorites
ADD CONSTRAINT fk_favorites_ad
FOREIGN KEY (ad_id) REFERENCES ads(id) ON DELETE CASCADE;

-- Add foreign key for ratings
ALTER TABLE ratings 
ADD CONSTRAINT fk_ratings_ad
FOREIGN KEY (ad_id) REFERENCES ads(id) ON DELETE CASCADE;

-- Add foreign key for messages
ALTER TABLE messages
ADD CONSTRAINT fk_messages_ad  
FOREIGN KEY (ad_id) REFERENCES ads(id) ON DELETE CASCADE;

-- Add foreign key for payment_approvals
ALTER TABLE payment_approvals
ADD CONSTRAINT fk_payment_approvals_ad
FOREIGN KEY (ad_id) REFERENCES ads(id) ON DELETE CASCADE;