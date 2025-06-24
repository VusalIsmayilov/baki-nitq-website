import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';

const Footer = ({ setCurrentPage }) => {
  const { t } = useLanguage();
  const { siteContent } = useContent();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="mb-4" style={{
              fontFamily: "'Lora', serif",
              fontWeight: 700,
              fontSize: '1.125rem',
              lineHeight: 1.3
            }}>Bakı Nitq Mərkəzi</h3>
            <p className="text-gray-300" style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: '0.85rem',
              lineHeight: 1.5
            }}>Professional speech training center in Baku, Azerbaijan</p>
          </div>
          
          <div>
            <h4 className="mb-4" style={{
              fontFamily: "'Lora', serif",
              fontWeight: 700,
              fontSize: '1.125rem',
              lineHeight: 1.3
            }}>{t('quickLinks')}</h4>
            <div className="space-y-2">
              <button onClick={() => setCurrentPage('about')} className="block text-gray-300 hover:text-white" style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: '0.85rem',
                lineHeight: 1.5
              }}>
                {t('about')}
              </button>
              <button onClick={() => setCurrentPage('courses')} className="block text-gray-300 hover:text-white" style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: '0.85rem',
                lineHeight: 1.5
              }}>
                {t('courses')}
              </button>
              <button onClick={() => setCurrentPage('contact')} className="block text-gray-300 hover:text-white" style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: '0.85rem',
                lineHeight: 1.5
              }}>
                {t('contact')}
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4" style={{
              fontFamily: "'Lora', serif",
              fontWeight: 700,
              fontSize: '1.125rem',
              lineHeight: 1.3
            }}>{t('contactInfo')}</h4>
            <div className="space-y-2 text-gray-300" style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: '0.85rem',
              lineHeight: 1.5
            }}>
              <p>{siteContent.contactInfo?.address || t('addressText')}</p>
              <p>{siteContent.contactInfo?.phone || t('phoneText')}</p>
              <p>{siteContent.contactInfo?.email || t('emailText')}</p>
            </div>
          </div>
          
          <div>
            <h4 className="mb-4" style={{
              fontFamily: "'Lora', serif",
              fontWeight: 700,
              fontSize: '1.125rem',
              lineHeight: 1.3
            }}>{t('followUs')}</h4>
            <div className="space-y-3">
              <a 
                href={siteContent.contactInfo?.instagram || "https://instagram.com/bakinitqmerkezi"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-pink-400 transition-colors"
              >
                <span className="text-xl">📷</span>
                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.85rem',
                  lineHeight: 1.5
                }}>{t('instagram')}</span>
              </a>
              <a 
                href={siteContent.contactInfo?.facebook || "https://facebook.com/bakinitqmerkezi"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors"
              >
                <span className="text-xl">👥</span>
                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.85rem',
                  lineHeight: 1.5
                }}>{t('facebook')}</span>
              </a>
            </div>
            <div className="mt-4">
              <p className="text-gray-400" style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: '0.85rem',
                lineHeight: 1.5
              }}>
                {t('socialMedia')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: '0.85rem',
            lineHeight: 1.5
          }}>&copy; 2025 Bakı Nitq Mərkəzi. All rights reserved.</p>
          <div className="flex justify-center items-center space-x-4 mt-2">
            <button 
              onClick={() => setCurrentPage('privacy')} 
              className="text-gray-300 hover:text-white"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: '0.85rem',
                lineHeight: 1.5
              }}
            >
              {t('privacy')}
            </button>
            <span>•</span>
            <a 
              href={siteContent.contactInfo?.instagram || "https://instagram.com/bakinitqmerkezi"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-pink-400 transition-colors"
            >
              📷 {t('instagram')}
            </a>
            <span>•</span>
            <a 
              href={siteContent.contactInfo?.facebook || "https://facebook.com/bakinitqmerkezi"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              👥 {t('facebook')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;