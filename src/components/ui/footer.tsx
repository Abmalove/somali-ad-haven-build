import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-muted/30 border-t py-4 text-center text-sm text-muted-foreground">
      <div className="container mx-auto px-4">
        <p>
          © 2025 {t('Somali Ad Hub - Dhammaan xuquuqda way dhawrantahay', 'Somali Ad Hub - All rights reserved')}
        </p>
      </div>
    </footer>
  );
};