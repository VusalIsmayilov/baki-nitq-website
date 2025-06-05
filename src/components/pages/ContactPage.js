import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ContactPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">{t('contactTitle')}</h1>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">{t('address')}</h3>
                <p className="text-gray-600">Bakı, Azərbaycan</p>
              </div>
              <div>
                <h3 className="font-semibold">{t('phone')}</h3>
                <p className="text-gray-600">+994 XX XXX XX XX</p>
              </div>
              <div>
                <h3 className="font-semibold">{t('email')}</h3>
                <p className="text-gray-600">info@bakinitqmerkezi.az</p>
              </div>
              <div>
                <h3 className="font-semibold">{t('hours')}</h3>
                <p className="text-gray-600">Mon-Fri: 9:00-18:00</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Send Message</h2>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea 
                placeholder="Message" 
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button 
                onClick={() => alert('Message sent!')}
                className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition-colors"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;