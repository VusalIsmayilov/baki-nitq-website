import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';

const ContactPage = () => {
  const { t } = useLanguage();
  const { siteContent } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    alert(t('messageSent'));
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };
  
  return (
    <div className="contact-section">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">{t('contactTitle')}</h1>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6">{t('contactInfo')}</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-blue-500">{t('address')}</h4>
                <p className="text-gray-600">{siteContent.contactInfo?.address || t('addressText')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-500">{t('phone')}</h4>
                <p className="text-gray-600">{siteContent.contactInfo?.phone || t('phoneText')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-500">{t('email')}</h4>
                <p className="text-gray-600">{siteContent.contactInfo?.email || t('emailText')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-500">{t('hours')}</h4>
                <p className="text-gray-600">{siteContent.contactInfo?.hours || t('hoursText')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-500">{t('followUs')}</h4>
                <div className="flex space-x-3 mt-2">
                  <a 
                    href={siteContent.contactInfo?.instagram || "https://instagram.com/bakinitqmerkezi"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-pink-600 hover:text-pink-800 transition-colors"
                  >
                    <span className="text-lg">📷</span>
                    <span className="text-sm">{t('instagram')}</span>
                  </a>
                  <a 
                    href={siteContent.contactInfo?.facebook || "https://facebook.com/bakinitqmerkezi"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span className="text-lg">👥</span>
                    <span className="text-sm">{t('facebook')}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6">{t('sendMessage')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('name')}
                </label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('name')}
                  className="form-input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('email')}
                </label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('email')}
                  className="form-input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('message')}
                </label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('message')}
                  rows={4}
                  className="form-input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <button 
                type="submit"
                className="btn-primary w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition-colors font-semibold"
              >
                {t('sendMessageBtn')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;