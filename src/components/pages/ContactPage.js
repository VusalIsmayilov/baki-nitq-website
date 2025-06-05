import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ContactPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="contact-section">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">{t('contactTitle')}</h1>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-blue-500">{t('address')}</h4>
                <p className="text-gray-600">Bakı, Azərbaycan</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-500">{t('phone')}</h4>
                <p className="text-gray-600">+994 XX XXX XX XX</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-500">{t('email')}</h4>
                <p className="text-gray-600">info@bakinitqmerkezi.az</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-500">{t('hours')}</h4>
                <p className="text-gray-600">Mon-Fri: 9:00-18:00</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6">Send Message</h2>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Name" 
                className="form-input"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="form-input"
              />
              <textarea 
                placeholder="Message" 
                rows={4}
                className="form-input"
              ></textarea>
              <button 
                onClick={() => alert('Message sent!')}
                className="btn-primary w-full"
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