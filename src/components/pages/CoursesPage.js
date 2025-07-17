import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';
import { Mic, Users, TrendingUp, UserCog, Volume2, MessageSquare, UserCheck, Search, Filter, ChevronDown, Target, Zap, BarChart, Building2, PieChart, BookOpen } from 'lucide-react';
import ConversionCTA from '../ConversionCTA';

const CoursesPage = ({ setCurrentPage }) => {
  const { t, language } = useLanguage();
  const { getIndividualCourses, getCorporateCourses, siteContent } = useContent();
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [activeTab, setActiveTab] = useState('individual');
  const [isTabsSticky, setIsTabsSticky] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    topic: '',
    duration: '',
    price: ''
  });
  const [isNavigating, setIsNavigating] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const tabsRef = useRef(null);
  const individualRef = useRef(null);
  const corporateRef = useRef(null);
  
  // Get dynamic course data from context
  const individualTrainings = getIndividualCourses();
  const corporateTrainings = getCorporateCourses();

  const openTrainingModal = (training) => {
    setSelectedTraining(training);
  };
  
  const closeTrainingModal = () => {
    setSelectedTraining(null);
  };

  // Sticky tabs and scroll handling
  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        const tabsTop = tabsRef.current.offsetTop;
        const scrollTop = window.scrollY;
        setIsTabsSticky(scrollTop > tabsTop - 100);
      }

      // Update active tab based on scroll position (only if not navigating and not initial load)
      if (!isNavigating && !isInitialLoad && individualRef.current && corporateRef.current) {
        const individualTop = individualRef.current.offsetTop - 200;
        const corporateTop = corporateRef.current.offsetTop - 200;
        const scrollTop = window.scrollY;

        if (scrollTop >= corporateTop) {
          setActiveTab('corporate');
        } else if (scrollTop >= individualTop) {
          setActiveTab('individual');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isNavigating, isInitialLoad]);

  // Handle initial navigation to specific sections
  useEffect(() => {
    const handleInitialNavigation = () => {
      const hash = window.location.hash;
      if (hash === '#corporate-trainings') {
        setIsNavigating(true);
        setActiveTab('corporate');
        setTimeout(() => {
          if (corporateRef.current) {
            corporateRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          setTimeout(() => setIsNavigating(false), 1000);
        }, 100);
      } else if (hash === '#individual-trainings') {
        setIsNavigating(true);
        setActiveTab('individual');
        setTimeout(() => {
          if (individualRef.current) {
            individualRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          setTimeout(() => setIsNavigating(false), 1000);
        }, 100);
      }
    };

    // Check for hash on mount
    handleInitialNavigation();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleInitialNavigation);
    return () => window.removeEventListener('hashchange', handleInitialNavigation);
  }, []);

  // Disable initial load flag after component has mounted
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionRef, tabName) => {
    setActiveTab(tabName);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const toggleCardExpansion = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const truncateText = (text, maxLines = 5) => {
    const words = text.split(' ');
    const wordsPerLine = 12; // Approximate words per line for card width
    const maxWords = maxLines * wordsPerLine;
    
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ');
  };

  // Filter data
  const filterOptions = {
    topic: [
      { value: '', label: language === 'az' ? 'Bütün mövzular' : language === 'en' ? 'All Topics' : 'Все темы' },
      { value: 'speech', label: language === 'az' ? 'Nitq və Diksiya' : language === 'en' ? 'Speech & Diction' : 'Речь и дикция' },
      { value: 'leadership', label: language === 'az' ? 'Liderlik' : language === 'en' ? 'Leadership' : 'Лидерство' },
      { value: 'communication', label: language === 'az' ? 'Ünsiyyət' : language === 'en' ? 'Communication' : 'Коммуникация' },
      { value: 'marketing', label: language === 'az' ? 'Marketinq' : language === 'en' ? 'Marketing' : 'Маркетинг' },
      { value: 'etiquette', label: language === 'az' ? 'Etiket' : language === 'en' ? 'Etiquette' : 'Этикет' }
    ],
    duration: [
      { value: '', label: language === 'az' ? 'Bütün müddətlər' : language === 'en' ? 'All Durations' : 'Все продолжительности' },
      { value: 'short', label: language === 'az' ? '1-2 həftə' : language === 'en' ? '1-2 weeks' : '1-2 недели' },
      { value: 'medium', label: language === 'az' ? '1 ay' : language === 'en' ? '1 month' : '1 месяц' },
      { value: 'long', label: language === 'az' ? '2-3 ay' : language === 'en' ? '2-3 months' : '2-3 месяца' }
    ],
    price: [
      { value: '', label: language === 'az' ? 'Bütün qiymətlər' : language === 'en' ? 'All Prices' : 'Все цены' },
      { value: 'low', label: language === 'az' ? '0-100 AZN' : language === 'en' ? '0-100 AZN' : '0-100 AZN' },
      { value: 'medium', label: language === 'az' ? '100-200 AZN' : language === 'en' ? '100-200 AZN' : '100-200 AZN' },
      { value: 'high', label: language === 'az' ? '200+ AZN' : language === 'en' ? '200+ AZN' : '200+ AZN' }
    ]
  };

  // Filter and search logic
  const filterTrainings = (trainings) => {
    return trainings.filter(training => {
      // Handle both string and object format for title and description
      const title = training.title ? 
        (typeof training.title === 'string' ? training.title : training.title[language]) :
        (training.name ? training.name[language] : '');
      const description = training.description ? 
        (typeof training.description === 'string' ? training.description : training.description[language]) :
        '';
      
      const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTopic = !filters.topic || 
                          title.toLowerCase().includes(filters.topic) ||
                          training.id.includes(filters.topic);
      
      // For demo purposes, all trainings match duration and price filters
      const matchesDuration = !filters.duration;
      const matchesPrice = !filters.price;
      
      return matchesSearch && matchesTopic && matchesDuration && matchesPrice;
    });
  };

  const filteredIndividualTrainings = filterTrainings(individualTrainings);
  const filteredCorporateTrainings = filterTrainings(corporateTrainings);

  const TrainingCard = ({ training, colorScheme }) => {
    // Default icons for different training types
    const defaultIcons = {
      individual: Mic,
      corporate: UserCog,
      speech: Mic,
      leadership: Users,
      marketing: TrendingUp,
      etiquette: UserCheck,
      'corporate-leadership': UserCog,
      'leader-voice': Volume2,
      'speech-expression': MessageSquare
    };
    
    const IconComponent = training.icon || defaultIcons[training.id] || defaultIcons[training.category || 'individual'];
    const isExpanded = expandedCards[training.id];
    
    // Handle both string and object format for title and description
    const title = training.title ? 
      (typeof training.title === 'string' ? training.title : training.title[language]) :
      (training.name ? training.name[language] : '');
    const fullDescription = training.description ? 
      (typeof training.description === 'string' ? training.description : training.description[language]) :
      '';
    const truncatedDescription = truncateText(fullDescription, 5);
    const needsTruncation = fullDescription.split(' ').length > 60; // ~5 lines worth
    
    return (
      <div className="bg-white transition-all duration-300 ease-out transform flex flex-col h-full" 
          data-course-id={training.id}
           style={{
             borderRadius: '12px',
             boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
             padding: '3rem'
           }}
           onMouseEnter={(e) => {
             e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
             e.currentTarget.style.transform = 'translateY(-4px)';
           }}
           onMouseLeave={(e) => {
             e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)';
             e.currentTarget.style.transform = 'translateY(0)';
           }}>
        <div className="text-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center mb-6 mx-auto">
            <IconComponent 
              className="w-8 h-8" 
              style={{color: colorScheme.iconColor}} 
              strokeWidth={1.5} 
            />
          </div>
          <h3 className="mb-4 leading-tight" style={{
            fontFamily: "'Lora', serif",
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.35,
            color: '#1E1E1E'
          }}>
            {title}
          </h3>
        </div>
        <div className="flex-1 mb-6">
          <p className="leading-relaxed" style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: 1.6,
            color: '#666666'
          }}>
            {isExpanded ? fullDescription : (needsTruncation ? truncatedDescription + '...' : fullDescription)}
          </p>
          {needsTruncation && (
            <button
              onClick={() => toggleCardExpansion(training.id)}
              className="mt-2 transition-colors duration-200"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: '1rem',
                color: colorScheme.buttonColor,
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = colorScheme.buttonHoverColor;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = colorScheme.buttonColor;
              }}
            >
              {isExpanded 
                ? (language === 'az' ? 'Daha az' : language === 'en' ? 'Show less' : 'Показать меньше')
                : (language === 'az' ? '...davamı' : language === 'en' ? '...read more' : '...читать далее')
              }
            </button>
          )}
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => openTrainingModal(training)}
            className="flex-1 text-white py-3 rounded-lg font-semibold"
            style={{
              backgroundColor: colorScheme.buttonColor,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'all 150ms ease-out',
              transform: 'scale(1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colorScheme.buttonHoverColor;
              e.target.style.transform = 'scale(1.03)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = colorScheme.buttonColor;
              e.target.style.transform = 'scale(1)';
            }}
          >
            {language === 'az' ? 'Ətraflı' : language === 'en' ? 'Learn More' : 'Подробнее'}
          </button>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="flex-1 py-3 rounded-lg font-semibold"
            style={{
              backgroundColor: 'transparent',
              border: `2px solid ${colorScheme.buttonColor}`,
              color: colorScheme.buttonColor,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'all 150ms ease-out',
              transform: 'scale(1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colorScheme.buttonColor;
              e.target.style.color = 'white';
              e.target.style.transform = 'scale(1.03)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = colorScheme.buttonColor;
              e.target.style.transform = 'scale(1)';
            }}
          >
            {language === 'az' ? 'Əlaqə' : language === 'en' ? 'Contact' : 'Контакт'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Hero Banner */}
      <section style={{backgroundColor: '#FFFFFF', position: 'relative', paddingTop: '2rem', paddingBottom: '160px', minHeight: '43vh'}}>
        <div className="container mx-auto px-4">
          <h1 className="text-center mb-6" style={{
            fontFamily: "'Lora', serif",
            fontWeight: 700,
            fontSize: 'clamp(2.6rem, 6vw, 4.2rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            color: '#1E1E1E'
          }}>{siteContent.coursesHeroTitle ? siteContent.coursesHeroTitle[language] : t('coursesTitle')}</h1>
          <p className="text-center mb-8 max-w-3xl mx-auto" style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: '1.125rem',
            lineHeight: 1.6,
            color: '#1E1E1E'
          }}>
            {siteContent.coursesHeroDescription ? siteContent.coursesHeroDescription[language] : 
             (language === 'az' ? 'Nitq mədəniyyəti, liderlik və ünsiyyət bacarıqlarınızı inkişaf etdirmək üçün peşəkar təlim proqramlarımız' :
              language === 'en' ? 'Professional training programs to develop your speech culture, leadership and communication skills' :
              'Профессиональные учебные программы для развития вашей культуры речи, лидерских и коммуникативных навыков')}
          </p>
        </div>
      </section>

      {/* Training Solutions Subsection */}
      <section id="training-solutions-section" className="py-16" style={{backgroundColor: '#FFFFFF'}}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 
              className="text-gray-800 mb-4"
              style={{
                fontFamily: "'Lora', serif",
                fontWeight: 600,
                fontSize: '1.5rem',
                lineHeight: 1.35,
                letterSpacing: '-0.02em',
                color: '#1E1E1E'
              }}
            >
              Şəxsi hədəflərdən korporativ məqsədlərə qədər uzanan təlim həllərimiz
            </h3>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Individual Training */}
            <div className="bg-white p-8" style={{
              borderRadius: '12px',
              boxShadow: '0 6px 18px rgba(0,0,0,0.06)'
            }}>
              <div className="mb-6">
                <h4 style={{
                  fontFamily: "'Lora', serif",
                  fontWeight: 600,
                  fontSize: '1.25rem',
                  lineHeight: 1.35,
                  color: '#1E1E1E',
                  marginBottom: '1rem'
                }}>
                  Fərdi Yönümlü Təlimlər
                </h4>
              </div>
              
              <div className="space-y-6 mb-6">
                <div className="flex items-start">
                  <Target className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0 stroke-1" />
                  <div>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      lineHeight: 1.4,
                      color: '#1E1E1E',
                      marginBottom: '0.25rem'
                    }}>Şəxsi məqsədlərə tam uyğunlaşma:</p>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      color: '#5B5B5B'
                    }}>Tədris planı əvvəlcədən sizin hədəflərinizi, mövcud bacarıqlarınızı və öyrənmə tərzinizi analiz edərək qurulur.</p>
                  </div>
                </div>
                <div className="border-b border-gray-200"></div>
                
                <div className="flex items-start">
                  <UserCheck className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0 stroke-1" />
                  <div>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      lineHeight: 1.4,
                      color: '#1E1E1E',
                      marginBottom: '0.25rem'
                    }}>1-nə-1 mentorluq və fasilətsiz geribildirim:</p>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      color: '#5B5B5B'
                    }}>Hər moduldan sonra fasiləsiz rəy, fərdi məşq tapşırıqları və inkişaf izləyici plan təqdim olunur.</p>
                  </div>
                </div>
                <div className="border-b border-gray-200"></div>
                
                <div className="flex items-start">
                  <Zap className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0 stroke-1" />
                  <div>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      lineHeight: 1.4,
                      color: '#1E1E1E',
                      marginBottom: '0.25rem'
                    }}>Maksimum çeviklik:</p>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      color: '#5B5B5B'
                    }}>Onlayn, hibrid və canlı sessiya seçimləri ilə təlimi iş qrafikinə rahat uyğunlaşdırmaq imkanı.</p>
                  </div>
                </div>
                <div className="border-b border-gray-200"></div>
                
                <div className="flex items-start">
                  <TrendingUp className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0 stroke-1" />
                  <div>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      lineHeight: 1.4,
                      color: '#1E1E1E',
                      marginBottom: '0.25rem'
                    }}>Özünəinamın güclənməsi:</p>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      color: '#5B5B5B'
                    }}>Praktiki rol-oyunları və real life ssenariləri üzərində işləməklə çıxış, ünsiyyət və qərarvermə bacarıqlarında hiss olunan irəliləyiş.</p>
                  </div>
                </div>
                <div className="border-b border-gray-200"></div>
                
                <div className="flex items-start">
                  <BarChart className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0 stroke-1" />
                  <div>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      lineHeight: 1.4,
                      color: '#1E1E1E',
                      marginBottom: '0.25rem'
                    }}>Ölçülə bilən nəticələr:</p>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      color: '#5B5B5B'
                    }}>Ön-test və son-testlərlə bacarıq artımını kəmiyyətcə dəyərləndirən hesabatlar.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Corporate Training */}
            <div className="bg-white p-8" style={{
              borderRadius: '12px',
              boxShadow: '0 6px 18px rgba(0,0,0,0.06)'
            }}>
              <div className="mb-6">
                <h4 style={{
                  fontFamily: "'Lora', serif",
                  fontWeight: 600,
                  fontSize: '1.25rem',
                  lineHeight: 1.35,
                  color: '#1E1E1E',
                  marginBottom: '1rem'
                }}>
                  Korporativ Yönümlü Təlimlər
                </h4>
              </div>
              
              <div className="space-y-6 mb-6">
                <div className="flex items-start">
                  <Users className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0 stroke-1" />
                  <div>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      lineHeight: 1.4,
                      color: '#1E1E1E',
                      marginBottom: '0.25rem'
                    }}>Komanda sinerjisi və əməkdaşlıq:</p>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      color: '#5B5B5B'
                    }}>Interaktiv qrup layihələri vasitəsilə kollektiv problem-həll etmə və koordinasiya bacarıqları inkişaf etdirilir.</p>
                  </div>
                </div>
                <div className="border-b border-gray-200"></div>
                
                <div className="flex items-start">
                  <UserCog className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0 stroke-1" />
                  <div>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      lineHeight: 1.4,
                      color: '#1E1E1E',
                      marginBottom: '0.25rem'
                    }}>Liderlik və idarəetmə kompetensiyaları:</p>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      color: '#5B5B5B'
                    }}>Situasiya-əsaslı məşqlər, konflikt menecmenti simulyasiyaları və strateji düşüncə modulları ilə gələcək liderlər formalaşdırılır.</p>
                  </div>
                </div>
                <div className="border-b border-gray-200"></div>
                
                <div className="flex items-start">
                  <Building2 className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0 stroke-1" />
                  <div>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      lineHeight: 1.4,
                      color: '#1E1E1E',
                      marginBottom: '0.25rem'
                    }}>Şirkət hədəflərinə inteqrasiya:</p>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      color: '#5B5B5B'
                    }}>Təlim məzmunu müəssisənin biznes strategiyası, KPI və korporativ dəyərləri ilə uzlaşdırılır.</p>
                  </div>
                </div>
                <div className="border-b border-gray-200"></div>
                
                <div className="flex items-start">
                  <PieChart className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0 stroke-1" />
                  <div>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      lineHeight: 1.4,
                      color: '#1E1E1E',
                      marginBottom: '0.25rem'
                    }}>ROI-yönümlü nəticə ölçümü:</p>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      color: '#5B5B5B'
                    }}>Performans indikatorları, işçi məmnuniyyəti sorğuları və satış/istehsal metrikləri üzərindən təlimin biznesə təsiri izlənir.</p>
                  </div>
                </div>
                <div className="border-b border-gray-200"></div>
                
                <div className="flex items-start">
                  <BookOpen className="w-6 h-6 text-green-600 mt-1 mr-4 flex-shrink-0 stroke-1" />
                  <div>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      lineHeight: 1.4,
                      color: '#1E1E1E',
                      marginBottom: '0.25rem'
                    }}>Davamedici post-təlim dəstək:</p>
                    <p style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      color: '#5B5B5B'
                    }}>Mentor sessiyaları, resurs kitabxanası və on-demand vebinarlar ilə öyrənilənlərin iş mühitində tətbiqi davamlı olaraq gücləndirilir.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Tools - Filter Bar */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={language === 'az' ? 'Kurs axtarın...' : language === 'en' ? 'Search courses...' : 'Поиск курсов...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.95rem'
                  }}
                  onFocus={(e) => {
                    e.target.style.boxShadow = '0 0 0 2px rgba(33, 102, 255, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex gap-3 flex-wrap">
              <div className="relative">
                <select
                  value={filters.topic}
                  onChange={(e) => setFilters(prev => ({ ...prev, topic: e.target.value }))}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:border-transparent"
                  onFocus={(e) => {
                    e.target.style.boxShadow = '0 0 0 2px rgba(33, 102, 255, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                  }}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.95rem',
                    minWidth: '140px'
                  }}
                >
                  {filterOptions.topic.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={filters.duration}
                  onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value }))}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:border-transparent"
                  onFocus={(e) => {
                    e.target.style.boxShadow = '0 0 0 2px rgba(33, 102, 255, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                  }}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.95rem',
                    minWidth: '140px'
                  }}
                >
                  {filterOptions.duration.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={filters.price}
                  onChange={(e) => setFilters(prev => ({ ...prev, price: e.target.value }))}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:border-transparent"
                  onFocus={(e) => {
                    e.target.style.boxShadow = '0 0 0 2px rgba(33, 102, 255, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.boxShadow = 'none';
                  }}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.95rem',
                    minWidth: '140px'
                  }}
                >
                  {filterOptions.price.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Clear Filters Button */}
              {(searchTerm || filters.topic || filters.duration || filters.price) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({ topic: '', duration: '', price: '' });
                  }}
                  className="px-4 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1rem',
                    transition: 'all 150ms ease-out',
                    transform: 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  {language === 'az' ? 'Təmizlə' : language === 'en' ? 'Clear' : 'Очистить'}
                </button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4">
            <span style={{ 
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: '1rem',
              lineHeight: 1.6,
              color: '#666666'
            }}>
              {language === 'az' 
                ? `${filteredIndividualTrainings.length + filteredCorporateTrainings.length} nəticə tapıldı`
                : language === 'en' 
                ? `${filteredIndividualTrainings.length + filteredCorporateTrainings.length} results found`
                : `Найдено ${filteredIndividualTrainings.length + filteredCorporateTrainings.length} результатов`
              }
            </span>
          </div>
        </div>
      </section>

      {/* Sticky Tabs */}
      <div ref={tabsRef} className={`${isTabsSticky ? 'fixed top-20 left-0 right-0 z-40' : 'relative'} bg-white border-b border-gray-200 transition-all duration-300`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-1 py-4">
            <button
              onClick={() => scrollToSection(individualRef, 'individual')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'individual' 
                  ? 'bg-blue-100 text-blue-700 shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              {language === 'az' ? 'Fərdi Təlimlər' :
               language === 'en' ? 'Individual Trainings' :
               'Индивидуальные тренинги'}
            </button>
            <button
              onClick={() => scrollToSection(corporateRef, 'corporate')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'corporate' 
                  ? 'shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={{
                backgroundColor: activeTab === 'corporate' ? '#E8F5E8' : undefined,
                color: activeTab === 'corporate' ? '#02A44E' : undefined,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              {language === 'az' ? 'Korporativ Təlimlər' :
               language === 'en' ? 'Corporate Trainings' :
               'Корпоративные тренинги'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${isTabsSticky ? 'pt-20' : ''} py-16`}>
        <div className="container mx-auto px-4">
        
        {/* Individual Trainings Section */}
        {activeTab === 'individual' && (
          <section ref={individualRef} id="individual-trainings" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="mb-4" style={{
                fontFamily: "'Lora', serif",
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: '#1E1E1E'
              }}>{t('individualTrainings')}</h2>
              <p className="max-w-xl mx-auto" style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: '1.125rem',
                lineHeight: 1.45,
                color: '#4A4A4A',
                maxWidth: '24ch',
                margin: '0 auto'
              }}>
                {language === 'az' ? 'Fərdi yanaşma ilə hazırlanmış təlim proqramları' :
                 language === 'en' ? 'Individual approach training programs' :
                 'Индивидуальные программы'}
              </p>
            </div>
            
            {filteredIndividualTrainings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIndividualTrainings.map((training) => (
                  <TrainingCard 
                    key={training.id} 
                    training={training} 
                    colorScheme={{
                      iconColor: '#2166FF',
                      buttonColor: '#2166FF',
                      buttonHoverColor: '#1d5def'
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: '#666666'
                }}>
                  {language === 'az' ? 'Fərdi təlimlər üçün nəticə tapılmadı' :
                   language === 'en' ? 'No individual trainings found' :
                   'Индивидуальные тренинги не найдены'}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Corporate Trainings Section */}
        {activeTab === 'corporate' && (
          <section ref={corporateRef} id="corporate-trainings" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="mb-4" style={{
                fontFamily: "'Lora', serif",
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: '#1E1E1E'
              }}>{t('corporateTrainings')}</h2>
              <p className="max-w-xl mx-auto" style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                fontSize: '1.125rem',
                lineHeight: 1.45,
                color: '#4A4A4A',
                maxWidth: '24ch',
                margin: '0 auto'
              }}>
                {language === 'az' ? 'İşgüzar mühitdə liderlik keyfiyyətlərini inkişaf etdirmək' :
                 language === 'en' ? 'Develop leadership in business environment' :
                 'Развитие лидерских качеств'}
              </p>
            </div>
            
            {filteredCorporateTrainings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCorporateTrainings.map((training) => (
                  <TrainingCard 
                    key={training.id} 
                    training={training} 
                    colorScheme={{
                      iconColor: '#02A44E',
                      buttonColor: '#02A44E',
                      buttonHoverColor: '#028A42'
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 400,
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: '#666666'
                }}>
                  {language === 'az' ? 'Korporativ təlimlər üçün nəticə tapılmadı' :
                   language === 'en' ? 'No corporate trainings found' :
                   'Корпоративные тренинги не найдены'}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Contact CTA Section */}
        <section style={{backgroundColor: '#FFFFFF', paddingTop: '6rem', paddingBottom: '5rem', marginBottom: '4rem'}}>
          <div className="container mx-auto px-4">
            <ConversionCTA setCurrentPage={setCurrentPage} />
          </div>
        </section>
        </div>
      </div>
      
      {/* Training Detail Modal */}
      {selectedTraining && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4`} style={{
                    backgroundColor: selectedTraining.category === 'individual' ? '#EFF6FF' : '#E8F5E8'
                  }}>
                    <span className="text-xl" style={{
                      color: selectedTraining.category === 'individual' ? '#2166FF' : '#02A44E'
                    }}>
                      {selectedTraining.category === 'individual' ? '👤' : '🏢'}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {typeof selectedTraining.title === 'string' ? selectedTraining.title : 
                     (selectedTraining.title ? selectedTraining.title[language] : 
                      (selectedTraining.name ? selectedTraining.name[language] : ''))}
                  </h2>
                </div>
                <button
                  onClick={closeTrainingModal}
                  className="text-gray-400 hover:text-gray-600 text-3xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="h-48 rounded-lg flex items-center justify-center" style={{
                  background: selectedTraining.category === 'individual' 
                    ? 'linear-gradient(to right, #2166FF, #1d5def)' 
                    : 'linear-gradient(to right, #02A44E, #028A42)'
                }}>
                  <h3 className="text-white text-center px-6" style={{
                    fontFamily: "'Lora', serif",
                    fontWeight: 600,
                    fontSize: '1.5rem',
                    lineHeight: 1.35
                  }}>
                    {typeof selectedTraining.title === 'string' ? selectedTraining.title : 
                     (selectedTraining.title ? selectedTraining.title[language] : 
                      (selectedTraining.name ? selectedTraining.name[language] : ''))}
                  </h3>
                </div>
                
                <div className="prose max-w-none">
                  <h4 className="font-semibold text-xl mb-4 text-gray-800">
                    {language === 'az' ? 'Təlim Haqqında' :
                     language === 'en' ? 'About the Training' :
                     'О тренинге'}
                  </h4>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line" style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    color: '#1E1E1E'
                  }}>
                    {typeof selectedTraining.description === 'string' ? selectedTraining.description : 
                     (selectedTraining.description ? selectedTraining.description[language] : '')}
                  </p>
                </div>
                
                <div className="p-6 rounded-lg" style={{
                  backgroundColor: selectedTraining.category === 'individual' ? '#EFF6FF' : '#E8F5E8'
                }}>
                  <h4 className="font-semibold mb-3" style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    lineHeight: 1.4,
                    color: selectedTraining.category === 'individual' ? '#1E3A8A' : '#14532D'
                  }}>
                    {language === 'az' ? 'Əlaqə' :
                     language === 'en' ? 'Contact Us' :
                     'Свяжитесь с нами'}
                  </h4>
                  <p className="mb-4" style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    color: selectedTraining.category === 'individual' ? '#1E40AF' : '#166534'
                  }}>
                    {language === 'az' ? 'Bu təlim haqqında daha ətraflı məlumat almaq və qeydiyyatdan keçmək üçün bizimlə əlaqə saxlayın.' :
                     language === 'en' ? 'Contact us to get more detailed information about this training and to register.' :
                     'Свяжитесь с нами, чтобы получить более подробную информацию об этом тренинге и зарегистрироваться.'}
                  </p>
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => {
                        closeTrainingModal();
                        setCurrentPage('contact');
                      }}
                      className="flex-1 text-white py-3 rounded-md transition-colors font-semibold"
                      style={{
                        backgroundColor: selectedTraining.category === 'individual' ? '#2166FF' : '#02A44E',
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: '1rem',
                        transition: 'all 150ms ease-out',
                        transform: 'scale(1)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = selectedTraining.category === 'individual' ? '#1d5def' : '#028A42';
                        e.target.style.transform = 'scale(1.03)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = selectedTraining.category === 'individual' ? '#2166FF' : '#02A44E';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      {language === 'az' ? 'Qeydiyyatdan keç' :
                       language === 'en' ? 'Enroll Now' :
                       'Записаться'}
                    </button>
                    <button 
                      onClick={closeTrainingModal}
                      className="flex-1 bg-gray-500 text-white py-3 rounded-md font-semibold"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: '1rem',
                        transition: 'all 150ms ease-out',
                        transform: 'scale(1)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#374151';
                        e.target.style.transform = 'scale(1.03)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#6B7280';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      {language === 'az' ? 'Bağla' :
                       language === 'en' ? 'Close' :
                       'Закрыть'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;