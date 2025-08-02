import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { BottomNavigation } from '@/components/BottomNavigation';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Store, Plus, Eye, Edit, Trash2, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  region: string;
  image_urls: string[] | null;
  is_boosted: boolean;
  is_highlighted: boolean;
  status: string;
  created_at: string;
  view_count?: number; // Make optional since it might not exist in the database
}

export const MyShop = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchUserAds();
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('shop_name, username')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchUserAds = async () => {
    try {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAds(data || []);
    } catch (error) {
      console.error('Error fetching ads:', error);
      toast({
        title: t('Khalad', 'Error'),
        description: t('Khalad ayaa dhacay markii la raadayay xayeysiisyada', 'Error fetching ads'),
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAd = async (adId: string) => {
    if (!confirm(t('Ma hubtaa inaad tirtirto xayeysiiskan?', 'Are you sure you want to delete this ad?'))) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('ads')
        .delete()
        .eq('id', adId)
        .eq('user_id', user?.id); // Ensure user can only delete their own ads

      if (error) throw error;

      toast({
        title: t('Guuleysatay!', 'Success!'),
        description: t('Xayeysiiska waa la tirtiray', 'Ad has been deleted')
      });

      fetchUserAds(); // Refresh the list
    } catch (error) {
      console.error('Error deleting ad:', error);
      toast({
        title: t('Khalad', 'Error'),
        description: t('Khalad ayaa dhacay', 'Failed to delete ad'),
        variant: 'destructive'
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default">{t('La aqbalay', 'Approved')}</Badge>;
      case 'pending':
        return <Badge variant="secondary">{t('Sugaya', 'Pending')}</Badge>;
      case 'rejected':
        return <Badge variant="destructive">{t('La diiday', 'Rejected')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (!user) {
    return null;
  }

  const shopName = profile?.shop_name || profile?.username || t('Dukaankaaga', 'Your Shop');

  return (
    <div className="min-h-screen bg-background pb-20">
      <LanguageToggle />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={() => navigate('/profile')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('Dib u noqo', 'Go Back')}
          </Button>
          
          <Button onClick={() => navigate('/post')}>
            <Plus className="h-4 w-4 mr-2" />
            {t('Dhig Xayeysiis Cusub', 'Post New Ad')}
          </Button>
        </div>

        <Card className="shadow-medium mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              {shopName}
            </CardTitle>
            <p className="text-muted-foreground">
              {t('Tirada xayeysiisyada', 'Total ads')}: {ads.length}
            </p>
          </CardHeader>
        </Card>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-video bg-muted"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-2 w-2/3"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : ads.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Store className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">
                {t('Ma jiraan xayeysiisyo', 'No ads yet')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t('Bilow dukaankaaga adigoo dhigaya xayeysiiskaaga ugu horreeyay', 'Start your shop by posting your first ad')}
              </p>
              <Button onClick={() => navigate('/post')}>
                <Plus className="h-4 w-4 mr-2" />
                {t('Dhig Xayeysiis Cusub', 'Post New Ad')}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ads.map((ad) => (
              <Card key={ad.id} className="cursor-pointer transition-transform hover:scale-105">
                {/* Image */}
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  {ad.image_urls && ad.image_urls.length > 0 ? (
                    <img
                      src={ad.image_urls[0]}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Store className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-2 left-2">
                    {getStatusBadge(ad.status)}
                  </div>

                  {/* Boost/Highlight Badges */}
                  <div className="absolute top-2 right-2 flex gap-1">
                    {ad.is_highlighted && (
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        ⭐ {t('Muuqdo', 'Featured')}
                      </Badge>
                    )}
                    {ad.is_boosted && (
                      <Badge variant="secondary" className="bg-primary text-primary-foreground">
                        🚀 {t('Boost', 'Boost')}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{ad.title}</h3>
                  <p className="text-2xl font-bold text-primary mb-2">
                    {ad.currency} {ad.price.toLocaleString()}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Eye className="h-3 w-3" />
                    <span>{t('Daawasho', 'Views')}: {ad.view_count || 0}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {ad.description}
                  </p>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/edit-ad/${ad.id}`);
                      }}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      {t('Wax ka beddel', 'Edit')}
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAd(ad.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default MyShop;