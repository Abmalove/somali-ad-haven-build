import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Store } from 'lucide-react';

interface ShopSetupProps {
  onComplete: () => void;
  onClose: () => void;
}

export const ShopSetup = ({ onComplete, onClose }: ShopSetupProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    shopName: '',
    description: '',
    phone: '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, this would save to database
    console.log('Shop setup:', formData);
    onComplete();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            {t('Dukaan Samee', 'Setup Your Shop')}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="shopName">{t('Magaca Dukaanka', 'Shop Name')}</Label>
              <Input
                id="shopName"
                value={formData.shopName}
                onChange={(e) => handleChange('shopName', e.target.value)}
                placeholder={t('Gali magaca dukaankaaga', 'Enter your shop name')}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">{t('Sharaxaad', 'Description')}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder={t('Sharax dukaankaaga', 'Describe your shop')}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="phone">{t('Telefoon', 'Phone')}</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder={t('Lambarka telefoonka', 'Your phone number')}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">{t('Goob', 'Location')}</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder={t('Magaaladaada', 'Your city')}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {t('Samee Dukaan', 'Create Shop')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};