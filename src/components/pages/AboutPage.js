import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';

const AboutPage = ({ setCurrentPage }) => {
  const { t, language } = useLanguage();
  const { getActiveTrainers } = useContent();
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

  const truncateText = (text, maxLines = 6) => {
    const words = text.split(' ');
    const wordsPerLine = 12; // Approximate words per line
    const maxWords = maxLines * wordsPerLine;
    
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };
  
  return (
    <div className="about-section" style={{backgroundColor: '#FFFFFF'}}>
      {/* Combined Hero and Main Content Section */}
      <section className="about-intro" style={{backgroundColor: '#FFFFFF', position: 'relative', paddingTop: '2rem', paddingBottom: '160px', minHeight: '85vh'}}>
        <div className="container mx-auto px-4">
          <h1 className="text-center mb-6" style={{
            fontFamily: "'Lora', serif",
            fontWeight: 700,
            fontSize: 'clamp(2.6rem, 6vw, 4.2rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            color: '#1E1E1E'
          }}>Bizi Daha Yaxından Tanıyın</h1>
          
          <div className="max-w-5xl mx-auto">
            {/* Introduction Section */}
            <div className="text-center mb-16">
              <p className="text-center" style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#4A4A4A',
                maxWidth: '65ch',
                margin: '0 auto'
              }}>
                {t('aboutIntro')}
              </p>
            </div>
          </div>
          <div className="max-w-5xl mx-auto">
            {/* Main Content */}
            <div className="about-card" style={{
              marginTop: window.innerWidth <= 768 ? '-2rem' : '-4rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '3rem',
              boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
              marginBottom: '3rem'
            }}>
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: '#1E1E1E',
                  marginBottom: '1.5rem'
                }}>
                  {t('aboutDescription')}
                </p>
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: '#1E1E1E',
                  marginBottom: '1.5rem'
                }}>
                  {t('aboutApproach')}
                </p>
                <div className="text-center mt-8">
                  <button 
                    onClick={() => setCurrentPage('courses')}
                    className="cta"
                    style={{
                      display: 'inline-block',
                      padding: '1rem 2.5rem',
                      borderRadius: '8px',
                      backgroundColor: '#2166FF',
                      color: 'white',
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.6px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      marginTop: '2rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#1d5def';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#2166FF';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    {t('aboutConclusion')}
                  </button>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Trainers Section */}
      <section id="trainers-section" style={{backgroundColor: '#FFFFFF', position: 'relative', paddingTop: '2rem', paddingBottom: '5rem'}}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4" style={{
              fontFamily: "'Lora', serif",
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#1E1E1E'
            }}>{t('trainersTitle')}</h2>
            <p className="max-w-2xl mx-auto" style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              fontSize: '1.125rem',
              lineHeight: 1.6,
              color: '#4A4A4A'
            }}>
              {language === 'az' ? 'Sahələrində təcrübəli və peşəkar təlimçi heyətimizlə tanış olun' :
               language === 'en' ? 'Meet our experienced and professional training team in their fields' :
               'Познакомьтесь с нашей опытной и профессиональной командой тренеров в их областях'}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {getActiveTrainers().map((trainer) => (
              <div key={trainer.id} className="bg-white p-8 transition-all duration-300 transform" style={{borderRadius: '12px', boxShadow: '0 6px 18px rgba(0,0,0,0.06)', transitionTimingFunction: 'cubic-bezier(.25,.8,.42,1)'}} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)'; }}>
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-300">
                      <span className="text-4xl text-gray-600 font-bold">
                        {trainer.name[language].split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="mb-2" style={{
                      fontFamily: "'Lora', serif",
                      fontWeight: 600,
                      fontSize: '1.5rem',
                      lineHeight: 1.35,
                      color: '#1E1E1E'
                    }}>{trainer.name[language]}</h3>
                    <div className="flex items-center justify-center lg:justify-start mb-4">
                      <span className="mr-2" style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        lineHeight: 1.4,
                        color: '#1E1E1E'
                      }}>{trainer.title[language]}</span>
                      <span className="px-3 py-1 text-xs font-semibold" style={{backgroundColor: '#F0F9FF', color: '#2166FF', borderRadius: '12px', fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', fontWeight: 600, lineHeight: 1.4}}>
                        {trainer.specialty[language]}
                      </span>
                    </div>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      color: '#1E1E1E'
                    }}>
                      {expandedTrainers[trainer.id] ? trainer.description[language] : truncateText(trainer.description[language])}
                    </p>
                    {trainer.description[language].split(' ').length > 60 && (
                      <button 
                        onClick={() => toggleTrainerExpansion(trainer.id)}
                        className="mt-2 transition-colors duration-200" style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                          fontSize: '1rem',
                          color: '#2166FF',
                          letterSpacing: '0.3px'
                        }} onMouseEnter={(e) => e.target.style.color = '#1d5def'} onMouseLeave={(e) => e.target.style.color = '#2166FF'}
                      >
                        {expandedTrainers[trainer.id] ? 'Daha az' : 'Davamı'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client / Partner Logos Strip */}
      <section className="pt-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 pt-4">
            <h3 
              className="mb-2"
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 600,
                fontSize: '1.5rem',
                lineHeight: 1.35,
                color: '#1E1E1E'
              }}
            >
              Bizim Əməkdaşlıq Etdiyimiz Təşkilatlar
            </h3>
            <p 
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: '1rem',
                lineHeight: 1.6,
                color: '#1E1E1E'
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
                    
                    <span className={`relative z-10 transition-all duration-500 text-gray-700 group-hover:text-white`} style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: logo.name.length > 10 ? '0.75rem' : '0.875rem',
                      lineHeight: 1.4
                    }}>
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
                    
                    <span className={`relative z-10 transition-all duration-500 text-gray-700 group-hover:text-white`} style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: logo.name.length > 10 ? '0.75rem' : '0.875rem',
                      lineHeight: 1.4
                    }}>
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