import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';
import { ChevronRight, ChevronDown, Target, Users, User, UserCheck, Zap, TrendingUp, BarChart, Building2, UserCog, PieChart, BookOpen, Star } from 'lucide-react';
import Lottie from 'lottie-react';
import targetIconAnimation from '../../animations/targetIcon.json';
import usersIconAnimation from '../../animations/usersIcon.json';
import lightbulbIconAnimation from '../../animations/lightbulbIcon.json';
import dustParticlesAnimation from '../../animations/dustParticles.json';

// Wave Divider Component
const WaveDivider = () => (
  <svg className="wave" viewBox="0 0 1440 60" preserveAspectRatio="none">
    <defs>
      <linearGradient id="fade" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="var(--brand-blue)" />
        <stop offset="40%" stopColor="var(--brand-blue)" />
        <stop offset="80%" stopColor="#8FA8F6" />
        <stop offset="100%" stopColor="#F7F9FC" />
      </linearGradient>
    </defs>
    <path d="M0,30 C360,45 480,15 720,30 C960,45 1080,15 1440,30 V60 H0 Z" fill="url(#fade)" />
  </svg>
);

const HomePage = ({ setCurrentPage }) => {
  const { t, language } = useLanguage();
  const { siteContent, testimonials } = useContent();
  const [activeService, setActiveService] = useState('speechCommunicationDev');
  const [visibleCards, setVisibleCards] = useState([]);
  const [contentKey, setContentKey] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  
  // Lottie refs for controlling animations
  const lottieRef1 = useRef();
  const lottieRef2 = useRef();
  const lottieRef3 = useRef();

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

  // Scroll animation for cards and Lottie triggers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.dataset.cardIndex);
            setTimeout(() => {
              setVisibleCards(prev => [...prev, cardIndex]);
              
              // Trigger Lottie animations based on card index
              if (cardIndex === 0 && lottieRef1.current) {
                lottieRef1.current.play();
              } else if (cardIndex === 1 && lottieRef2.current) {
                lottieRef2.current.play();
              } else if (cardIndex === 2 && lottieRef3.current) {
                lottieRef3.current.play();
              }
            }, cardIndex * 40); // 40ms staggered delay
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const cards = document.querySelectorAll('.differences-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);


  // Helper function to check if event is early-bird (< 30 days away)
  const isEarlyBird = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays < 30;
  };

  // Sample event data with seats
  const eventData = [
    {
      id: 1,
      date: '2025-01-25',
      totalSeats: 30,
      bookedSeats: 25,
      type: 'Seminar',
      typeColor: 'blue'
    },
    {
      id: 2, 
      date: '2025-02-02',
      totalSeats: 25,
      bookedSeats: 8,
      type: 'Masterclass',
      typeColor: 'green'
    },
    {
      id: 3,
      date: '2025-01-30',
      totalSeats: 20,
      bookedSeats: 12,
      type: 'Workshop',
      typeColor: 'purple'
    },
    {
      id: 4,
      date: '2025-02-15',
      totalSeats: 40,
      bookedSeats: 35,
      type: 'Konferans',
      typeColor: 'orange'
    },
    {
      id: 5,
      date: '2025-01-28',
      totalSeats: 15,
      bookedSeats: 3,
      type: 'İntensiv',
      typeColor: 'red'
    }
  ];

  const services = [
    {
      id: 'speechCommunicationDev',
      title: t('speechCommunicationDev'),
      description: t('speechCommunicationDevDesc'),
      image: '/maninsuit2.png'
    },
    {
      id: 'personalDevSupport',
      title: t('personalDevSupport'),
      description: t('personalDevSupportDesc'),
      image: '/maninsuit2.png'
    },
    {
      id: 'corporateLeadershipSkills',
      title: t('corporateLeadershipSkills'),
      description: t('corporateLeadershipSkillsDesc'),
      image: '/maninsuit2.png'
    }
  ];

  // Filter approved testimonials
  const approvedTestimonials = testimonials.filter(testimonial => testimonial.approved);

  // Sample avatar images for testimonials
  const avatarImages = {
    1: 'https://images.unsplash.com/photo-1494790108755-2616b612ce8b?w=100&h=100&fit=crop&crop=face',
    2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    3: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face',
    4: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face',
    5: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  };

  // Auto-scroll for testimonials carousel
  useEffect(() => {
    if (!isCarouselHovered && approvedTestimonials.length > 1) {
      const interval = setInterval(() => {
        const container = document.querySelector('.testimonials-container');
        if (container) {
          const cardWidth = 336; // 320px width + 16px margin
          const currentScroll = container.scrollLeft;
          const maxScroll = container.scrollWidth - container.clientWidth;
          
          if (currentScroll >= maxScroll) {
            container.scrollLeft = 0; // Reset to beginning
          } else {
            container.scrollLeft += cardWidth;
          }
        }
      }, 7000); // 7 seconds per card

      return () => clearInterval(interval);
    }
  }, [isCarouselHovered, approvedTestimonials.length]);

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
  
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        {/* Animated Background */}
        <div className="hero-background-animation"></div>
        
        {/* Dust Particles Overlay */}
        <div className="dust-particles-overlay">
          <Lottie 
            animationData={dustParticlesAnimation} 
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        
        <div className="container mx-auto px-4 text-left flex justify-start items-center h-full">
          <div className="max-w-md">
            <h1 
              className="mb-6"
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 700,
                fontSize: 'clamp(2.6rem, 6vw, 4.2rem)',
                lineHeight: 1.1,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {siteContent.homeHero?.[language] || t('welcome')}
            </h1>
            <p 
              className="mb-8"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#1E1E1E',
                marginBottom: '2rem'
              }}
            >
              {siteContent.homeDesc?.[language] || t('welcomeDesc')}
            </p>
            <button 
              onClick={() => setCurrentPage('about')}
              className="btn-primary hero-cta-button px-10 py-4 mb-8"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: '1rem',
                lineHeight: 1.4,
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
                minHeight: '52px'
              }}
            >
              {t('learnMore')}
            </button>
            
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <WaveDivider />

      {/* Our Differences Section */}
      <section className="py-20 relative" style={{backgroundColor: '#F9FAFC'}}>
        <div className="container mx-auto px-4">
          {/* Section Heading */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 
              className="mb-4"
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                maxWidth: '28ch',
                margin: '0 auto 1rem auto',
                color: '#1E1E1E'
              }}
            >
              {t('newsTitle')}
            </h2>
            <p 
              className="max-w-4xl mx-auto"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#4A4A4A',
                maxWidth: '65ch',
                margin: '0 auto'
              }}
            >
              Real-həyat məşqləri, təcrübəli təlimçilər və beynəlxalq səviyyəli metodika birlikdə nəticəverən tədris təcrübəsi yaradaraq müştərilərimizin inamını möhkəmləndirir.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Practical Approach */}
            <div 
              className={`differences-card bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-700 transform hover:-translate-y-1 ${
                visibleCards.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              data-card-index="0"
            >
              <div className="text-center mb-6">
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 lottie-container">
                    <Lottie 
                      lottieRef={lottieRef1}
                      animationData={targetIconAnimation} 
                      loop={false}
                      autoplay={false}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
                <h3 
                  className="text-gray-800 mb-3"
                  style={{
                    fontFamily: "'Lora', serif",
                    fontWeight: 600,
                    fontSize: '1.5rem',
                    lineHeight: 1.35
                  }}
                >
                  {t('practicalApproach')}
                </h3>
              </div>
              <p 
                className="text-center"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: '#1E1E1E',
                  maxWidth: '65ch',
                  margin: '0 auto'
                }}
              >
                {t('practicalApproachDesc')}
              </p>
            </div>

            {/* Professional Trainers */}
            <div 
              className={`differences-card bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-700 transform hover:-translate-y-1 ${
                visibleCards.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              data-card-index="1"
            >
              <div className="text-center mb-6">
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 lottie-container">
                    <Lottie 
                      lottieRef={lottieRef2}
                      animationData={usersIconAnimation} 
                      loop={false}
                      autoplay={false}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
                <h3 
                  className="text-gray-800 mb-3"
                  style={{
                    fontFamily: "'Lora', serif",
                    fontWeight: 600,
                    fontSize: '1.5rem',
                    lineHeight: 1.35
                  }}
                >
                  {t('professionalTrainers')}
                </h3>
              </div>
              <p 
                className="text-center"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: '#1E1E1E',
                  maxWidth: '65ch',
                  margin: '0 auto'
                }}
              >
                {t('professionalTrainersDesc')}
              </p>
            </div>

            {/* Modern Methodology */}
            <div 
              className={`differences-card bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-700 transform hover:-translate-y-1 ${
                visibleCards.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              data-card-index="2"
            >
              <div className="text-center mb-6">
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 lottie-container">
                    <Lottie 
                      lottieRef={lottieRef3}
                      animationData={lightbulbIconAnimation} 
                      loop={false}
                      autoplay={false}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </div>
                <h3 
                  className="text-gray-800 mb-3"
                  style={{
                    fontFamily: "'Lora', serif",
                    fontWeight: 600,
                    fontSize: '1.5rem',
                    lineHeight: 1.35
                  }}
                >
                  {t('modernMethodology')}
                </h3>
              </div>
              <p 
                className="text-center"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: '#1E1E1E',
                  maxWidth: '65ch',
                  margin: '0 auto'
                }}
              >
                {t('modernMethodologyDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20" style={{backgroundColor: '#FFFFFF'}}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 pt-8">
            <h2 
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                maxWidth: '28ch',
                margin: '0 auto'
              }}
            >
              {t('ourServices')}
            </h2>
          </div>
          
          {/* Accordion Layout */}
          <div className="flex flex-col lg:flex-row gap-8 items-start min-h-[516px]">
            {/* Left Column - Accordion Menu (30% width) */}
            <div className="w-full lg:w-[30%] flex flex-col gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setActiveService(service.id);
                    setContentKey(prev => prev + 1); // Trigger re-animation
                  }}
                  className={`w-full text-left p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-all duration-300 flex items-center justify-between flex-1 min-h-[80px] ${
                    activeService === service.id ? 'border-blue-300 shadow-lg' : ''
                  }`}
                >
                  <span className={activeService === service.id ? 'text-gray-900' : 'text-gray-700'} style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1rem',
                    lineHeight: 1.45
                  }}>
                    {service.title}
                  </span>
                  {activeService === service.id ? (
                    <ChevronRight className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              ))}
            </div>

            {/* Right Column - Content Card (70% width) */}
            <div className="w-full lg:w-[70%] bg-white rounded-xl border border-gray-200 shadow-lg min-h-[300px] flex flex-col">
              {/* Card Content */}
              <div 
                key={contentKey}
                className="p-8 flex-1 flex flex-col justify-between accordion-content-slide"
              >
                <div>
                  <h2 className="text-gray-900 mb-6" style={{
                    fontFamily: "'Lora', serif",
                    fontWeight: 700,
                    fontSize: '1.375rem',
                    lineHeight: 1.3
                  }}>
                    {services.find(s => s.id === activeService)?.title}
                  </h2>
                  
                  <div className="text-gray-600 leading-relaxed space-y-4">
                    {services.find(s => s.id === activeService)?.description.split('.').slice(0, 2).map((paragraph, index) => (
                      paragraph.trim() && (
                        <p key={index} style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 400,
                          fontSize: '0.95rem',
                          lineHeight: 1.6
                        }}>
                          {paragraph.trim()}.
                        </p>
                      )
                    ))}
                  </div>
                </div>
                
                {/* CTA Button */}
                <div className="text-center mt-6">
                  <button 
                    onClick={() => setCurrentPage('courses')}
                    className="btn-primary px-8 py-3"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '0.9rem',
                      lineHeight: 1.4
                    }}
                  >
                    {t('learnMore')}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Training Solutions Subsection */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 
                className="text-gray-800 mb-4"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(1.3rem, 3vw, 1.6rem)',
                  lineHeight: 1.4,
                  letterSpacing: '1px',
                  fontVariant: 'small-caps',
                  textTransform: 'uppercase'
                }}
              >
                Şəxsi hədəflərdən korporativ məqsədlərə qədər uzanan təlim həllərimiz
              </h3>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Individual Training */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8">
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    Fərdi Yönümlü Təlimlər
                  </h4>
                </div>
                
                <div className="space-y-6 mb-6">
                  <div className="flex items-start">
                    <Target className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0 stroke-1" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm mb-1">Şəxsi məqsədlərə tam uyğunlaşma:</p>
                      <p className="text-gray-600 text-sm">Tədris planı əvvəlcədən sizin hədəflərinizi, mövcud bacarıqlarınızı və öyrənmə tərzinizi analiz edərək qurulur.</p>
                    </div>
                  </div>
                  <div className="border-b border-gray-200"></div>
                  
                  <div className="flex items-start">
                    <UserCheck className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0 stroke-1" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm mb-1">1-nə-1 mentorluq və fasilətsiz geribildirim:</p>
                      <p className="text-gray-600 text-sm">Hər moduldan sonra fasiləsiz rəy, fərdi məşq tapşırıqları və inkişaf izləyici plan təqdim olunur.</p>
                    </div>
                  </div>
                  <div className="border-b border-gray-200"></div>
                  
                  <div className="flex items-start">
                    <Zap className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0 stroke-1" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm mb-1">Maksimum çeviklik:</p>
                      <p className="text-gray-600 text-sm">Onlayn, hibrid və canlı sessiya seçimləri ilə təlimi iş qrafikinə rahat uyğunlaşdırmaq imkanı.</p>
                    </div>
                  </div>
                  <div className="border-b border-gray-200"></div>
                  
                  <div className="flex items-start">
                    <TrendingUp className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0 stroke-1" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm mb-1">Özünəinamın güclənməsi:</p>
                      <p className="text-gray-600 text-sm">Praktiki rol-oyunları və real life ssenariləri üzərində işləməklə çıxış, ünsiyyət və qərarvermə bacarıqlarında hiss olunan irəliləyiş.</p>
                    </div>
                  </div>
                  <div className="border-b border-gray-200"></div>
                  
                  <div className="flex items-start">
                    <BarChart className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0 stroke-1" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm mb-1">Ölçülə bilən nəticələr:</p>
                      <p className="text-gray-600 text-sm">Ön-test və son-testlərlə bacarıq artımını kəmiyyətcə dəyərləndirən hesabatlar.</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={() => setCurrentPage('courses')}
                    className="btn-secondary px-6 py-2 text-sm"
                  >
                    Fərdi Təlimləri Kəşf Et
                  </button>
                </div>
              </div>

              {/* Corporate Training */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8">
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    Korporativ Yönümlü Təlimlər
                  </h4>
                </div>
                
                <div className="space-y-6 mb-6">
                  <div className="flex items-start">
                    <Users className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0 stroke-1" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm mb-1">Komanda sinerjisi və əməkdaşlıq:</p>
                      <p className="text-gray-600 text-sm">Interaktiv qrup layihələri vasitəsilə kollektiv problem-həll etmə və koordinasiya bacarıqları inkişaf etdirilir.</p>
                    </div>
                  </div>
                  <div className="border-b border-gray-200"></div>
                  
                  <div className="flex items-start">
                    <UserCog className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0 stroke-1" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm mb-1">Liderlik və idarəetmə kompetensiyaları:</p>
                      <p className="text-gray-600 text-sm">Situasiya-əsaslı məşqlər, konflikt menecmenti simulyasiyaları və strateji düşüncə modulları ilə gələcək liderlər formalaşdırılır.</p>
                    </div>
                  </div>
                  <div className="border-b border-gray-200"></div>
                  
                  <div className="flex items-start">
                    <Building2 className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0 stroke-1" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm mb-1">Şirkət hədəflərinə inteqrasiya:</p>
                      <p className="text-gray-600 text-sm">Təlim məzmunu müəssisənin biznes strategiyası, KPI və korporativ dəyərləri ilə uzlaşdırılır.</p>
                    </div>
                  </div>
                  <div className="border-b border-gray-200"></div>
                  
                  <div className="flex items-start">
                    <PieChart className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0 stroke-1" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm mb-1">ROI-yönümlü nəticə ölçümü:</p>
                      <p className="text-gray-600 text-sm">Performans indikatorları, işçi məmnuniyyəti sorğuları və satış/istehsal metrikləri üzərindən təlimin biznesə təsiri izlənir.</p>
                    </div>
                  </div>
                  <div className="border-b border-gray-200"></div>
                  
                  <div className="flex items-start">
                    <BookOpen className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0 stroke-1" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm mb-1">Davamedici post-təlim dəstək:</p>
                      <p className="text-gray-600 text-sm">Mentor sessiyaları, resurs kitabxanası və on-demand vebinarlar ilə öyrənilənlərin iş mühitində tətbiqi davamlı olaraq gücləndirilir.</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={() => setCurrentPage('courses')}
                    className="btn-secondary px-6 py-2 text-sm"
                  >
                    Korporativ Təlimləri Öyrən
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>
      
      {/* Events and Seminars Section */}
      <section className="py-20" style={{backgroundColor: '#F4F6FA'}}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 pt-8">
            <h2 
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                maxWidth: '28ch',
                margin: '0 auto'
              }}
            >
              Sizi ilhamlandıracaq yaxın tədbir və seminarlarımız
            </h2>
          </div>
          
          {/* Upcoming Events */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Event 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 relative overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Early-bird ribbon */}
              {isEarlyBird(eventData[0].date) && (
                <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full transform rotate-12 shadow-lg">
                  Early Bird
                </div>
              )}
              
              <div className="flex items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">Seminar</span>
                    <span className="text-sm text-gray-500">25 Yanvar 2025</span>
                  </div>
                  <h3 className="text-gray-800 mb-3" style={{
                    fontFamily: "'Lora', serif",
                    fontWeight: 600,
                    fontSize: '1.25rem',
                    lineHeight: 1.35
                  }}>
                    "Kameraların Qarşısında İnamlı Çıxış" Açıq Seminarı
                  </h3>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4" style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: '0.9rem',
                lineHeight: 1.55
              }}>
                Televiziya, youtube və sosial media platformalarında professional çıxış etmək istəyənlər üçün praktiki təlim. Kamera həyəcanı, bədən dili və mesajın effektiv çatdırılması mövzularında.
              </p>
              
              {/* Seats availability */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Qalan yerlər</span>
                  <span className="font-semibold text-gray-800">
                    {eventData[0].totalSeats - eventData[0].bookedSeats} / {eventData[0].totalSeats} yer qalıb
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(eventData[0].bookedSeats / eventData[0].totalSeats) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-4">14:00-16:00</span>
                  <span>Mərkəz</span>
                </div>
                <button className="btn-primary px-4 py-2" style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  lineHeight: 1.4
                }}>
                  Qeydiyyat
                </button>
              </div>
            </div>

            {/* Event 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 relative overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Early-bird ribbon */}
              {isEarlyBird(eventData[1].date) && (
                <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full transform rotate-12 shadow-lg">
                  Early Bird
                </div>
              )}
              
              <div className="flex items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">Masterclass</span>
                    <span className="text-sm text-gray-500">2 Fevral 2025</span>
                  </div>
                  <h3 className="text-gray-800 mb-3" style={{
                    fontFamily: "'Lora', serif",
                    fontWeight: 600,
                    fontSize: '1.25rem',
                    lineHeight: 1.35
                  }}>
                    "Liderlik və Komanda İdarəçiliyi" Masterclass
                  </h3>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4" style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: '0.9rem',
                lineHeight: 1.55
              }}>
                Şirkət rəhbərləri və komanda liderləri üçün nəzərdə tutulmuş intensiv təlim proqramı. Motivasiya, delegasiya və konflikt həlli strategiyaları üzərində praktiki işlər.
              </p>
              
              {/* Seats availability */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Qalan yerlər</span>
                  <span className="font-semibold text-gray-800">
                    {eventData[1].totalSeats - eventData[1].bookedSeats} / {eventData[1].totalSeats} yer qalıb
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(eventData[1].bookedSeats / eventData[1].totalSeats) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-4">10:00-17:00</span>
                  <span>Online</span>
                </div>
                <button className="btn-primary px-4 py-2" style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  lineHeight: 1.4
                }}>
                  Qeydiyyat
                </button>
              </div>
            </div>

            {/* Event 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 relative overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Early-bird ribbon */}
              {isEarlyBird(eventData[2].date) && (
                <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full transform rotate-12 shadow-lg">
                  Early Bird
                </div>
              )}
              
              <div className="flex items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded">Workshop</span>
                    <span className="text-sm text-gray-500">30 Yanvar 2025</span>
                  </div>
                  <h3 className="text-gray-800 mb-3" style={{
                    fontFamily: "'Lora', serif",
                    fontWeight: 600,
                    fontSize: '1.25rem',
                    lineHeight: 1.35
                  }}>
                    "Səsli Oxu və Təqdimat Texnikaları" Workshop
                  </h3>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4" style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: '0.9rem',
                lineHeight: 1.55
              }}>
                Səsli oxuma, artikulyasiya və təqdimat bacarıqlarını inkişaf etdirən praktiki workshop. Təcrübəli təlimçilərlə birebir məşqlər və qrup təqdimatları.
              </p>
              
              {/* Seats availability */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Qalan yerlər</span>
                  <span className="font-semibold text-gray-800">
                    {eventData[2].totalSeats - eventData[2].bookedSeats} / {eventData[2].totalSeats} yer qalıb
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(eventData[2].bookedSeats / eventData[2].totalSeats) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-4">15:00-18:00</span>
                  <span>Mərkəz</span>
                </div>
                <button className="btn-primary px-4 py-2" style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  lineHeight: 1.4
                }}>
                  Qeydiyyat
                </button>
              </div>
            </div>

            {/* Event 4 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 relative overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Early-bird ribbon */}
              {isEarlyBird(eventData[3].date) && (
                <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full transform rotate-12 shadow-lg">
                  Early Bird
                </div>
              )}
              
              <div className="flex items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded">Konferans</span>
                    <span className="text-sm text-gray-500">15 Fevral 2025</span>
                  </div>
                  <h3 className="text-gray-800 mb-3" style={{
                    fontFamily: "'Lora', serif",
                    fontWeight: 600,
                    fontSize: '1.25rem',
                    lineHeight: 1.35
                  }}>
                    "Gələcəyin Ünsiyyət Texnologiyaları" Konferansı
                  </h3>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4" style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: '0.9rem',
                lineHeight: 1.55
              }}>
                AI və rəqəmsal texnologiyaların ünsiyyət sahəsinə təsiri mövzusunda beynəlxalq ekspertlərlə konferans. Networking və panel müzakirələr daxil olmaqla.
              </p>
              
              {/* Seats availability */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Qalan yerlər</span>
                  <span className="font-semibold text-gray-800">
                    {eventData[3].totalSeats - eventData[3].bookedSeats} / {eventData[3].totalSeats} yer qalıb
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(eventData[3].bookedSeats / eventData[3].totalSeats) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-4">09:00-17:00</span>
                  <span>Online</span>
                </div>
                <button className="btn-primary px-4 py-2" style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  lineHeight: 1.4
                }}>
                  Qeydiyyat
                </button>
              </div>
            </div>

            {/* Event 5 */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 relative overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Early-bird ribbon */}
              {isEarlyBird(eventData[4].date) && (
                <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full transform rotate-12 shadow-lg">
                  Early Bird
                </div>
              )}
              
              <div className="flex items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">İntensiv</span>
                    <span className="text-sm text-gray-500">28 Yanvar 2025</span>
                  </div>
                  <h3 className="text-gray-800 mb-3" style={{
                    fontFamily: "'Lora', serif",
                    fontWeight: 600,
                    fontSize: '1.25rem',
                    lineHeight: 1.35
                  }}>
                    "Biznes Nitqi və Neqosasiya" İntensiv Kursu
                  </h3>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4" style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: '0.9rem',
                lineHeight: 1.55
              }}>
                Biznes mühitində effektiv ünsiyyət və neqosasiya bacarıqları üzrə intensiv təlim. Rol oyunları, simulyasiya və real case study-lər.
              </p>
              
              {/* Seats availability */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Qalan yerlər</span>
                  <span className="font-semibold text-gray-800">
                    {eventData[4].totalSeats - eventData[4].bookedSeats} / {eventData[4].totalSeats} yer qalıb
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(eventData[4].bookedSeats / eventData[4].totalSeats) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-4">13:00-17:00</span>
                  <span>Mərkəz</span>
                </div>
                <button className="btn-primary px-4 py-2" style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  lineHeight: 1.4
                }}>
                  Qeydiyyat
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20" style={{backgroundColor: '#FFFFFF'}}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 pt-8">
            <h2 
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                maxWidth: '28ch',
                margin: '0 auto'
              }}
            >
              {t('testimonialsTitle')}
            </h2>
          </div>
          
{approvedTestimonials.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-lg">
                <p className="text-gray-600">No testimonials available at the moment.</p>
              </div>
            </div>
          ) : (
            <div className="relative">
              {/* Scroll indicators */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#FFFFFF] to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FFFFFF] to-transparent z-10 pointer-events-none"></div>
              
              {/* Horizontally Scrollable Container */}
              <div 
                className="testimonials-container flex items-stretch space-x-6 overflow-x-auto pb-4 px-4" 
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  scrollBehavior: 'smooth'
                }}
                onMouseEnter={() => setIsCarouselHovered(true)}
                onMouseLeave={() => setIsCarouselHovered(false)}
                css={`
                  &::-webkit-scrollbar {
                    display: none;
                  }
                `}
              >
                {approvedTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                    <div className="text-center mb-4">
                      <p 
                        className="text-gray-700 mb-4 h-20 overflow-hidden"
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 500,
                          fontStyle: 'italic',
                          fontSize: '1rem',
                          lineHeight: 1.55
                        }}
                      >
                        {testimonial.text[language]}
                      </p>
                      
                      {/* Star Rating */}
                      <div className="flex justify-center space-x-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 text-center">
                      <div className="flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-3 ring-2 ring-blue-100">
                          {avatarImages[testimonial.id] ? (
                            <img 
                              src={avatarImages[testimonial.id]} 
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              fetchpriority="low"
                              onError={(e) => {
                                // Fallback to silhouette if image fails to load
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center" style={{display: avatarImages[testimonial.id] ? 'none' : 'flex'}}>
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="text-left">
                          <h4 
                            className="text-gray-800"
                            style={{
                              fontFamily: "'Poppins', sans-serif",
                              fontWeight: 600,
                              fontSize: '0.95rem',
                              lineHeight: 1.4
                            }}
                          >
                            {testimonial.name}
                          </h4>
                          <p className="text-blue-600 text-xs">Tələbə</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Career Development CTA Section */}
      <section style={{backgroundColor: '#F5F7FA', paddingTop: '6rem', paddingBottom: '5rem', marginBottom: '4rem'}}>
        <div className="container mx-auto px-4">
          <h2 
            className="mb-12"
            style={{
              fontFamily: "'Lora', serif",
              fontWeight: 700,
              fontSize: 'clamp(2.25rem, 4vw, 3rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#1E1E1E',
              textAlign: 'center',
              maxWidth: '24ch',
              margin: '0 auto 3rem auto'
            }}
          >
            Karyeranızı inkişaf etdirmək üçün təlimə və ya konsultasiyaya hazırsınız?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Training Card */}
            <div 
              className="bg-white flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              style={{
                borderRadius: '12px',
                boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                padding: '3.5rem 3rem',
                transitionTimingFunction: 'cubic-bezier(.25,.8,.42,1)'
              }}
            >
              <div>
                <h3 
                  className="mb-6"
                  style={{
                    fontFamily: "'Lora', serif",
                    fontWeight: 600,
                    fontSize: '1.5rem',
                    lineHeight: 1.3,
                    color: '#1E1E1E'
                  }}
                >
                  Sizə uyğun təlimi tapın
                </h3>
                <p 
                  className="mb-8"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: '#5B5B5B'
                  }}
                >
                  Ehtiyaclarınıza və karyera hədəflərinizə uyğun təlimləri seçin
                </p>
              </div>
              <button 
                onClick={() => setCurrentPage('courses')}
                className="btn-primary transition-all duration-300"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  letterSpacing: '0.5px',
                  minHeight: '48px',
                  borderRadius: '4px',
                  alignSelf: 'flex-start',
                  padding: '0 1rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.backgroundColor = '#1d5def';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.backgroundColor = '#2166FF';
                }}
              >
                Təlim tap
              </button>
            </div>

            {/* Consultation Card */}
            <div 
              className="bg-white flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              style={{
                borderRadius: '12px',
                boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                padding: '3.5rem 3rem',
                transitionTimingFunction: 'cubic-bezier(.25,.8,.42,1)'
              }}
            >
              <div>
                <h3 
                  className="mb-6"
                  style={{
                    fontFamily: "'Lora', serif",
                    fontWeight: 600,
                    fontSize: '1.5rem',
                    lineHeight: 1.3,
                    color: '#1E1E1E'
                  }}
                >
                  Peşəkar konsultasiya sifariş edin
                </h3>
                <p 
                  className="mb-8"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: '#5B5B5B'
                  }}
                >
                  Dəyərli tövsiyələr və uğura aparan fərdi yol xəritəsi əldə edin
                </p>
              </div>
              <button 
                onClick={() => setCurrentPage('contact')}
                className="btn-primary transition-all duration-300"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  letterSpacing: '0.5px',
                  minHeight: '48px',
                  borderRadius: '4px',
                  alignSelf: 'flex-start',
                  padding: '0 1rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.backgroundColor = '#1d5def';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.backgroundColor = '#2166FF';
                }}
              >
                Qrafik təyin et
              </button>
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

export default HomePage;