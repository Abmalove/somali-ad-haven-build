import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ShoppingCart } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4">
      <LanguageToggle />
      
      <Card className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">
              {t('Suuqa Soomaalida', 'Suuqa Soomaalida')}
            </h1>
          </div>
          
          <p className="text-gray-600 mb-8">
            {t('Suuqa ugu weyn ee Soomaalida online', 'Suuqa ugu weyn ee Soomaalida online')}
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/login')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
            >
              {t('Soo Gal', 'Soo Gal')}
            </Button>
            
            <Button 
              onClick={() => navigate('/register')}
              variant="outline"
              className="w-full border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50"
            >
              {t('Abuur Akoon', 'Abuur Akoon')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
