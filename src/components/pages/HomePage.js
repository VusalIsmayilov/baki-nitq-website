import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';
import { ChevronRight, ChevronDown, User, ArrowUpRight, ArrowRight } from 'lucide-react';
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
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isTeamSectionVisible, setIsTeamSectionVisible] = useState(false);
  const [isHeroQuoteVisible, setIsHeroQuoteVisible] = useState(false);
  const [currentTrainerIndex, setCurrentTrainerIndex] = useState(0);
  
  // Lottie refs for controlling animations
  const lottieRef1 = useRef();
  const lottieRef2 = useRef();
  const lottieRef3 = useRef();

  // Training cards data from CoursesPage
  const trainingCards = [
    // Individual Trainings (3 cards)
    {
      id: 'speech',
      title: 'Nitq təlimləri',
      excerpt: 'İctimai çıxış həyəcanı və nitq bacarıqlarının inkişafı',
      type: 'individual',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop',
      slug: 'speech-training'
    },
    {
      id: 'leadership',
      title: 'Liderlik və Effektiv Ünsiyyət',
      excerpt: 'Liderlik bacarıqları və idarəetmə prosesində effektiv ünsiyyət',
      type: 'individual',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
      slug: 'leadership-communication'
    },
    {
      id: 'marketing',
      title: 'Marketinq əsasları və Praktiki Marketinq',
      excerpt: 'Marketinq strategiyaları və neoromarketinq texnikaları',
      type: 'individual',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      slug: 'marketing-training'
    },
    // Corporate Trainings (3 cards)
    {
      id: 'corporate-leadership',
      title: 'Liderlik və Effektiv Ünsiyyət (Korporativ)',
      excerpt: 'Korporativ mühitdə liderlik və komanda idarəçiliyi',
      type: 'corporate',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      slug: 'corporate-leadership'
    },
    {
      id: 'leader-voice',
      title: 'Liderin Səsi və Bədən Dili',
      excerpt: 'Səs tonu, bədən dili və effektiv jestlərin istifadəsi',
      type: 'corporate',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      slug: 'leader-voice'
    },
    {
      id: 'speech-expression',
      title: 'Nitq və Özünü İfadə Bacarıqları',
      excerpt: 'Korporativ mühitdə özünü ifadə və təqdimat bacarıqları',
      type: 'corporate',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
      slug: 'speech-expression'
    }
  ];

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

  // Scroll animation for team section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.classList.contains('team-section')) {
            setIsTeamSectionVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const teamSection = document.querySelector('.team-section');
    if (teamSection) {
      observer.observe(teamSection);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-sliding testimonials
  useEffect(() => {
    const { testimonials } = siteContent || {};
    const approvedTestimonials = testimonials?.filter(testimonial => testimonial.approved) || [];
    
    if (approvedTestimonials.length > 3 && !isCarouselHovered) {
      const interval = setInterval(() => {
        setCurrentTestimonialIndex(prev => {
          const maxIndex = approvedTestimonials.length - 3;
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, 4000); // Auto-slide every 4 seconds
      
      return () => clearInterval(interval);
    }
  }, [isCarouselHovered, siteContent]);

  // Scroll animation for hero quote section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.classList.contains('hero-quote-section')) {
            setIsHeroQuoteVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const heroQuoteSection = document.querySelector('.hero-quote-section');
    if (heroQuoteSection) {
      observer.observe(heroQuoteSection);
    }

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
      title: 'Nitq və Ünsiyyət Bacarıqlarının İnkişafı',
      description: 'Kurslarımız nitq və ünsiyyət bacarıqlarının inkişafına yönəlib. Bu sahədə nitq problemlərinin aşkarlanması və aradan qaldırılması, söz ehtiyatının artırılması, ləhcənin düzəldilməsi, kamera və kütlə qarşısında çıxışa hazırlıq, bədən dili və jestlərin effektiv istifadəsi kimi mövzular əhatə edilir.',
      image: '/maninsuit2.png'
    },
    {
      id: 'personalDevSupport',
      title: 'Şəxsi İnkişaf və Psixoloji Dəstək',
      description: 'Şəxsi inkişaf, psixoloji dəstək çərçivəsində həyəcan və özgüvən əskikliyinin aradan qaldırılması, etiket qaydaları, sosial ünsiyyət bacarıqlarının inkişafı, disiplin, fərdi inkişaf texnikaları, stress, həm də emosiyaların idarə edilməsi, eləcə də psixoloq dəstəyi və terapiya mövzularına toxunulur.',
      image: '/maninsuit2.png'
    },
    {
      id: 'corporateLeadershipSkills',
      title: 'Korporativ Bacarıqlar və Liderlik',
      description: 'Eyni zamanda, kurslarımız korporativ bacarıqlar və liderlik sahəsində də inkişafa yönəlib. Bu bölmədə liderlik qabiliyyətlərinin inkişafı, münaqişələrin effektiv idarə edilməsi və komanda idarəetmə texnikaları kimi mövzular yer alır.',
      image: '/maninsuit2.png'
    }
  ];

  // Course data for grid - CMS-ready structure
  const courses = [
    {
      id: 1,
      title: 'Kamera Qarşısında İnamlı Çıxış',
      slug: 'kamera-qarşısında-inamli-cixis',
      excerpt: 'Televiziya və media çıxışları üçün praktiki təlim. Professional səviyyədə çıxış bacarıqları.',
      image: '/course1.jpg',
      type: 'individual'
    },
    {
      id: 2,
      title: 'Biznes Nitqi və Təqdimat',
      slug: 'biznes-nitqi-ve-teqdimat',
      excerpt: 'Korporativ mühitdə effektiv ünsiyyət. Prezentasiya hazırlama və təqdim etmə texnikaları.',
      image: '/course2.jpg',
      type: 'corporate'
    },
    {
      id: 3,
      title: 'Liderlik və Komanda İdarəçiliyi',
      slug: 'liderlik-ve-komanda-idareciliyi',
      excerpt: 'Komanda liderliyi bacarıqları. Motivasiya və delegasiya strategiyaları öyrənin.',
      image: '/course3.jpg',
      type: 'corporate'
    },
    {
      id: 4,
      title: 'Şəxsi Brend və İmaj',
      slug: 'sexsi-brend-ve-imaj',
      excerpt: 'Professional imaj yaradın. Şəxsi brendinizi inkişaf etdirmək üçün praktiki məsləhətlər.',
      image: '/course4.jpg',
      type: 'individual'
    },
    {
      id: 5,
      title: 'Özgüvən və Stressə Qarşı Mübarizə',
      slug: 'ozguven-ve-stresse-qarsi-mubarize',
      excerpt: 'Özgüvəninizi artırın və stresslə effektiv şəkildə mübarizə aparın. Psixoloji dəstək və praktiki üsullar.',
      image: '/course5.jpg',
      type: 'individual'
    },
    {
      id: 6,
      title: 'Korporativ Ünsiyyət və Neqosasiya',
      slug: 'korporativ-unsiyyet-ve-neqosasiya',
      excerpt: 'Şirkət daxili ünsiyyət və müzakirə bacarıqları. Neqosasiya strategiyaları və münaqişə həlli.',
      image: '/course6.jpg',
      type: 'corporate'
    }
  ];

  // Trainer data for carousel - from About page "Peşəkar Təlimçi Heyətimiz" section
  const trainers = [
    {
      id: 1,
      name: 'Firuzə Aslanova',
      title: 'Təsisçi, Çıxış və Nitq Bacarıqları Təlimçisi',
      specialty: 'Nitq Mütəxəssisi',
      image: '/trainer1.jpg',
      bio: 'Firuzə Aslanova Bakı Nitq Mərkəzinin təsisçisi, çıxış və nitq bacarıqları təlimçisi, həmçinin peşəkar pedaqoq və jurnalistdir. Müxtəlif təhsil müəssisələrində pedaqoq kimi çalışıb və uzun müddət "Big Group" şirkətində müxbir olaraq fəaliyyət göstərib. Azərbaycanda nitq təlimi alıb və həmçinin Türkiyənin "Badi" fəaliyyət platformasında iştirak edərək "Əsas işarə dili və bədən dili" mövzusunda təlim alıb.'
    },
    {
      id: 2,
      name: 'Pərvin Pərlan',
      title: 'Çıxış və Korporativ Ünsiyyət Təlimçisi',
      specialty: 'Liderlik Təlimçisi',
      image: '/trainer2.jpg',
      bio: 'Pərvin Pərlan çıxış və korporativ ünsiyyət təlimçisi, həmçinin peşəkar marketinqçidir. 18 illik korporativ iş təcrübəsinə malikdir. Rusiyada "Ostankino" aparıcılar üçün ali məktəbini bitirib, İngiltərədə Marketinq və Kommunikasiya üzrə magistr dərəcəsi alıb və hazırda Kommunikasiya üzrə doktorluq təhsili davam etdirir. "Liderlik və Effektiv Ünsiyyət" mövzularında təlimlər keçirir.'
    },
    {
      id: 3,
      name: 'Lalə Mustafayeva',
      title: 'Peşəkar Psixoloq',
      specialty: 'Təqdimat Mütəxəssisi',
      image: '/trainer3.jpg',
      bio: 'Lalə Mustafayeva peşəkar psixoloqdur. İngiltərədə Essex Universitetində Psixologiya üzrə bakalavr dərəcəsi alıb və Britaniya Psixologiya Cəmiyyətinin (BPS) üzvüdür. İnsan psixologiyasının incəliklərini öyrənmək və fərdin psixoloji rifahını yaxşılaşdırmağa diqqət yetirir. Psixoloji sağlamlıq, stress idarəetmə, özünütəqdimat və şəxsi inkişaf mövzularında müxtəlif konfrans və seminarlarda iştirak edib.'
    },
    {
      id: 4,
      name: 'Ayşən Hüseynova',
      title: 'Peşəkar Aparıcı və Diksiya Təlimçisi',
      specialty: 'Ünsiyyət Koçu',
      image: '/trainer4.jpg',
      bio: 'Ayşən Hüseynova peşəkar aparıcı və diksiya təlimçisidir. Düzgün nitq, səlis ifadə və effektiv danışıq üçün unikal metodologiyalara malikdir. Bakı Dövlət Universitetinin Jurnalistika fakültəsini bitirib. Sonradan Türkiyədə Kocaeli Universitetində jurnalistika üzrə magistr dərəcəsi alıb. Hazırda İctimai Televiziyada "Xəbərlər" proqramının və İctimai Radioda "Xəbər Vaxtı" proqramının aparıcısıdır.'
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
      {/* Custom CSS for responsive grid, team section, and hero quote */}
      <style jsx>{`
        @media (max-width: 767px) {
          .differences-grid {
            gap: 32px !important;
          }
          .differences-card {
            text-align: center !important;
          }
          .differences-card .card-icon {
            justify-content: center !important;
          }
          .team-floating-tile {
            bottom: -36px !important;
            right: 50% !important;
            left: auto !important;
            transform: translateX(50%) rotate(12deg) !important;
          }
          .team-content-wrapper {
            gap: 32px !important;
          }
          .hero-quote-section blockquote {
            font-size: 1.75rem !important;
          }
          .hero-quote-section .button-container {
            gap: 24px !important;
          }
        }
        @media (max-width: 479px) {
          .hero-quote-section {
            background: linear-gradient(180deg, rgba(33, 102, 255, 0.8) 0%, rgba(33, 102, 255, 0.8) 100%) !important;
          }
          .hero-quote-section .primary-btn,
          .hero-quote-section .secondary-btn {
            width: 80% !important;
            min-width: auto !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .differences-grid {
            gap: 24px !important;
          }
        }
        @media (min-width: 1024px) {
          .differences-grid {
            gap: 24px !important;
          }
        }
      `}</style>
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
        
        <div className="container mx-auto px-4 text-left flex justify-start items-center h-full relative">
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
          
          {/* Bottom Left Action Buttons */}
          <div className="absolute bottom-8 left-4 flex gap-4">
            <button 
              onClick={() => setCurrentPage('courses')}
              className="flex items-center gap-2 transition-all duration-300 group"
              style={{
                backgroundColor: '#2166FF',
                color: 'white',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: '0.5px',
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(33, 102, 255, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.backgroundColor = '#1d5def';
                e.target.style.boxShadow = '0 6px 16px rgba(33, 102, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.backgroundColor = '#2166FF';
                e.target.style.boxShadow = '0 4px 12px rgba(33, 102, 255, 0.3)';
              }}
            >
              <span>Təlim tap</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
            
            <button 
              onClick={() => setCurrentPage('contact')}
              className="flex items-center gap-2 transition-all duration-300 group"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#2166FF',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: '0.5px',
                padding: '12px 20px',
                borderRadius: '8px',
                border: '2px solid #2166FF',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.backgroundColor = '#2166FF';
                e.target.style.color = 'white';
                e.target.style.boxShadow = '0 6px 16px rgba(33, 102, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                e.target.style.color = '#2166FF';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
            >
              <span>Qrafik təyin et</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <WaveDivider />

      {/* Our Differences Section */}
      <section className="relative" style={{backgroundColor: '#FFFFFF', paddingTop: '96px', paddingBottom: '80px'}}>
        <div className="container mx-auto px-4">
          {/* Section Heading */}
          <div className="text-left max-w-4xl mb-16">
            <h2 
              className="mb-4"
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                maxWidth: '28ch',
                margin: '0 0 1rem 0',
                color: '#1E1E1E'
              }}
            >
              Fərqimiz
            </h2>
            <p 
              className="text-left"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#4A4A4A',
                margin: '0'
              }}
            >
              Real-həyat məşqləri, təcrübəli təlimçilər və beynəlxalq səviyyəli metodika birlikdə nəticəverən tədris təcrübəsi yaradaraq müştərilərimizin inamını möhkəmləndirir.
            </p>
          </div>
          
          {/* Responsive Grid: Desktop 3 cols (24px gutters), Tablet 2 cols, Mobile 1 col (32px vertical gap) */}
          <div className="differences-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{gap: '24px'}}>
            {/* Practical Approach */}
            <div 
              className={`differences-card bg-white border border-gray-100 transition-all duration-200 ${
                visibleCards.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              data-card-index="0"
              style={{
                borderRadius: '12px',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
                padding: '32px 24px',
                cursor: 'pointer',
                transform: 'translateY(0px)',
                transition: 'all 200ms cubic-bezier(0.25, 0.8, 0.42, 1)',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.06)';
              }}
            >
              <div className="text-center mb-6">
                <div className="card-icon mb-4 flex justify-center">
                  <div 
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      backgroundColor: '#2166FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="white" 
                      strokeWidth="1.5"
                    >
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 1v6m0 6v6"/>
                      <path d="m21 12-6-3-6 3-6-3"/>
                    </svg>
                  </div>
                </div>
                <h3 
                  className="text-gray-800 mb-3"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.125rem',
                    lineHeight: 1.35,
                    letterSpacing: 'normal'
                  }}
                >
                  Praktiki yanaşma
                </h3>
              </div>
              <p 
                className="text-center"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: '#5B5B5B',
                  maxWidth: '80ch',
                  margin: '0 auto'
                }}
              >
                Təlimlərimiz real həyat vəziyyətlərinə uyğun praktik məşqlərlə zəngindir.
              </p>
            </div>

            {/* Professional Trainers */}
            <div 
              className={`differences-card bg-white border border-gray-100 transition-all duration-200 ${
                visibleCards.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              data-card-index="1"
              style={{
                borderRadius: '12px',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
                padding: '32px 24px',
                cursor: 'pointer',
                transform: 'translateY(0px)',
                transition: 'all 200ms cubic-bezier(0.25, 0.8, 0.42, 1)',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.06)';
              }}
            >
              <div className="text-center mb-6">
                <div className="card-icon mb-4 flex justify-center">
                  <div 
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      backgroundColor: '#02A44E',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="white" 
                      strokeWidth="1.5"
                    >
                      <path d="M12 2a3 3 0 0 0-3 3c0 1.5 1.5 3 3 3s3-1.5 3-3a3 3 0 0 0-3-3"/>
                      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
                    </svg>
                  </div>
                </div>
                <h3 
                  className="text-gray-800 mb-3"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.125rem',
                    lineHeight: 1.35,
                    letterSpacing: 'normal'
                  }}
                >
                  Peşəkar təlimçilər
                </h3>
              </div>
              <p 
                className="text-center"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: '#5B5B5B',
                  maxWidth: '80ch',
                  margin: '0 auto'
                }}
              >
                Sahələrində təcrübəli və yüksək ixtisaslı təlimçilərimiz sizə maksimum dəstək göstərir.
              </p>
            </div>

            {/* Modern Methodology */}
            <div 
              className={`differences-card bg-white border border-gray-100 transition-all duration-200 ${
                visibleCards.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              data-card-index="2"
              style={{
                borderRadius: '12px',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
                padding: '32px 24px',
                cursor: 'pointer',
                transform: 'translateY(0px)',
                transition: 'all 200ms cubic-bezier(0.25, 0.8, 0.42, 1)',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.06)';
              }}
            >
              <div className="text-center mb-6">
                <div className="card-icon mb-4 flex justify-center">
                  <div 
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      backgroundColor: '#F59E0B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="white" 
                      strokeWidth="1.5"
                    >
                      <path d="M12 6.5a6 6 0 1 0 0 12 6 6 0 0 0 0-12"/>
                      <path d="M12 2V6.5"/>
                      <path d="M18.5 12H22"/>
                      <path d="M12 18.5V22"/>
                      <path d="M5.5 12H2"/>
                    </svg>
                  </div>
                </div>
                <h3 
                  className="text-gray-800 mb-3"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.125rem',
                    lineHeight: 1.35,
                    letterSpacing: 'normal'
                  }}
                >
                  Müasir metodika
                </h3>
              </div>
              <p 
                className="text-center"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: '#5B5B5B',
                  maxWidth: '80ch',
                  margin: '0 auto'
                }}
              >
                Beynəlxalq standartlara uyğun müasir təlim metodlarından istifadə edirik.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="team-section" style={{backgroundColor: '#FFFFFF', paddingTop: '96px', paddingBottom: '80px'}}>
        <div className="container mx-auto px-4">
          <div className="team-content-wrapper flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Column - Image */}
            <div className={`w-full lg:w-1/2 relative transition-all duration-700 ${
              isTeamSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-10 translate-y-5'
            }`}>
              {/* Main Image */}
              <div 
                className="relative overflow-hidden"
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
                  backgroundColor: '#EDF0F7',
                  height: '400px'
                }}
              >
                <img 
                  src="/team-photo.jpg" 
                  alt="Bizim komanda"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              
              {/* Floating Icon Tile */}
              <div 
                className="team-floating-tile absolute bg-white flex items-center justify-center"
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '12px',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
                  transform: 'rotate(12deg)',
                  bottom: '-24px',
                  right: '-24px'
                }}
              >
                <svg 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#2166FF" 
                  strokeWidth="1.5"
                >
                  <path d="m11 17 2 2a1 1 0 1 0 3-3"/>
                  <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>
                  <path d="m21 3 1 11h-2"/>
                  <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/>
                  <path d="M3 4h8"/>
                </svg>
              </div>
            </div>
            
            {/* Right Column - Content */}
            <div className={`w-full lg:w-1/2 transition-all duration-700 delay-100 ${
              isTeamSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <h2 
                className="mb-6"
                style={{
                  fontFamily: "'Lora', serif",
                  fontWeight: 700,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  maxWidth: '24ch',
                  color: '#1E1E1E'
                }}
              >
                Bizim komanda haqqında
              </h2>
              
              <div 
                className="mb-8"
                style={{
                  maxWidth: '460px'
                }}
              >
                <p 
                  className="mb-4"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: '1.125rem',
                    lineHeight: 1.6,
                    color: '#4A4A4A'
                  }}
                >
                  Bizim komandamız sahələrində yüksək təcrübəyə malik peşəkarlardan ibarətdir. Hər birimiz öz sahəsində ekspert olaraq, müştərilərimizin uğuruna töhfə veririk. Təcrübəli təlimçilərimiz beynəlxalq standartlara uyğun metodlarla işləyir.
                </p>
                
                <p 
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: '1.125rem',
                    lineHeight: 1.6,
                    color: '#4A4A4A'
                  }}
                >
                  Komandamızın hər üzvü fərdi yanaşma və professional dəstəklə hər müştərinin ehtiyaclarına uyğun həllər təqdim edir.
                </p>
              </div>
              
              <button 
                onClick={() => setCurrentPage('about')}
                className="group flex items-center gap-2 transition-all duration-150"
                style={{
                  backgroundColor: '#2166FF',
                  color: 'white',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem',
                  height: '48px',
                  paddingLeft: '32px',
                  paddingRight: '32px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(33, 102, 255, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.backgroundColor = '#1d5def';
                  e.target.style.boxShadow = '0 4px 12px rgba(33, 102, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.backgroundColor = '#2166FF';
                  e.target.style.boxShadow = '0 2px 8px rgba(33, 102, 255, 0.2)';
                }}
              >
                <span>Ətraflı</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Hero Quote Section */}
      <section 
        className="hero-quote-section relative overflow-hidden"
        style={{
          paddingTop: '96px',
          paddingBottom: '80px',
          backgroundImage: 'url(/hero-speaker.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background Image Overlay with Gradient */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHeroQuoteVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(180deg, rgba(33, 102, 255, 0.65) 0%, rgba(33, 102, 255, 0.50) 100%)'
          }}
        />
        
        {/* Vignette Effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 40%, rgba(20, 79, 230, 0.15) 80%)'
          }}
        />
        
        {/* Fallback for missing image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: '#7A96F4',
            backgroundImage: 'linear-gradient(135deg, #7A96F4 0%, #6B8BF3 100%)'
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            {/* Quote Text */}
            <blockquote 
              className={`mb-8 transition-all duration-300 ${
                isHeroQuoteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 700,
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                maxWidth: '30ch',
                margin: '0 auto 2rem auto'
              }}
            >
              "Hər böyük uğur kiçik addımlarla başlayır. Bugün o addımı atın."
            </blockquote>
            
            {/* CTA Buttons */}
            <div 
              className={`button-container flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-300 delay-100 ${
                isHeroQuoteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{
                marginTop: '32px'
              }}
            >
              {/* Primary Button */}
              <button 
                onClick={() => setCurrentPage('courses')}
                className="primary-btn group flex items-center gap-2 transition-all duration-150"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#2166FF',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem',
                  height: '48px',
                  paddingLeft: '32px',
                  paddingRight: '32px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  minWidth: '160px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.backgroundColor = '#f8faff';
                  e.target.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.backgroundColor = '#FFFFFF';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }}
              >
                <span>Başlayın</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
              </button>
              
              {/* Secondary Button */}
              <button 
                onClick={() => setCurrentPage('about')}
                className="secondary-btn group flex items-center gap-2 transition-all duration-150"
                style={{
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem',
                  height: '48px',
                  paddingLeft: '32px',
                  paddingRight: '32px',
                  borderRadius: '4px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  minWidth: '160px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
              >
                <span>Ətraflı</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20" style={{backgroundColor: '#FFFFFF'}}>
        <div className="container mx-auto px-4">
          <div className="text-left mb-12 pt-8">
            <h2 
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                maxWidth: '28ch',
                margin: '0 0 1rem 0'
              }}
            >
              Populyar kurslarımızla tanış olun
            </h2>
          </div>
          
          {/* Services Cards Grid */}
          <div className="differences-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{gap: '24px'}}>
            {services.map((service, index) => (
              <div 
                key={service.id}
                className="differences-card bg-white border border-gray-100 transition-all duration-200 flex flex-col h-full"
                style={{
                  borderRadius: '12px',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06)',
                  padding: '32px 24px',
                  cursor: 'pointer',
                  transform: 'translateY(0px)',
                  transition: 'all 200ms cubic-bezier(0.25, 0.8, 0.42, 1)',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.06)';
                }}
              >
                {/* Card Content - grows to fill space */}
                <div className="flex-1 flex flex-col">
                  <div className="text-center mb-6">
                    <div className="card-icon mb-4 flex justify-center">
                      <div 
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '12px',
                          backgroundColor: index === 0 ? '#2166FF' : index === 1 ? '#02A44E' : '#F59E0B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="white" 
                          strokeWidth="1.5"
                        >
                          {index === 0 && (
                            <>
                              <path d="M21 12c0 1.1-.9 2-2 2H7l-3-3 3-3h12c1.1 0 2 .9 2 2z"/>
                              <path d="M21 6V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"/>
                              <path d="M21 18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"/>
                            </>
                          )}
                          {index === 1 && (
                            <>
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                              <circle cx="9" cy="7" r="4"/>
                              <path d="m22 2-5 10-5-5-5 10"/>
                              <path d="m16 12 5-10"/>
                            </>
                          )}
                          {index === 2 && (
                            <>
                              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                              <path d="M9 18h6"/>
                              <path d="M10 22h4"/>
                            </>
                          )}
                        </svg>
                      </div>
                    </div>
                    <h3 
                      className="text-gray-800 mb-3"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: '1.125rem',
                        lineHeight: 1.35,
                        letterSpacing: 'normal'
                      }}
                    >
                      {service.title}
                    </h3>
                  </div>
                  
                  {/* Description - grows to fill available space */}
                  <p 
                    className="text-center flex-1"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      color: '#5B5B5B',
                      maxWidth: '80ch',
                      margin: '0 auto',
                      marginBottom: '1.5rem'
                    }}
                  >
                    {service.description.split('.').slice(0, 2).join('.').trim()}.
                  </p>
                </div>
                
                {/* Button - always at bottom */}
                <div className="text-center mt-auto">
                  <button 
                    onClick={() => setCurrentPage('courses')}
                    className="btn-primary px-6 py-2"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '0.9rem',
                      lineHeight: 1.4
                    }}
                  >
                    Ətraflı
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Course Grid - Responsive Layout */}
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" style={{gap: '24px'}}>
              {trainingCards
                .sort((a, b) => a.type === 'individual' ? -1 : 1)
                .map((course) => (
                <div
                  key={course.id}
                  onClick={() => window.location.href = `/courses/${course.slug}`}
                  className="course-card group relative block cursor-pointer"
                  style={{
                    aspectRatio: '1',
                    borderRadius: '12px',
                    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06), inset 0 0 0 3px #2166FF',
                    overflow: 'hidden',
                    transform: 'translateY(0px)',
                    transition: 'all 300ms cubic-bezier(0.25, 0.8, 0.42, 1)',
                    backgroundColor: '#E7E7EE',
                    backgroundImage: `url(${course.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.10), inset 0 0 0 3px #2166FF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.06), inset 0 0 0 3px #2166FF';
                  }}
                  aria-label={`${course.title} - ${course.excerpt}`}
                  role="button"
                  tabIndex={0}
                >
                  {/* Overlay Info Bar with hover opacity change */}
                  <div 
                    className="absolute bottom-0 left-0 w-full flex flex-col justify-between px-4 py-3 group-hover:bg-opacity-92 transition-all duration-300"
                    style={{
                      backgroundColor: '#204BFF', // Darker blue for better contrast
                      height: '30%',
                      minHeight: '80px',
                      borderTopLeftRadius: '4px',
                      borderTopRightRadius: '4px'
                    }}
                  >
                    <div>
                      {/* Course Title */}
                      <h4 
                        className="mb-2"
                        style={{
                          fontFamily: "'Lora', serif",
                          fontWeight: 600,
                          fontSize: '1.125rem',
                          lineHeight: 1.3,
                          color: '#FFFFFF',
                          margin: '0 0 8px 0'
                        }}
                      >
                        {course.title}
                      </h4>
                      
                      {/* Course Excerpt */}
                      <p 
                        className="line-clamp-2"
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: 1.4,
                          color: 'rgba(255, 255, 255, 0.9)',
                          margin: '0',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {course.excerpt}
                      </p>
                    </div>
                    
                    {/* Hover Arrow - appears on hover */}
                    <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ArrowRight 
                        className="w-4 h-4 text-white transform translate-x-1 group-hover:translate-x-0 transition-transform duration-200" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </section>
      
      {/* Trainers Section */}
      <section style={{backgroundColor: '#FFFFFF', paddingTop: '96px', paddingBottom: '80px'}}>
        <div className="container mx-auto px-4">
          {/* Section Header Row */}
          <div className="flex items-start justify-between mb-16">
            {/* Left: Title and Subtitle */}
            <div>
              <h2 
                style={{
                  fontFamily: "'Lora', serif",
                  fontWeight: 700,
                  fontSize: 'clamp(32px, 4vw, 36px)',
                  lineHeight: 1.2,
                  color: '#1E293B',
                  margin: '0 0 8px 0'
                }}
              >
                Təlimçilərimiz
              </h2>
              <p 
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: 1.5,
                  color: '#6B7280',
                  margin: '0'
                }}
              >
                Sahələrində təcrübəli mütəxəssislərimizlə tanış olun
              </p>
            </div>
            
            {/* Right: Navigation Arrows */}
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentTrainerIndex(prev => 
                  prev === 0 ? trainers.length - 1 : prev - 1
                )}
                className="flex items-center justify-center transition-all duration-200"
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#2166FF',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1d5def';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#2166FF';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
              
              <button
                onClick={() => setCurrentTrainerIndex(prev => 
                  prev === trainers.length - 1 ? 0 : prev + 1
                )}
                className="flex items-center justify-center transition-all duration-200"
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#2166FF',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1d5def';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#2166FF';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Trainer Slide - Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left Column - Square Photo */}
            <div className="w-full lg:w-auto lg:flex-shrink-0">
              <div 
                style={{
                  width: '360px',
                  height: '360px',
                  backgroundColor: '#E7E7EE',
                  backgroundImage: `url(${trainers[currentTrainerIndex]?.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '12px',
                  maxWidth: '100%'
                }}
              />
            </div>
            
            {/* Right Column - Trainer Info */}
            <div className="flex-1">
              {/* Trainer Name */}
              <h3 
                style={{
                  fontFamily: "'Lora', serif",
                  fontWeight: 700,
                  fontSize: 'clamp(32px, 4vw, 40px)',
                  lineHeight: 1.2,
                  color: '#1E293B',
                  margin: '0 0 8px 0'
                }}
              >
                {trainers[currentTrainerIndex]?.name}
              </h3>
              
              {/* Job Title */}
              <p 
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: 1.4,
                  color: '#9CA3AF',
                  margin: '0 0 24px 0'
                }}
              >
                {trainers[currentTrainerIndex]?.title}
              </p>
              
              {/* Bio Paragraph */}
              <p 
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: 1.6,
                  color: '#4B5563',
                  maxWidth: '460px',
                  margin: '0'
                }}
              >
                {trainers[currentTrainerIndex]?.bio}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Events and Seminars Section */}
      <section className="py-20" style={{backgroundColor: '#FFFFFF'}}>
        <div className="container mx-auto px-4">
          <div className="text-left mb-12 pt-8">
            <h2 
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                maxWidth: '28ch',
                margin: '0 0 1rem 0'
              }}
            >
              Tədbir və seminarlarımız
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
          <div className="text-left mb-12 pt-8">
            <h2 
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                maxWidth: '28ch',
                margin: '0 0 1rem 0'
              }}
            >
              Müştərilərimiz bizim haqqımızda...
            </h2>
            {/* Optional subtitle with updated color */}
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: '1.125rem',
              lineHeight: 1.6,
              color: '#7A7A8C',
              marginTop: '8px'
            }}>
              {language === 'az' ? 'Bizim təlimləri alan müştərilərimizin rəy və təəssüratları' :
               language === 'en' ? 'Reviews and impressions from our customers who took our trainings' :
               'Отзывы и впечатления наших клиентов, прошедших наши тренинги'}
            </p>
          </div>
          
          {approvedTestimonials.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-lg">
                <p className="text-gray-600">No testimonials available at the moment.</p>
              </div>
            </div>
          ) : (
            <div className="relative">
              {/* Testimonials Slider Container */}
              <div 
                className="testimonials-slider overflow-hidden"
                style={{
                  maxWidth: '1200px',
                  margin: '0 auto'
                }}
                onMouseEnter={() => setIsCarouselHovered(true)}
                onMouseLeave={() => setIsCarouselHovered(false)}
              >
                <div 
                  className="testimonials-track flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentTestimonialIndex * (340 + 32)}px)`,
                    gap: '32px'
                  }}
                >
                  {approvedTestimonials.map((testimonial, index) => (
                    <div 
                      key={testimonial.id} 
                      className="testimonial-card group flex-shrink-0"
                      style={{
                        backgroundColor: '#7A96F4',
                        borderRadius: '12px',
                        boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                        width: '340px',
                        paddingTop: '32px',
                        paddingBottom: '32px',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                        textAlign: 'center',
                        position: 'relative',
                        transform: 'translateY(0px)',
                        transition: 'all 200ms ease',
                        cursor: 'default',
                        marginRight: index < approvedTestimonials.length - 1 ? '32px' : '0'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0px)';
                        e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)';
                      }}
                    >
                      {/* Avatar at top center */}
                      <div 
                        className="avatar-container"
                        style={{
                          width: '96px',
                          height: '96px',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          margin: '0 auto 24px auto',
                          marginTop: '12px',
                          backgroundColor: '#E7E7EE'
                        }}
                      >
                        {avatarImages[testimonial.id] ? (
                          <img 
                            src={avatarImages[testimonial.id]} 
                            alt={`${testimonial.name} foto`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#E7E7EE',
                            display: avatarImages[testimonial.id] ? 'none' : 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <User className="w-8 h-8 text-gray-500" />
                        </div>
                      </div>

                      {/* Name */}
                      <h4 
                        style={{
                          fontFamily: "'Lora', serif",
                          fontWeight: 700,
                          fontSize: '18px',
                          color: '#FFFFFF',
                          marginTop: '24px',
                          marginBottom: '0'
                        }}
                      >
                        {testimonial.name}
                      </h4>

                      {/* Role */}
                      <p 
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 500,
                          fontSize: '14px',
                          color: 'rgba(255,255,255,0.7)',
                          marginTop: '4px',
                          marginBottom: '0'
                        }}
                      >
                        Tələbə
                      </p>

                      {/* Quote body */}
                      <p 
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 400,
                          fontSize: '15px',
                          lineHeight: 1.6,
                          color: 'rgba(255,255,255,0.9)',
                          marginTop: '24px',
                          marginBottom: '56px',
                          display: '-webkit-box',
                          WebkitLineClamp: 6,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {testimonial.text[language]}
                      </p>

                      {/* Bottom quote icon */}
                      <span 
                        className="quote-icon"
                        style={{
                          position: 'absolute',
                          bottom: '24px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: '28px',
                          color: '#FFFFFF',
                          fontFamily: 'serif',
                          lineHeight: 1
                        }}
                      >
                        "
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              {approvedTestimonials.length > 3 && (
                <>
                  <button
                    onClick={() => setCurrentTestimonialIndex(Math.max(0, currentTestimonialIndex - 1))}
                    disabled={currentTestimonialIndex === 0}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      zIndex: 10,
                      border: '1px solid #E5E7EB'
                    }}
                  >
                    <ChevronRight className="w-6 h-6 text-gray-600 transform rotate-180" />
                  </button>
                  
                  <button
                    onClick={() => setCurrentTestimonialIndex(Math.min(approvedTestimonials.length - 3, currentTestimonialIndex + 1))}
                    disabled={currentTestimonialIndex >= approvedTestimonials.length - 3}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      zIndex: 10,
                      border: '1px solid #E5E7EB'
                    }}
                  >
                    <ChevronRight className="w-6 h-6 text-gray-600" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {approvedTestimonials.length > 3 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {Array.from({ length: Math.max(0, approvedTestimonials.length - 2) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonialIndex(index)}
                      className="w-3 h-3 rounded-full transition-all duration-200"
                      style={{
                        backgroundColor: currentTestimonialIndex === index ? '#7A96F4' : '#E5E7EB'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20" style={{backgroundColor: '#FFFFFF'}}>
        <div className="container mx-auto px-4">
          <div className="text-left mb-12 pt-8">
            <h2 
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                maxWidth: '28ch',
                margin: '0 0 1rem 0'
              }}
            >
              Bloqumuz
            </h2>
          </div>
          
          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" style={{gap: '24px'}}>
            {/* Blog Post 1 */}
            <div
              onClick={() => window.location.href = '/blog/effective-speech-techniques'}
              className="course-card group relative block cursor-pointer"
              style={{
                aspectRatio: '1',
                borderRadius: '12px',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06), inset 0 0 0 3px #2166FF',
                overflow: 'hidden',
                transform: 'translateY(0px)',
                transition: 'all 300ms cubic-bezier(0.25, 0.8, 0.42, 1)',
                backgroundColor: '#E7E7EE',
                backgroundImage: 'url(https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.10), inset 0 0 0 3px #2166FF';
                e.currentTarget.style.backgroundSize = 'cover';
                e.currentTarget.style.backgroundImage = e.currentTarget.style.backgroundImage.replace(')', '&scale=1.04)');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.06), inset 0 0 0 3px #2166FF';
                e.currentTarget.style.backgroundImage = e.currentTarget.style.backgroundImage.replace('&scale=1.04', '');
              }}
              aria-label="Effektiv Nitq Texnikaları - Blog məqaləsi"
              role="button"
              tabIndex={0}
            >
              <div 
                className="absolute bottom-0 left-0 w-full flex flex-col justify-between px-4 py-3 group-hover:bg-opacity-92 transition-all duration-300"
                style={{
                  backgroundColor: '#204BFF',
                  height: '30%',
                  minHeight: '80px',
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px'
                }}
              >
                <div>
                  <h4 
                    className="mb-2"
                    style={{
                      fontFamily: "'Lora', serif",
                      fontWeight: 600,
                      fontSize: '1.125rem',
                      lineHeight: 1.3,
                      color: '#FFFFFF',
                      margin: '0 0 8px 0'
                    }}
                  >
                    Effektiv Nitq Texnikaları
                  </h4>
                  <p 
                    className="line-clamp-2"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: 1.4,
                      color: 'rgba(255, 255, 255, 0.9)',
                      margin: '0',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    İctimai çıxışlarda uğur qazanmaq üçün əsas texnika və üsullar
                  </p>
                </div>
                <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowRight 
                    className="w-4 h-4 text-white transform translate-x-1 group-hover:translate-x-0 transition-transform duration-200" 
                  />
                </div>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div
              onClick={() => window.location.href = '/blog/body-language-secrets'}
              className="course-card group relative block cursor-pointer"
              style={{
                aspectRatio: '1',
                borderRadius: '12px',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06), inset 0 0 0 3px #2166FF',
                overflow: 'hidden',
                transform: 'translateY(0px)',
                transition: 'all 300ms cubic-bezier(0.25, 0.8, 0.42, 1)',
                backgroundColor: '#E7E7EE',
                backgroundImage: 'url(https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.10), inset 0 0 0 3px #2166FF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.06), inset 0 0 0 3px #2166FF';
              }}
              aria-label="Bədən Dilinin Sirləri - Blog məqaləsi"
              role="button"
              tabIndex={0}
            >
              <div 
                className="absolute bottom-0 left-0 w-full flex flex-col justify-between px-4 py-3 group-hover:bg-opacity-92 transition-all duration-300"
                style={{
                  backgroundColor: '#204BFF',
                  height: '30%',
                  minHeight: '80px',
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px'
                }}
              >
                <div>
                  <h4 
                    className="mb-2"
                    style={{
                      fontFamily: "'Lora', serif",
                      fontWeight: 600,
                      fontSize: '1.125rem',
                      lineHeight: 1.3,
                      color: '#FFFFFF',
                      margin: '0 0 8px 0'
                    }}
                  >
                    Bədən Dilinin Sirləri
                  </h4>
                  <p 
                    className="line-clamp-2"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: 1.4,
                      color: 'rgba(255, 255, 255, 0.9)',
                      margin: '0',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    Jestlər və mimika vasitəsilə güclü ünsiyyət qurmaq
                  </p>
                </div>
                <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowRight 
                    className="w-4 h-4 text-white transform translate-x-1 group-hover:translate-x-0 transition-transform duration-200" 
                  />
                </div>
              </div>
            </div>

            {/* Blog Post 3 */}
            <div
              onClick={() => window.location.href = '/blog/confidence-building'}
              className="course-card group relative block cursor-pointer"
              style={{
                aspectRatio: '1',
                borderRadius: '12px',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.06), inset 0 0 0 3px #2166FF',
                overflow: 'hidden',
                transform: 'translateY(0px)',
                transition: 'all 300ms cubic-bezier(0.25, 0.8, 0.42, 1)',
                backgroundColor: '#E7E7EE',
                backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.10), inset 0 0 0 3px #2166FF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.06), inset 0 0 0 3px #2166FF';
              }}
              aria-label="Özgüvən Artırma Strategiyaları - Blog məqaləsi"
              role="button"
              tabIndex={0}
            >
              <div 
                className="absolute bottom-0 left-0 w-full flex flex-col justify-between px-4 py-3 group-hover:bg-opacity-92 transition-all duration-300"
                style={{
                  backgroundColor: '#204BFF',
                  height: '30%',
                  minHeight: '80px',
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px'
                }}
              >
                <div>
                  <h4 
                    className="mb-2"
                    style={{
                      fontFamily: "'Lora', serif",
                      fontWeight: 600,
                      fontSize: '1.125rem',
                      lineHeight: 1.3,
                      color: '#FFFFFF',
                      margin: '0 0 8px 0'
                    }}
                  >
                    Özgüvən Artırma Strategiyaları
                  </h4>
                  <p 
                    className="line-clamp-2"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: 1.4,
                      color: 'rgba(255, 255, 255, 0.9)',
                      margin: '0',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    Nitq zamanı qorxunu aradan qaldırmaq və özgüvənli olmaq
                  </p>
                </div>
                <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowRight 
                    className="w-4 h-4 text-white transform translate-x-1 group-hover:translate-x-0 transition-transform duration-200" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client / Partner Logos Strip */}
      <section className="py-16" style={{backgroundColor: '#FFFFFF'}}>
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
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
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