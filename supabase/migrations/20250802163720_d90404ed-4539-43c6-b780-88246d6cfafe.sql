-- Add policy to allow admins to delete any ad
CREATE POLICY "Admins can delete any ad" 
ON public.ads 
FOR DELETE 
USING (is_admin());