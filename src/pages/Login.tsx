import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { LogIn, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { t } = useLanguage();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast({
          title: t('Qalad', 'Error'),
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('Guul!', 'Success!'),
          description: t('Si guul leh ayaad u soo gashay', 'You have successfully logged in'),
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: t('Qalad', 'Error'),
        description: t('Qalad ayaa dhacay', 'An error occurred'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4">
      <LanguageToggle />
      
      <Card className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <LogIn className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                {t('Soo Gal', 'Login')}
              </h1>
            </div>
            <p className="text-gray-600">
              {t('Ku soo biir suuqa ugu weyn ee Soomaalida', 'Join the biggest Somali marketplace')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('Gali email-kaaga', 'Enter your email')}
                  className="pl-10 py-3"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('Sirta', 'Password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('Gali sirta', 'Enter your password')}
                  className="pl-10 py-3"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
            >
              {loading ? t('Ku jira...', 'Loading...') : t('Soo Gal', 'Login')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {t('Ma lihid akoon?', "Don't have an account?")}
            </p>
            <Link 
              to="/register" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {t('Abuur Akoon', 'Create Account')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;