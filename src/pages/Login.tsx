import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { LogIn, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Login() {
  const { t } = useLanguage();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signIn(formData.email, formData.password);
      toast({
        title: t('Guul!', 'Success!'),
        description: t('Si guul leh ayaad u soo gashay', 'You have successfully logged in')
      });
      navigate('/');
    } catch (error) {
      toast({
        title: t('Khalad!', 'Error!'),
        description: t('Khalad ayaa dhacay', 'An error occurred'),
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <LanguageToggle />
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <User className="h-6 w-6" />
            {t('Soo Gal', 'Login')}
          </CardTitle>
          <CardDescription className="text-center">
            {t('Soo gal akoonkaaga si aad u isticmaasho suuqa', 'Login to your account to use the marketplace')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('Email', 'Email')}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder={t('Gali email-kaaga', 'Enter your email')}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('Sirta', 'Password')}</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder={t('Gari sirtaada', 'Enter your password')}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              <LogIn className="h-4 w-4 mr-2" />
              {loading ? t('Ka sugga...', 'Loading...') : t('Soo Gal', 'Login')}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">
              {t('Akoon ma lihid?', "Don't have an account?")}
            </span>{' '}
            <Link to="/register" className="text-primary hover:underline">
              {t('Isciibaani', 'Sign up')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}