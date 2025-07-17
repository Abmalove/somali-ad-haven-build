import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { BottomNavigation } from '@/components/BottomNavigation';
import { User, Settings, LogOut, Edit, Store, Star, Eye, Heart, MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Profile() {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: t('Ka bax', 'Signed out'),
        description: t('Si guul leh ayaad uga baxday', 'You have been signed out successfully')
      });
      navigate('/');
    } catch (error) {
      toast({
        title: t('Khalad!', 'Error!'),
        description: t('Khalad ayaa dhacay', 'An error occurred'),
        variant: 'destructive'
      });
    }
  };

  const stats = [
    { label: t('Xayeysiisyo', 'Ads'), value: '12', icon: Store },
    { label: t('Daawasho', 'Views'), value: '1.2k', icon: Eye },
    { label: t('Jeclaamo', 'Likes'), value: '89', icon: Heart },
    { label: t('Farriimo', 'Messages'), value: '23', icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <LanguageToggle />
      
      <div className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{user.email}</h1>
                <p className="text-muted-foreground">{t('Xubin ka mid ah suuqa', 'Marketplace member')}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">
                    <Star className="h-3 w-3 mr-1" />
                    4.8
                  </Badge>
                  <Badge variant="outline">{t('La hubo', 'Verified')}</Badge>
                </div>
              </div>
              <Button variant="outline" onClick={() => navigate('/edit-profile')}>
                <Edit className="h-4 w-4 mr-2" />
                {t('Wax ka bedel', 'Edit')}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
                    <Icon className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('Maamulka Akoonka', 'Account Management')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate('/edit-profile')}
              >
                <Edit className="h-4 w-4 mr-3" />
                {t('Wax ka bedel profile-ka', 'Edit Profile')}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate('/settings')}
              >
                <Settings className="h-4 w-4 mr-3" />
                {t('Dejinta', 'Settings')}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('Xayeysiisyada', 'My Advertisements')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Store className="h-12 w-12 mx-auto mb-4" />
                <p>{t('Xayeysiis ma lihid', 'You have no ads yet')}</p>
                <Button className="mt-4" onClick={() => navigate('/post')}>
                  {t('Dhig xayeysiis', 'Post an ad')}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Button
                variant="outline"
                className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t('Ka bax', 'Sign Out')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}