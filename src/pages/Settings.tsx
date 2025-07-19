import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { BottomNavigation } from '@/components/BottomNavigation';
import { ArrowLeft, SettingsIcon, Moon, Sun, Bell, Shield, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SettingsPage = () => {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState(true);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: t('Waa laga baxay', 'Signed out'),
        description: t('Si nabad ah loo baxay', 'Successfully signed out')
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: t('Khalad', 'Error'),
        description: error.message || t('Khalad ayaa dhacay', 'An error occurred'),
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <LanguageToggle />
      
      <div className="container mx-auto px-4 py-8 pb-24">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{t('Dejinta', 'Settings')}</h1>
        </div>

        <div className="space-y-6">
          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                {t('Muuqaalka', 'Appearance')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="flex items-center gap-2">
                  {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  {t('Habka Mugdiga', 'Dark Mode')}
                </Label>
                <Switch
                  id="dark-mode"
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                {t('Ogeysiisyada', 'Notifications')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  {t('Ogeysiisyo Soo Dir', 'Push Notifications')}
                </Label>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {t('Akoonka', 'Account')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/edit-profile')}
              >
                <SettingsIcon className="h-4 w-4 mr-2" />
                {t('Wax Ka Beddel Xogta', 'Edit Profile')}
              </Button>
              
              <Button 
                variant="destructive" 
                className="w-full justify-start"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t('Ka Bax', 'Sign Out')}
              </Button>
            </CardContent>
          </Card>

          {/* App Info */}
          <Card>
            <CardHeader>
              <CardTitle>{t('Macluumaadka App-ka', 'App Information')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t('Suuqa Soomaalida v1.0', 'Somali Marketplace v1.0')}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {t('Suuqa ugu weyn ee Soomaalida', 'The largest Somali marketplace')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default SettingsPage;