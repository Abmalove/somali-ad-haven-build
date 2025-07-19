import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { BottomNavigation } from '@/components/BottomNavigation';
import { ImageUpload } from '@/components/ImageUpload';
import { CVUpload } from '@/components/CVUpload';
import { categories, regions } from '@/data/categories';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const EditAd = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [adLoading, setAdLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'USD',
    category: '',
    region: '',
    phone: '',
    shop_name: '',
    job_title: '',
    salary: '',
    experience: '',
    brand: '',
    model: '',
    year: '',
    condition: '',
    image_urls: [] as string[],
    cv_url: null as string | null
  });

  useEffect(() => {
    if (id) {
      fetchAd();
    }
  }, [id]);

  const fetchAd = async () => {
    try {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('id', id)
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      
      // Pre-fill form with existing ad data
      setFormData({
        title: data.title || '',
        description: data.description || '',
        price: data.price?.toString() || '',
        currency: data.currency || 'USD',
        category: data.category || '',
        region: data.region || '',
        phone: data.phone || '',
        shop_name: data.shop_name || '',
        job_title: data.job_title || '',
        salary: data.salary || '',
        experience: data.experience || '',
        brand: data.brand || '',
        model: data.model || '',
        year: data.year || '',
        condition: data.condition || '',
        image_urls: data.image_urls || [],
        cv_url: data.cv_url || null
      });
    } catch (error) {
      console.error('Error fetching ad:', error);
      toast({
        title: t('Khalad', 'Error'),
        description: t('Xayeysiiska lama heli karo', 'Could not load ad'),
        variant: 'destructive'
      });
      navigate('/');
    } finally {
      setAdLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.price || !formData.category || !formData.region || !formData.phone || !formData.shop_name) {
      toast({
        title: t('Khalad', 'Error'),
        description: t('Fadlan buuxi dhammaan goobaha muhiimka ah', 'Please fill in all required fields'),
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      const updateData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        currency: formData.currency,
        category: formData.category,
        region: formData.region,
        phone: formData.phone,
        shop_name: formData.shop_name,
        image_urls: formData.image_urls,
        ...(formData.category === 'jobs' && {
          job_title: formData.job_title,
          salary: formData.salary,
          experience: formData.experience,
          cv_url: formData.cv_url
        }),
        ...(formData.category === 'vehicles' && {
          brand: formData.brand,
          model: formData.model,
          year: formData.year,
          condition: formData.condition
        }),
        ...(formData.category !== 'jobs' && formData.category !== 'vehicles' && {
          brand: formData.brand,
          model: formData.model,
          year: formData.year,
          condition: formData.condition
        })
      };

      const { error } = await supabase
        .from('ads')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: t('Guuleysatay!', 'Success!'),
        description: t('Xayeysiiskaaga waa la cusbooneysiiyey', 'Your ad has been updated')
      });

      navigate(`/ad/${id}`);
    } catch (error) {
      console.error('Error updating ad:', error);
      toast({
        title: t('Khalad', 'Error'),
        description: t('Khalad ayaa dhacay', 'Something went wrong'),
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  if (adLoading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <LanguageToggle />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <LanguageToggle />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => navigate(`/ad/${id}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('Dib u noqo', 'Back')}
          </Button>
          <h1 className="text-2xl font-bold">{t('Wax Ka Beddel Xayeysiiska', 'Edit Ad')}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('Macluumaadka Aasaasiga ah', 'Basic Information')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">{t('Cinwaanka', 'Title')} *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={t('Geli cinwaanka xayeysiiskaaga', 'Enter your ad title')}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">{t('Faahfaahinta', 'Description')} *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={t('Sharax alaabta ama adeegga', 'Describe your item or service')}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">{t('Qiimaha', 'Price')} *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="currency">{t('Lacagta', 'Currency')} *</Label>
                  <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="SOS">SOS (So.Sh)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">{t('Qaybta', 'Category')} *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('Dooro qaybta', 'Select category')} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.icon} {t(category.soName, category.enName)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="region">{t('Gobolka', 'Region')} *</Label>
                  <Select value={formData.region} onValueChange={(value) => setFormData({ ...formData, region: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('Dooro gobolka', 'Select region')} />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">{t('Telefoon', 'Phone')} *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+252 61 234 5678"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="shop_name">{t('Magaca Dukaanka', 'Shop Name')} *</Label>
                  <Input
                    id="shop_name"
                    value={formData.shop_name}
                    onChange={(e) => setFormData({ ...formData, shop_name: e.target.value })}
                    placeholder={t('Geli magaca dukaankaaga', 'Enter your shop name')}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category specific fields */}
          {formData.category === 'jobs' && (
            <Card>
              <CardHeader>
                <CardTitle>{t('Macluumaadka Shaqada', 'Job Information')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="job_title">{t('Cinwaanka Shaqada', 'Job Title')}</Label>
                  <Input
                    id="job_title"
                    value={formData.job_title}
                    onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                    placeholder={t('Geli cinwaanka shaqada', 'Enter job title')}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="salary">{t('Mushaharka', 'Salary')}</Label>
                    <Input
                      id="salary"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      placeholder={t('Geli mushaharka', 'Enter salary')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">{t('Waaya-aragnimada', 'Experience Required')}</Label>
                    <Select value={formData.experience} onValueChange={(value) => setFormData({ ...formData, experience: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('Dooro waaya-aragnimada', 'Select experience')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">{t('Bilow-bilow', 'Entry Level')}</SelectItem>
                        <SelectItem value="mid">{t('Dhexdhexaad', 'Mid Level')}</SelectItem>
                        <SelectItem value="senior">{t('Khibrad sare', 'Senior Level')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <CVUpload 
                  onCVChange={(url) => setFormData({ ...formData, cv_url: url })}
                  existingCV={formData.cv_url}
                />
              </CardContent>
            </Card>
          )}

          {(formData.category === 'vehicles' || (formData.category && formData.category !== 'jobs')) && (
            <Card>
              <CardHeader>
                <CardTitle>{t('Macluumaadka Dheeraad ah', 'Additional Information')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand">{t('Nooca/Brand', 'Brand')}</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder={t('Geli nooca', 'Enter brand')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="model">{t('Qaabka', 'Model')}</Label>
                    <Input
                      id="model"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      placeholder={t('Geli qaabka', 'Enter model')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="year">{t('Sanadka', 'Year')}</Label>
                    <Input
                      id="year"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      placeholder={t('Geli sanadka', 'Enter year')}
                    />
                  </div>

                  <div>
                    <Label htmlFor="condition">{t('Xaalka', 'Condition')}</Label>
                    <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('Dooro xaalka', 'Select condition')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">{t('Cusub', 'New')}</SelectItem>
                        <SelectItem value="like_new">{t('Sida cusub', 'Like New')}</SelectItem>
                        <SelectItem value="good">{t('Fiican', 'Good')}</SelectItem>
                        <SelectItem value="fair">{t('Caadi', 'Fair')}</SelectItem>
                        <SelectItem value="poor">{t('Liita', 'Poor')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>{t('Sawirrada', 'Images')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload 
                onImagesChange={(urls) => setFormData({ ...formData, image_urls: urls })}
                existingImages={formData.image_urls}
              />
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => navigate(`/ad/${id}`)}>
              {t('Ka noqo', 'Cancel')}
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? t('Waa la cusbooneysiinayaa...', 'Updating...') : t('Cusboonaysii', 'Update Ad')}
            </Button>
          </div>
        </form>
      </div>

      <BottomNavigation />
    </div>
  );
};