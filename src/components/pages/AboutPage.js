import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';

const AboutPage = () => {
  const { t, language } = useLanguage();
  const { siteContent } = useContent();
  
  return (
    <div className="about-section">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">{t('aboutTitle')}</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">{t('mission')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {siteContent.aboutMission?.[language] || t('missionText')}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">{t('vision')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {siteContent.aboutVision?.[language] || t('visionText')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;