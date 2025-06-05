import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const AboutPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">{t('aboutTitle')}</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">{t('mission')}</h2>
              <p className="text-gray-700 leading-relaxed">{t('missionText')}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">{t('vision')}</h2>
              <p className="text-gray-700 leading-relaxed">{t('visionText')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;