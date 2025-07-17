import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-marketplace.jpg';

export const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-primary text-primary-foreground overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🛒 {t('Suuqa Soomaalida', 'Somali Marketplace')}
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-2">
            {t('Suuqa ugu weyn ee Soomaalida online', 'The largest Somali marketplace online')}
          </p>
          <p className="text-lg text-primary-foreground/80 mb-8">
            {t('Iib, iibso, oo hel wax walba oo aad u baahan tahay - baabuurta, telefoonada, shaqooyinka, iyo wax kale',
               'Sell, buy, and find everything you need - cars, phones, jobs, and more')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/post')}
              className="text-lg px-8 py-3"
            >
              <Plus className="h-5 w-5 mr-2" />
              {t('Dhig Xayeysiis', 'Post Ad')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/search')}
              className="text-lg px-8 py-3 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Search className="h-5 w-5 mr-2" />
              {t('Raadi', 'Search')}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">1000+</div>
            <div className="text-primary-foreground/80">{t('Xayeysiis', 'Ads')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">500+</div>
            <div className="text-primary-foreground/80">{t('Isticmaale', 'Users')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">50+</div>
            <div className="text-primary-foreground/80">{t('Magaalooyin', 'Cities')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold flex items-center justify-center">
              <TrendingUp className="h-6 w-6 mr-1" />
              24/7
            </div>
            <div className="text-primary-foreground/80">{t('Furan', 'Online')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};