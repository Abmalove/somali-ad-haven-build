import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Heart, MapPin, Phone, Star, Trash2 } from 'lucide-react';

export default function Favorites() {
  const { t } = useLanguage();

  // Mock favorites data
  const mockFavorites = [
    {
      id: '1',
      title: t('Toyota Camry 2018', 'Toyota Camry 2018'),
      price: 15000,
      currency: 'USD',
      location: t('Muqdisho', 'Mogadishu'),
      category: 'vehicles',
      image: '/placeholder.svg',
      savedAt: '2024-01-15'
    },
    {
      id: '2',
      title: t('iPhone 13 Pro', 'iPhone 13 Pro'),
      price: 800,
      currency: 'USD',
      location: t('Hargeysa', 'Hargeisa'),
      category: 'electronics',
      image: '/placeholder.svg',
      savedAt: '2024-01-14'
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <LanguageToggle />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Heart className="h-6 w-6 text-red-500" />
          {t('Kuwa aan jecel', 'My Favorites')}
        </h1>

        {mockFavorites.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t('Wax jecla ma lihid', 'No favorites yet')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t('Markii aad jecesho xayeysiis, halkan ayay ku muuqan doontaa', 
                   'When you favorite an ad, it will appear here')}
              </p>
              <Button>
                {t('Raadi xayeysiisyo', 'Browse ads')}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                {mockFavorites.length} {t('xayeysiis oo jecla', 'favorite ads')}
              </p>
            </div>

            {mockFavorites.map((ad) => (
              <Card key={ad.id} className="hover:shadow-md transition-shadow">
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
                          {ad.category === 'vehicles' ? '🚗' : '📱'} 
                          {ad.category === 'vehicles' ? t('Baabuur', 'Vehicle') : t('Electronics', 'Electronics')}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {t('La keydhiyey', 'Saved')} {new Date(ad.savedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
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
}