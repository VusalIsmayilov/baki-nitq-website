import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const PrivacyPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">{t('privacy')}</h1>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
          <div className="space-y-4 text-gray-700">
            <p>This privacy policy explains how we collect, use, and protect your personal information...</p>
            <h3 className="text-xl font-semibold">Data Collection</h3>
            <p>We collect information you provide directly to us...</p>
            <h3 className="text-xl font-semibold">Data Usage</h3>
            <p>We use the information we collect to...</p>
            <h3 className="text-xl font-semibold">Data Protection</h3>
            <p>We implement appropriate security measures...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;