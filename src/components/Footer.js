import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = ({ setCurrentPage }) => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Bakı Nitq Mərkəzi</h3>
            <p className="text-gray-300">Professional speech training center in Baku, Azerbaijan</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <button onClick={() => setCurrentPage('about')} className="block text-gray-300 hover:text-white">
                {t('about')}
              </button>
              <button onClick={() => setCurrentPage('courses')} className="block text-gray-300 hover:text-white">
                {t('courses')}
              </button>
              <button onClick={() => setCurrentPage('contact')} className="block text-gray-300 hover:text-white">
                {t('contact')}
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p>Bakı, Azərbaycan</p>
              <p>+994 XX XXX XX XX</p>
              <p>info@bakinitqmerkezi.az</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 Bakı Nitq Mərkəzi. All rights reserved.</p>
          <button 
            onClick={() => setCurrentPage('privacy')} 
            className="text-gray-300 hover:text-white ml-4"
          >
            {t('privacy')}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;