import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const PrivacyPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="py-16" style={{minHeight: '85vh', display: 'flex', alignItems: 'center'}}>
      <div className="container mx-auto px-4">
        <h1 
          className="text-center mb-12"
          style={{
            fontFamily: "'Lora', serif",
            fontWeight: 700,
            fontSize: 'clamp(2.6rem, 6vw, 4.2rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em'
          }}
        >
          {t('privacy')}
        </h1>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 
            className="mb-4"
            style={{
              fontFamily: "'Lora', serif",
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em'
            }}
          >
            Privacy Policy
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>This privacy policy explains how we collect, use, and protect your personal information...</p>
            <h3 
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 600,
                fontSize: '1.25rem',
                lineHeight: 1.35
              }}
            >
              Data Collection
            </h3>
            <p>We collect information you provide directly to us...</p>
            <h3 
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 600,
                fontSize: '1.25rem',
                lineHeight: 1.35
              }}
            >
              Data Usage
            </h3>
            <p>We use the information we collect to...</p>
            <h3 
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 600,
                fontSize: '1.25rem',
                lineHeight: 1.35
              }}
            >
              Data Protection
            </h3>
            <p>We implement appropriate security measures...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;