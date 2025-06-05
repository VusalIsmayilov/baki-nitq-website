import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const GalleryPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="gallery-section">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">{t('galleryTitle')}</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="gallery-item">
              Gallery Image {item}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Our gallery showcases the learning environment, student achievements, and special events at Bakı Nitq Mərkəzi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;