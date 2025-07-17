import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { BottomNavigation } from '@/components/BottomNavigation';
import { categories } from '@/data/categories';
import { Plus, Upload, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function PostAd() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'USD',
    category: '',
    subcategory: '',
    region: '',
    phone: '',
    images: [] as File[]
  });

  const selectedCategory = categories.find(cat => cat.id === formData.category);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate posting ad
      console.log('Posting ad:', formData);
      toast({
        title: t('Guul!', 'Success!'),
        description: t('Xayeysiiskaaga si guul leh ayaa loo dhigay', 'Your ad has been posted successfully')
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
    <div className="min-h-screen bg-background pb-20">
      <LanguageToggle />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Plus className="h-6 w-6" />
            {t('Dhig Xayeysiis', 'Post Advertisement')}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('Macluumaadka Xayeysiiska', 'Advertisement Details')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{t('Cinwaan', 'Title')}</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder={t('Cinwaanka xayeysiiska', 'Advertisement title')}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">{t('Qiimo', 'Price')}</Label>
                  <div className="flex gap-2">
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleChange('price', e.target.value)}
                      placeholder="0"
                      required
                    />
                    <Select value={formData.currency} onValueChange={(value) => handleChange('currency', value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="SOS">SOS</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t('Sharaxaad', 'Description')}</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder={t('Sharax xayeysiiskaaga', 'Describe your item or service')}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('Qaybta', 'Category')}</Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('Dooro qaybta', 'Select category')} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.emoji} {t(category.name_so, category.name_en)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCategory && (
                  <div className="space-y-2">
                    <Label>{t('Qaybta hoose', 'Subcategory')}</Label>
                    <Select value={formData.subcategory} onValueChange={(value) => handleChange('subcategory', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('Dooro qaybta hoose', 'Select subcategory')} />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCategory.subcategories.map((sub) => (
                          <SelectItem key={sub.id} value={sub.id}>
                            {t(sub.name_so, sub.name_en)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="region">{t('Gobolka', 'Region')}</Label>
                  <Select value={formData.region} onValueChange={(value) => handleChange('region', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('Dooro gobolka', 'Select region')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="banadir">Banaadir</SelectItem>
                      <SelectItem value="puntland">Puntland</SelectItem>
                      <SelectItem value="somaliland">Somaliland</SelectItem>
                      <SelectItem value="hirshabelle">Hirshabelle</SelectItem>
                      <SelectItem value="jubaland">Jubaland</SelectItem>
                      <SelectItem value="koonfur-galbeed">Koonfur Galbeed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('Telefoon', 'Phone')}</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder={t('Lambarka telefoonka', 'Phone number')}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t('Sawirro', 'Images')}</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">
                    {t('Guji si aad u soo darto sawirro', 'Click to upload images')}
                  </p>
                  <Button type="button" variant="outline">
                    {t('Dooro sawirro', 'Choose Images')}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? t('Ka sugga...', 'Loading...') : t('Dhig Xayeysiis', 'Post Ad')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}