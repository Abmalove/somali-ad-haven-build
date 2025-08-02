-- Add click count functionality to track ad views
UPDATE ads 
SET view_count = COALESCE(view_count, 0) 
WHERE view_count IS NULL;