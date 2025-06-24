import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';
import { Users } from 'lucide-react';

const AboutPage = ({ setCurrentPage }) => {
  const { t, language } = useLanguage();
  const { siteContent } = useContent();
  const [expandedTrainers, setExpandedTrainers] = useState({});

  // Partner logos data with colors
  const partnerLogos = [
    { name: 'TECHCORP', colorClass: 'from-blue-500 to-blue-700', textColor: 'text-blue-600' },
    { name: 'AZƏRBAYCAN BANK', colorClass: 'from-green-500 to-green-700', textColor: 'text-green-600' },
    { name: 'SOCAR', colorClass: 'from-red-500 to-red-700', textColor: 'text-red-600' },
    { name: 'BDU', colorClass: 'from-purple-500 to-purple-700', textColor: 'text-purple-600' },
    { name: 'TƏHSİL NAZİRLİYİ', colorClass: 'from-indigo-500 to-indigo-700', textColor: 'text-indigo-600' },
    { name: 'İTV', colorClass: 'from-orange-500 to-orange-700', textColor: 'text-orange-600' },
    { name: 'AZERCELL', colorClass: 'from-teal-500 to-teal-700', textColor: 'text-teal-600' },
    { name: 'KPMG', colorClass: 'from-gray-500 to-gray-700', textColor: 'text-gray-600' }
  ];

  const toggleTrainerExpansion = (trainerId) => {
    setExpandedTrainers(prev => ({
      ...prev,
      [trainerId]: !prev[trainerId]
    }));
  };

  const truncateText = (text, maxLines = 5) => {
    const words = text.split(' ');
    const wordsPerLine = 12; // Approximate words per line
    const maxWords = maxLines * wordsPerLine;
    
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };
  
  return (
    <div className="about-section">
      {/* Hero Section */}
      <section className="py-24" style={{backgroundColor: '#F5F7FA'}}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12" style={{
            letterSpacing: '-0.02em'
          }}>{t('aboutTitle')}</h1>
          
          <div className="max-w-5xl mx-auto">
            {/* Introduction Section */}
            <div className="text-center mb-12">
              <p className="text-xl" style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: '1.25rem',
                lineHeight: 1.6,
                color: '#4A4A4A',
                maxWidth: '65ch',
                margin: '0 auto'
              }}>
                {t('aboutIntro')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24" style={{backgroundColor: '#FFFFFF'}}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Main Content */}
            <div className="prose max-w-none mb-12">
              <div className="bg-white shadow-lg mb-8 border border-gray-100" style={{
                borderRadius: '12px',
                padding: '3rem 2rem'
              }}>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {t('aboutDescription')}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {t('aboutApproach')}
                </p>
                <div className="text-center mt-8">
                  <button 
                    onClick={() => setCurrentPage('courses')}
                    className="btn-primary px-10 py-4"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1rem',
                      lineHeight: 1.4,
                      letterSpacing: '0.6px',
                      textTransform: 'uppercase',
                      minHeight: '48px',
                      marginTop: '2rem'
                    }}
                  >
                    {t('aboutConclusion')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Trainers Section */}
      <section className="py-24" style={{backgroundColor: '#F5F7FA'}}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 mx-auto border border-gray-100 shadow-sm">
              <Users className="w-8 h-8" style={{color: '#2166FF'}} strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('trainersTitle')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'az' ? 'Sahələrində təcrübəli və peşəkar təlimçi heyətimizlə tanış olun' :
               language === 'en' ? 'Meet our experienced and professional training team in their fields' :
               'Познакомьтесь с нашей опытной и профессиональной командой тренеров в их областях'}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
              {/* Firuzə Aslanova */}
              <div className="bg-white shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" style={{borderRadius: '12px'}}>
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #2166FF 0%, #8B5FBF 100%)'}}>
                      <span className="text-4xl text-white font-bold">FA</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('firuzeName')}</h3>
                    <div className="flex items-center justify-center lg:justify-start mb-4">
                      <span className="text-lg text-gray-800 font-medium mr-2">{t('firuzeTitle')}</span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium" style={{backgroundColor: '#EFF6FF', color: '#2166FF'}}>
                        Nitq Mütəxəssisi
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {expandedTrainers['firuze'] ? t('firuzeDesc') : truncateText(t('firuzeDesc'))}
                    </p>
                    {t('firuzeDesc').split(' ').length > 60 && (
                      <button 
                        onClick={() => toggleTrainerExpansion('firuze')}
                        className="text-sm font-medium mt-2 hover:opacity-80" style={{color: '#2166FF'}}
                      >
                        {expandedTrainers['firuze'] ? 'Daha az' : 'Davamı'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Pərvin Pərlan */}
              <div className="bg-white shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" style={{borderRadius: '12px'}}>
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #2166FF 0%, #10B981 100%)'}}>
                      <span className="text-4xl text-white font-bold">PP</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('pervinName')}</h3>
                    <div className="flex items-center justify-center lg:justify-start mb-4">
                      <span className="text-lg text-gray-800 font-medium mr-2">{t('pervinTitle')}</span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium" style={{backgroundColor: '#EFF6FF', color: '#2166FF'}}>
                        Liderlik Təlimçisi
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {expandedTrainers['pervin'] ? t('pervinDesc') : truncateText(t('pervinDesc'))}
                    </p>
                    {t('pervinDesc').split(' ').length > 60 && (
                      <button 
                        onClick={() => toggleTrainerExpansion('pervin')}
                        className="text-sm font-medium mt-2 hover:opacity-80" style={{color: '#2166FF'}}
                      >
                        {expandedTrainers['pervin'] ? 'Daha az' : 'Davamı'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Lalə Mustafayeva */}
              <div className="bg-white shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" style={{borderRadius: '12px'}}>
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #2166FF 0%, #EC4899 100%)'}}>
                      <span className="text-4xl text-white font-bold">LM</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('laleName')}</h3>
                    <div className="flex items-center justify-center lg:justify-start mb-4">
                      <span className="text-lg text-gray-800 font-medium mr-2">{t('laleTitle')}</span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium" style={{backgroundColor: '#EFF6FF', color: '#2166FF'}}>
                        Təqdimat Mütəxəssisi
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {expandedTrainers['lale'] ? t('laleDesc') : truncateText(t('laleDesc'))}
                    </p>
                    {t('laleDesc').split(' ').length > 60 && (
                      <button 
                        onClick={() => toggleTrainerExpansion('lale')}
                        className="text-sm font-medium mt-2 hover:opacity-80" style={{color: '#2166FF'}}
                      >
                        {expandedTrainers['lale'] ? 'Daha az' : 'Davamı'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Ayşən Hüseynova */}
              <div className="bg-white shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" style={{borderRadius: '12px'}}>
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #2166FF 0%, #F97316 100%)'}}>
                      <span className="text-4xl text-white font-bold">AH</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('aysenName')}</h3>
                    <div className="flex items-center justify-center lg:justify-start mb-4">
                      <span className="text-lg text-gray-800 font-medium mr-2">{t('aysenTitle')}</span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium" style={{backgroundColor: '#EFF6FF', color: '#2166FF'}}>
                        Ünsiyyət Koçu
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {expandedTrainers['aysen'] ? t('aysenDesc') : truncateText(t('aysenDesc'))}
                    </p>
                    {t('aysenDesc').split(' ').length > 60 && (
                      <button 
                        onClick={() => toggleTrainerExpansion('aysen')}
                        className="text-sm font-medium mt-2 hover:opacity-80" style={{color: '#2166FF'}}
                      >
                        {expandedTrainers['aysen'] ? 'Daha az' : 'Davamı'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Client / Partner Logos Strip */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 pt-4">
            <h3 
              className="mb-2"
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 700,
                fontSize: '1.75rem',
                lineHeight: 1.2,
                color: '#1E1E1E'
              }}
            >
              Bizim Əməkdaşlıq Etdiyimiz Təşkilatlar
            </h3>
            <p 
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(0.75rem, 2vw, 0.813rem)',
                lineHeight: 1.45,
                color: '#4A4A4A'
              }}
            >
              Uğurlu təlim proqramlarımızda bizimlə əməkdaşlıq edən şirkət və təşkilatlar
            </p>
          </div>
          
          <div className="relative overflow-hidden">
            {/* Scroll indicators */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
            
            {/* Auto-marquee container */}
            <div className="flex items-center space-x-8 py-4 partner-marquee">
              {/* First set of logos */}
              {partnerLogos.map((logo, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 group cursor-pointer">
                  <div className="w-32 h-16 bg-gray-300 rounded-lg flex items-center justify-center filter grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-105 hover:shadow-lg relative overflow-hidden">
                    {/* Grayscale background - always visible */}
                    <div className="absolute inset-0 bg-gray-300 rounded-lg"></div>
                    
                    {/* Color background - visible on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${logo.colorClass} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    <span className={`relative z-10 font-bold transition-all duration-500 ${
                      logo.name.length > 10 ? 'text-xs' : 'text-sm'
                    } text-gray-700 group-hover:text-white`}>
                      {logo.name}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {partnerLogos.map((logo, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 group cursor-pointer">
                  <div className="w-32 h-16 bg-gray-300 rounded-lg flex items-center justify-center filter grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-105 hover:shadow-lg relative overflow-hidden">
                    {/* Grayscale background - always visible */}
                    <div className="absolute inset-0 bg-gray-300 rounded-lg"></div>
                    
                    {/* Color background - visible on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${logo.colorClass} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    <span className={`relative z-10 font-bold transition-all duration-500 ${
                      logo.name.length > 10 ? 'text-xs' : 'text-sm'
                    } text-gray-700 group-hover:text-white`}>
                      {logo.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;