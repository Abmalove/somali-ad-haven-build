import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { BottomNavigation } from '@/components/BottomNavigation';
import { HeroSection } from '@/components/HeroSection';
import { categories } from '@/data/categories';
import { Search, Plus, TrendingUp, MapPin, Phone, Star } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const mockAds = [
    {
      id: '1',
      title: t('Toyota Camry 2018', 'Toyota Camry 2018'),
      price: 15000,
      currency: 'USD',
      category: 'vehicles'
    },
    {
      id: '2',
      title: t('iPhone 13 Pro', 'iPhone 13 Pro'),
      price: 800,
      currency: 'USD',
      category: 'electronics'
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <LanguageToggle />
      <HeroSection />
      
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('Raadi...', 'Search...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={() => navigate('/search')}>
                <Search className="h-4 w-4 mr-2" />
                {t('Raadi', 'Search')}
              </Button>
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {categories.slice(0, 6).map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {category.emoji} {t(category.name_so, category.name_en)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            {t('Xayeysiisyo Caan ah', 'Featured Ads')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAds.map((ad) => (
              <Card key={ad.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="h-40 bg-muted rounded-lg mb-4 flex items-center justify-center">
                    📷 {t('Sawir', 'Image')}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{ad.title}</h3>
                  <div className="text-2xl font-bold text-primary mb-3">
                    ${ad.price.toLocaleString()} {ad.currency}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {t('Muqdisho', 'Mogadishu')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      4.5
                    </div>
                  </div>
                  <Button className="w-full" size="sm">
                    <Phone className="h-3 w-3 mr-2" />
                    {t('Wac', 'Call')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Index;
