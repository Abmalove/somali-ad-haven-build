import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { BottomNavigation } from '@/components/BottomNavigation';
import { categories } from '@/data/categories';
import { Search as SearchIcon, Filter, MapPin, Phone, Star } from 'lucide-react';

export default function Search() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Mock ads data
  const mockAds = [
    {
      id: '1',
      title: t('Toyota Camry 2018', 'Toyota Camry 2018'),
      price: 15000,
      currency: 'USD',
      location: t('Muqdisho', 'Mogadishu'),
      category: 'vehicles',
      image: '/placeholder.svg'
    },
    {
      id: '2',
      title: t('iPhone 13 Pro', 'iPhone 13 Pro'),
      price: 800,
      currency: 'USD',
      location: t('Hargeysa', 'Hargeisa'),
      category: 'electronics',
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <LanguageToggle />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <SearchIcon className="h-6 w-6" />
          {t('Raadi', 'Search')}
        </h1>

        {/* Search Bar */}
        <div className="flex gap-2 mb-6">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('Maxaad raadineysaa?', 'What are you looking for?')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Categories Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          <Button
            variant={selectedCategory === '' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('')}
          >
            {t('Dhammaan', 'All')}
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap"
            >
              {category.emoji} {t(category.name_so, category.name_en)}
            </Button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {t('Natiijooyinka', 'Results')} ({mockAds.length})
            </h2>
          </div>

          {mockAds.map((ad) => (
            <Card key={ad.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{ad.title}</h3>
                    <div className="text-lg font-bold text-primary mt-1">
                      ${ad.price} {ad.currency}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {ad.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        4.5
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">
                        {categories.find(c => c.id === ad.category)?.emoji}
                        {t(
                          categories.find(c => c.id === ad.category)?.name_so || '',
                          categories.find(c => c.id === ad.category)?.name_en || ''
                        )}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}