import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';
import { MapPin, Phone, Mail, Instagram, Facebook, ArrowRight, ExternalLink } from 'lucide-react';

const ContactPage = () => {
  const { t } = useLanguage();
  const { siteContent } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  
  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Staggered animation on page load
  useEffect(() => {
    const timer1 = setTimeout(() => setVisibleCards(prev => [...prev, 0]), 100);
    const timer2 = setTimeout(() => setVisibleCards(prev => [...prev, 1]), 200);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Phone number formatting (simple numeric mask)
    if (name === 'phoneNumber') {
      formattedValue = value.replace(/\D/g, ''); // Remove non-digits
      if (formattedValue.length > 0) {
        // Format as +994-XX-XXX-XX-XX for Azerbaijan numbers
        if (formattedValue.startsWith('994')) {
          formattedValue = formattedValue.slice(0, 12);
          formattedValue = `+${formattedValue.slice(0, 3)}-${formattedValue.slice(3, 5)}-${formattedValue.slice(5, 8)}-${formattedValue.slice(8, 10)}-${formattedValue.slice(10, 12)}`;
        } else {
          formattedValue = formattedValue.slice(0, 9);
          formattedValue = formattedValue.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1-$2-$3-$4');
        }
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('required');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-poçt formatı düzgün deyil';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the form data to a server
      console.log('Form submitted:', formData);
      
      // Show success toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000); // Hide after 4 seconds
      
      // Reset form
      setFormData({
        name: '',
        phoneNumber: '',
        email: '',
        message: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error here if needed
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="contact-section">
      {/* Hero Band */}
      <section style={{backgroundColor: '#FFFFFF', paddingTop: '72px', paddingBottom: '56px', minHeight: '85vh', display: 'flex', alignItems: 'center'}}>
        <div className="container mx-auto px-4">
          <h1 className="text-center mb-4" style={{
            fontFamily: "'Lora', serif",
            fontWeight: 700,
            fontSize: 'clamp(2.6rem, 6vw, 4.2rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            color: '#1E1E1E'
          }}>{t('contactTitle')}</h1>
          
          <p className="text-center" style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: '1.125rem',
            lineHeight: 1.6,
            color: '#4A4A4A',
            maxWidth: '65ch',
            margin: '0 auto'
          }}>
            {t('contactHeroLead')}
          </p>
        </div>
      </section>
      
      <div className="container mx-auto px-4" style={{paddingTop: '4rem', paddingBottom: '4rem'}}>
        
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
          <div 
            className="flex-1 bg-white p-8 transition-all duration-500 ease-out"
            style={{
              borderRadius: '12px',
              boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
              opacity: visibleCards.includes(0) ? 1 : 0,
              transform: visibleCards.includes(0) ? 'translateY(0)' : 'translateY(8px)'
            }}
          >
            <h2 className="mb-6" style={{
              fontFamily: "'Lora', serif",
              fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#1E1E1E'
            }}>{t('contactInfo')}</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5" style={{color: '#2166FF'}} />
                <div>
                  <h4 className="mb-1" style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    color: '#1E1E1E'
                  }}>{t('address')}</h4>
                  <p style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    color: '#5B5B5B'
                  }}>{siteContent.contactInfo?.address || t('addressText')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5" style={{color: '#2166FF'}} />
                <div>
                  <h4 className="mb-1" style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    color: '#1E1E1E'
                  }}>{t('phone')}</h4>
                  <a 
                    href={`tel:${siteContent.contactInfo?.phone || t('phoneText')}`}
                    className="group flex items-center gap-1 transition-all duration-200"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: '0.875rem',
                      lineHeight: 1.5,
                      color: '#2166FF',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                  >
                    <span>{siteContent.contactInfo?.phone || t('phoneText')}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5" style={{color: '#2166FF'}} />
                <div>
                  <h4 className="mb-1" style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    color: '#1E1E1E'
                  }}>{t('email')}</h4>
                  <a 
                    href={`mailto:${siteContent.contactInfo?.email || t('emailText')}`}
                    className="group flex items-center gap-1 transition-all duration-200"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: '0.875rem',
                      lineHeight: 1.5,
                      color: '#2166FF',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                  >
                    <span>{siteContent.contactInfo?.email || t('emailText')}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5 flex items-center justify-center" style={{color: '#2166FF'}}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1" style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    color: '#1E1E1E'
                  }}>{t('hours')}</h4>
                  <p style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    color: '#5B5B5B'
                  }}>{siteContent.contactInfo?.hours || t('hoursText')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5 flex items-center justify-center" style={{color: '#2166FF'}}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1" style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    color: '#1E1E1E'
                  }}>{t('followUs')}</h4>
                  <div className="flex items-center gap-4">
                    <a 
                      href={siteContent.contactInfo?.instagram || "https://instagram.com/bakinitqmerkezi"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="transition-colors duration-200"
                      style={{color: '#6B7280'}}
                      onMouseEnter={(e) => e.target.style.color = '#2166FF'}
                      onMouseLeave={(e) => e.target.style.color = '#6B7280'}
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a 
                      href={siteContent.contactInfo?.facebook || "https://facebook.com/bakinitqmerkezi"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="transition-colors duration-200"
                      style={{color: '#6B7280'}}
                      onMouseEnter={(e) => e.target.style.color = '#2166FF'}
                      onMouseLeave={(e) => e.target.style.color = '#6B7280'}
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map Thumbnail */}
            <div className="mt-6 relative overflow-hidden rounded-lg group cursor-pointer">
              <a 
                href="https://yandex.com/maps/geo/azerbaijan_baku/53166393/?ll=49.836735%2C40.366633&z=16"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {/* Static Map Image Placeholder */}
                <div 
                  className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f3f4f6'/%3E%3Cg fill='%23d1d5db'%3E%3Ccircle cx='200' cy='100' r='8'/%3E%3Cpath d='M200 80v40m-20-20h40'/%3E%3C/g%3E%3Ctext x='200' y='130' text-anchor='middle' fill='%236b7280' font-size='12' font-family='Arial'%3EAynalı Plaza%3C/text%3E%3C/svg%3E")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* You can replace this with an actual static map image */}
                  <div className="text-center text-gray-500">
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }}>Aynalı Plaza</p>
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-lg px-4 py-2 shadow-lg">
                    <div className="flex items-center gap-2" style={{color: '#2166FF'}}>
                      <ExternalLink className="w-4 h-4" />
                      <span style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.875rem',
                        fontWeight: 600
                      }}>{t('viewOnYandexMaps')}</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          
          <div 
            className="flex-1 bg-white p-8 transition-all duration-500 ease-out"
            style={{
              borderRadius: '12px',
              boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
              opacity: visibleCards.includes(1) ? 1 : 0,
              transform: visibleCards.includes(1) ? 'translateY(0)' : 'translateY(8px)'
            }}
          >
            <h2 className="mb-6" style={{
              fontFamily: "'Lora', serif",
              fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#1E1E1E'
            }}>{t('sendMessage')}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block mb-2" style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  color: '#1E1E1E'
                }}>
                  {t('name')} <span className="text-red-500 text-xs">*</span>
                </label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder=""
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.875rem'
                  }}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500" style={{fontFamily: "'Poppins', sans-serif"}}>
                    {errors.name}
                  </p>
                )}
              </div>
              
              {/* Phone Number Field */}
              <div>
                <label htmlFor="phoneNumber" className="block mb-2" style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  color: '#1E1E1E'
                }}>
                  {t('phoneNumber')}
                </label>
                <input 
                  type="tel" 
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="XX-XXX-XX-XX"
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    errors.phoneNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.875rem'
                  }}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-xs text-red-500" style={{fontFamily: "'Poppins', sans-serif"}}>
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
              
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block mb-2" style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  color: '#1E1E1E'
                }}>
                  {t('email')} <span className="text-red-500 text-xs">*</span>
                </label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder=""
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.875rem'
                  }}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500" style={{fontFamily: "'Poppins', sans-serif"}}>
                    {errors.email}
                  </p>
                )}
              </div>
              
              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block mb-2" style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  color: '#1E1E1E'
                }}>
                  {t('message')} <span className="text-red-500 text-xs">*</span>
                </label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder=""
                  rows={4}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition-colors resize-none ${
                    errors.message ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.875rem'
                  }}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500" style={{fontFamily: "'Poppins', sans-serif"}}>
                    {errors.message}
                  </p>
                )}
              </div>
              
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  height: '48px',
                  backgroundColor: isLoading ? '#9CA3AF' : '#2166FF',
                  color: 'white',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 600,
                  letterSpacing: '4px',
                  cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = '#1d5def';
                    e.target.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = '#2166FF';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                {isLoading && (
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                )}
                {isLoading ? t('sendingMessage') : t('sendMessageBtn')}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.875rem',
              fontWeight: 500
            }}>
              {t('messageSuccessToast')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;