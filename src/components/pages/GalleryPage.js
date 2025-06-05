import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const GalleryPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">{t('galleryTitle')}</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg aspect-video"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;