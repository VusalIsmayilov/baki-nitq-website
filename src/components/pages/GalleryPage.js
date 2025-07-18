import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';
import { Calendar, MapPin, Filter, ChevronDown, Search, Download, Clock, FileText, X } from 'lucide-react';
import ConversionCTA from '../ConversionCTA';

const GalleryPage = ({ setCurrentPage, galleryTab }) => {
  const { t, language } = useLanguage();
  const { activities, news, resources, siteContent } = useContent();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState(galleryTab || 'events');
  
  // Update active tab when galleryTab prop changes
  useEffect(() => {
    if (galleryTab) {
      setActiveTab(galleryTab);
    }
  }, [galleryTab]);
  const [isTabsSticky, setIsTabsSticky] = useState(false);
  const tabsRef = useRef(null);
  const [eventFilters, setEventFilters] = useState({
    dateRange: '',
    format: '',
    topic: ''
  });
  const [articleSearch, setArticleSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleEventsCount, setVisibleEventsCount] = useState(9);
  const [visibleArticlesCount, setVisibleArticlesCount] = useState(9);
  const [visibleBlogCount, setVisibleBlogCount] = useState(9);
  const [visibleDownloadsCount, setVisibleDownloadsCount] = useState(9);
  
  // Remove hardcoded sample events - using activities from ContentContext
  const removedSampleEvents = [
    {
      id: 1,
      category: language === 'az' ? 'Seminar' : language === 'en' ? 'Seminar' : 'Семинар',
      title: language === 'az' ? 'Effektiv Ünsiyyət Bacarıqları' : language === 'en' ? 'Effective Communication Skills' : 'Эффективные навыки общения',
      description: language === 'az' ? 'Peşəkar mühitdə ünsiyyət bacarıqlarınızı inkişaf etdirin' : language === 'en' ? 'Develop your communication skills in professional environment' : 'Развивайте навыки общения в профессиональной среде',
      date: '2024-02-15',
      time: '10:00',
      format: 'offline',
      topic: 'communication',
      spotsTotal: 30,
      spotsLeft: 12,
      categoryColor: '#2166FF'
    },
    {
      id: 2,
      category: language === 'az' ? 'Webinar' : language === 'en' ? 'Webinar' : 'Вебинар',
      title: language === 'az' ? 'Liderlik və Komanda İdarəetməsi' : language === 'en' ? 'Leadership and Team Management' : 'Лидерство и управление командой',
      description: language === 'az' ? 'Online formatda liderlik bacarıqlarını öyrənin' : language === 'en' ? 'Learn leadership skills in online format' : 'Изучайте навыки лидерства в онлайн формате',
      date: '2024-02-20',
      time: '14:00',
      format: 'online',
      topic: 'leadership',
      spotsTotal: 50,
      spotsLeft: 28,
      categoryColor: '#02A44E'
    },
    {
      id: 3,
      category: language === 'az' ? 'Masterclass' : language === 'en' ? 'Masterclass' : 'Мастер-класс',
      title: language === 'az' ? 'Diksiya və Səs Təlimi' : language === 'en' ? 'Diction and Voice Training' : 'Дикция и голосовая подготовка',
      description: language === 'az' ? 'Səsinizi və diksiya texnikanızı təkmilləşdirin' : language === 'en' ? 'Perfect your voice and diction technique' : 'Совершенствуйте голос и технику дикции',
      date: '2024-02-25',
      time: '16:00',
      format: 'offline',
      topic: 'speech',
      spotsTotal: 20,
      spotsLeft: 5,
      categoryColor: '#F59E0B'
    },
    // Additional events for pagination demo
    {
      id: 4,
      category: language === 'az' ? 'Workshop' : language === 'en' ? 'Workshop' : 'Воркшоп',
      title: language === 'az' ? 'Kamera Qarşısında Çıxış' : language === 'en' ? 'On-Camera Performance' : 'Выступление перед камерой',
      description: language === 'az' ? 'Televiziya və video çəkilişləri üçün hazırlıq' : language === 'en' ? 'Preparation for TV and video recordings' : 'Подготовка к телевидению и видеосъемкам',
      date: '2024-03-05',
      time: '11:00',
      format: 'offline',
      topic: 'speech',
      spotsTotal: 15,
      spotsLeft: 8,
      categoryColor: '#8B5CF6'
    },
    {
      id: 5,
      category: language === 'az' ? 'Seminar' : language === 'en' ? 'Seminar' : 'Семинар',
      title: language === 'az' ? 'Stress İdarəetməsi və Həyəcan Nəzarəti' : language === 'en' ? 'Stress Management and Anxiety Control' : 'Управление стрессом и контроль тревожности',
      description: language === 'az' ? 'Həyəcan və stressi idarə etmək texnikaları' : language === 'en' ? 'Techniques to manage anxiety and stress' : 'Техники управления тревогой и стрессом',
      date: '2024-03-10',
      time: '15:00',
      format: 'online',
      topic: 'communication',
      spotsTotal: 40,
      spotsLeft: 22,
      categoryColor: '#2166FF'
    },
    {
      id: 6,
      category: language === 'az' ? 'Masterclass' : language === 'en' ? 'Masterclass' : 'Мастер-класс',
      title: language === 'az' ? 'Biznes Təqdimatları Hazırlığı' : language === 'en' ? 'Business Presentation Preparation' : 'Подготовка бизнес-презентаций',
      description: language === 'az' ? 'Peşəkar biznes təqdimatları üçün strategiyalar' : language === 'en' ? 'Strategies for professional business presentations' : 'Стратегии для профессиональных бизнес-презентаций',
      date: '2024-03-15',
      time: '13:00',
      format: 'offline',
      topic: 'leadership',
      spotsTotal: 25,
      spotsLeft: 12,
      categoryColor: '#02A44E'
    },
    {
      id: 7,
      category: language === 'az' ? 'Workshop' : language === 'en' ? 'Workshop' : 'Воркшоп',
      title: language === 'az' ? 'Dinləmə Bacarıqları və Empatiya' : language === 'en' ? 'Listening Skills and Empathy' : 'Навыки слушания и эмпатия',
      description: language === 'az' ? 'Effektiv dinləmə və empatik ünsiyyət' : language === 'en' ? 'Effective listening and empathic communication' : 'Эффективное слушание и эмпатическое общение',
      date: '2024-03-20',
      time: '10:30',
      format: 'online',
      topic: 'communication',
      spotsTotal: 35,
      spotsLeft: 18,
      categoryColor: '#F59E0B'
    },
    {
      id: 8,
      category: language === 'az' ? 'Seminar' : language === 'en' ? 'Seminar' : 'Семинар',
      title: language === 'az' ? 'Kreativ Təfəkkür və İnnovasiya' : language === 'en' ? 'Creative Thinking and Innovation' : 'Креативное мышление и инновации',
      description: language === 'az' ? 'Yaradıcı düşüncə və innovativ yanaşmalar' : language === 'en' ? 'Creative thinking and innovative approaches' : 'Креативное мышление и инновационные подходы',
      date: '2024-03-25',
      time: '14:30',
      format: 'offline',
      topic: 'leadership',
      spotsTotal: 30,
      spotsLeft: 15,
      categoryColor: '#8B5CF6'
    },
    {
      id: 9,
      category: language === 'az' ? 'Webinar' : language === 'en' ? 'Webinar' : 'Вебинар',
      title: language === 'az' ? 'Qlobal Ünsiyyət və Mədəniyyətlərarası Dialoq' : language === 'en' ? 'Global Communication and Intercultural Dialogue' : 'Глобальная коммуникация и межкультурный диалог',
      description: language === 'az' ? 'Beynəlxalq mühitdə effektiv ünsiyyət' : language === 'en' ? 'Effective communication in international environment' : 'Эффективная коммуникация в международной среде',
      date: '2024-03-30',
      time: '16:00',
      format: 'online',
      topic: 'communication',
      spotsTotal: 60,
      spotsLeft: 35,
      categoryColor: '#2166FF'
    },
    {
      id: 10,
      category: language === 'az' ? 'Masterclass' : language === 'en' ? 'Masterclass' : 'Мастер-класс',
      title: language === 'az' ? 'Danışıq Tempi və Ritm Nəzarəti' : language === 'en' ? 'Speech Pace and Rhythm Control' : 'Контроль темпа и ритма речи',
      description: language === 'az' ? 'Səs tembri və danışıq ritmini təkmilləşdirmək' : language === 'en' ? 'Perfecting voice timbre and speech rhythm' : 'Совершенствование тембра голоса и ритма речи',
      date: '2024-04-05',
      time: '12:00',
      format: 'offline',
      topic: 'speech',
      spotsTotal: 18,
      spotsLeft: 6,
      categoryColor: '#F59E0B'
    }
  ];
  
  // Sample articles data
  const sampleArticles = [
    {
      id: 1,
      title: language === 'az' ? 'Effektiv Ünsiyyət üçün 10 Qızıl Qayda' : language === 'en' ? '10 Golden Rules for Effective Communication' : '10 золотых правил эффективного общения',
      type: 'article',
      coverImage: 'https://images.unsplash.com/photo-1553028826-f4804151e106?w=400&h=250&fit=crop',
      tags: ['communication', 'tips'],
      readTime: language === 'az' ? '5 dəq oxu' : language === 'en' ? '5 min read' : '5 мин чтения',
      date: '2024-01-15',
      excerpt: language === 'az' ? 'Peşəkar həyatda uğur qazanmaq üçün ünsiyyət bacarıqları...' : language === 'en' ? 'Communication skills for professional success...' : 'Навыки общения для профессионального успеха...'
    },
    {
      id: 2,
      title: language === 'az' ? 'Bədən Dilinin Gücü: Sözsüz Ünsiyyət Qaydaları' : language === 'en' ? 'The Power of Body Language: Non-Verbal Communication Rules' : 'Сила языка тела: правила невербального общения',
      type: 'article',
      coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop',
      tags: ['body-language', 'communication'],
      readTime: language === 'az' ? '8 dəq oxu' : language === 'en' ? '8 min read' : '8 мин чтения',
      date: '2024-01-20',
      excerpt: language === 'az' ? 'Bədən dili haqqında bilməli olduğunuz hər şey...' : language === 'en' ? 'Everything you need to know about body language...' : 'Всё что нужно знать о языке тела...'
    },
    {
      id: 3,
      title: language === 'az' ? 'Liderlik Bacarıqları İnkişaf Metodikası' : language === 'en' ? 'Leadership Skills Development Methodology' : 'Методика развития лидерских навыков',
      type: 'pdf',
      coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
      tags: ['leadership', 'development'],
      readTime: language === 'az' ? 'PDF yüklə' : language === 'en' ? 'Download PDF' : 'Скачать PDF',
      date: '2024-01-25',
      excerpt: language === 'az' ? 'Liderlik yolculuğunuzda istifadə edəcəyiniz praktiki bələdçi...' : language === 'en' ? 'Practical guide for your leadership journey...' : 'Практическое руководство для вашего лидерского пути...'
    },
    {
      id: 4,
      title: language === 'az' ? 'Səs və Nəfəs Texnikaları: Praktiki Məşqlər' : language === 'en' ? 'Voice and Breathing Techniques: Practical Exercises' : 'Техники голоса и дыхания: практические упражнения',
      type: 'article',
      coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
      tags: ['speech', 'techniques'],
      readTime: language === 'az' ? '12 dəq oxu' : language === 'en' ? '12 min read' : '12 мин чтения',
      date: '2024-02-01',
      excerpt: language === 'az' ? 'Səsinizi gücləndirmək üçün ədədi məşqlər...' : language === 'en' ? 'Daily exercises to strengthen your voice...' : 'Ежедневные упражнения для укрепления голоса...'
    },
    {
      id: 5,
      title: language === 'az' ? 'Təqdimat Hazırlığı: Addım-addım Bələdçi' : language === 'en' ? 'Presentation Preparation: Step-by-Step Guide' : 'Подготовка презентации: пошаговое руководство',
      type: 'pdf',
      coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
      tags: ['presentation', 'tips'],
      readTime: language === 'az' ? 'PDF yüklə' : language === 'en' ? 'Download PDF' : 'Скачать PDF',
      date: '2024-02-05',
      excerpt: language === 'az' ? 'Təsirli təqdimat hazırlamaq üçün tam bələdçi...' : language === 'en' ? 'Complete guide to preparing effective presentations...' : 'Полное руководство по подготовке эффективных презентаций...'
    },
    {
      id: 6,
      title: language === 'az' ? 'Münaqişələrin İdarə Edilməsi: Konstruktiv Yanaşma' : language === 'en' ? 'Conflict Management: Constructive Approach' : 'Управление конфликтами: конструктивный подход',
      type: 'article',
      coverImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop',
      tags: ['leadership', 'communication'],
      readTime: language === 'az' ? '7 dəq oxu' : language === 'en' ? '7 min read' : '7 мин чтения',
      date: '2024-02-10',
      excerpt: language === 'az' ? 'İş yerində münaqişələri necə həll etmək olar...' : language === 'en' ? 'How to resolve conflicts in the workplace...' : 'Как разрешать конфликты на рабочем месте...'
    },
    // Additional articles for pagination demo
    {
      id: 7,
      title: language === 'az' ? 'Dinləyici Diqqətini Cəlb Etmək Yolları' : language === 'en' ? 'Ways to Capture Audience Attention' : 'Способы привлечения внимания аудитории',
      type: 'article',
      coverImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=250&fit=crop',
      tags: ['presentation', 'tips'],
      readTime: language === 'az' ? '6 dəq oxu' : language === 'en' ? '6 min read' : '6 мин чтения',
      date: '2024-02-15',
      excerpt: language === 'az' ? 'Təqdimat zamanı dinləyicinin diqqətini necə cəlb etmək...' : language === 'en' ? 'How to capture audience attention during presentations...' : 'Как привлечь внимание аудитории во время презентаций...'
    },
    {
      id: 8,
      title: language === 'az' ? 'Stress Menecmenti və Sakit Danışıq' : language === 'en' ? 'Stress Management and Calm Speaking' : 'Управление стрессом и спокойная речь',
      type: 'pdf',
      coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      tags: ['techniques', 'development'],
      readTime: language === 'az' ? 'PDF yüklə' : language === 'en' ? 'Download PDF' : 'Скачать PDF',
      date: '2024-02-20',
      excerpt: language === 'az' ? 'Stress vəziyyətlərində sakit və aydın danışmaq texnikaları...' : language === 'en' ? 'Techniques for calm and clear speaking in stressful situations...' : 'Техники спокойной и четкой речи в стрессовых ситуациях...'
    },
    {
      id: 9,
      title: language === 'az' ? 'Komanda Ünsiyyəti və Əməkdaşlıq' : language === 'en' ? 'Team Communication and Collaboration' : 'Командное общение и сотрудничество',
      type: 'article',
      coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
      tags: ['leadership', 'communication'],
      readTime: language === 'az' ? '9 dəq oxu' : language === 'en' ? '9 min read' : '9 мин чтения',
      date: '2024-02-25',
      excerpt: language === 'az' ? 'Komanda içində effektiv ünsiyyət və əməkdaşlıq strategiyaları...' : language === 'en' ? 'Effective communication and collaboration strategies within teams...' : 'Стратегии эффективного общения и сотрудничества в команде...'
    },
    {
      id: 10,
      title: language === 'az' ? 'Rəqəmsal Mühitdə Ünsiyyət Etikası' : language === 'en' ? 'Communication Ethics in Digital Environment' : 'Этика общения в цифровой среде',
      type: 'article',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      tags: ['communication', 'tips'],
      readTime: language === 'az' ? '4 dəq oxu' : language === 'en' ? '4 min read' : '4 мин чтения',
      date: '2024-03-01',
      excerpt: language === 'az' ? 'Online platformalarda düzgün ünsiyyət qaydaları...' : language === 'en' ? 'Proper communication rules on online platforms...' : 'Правила правильного общения на онлайн-платформах...'
    },
    {
      id: 11,
      title: language === 'az' ? 'İntonasiya və Səs Modulyasiyası' : language === 'en' ? 'Intonation and Voice Modulation' : 'Интонация и модуляция голоса',
      type: 'pdf',
      coverImage: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=250&fit=crop',
      tags: ['speech', 'techniques'],
      readTime: language === 'az' ? 'PDF yüklə' : language === 'en' ? 'Download PDF' : 'Скачать PDF',
      date: '2024-03-05',
      excerpt: language === 'az' ? 'Səs tonunu və intonasiyanı düzgün istifadə etmək üçün bələdçi...' : language === 'en' ? 'Guide to proper use of voice tone and intonation...' : 'Руководство по правильному использованию тона голоса и интонации...'
    },
    {
      id: 12,
      title: language === 'az' ? 'Məsafəli İşdə Effektiv Ünsiyyət' : language === 'en' ? 'Effective Communication in Remote Work' : 'Эффективное общение при удаленной работе',
      type: 'article',
      coverImage: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=400&h=250&fit=crop',
      tags: ['communication', 'leadership'],
      readTime: language === 'az' ? '8 dəq oxu' : language === 'en' ? '8 min read' : '8 мин чтения',
      date: '2024-03-10',
      excerpt: language === 'az' ? 'Uzaqdan iş rejimində komanda ilə ünsiyyət qaydaları...' : language === 'en' ? 'Rules for team communication in remote work mode...' : 'Правила командного общения в режиме удаленной работы...'
    }
  ];
  
  // Removed unused openLightbox function
  
  const closeLightbox = () => {
    setSelectedImage(null);
  };

  // Convert resources to article format and filter based on search and tags
  const convertedArticles = resources.filter(item => item.published).map(item => ({
    id: item.id,
    title: item.title[language] || item.title.az,
    type: item.type || 'article',
    coverImage: item.imageUrl,
    tags: [item.category[language]?.toLowerCase() || item.category.az?.toLowerCase() || 'resource'],
    readTime: language === 'az' ? '5 dəq oxu' : language === 'en' ? '5 min read' : '5 мин чтения',
    date: item.date,
    excerpt: item.excerpt[language] || item.excerpt.az,
    downloadUrl: item.downloadUrl,
    featured: item.featured
  }));

  const filteredArticles = convertedArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(articleSearch.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => article.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  // Available tags
  const availableTags = [
    { key: 'communication', label: t('communication') },
    { key: 'body-language', label: t('bodyLanguage') },
    { key: 'leadership', label: t('leadership') },
    { key: 'speech', label: t('speech') },
    { key: 'tips', label: t('tips') },
    { key: 'techniques', label: t('techniques') },
    { key: 'presentation', label: t('presentation') },
    { key: 'development', label: t('development') }
  ];

  // Toggle tag selection
  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Generate Event Schema markup
  const generateEventSchema = (event) => {
    return {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": event.title,
      "description": event.description,
      "startDate": `${event.date}T${event.time}:00`,
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": event.format === 'online' 
        ? "https://schema.org/OnlineEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
      "location": event.format === 'online' 
        ? {
            "@type": "VirtualLocation",
            "url": "https://bakinitqmerkezi.az"
          }
        : {
            "@type": "Place",
            "name": "Bakı Nitq Mərkəzi",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": siteContent.contactInfo?.address?.az || "Əhməd Rəcəbli 156, Aynalı Plaza",
              "addressLocality": "Bakı",
              "addressCountry": "AZ"
            }
          },
      "organizer": {
        "@type": "Organization",
        "name": "Bakı Nitq Mərkəzi",
        "url": "https://bakinitqmerkezi.az"
      },
      "offers": {
        "@type": "Offer",
        "availability": event.spotsLeft > 0 ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
        "validFrom": new Date().toISOString()
      }
    };
  };

  // Generate Article Schema markup
  const generateArticleSchema = (article) => {
    return {
      "@context": "https://schema.org",
      "@type": article.type === 'pdf' ? "DigitalDocument" : "Article",
      "headline": article.title,
      "description": article.excerpt,
      "datePublished": article.date,
      "dateModified": article.date,
      "author": {
        "@type": "Organization",
        "name": "Bakı Nitq Mərkəzi"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Bakı Nitq Mərkəzi",
        "logo": {
          "@type": "ImageObject",
          "url": "https://bakinitqmerkezi.az/nitg_logo.jpg"
        }
      },
      "image": article.coverImage,
      "keywords": article.tags.join(", "),
      ...(article.type === 'pdf' && {
        "encodingFormat": "application/pdf"
      })
    };
  };

  // Convert activities to events format and filter based on selected filters
  const convertedEvents = activities.filter(activity => activity.active).map(activity => ({
    id: activity.id,
    category: activity.category,
    title: activity.title[language] || activity.title.az,
    description: activity.description[language] || activity.description.az,
    date: activity.date,
    time: activity.time,
    format: 'offline', // Default format, could be enhanced later
    topic: activity.category,
    spotsTotal: 30, // Default values, could be enhanced later
    spotsLeft: 15,
    categoryColor: '#2166FF'
  }));

  const filteredEvents = convertedEvents.filter(event => {
    // Date range filter
    if (eventFilters.dateRange) {
      const eventDate = new Date(event.date);
      const today = new Date();
      const daysDiff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
      
      switch (eventFilters.dateRange) {
        case 'this-week':
          if (daysDiff < 0 || daysDiff > 7) return false;
          break;
        case 'this-month':
          if (daysDiff < 0 || daysDiff > 30) return false;
          break;
        case 'next-month':
          if (daysDiff < 30 || daysDiff > 60) return false;
          break;
        default:
          break;
      }
    }
    
    // Format filter
    if (eventFilters.format && event.format !== eventFilters.format) {
      return false;
    }
    
    // Topic filter
    if (eventFilters.topic && event.topic !== eventFilters.topic) {
      return false;
    }
    
    return true;
  });

  // Sticky tabs functionality
  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        const tabsTop = tabsRef.current.offsetTop;
        const scrollTop = window.scrollY;
        setIsTabsSticky(scrollTop > tabsTop - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading effect for performance optimization
  useEffect(() => {
    // Show skeleton loading for 0.5s on initial load
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Load more functions
  const loadMoreEvents = () => {
    setVisibleEventsCount(prev => Math.min(prev + 9, filteredEvents.length));
  };

  const loadMoreArticles = () => {
    setVisibleArticlesCount(prev => Math.min(prev + 9, filteredArticles.length));
  };

  // Skeleton Loading Component
  const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
  
  // Generate page-level schema
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t('galleryTitle'),
    "description": t('galleryDesc'),
    "url": "https://bakinitqmerkezi.az/gallery",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Bakı Nitq Mərkəzi",
      "url": "https://bakinitqmerkezi.az"
    },
    "provider": {
      "@type": "Organization",
      "name": "Bakı Nitq Mərkəzi"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ana Səhifə",
        "item": "https://bakinitqmerkezi.az"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t('galleryTitle'),
        "item": "https://bakinitqmerkezi.az/gallery"
      }
    ]
  };

  return (
    <div>
      {/* Page Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema)
        }}
      />
      
      {/* Breadcrumb Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      
      {/* Hero/Intro Band */}
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
          }}>{t('galleryTitle')}</h1>
          <p className="text-center max-w-4xl mx-auto" style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: '1.125rem',
            lineHeight: 1.6,
            color: '#1E1E1E'
          }}>
            {t('galleryDesc')}
          </p>
        </div>
      </section>
      
      {/* Sticky Tab Switcher */}
      <div ref={tabsRef} className={`${isTabsSticky ? 'fixed top-20 left-0 right-0 z-40' : 'relative'} bg-white border-b border-gray-200 transition-all duration-300`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-1 py-4">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 relative ${
                activeTab === 'events' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              {t('eventsTab')}
              {activeTab === 'events' && (
                <div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                  style={{
                    width: '80%',
                    height: '3px',
                    backgroundColor: '#2166FF',
                    borderRadius: '2px'
                  }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 relative ${
                activeTab === 'articles' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              {t('articlesResourcesTab')}
              {activeTab === 'articles' && (
                <div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                  style={{
                    width: '80%',
                    height: '3px',
                    backgroundColor: '#2166FF',
                    borderRadius: '2px'
                  }}
                />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className={`${isTabsSticky ? 'pt-20' : ''} py-16`}>
        <div className="container mx-auto px-4">
        
        {/* Events Tab Content */}
        {activeTab === 'events' && (
          <div>
            {/* Filter Bar */}
            <div id="events-filter-bar" className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: '#1E1E1E'
                  }}>{t('filterEvents')}</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {/* Date Range Filter */}
                  <div className="relative">
                    <select
                      value={eventFilters.dateRange}
                      onChange={(e) => setEventFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:border-transparent"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '1rem',
                        minWidth: '140px'
                      }}
                      onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(33, 102, 255, 0.2)'}
                      onBlur={(e) => e.target.style.boxShadow = 'none'}
                    >
                      <option value="">{t('dateRange')}</option>
                      <option value="this-week">{language === 'az' ? 'Bu həftə' : language === 'en' ? 'This Week' : 'Эта неделя'}</option>
                      <option value="this-month">{language === 'az' ? 'Bu ay' : language === 'en' ? 'This Month' : 'Этот месяц'}</option>
                      <option value="next-month">{language === 'az' ? 'Gələn ay' : language === 'en' ? 'Next Month' : 'Следующий месяц'}</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  
                  {/* Format Filter */}
                  <div className="relative">
                    <select
                      value={eventFilters.format}
                      onChange={(e) => setEventFilters(prev => ({ ...prev, format: e.target.value }))}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:border-transparent"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '1rem',
                        minWidth: '140px'
                      }}
                      onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(33, 102, 255, 0.2)'}
                      onBlur={(e) => e.target.style.boxShadow = 'none'}
                    >
                      <option value="">{t('allFormats')}</option>
                      <option value="offline">{t('offline')}</option>
                      <option value="online">{t('online')}</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  
                  {/* Topic Chips */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEventFilters(prev => ({ ...prev, topic: prev.topic === 'communication' ? '' : 'communication' }))}
                      className={`px-3 py-2 rounded-full font-medium transition-all duration-200 ${
                        eventFilters.topic === 'communication'
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem' }}
                    >
                      {t('communication')}
                    </button>
                    <button
                      onClick={() => setEventFilters(prev => ({ ...prev, topic: prev.topic === 'leadership' ? '' : 'leadership' }))}
                      className={`px-3 py-2 rounded-full font-medium transition-all duration-200 ${
                        eventFilters.topic === 'leadership'
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem' }}
                    >
                      {t('leadership')}
                    </button>
                    <button
                      onClick={() => setEventFilters(prev => ({ ...prev, topic: prev.topic === 'speech' ? '' : 'speech' }))}
                      className={`px-3 py-2 rounded-full font-medium transition-all duration-200 ${
                        eventFilters.topic === 'speech'
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem' }}
                    >
                      {t('speech')}
                    </button>
                  </div>
                  
                  {/* Clear Filters Button */}
                  {(eventFilters.dateRange || eventFilters.format || eventFilters.topic) && (
                    <button
                      onClick={() => setEventFilters({ dateRange: '', format: '', topic: '' })}
                      className="px-4 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '1rem',
                        fontWeight: 600
                      }}
                    >
                      {language === 'az' ? 'Təmizlə' : language === 'en' ? 'Clear' : 'Очистить'}
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Event Cards Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gray-100 rounded-lg p-12 max-w-md mx-auto">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 
                    className="mb-2"
                    style={{
                      fontFamily: "'Lora', serif",
                      fontWeight: 600,
                      fontSize: '1.5rem',
                      lineHeight: 1.35,
                      color: '#374151'
                    }}
                  >
                    {language === 'az' ? 'Tədbir tapılmadı' : language === 'en' ? 'No Events Found' : 'События не найдены'}
                  </h3>
                  <p className="text-gray-500" style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: '1rem',
                    lineHeight: 1.6
                  }}>
                    {language === 'az' ? 'Seçilmiş filtrlərə uyğun tədbir tapılmadı' : language === 'en' ? 'No events found matching your filters' : 'События не найдены по выбранным фильтрам'}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.slice(0, visibleEventsCount).map((event) => (
                <div
                  key={event.id}
                  className="bg-white transition-all duration-300 ease-out transform hover:-translate-y-2"
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                    padding: '1.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)';
                  }}
                >
                  {/* Event Schema JSON-LD */}
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(generateEventSchema(event))
                    }}
                  />
                  {/* Category Chip */}
                  <div className="mb-4">
                    <span
                      className="px-3 py-1 font-semibold rounded-full"
                      style={{
                        backgroundColor: `${event.categoryColor}15`,
                        color: event.categoryColor,
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.75rem'
                      }}
                    >
                      {event.category}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="mb-3" style={{
                    fontFamily: "'Lora', serif",
                    fontWeight: 600,
                    fontSize: '1.5rem',
                    lineHeight: 1.35,
                    color: '#1E1E1E',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {event.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="mb-4" style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    color: '#1E1E1E',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {event.description}
                  </p>
                  
                  {/* Date-Time Row */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.75rem',
                        color: '#666666',
                        fontWeight: 500
                      }}>
                        {new Date(event.date).toLocaleDateString(language === 'az' ? 'az-AZ' : language === 'en' ? 'en-US' : 'ru-RU')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.75rem',
                        color: '#666666',
                        fontWeight: 500
                      }}>
                        {event.format === 'online' ? t('online') : t('offline')}
                      </span>
                    </div>
                  </div>
                  
                  
                  {/* Register Button */}
                  <button
                    onClick={() => {
                      setCurrentPage('contact');
                      window.scrollTo({ top: 0, behavior: 'auto' });
                    }}
                    className="w-full text-white py-3 rounded-lg font-semibold transition-all duration-200"
                    style={{
                      backgroundColor: '#2166FF',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '1rem',
                      fontWeight: 600,
                      letterSpacing: '0.3px',
                      transform: 'scale(1)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#1d5def';
                      e.target.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#2166FF';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    {t('register')}
                  </button>
                </div>
                  ))}
                </div>
                
                {/* Load More Events Button */}
                {visibleEventsCount < filteredEvents.length && (
                  <div className="text-center mt-12">
                    <button
                      onClick={loadMoreEvents}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: '1rem'
                      }}
                    >
                      {t('loadMoreEvents')}
                      <span className="ml-2">({filteredEvents.length - visibleEventsCount} {t('remaining')})</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
        
        {/* Articles & Resources Tab Content */}
        {activeTab === 'articles' && (
          <div>
            {/* Search and Filter Bar */}
            <div id="articles-search-bar" className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t('searchArticles')}
                      value={articleSearch}
                      onChange={(e) => setArticleSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '1rem'
                      }}
                      onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px rgba(33, 102, 255, 0.2)'}
                      onBlur={(e) => e.target.style.boxShadow = 'none'}
                    />
                  </div>
                </div>
                
                {/* Tag Filters */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: '#1E1E1E',
                      alignSelf: 'center',
                      marginRight: '0.5rem'
                    }}>Tags:</span>
                    {availableTags.map(tag => (
                      <button
                        key={tag.key}
                        onClick={() => toggleTag(tag.key)}
                        className={`px-3 py-2 rounded-full font-medium transition-all duration-200 ${
                          selectedTags.includes(tag.key)
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem' }}
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Articles Grid - Masonry Layout */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gray-100 rounded-lg p-12 max-w-md mx-auto">
                  <div className="text-6xl mb-4">📄</div>
                  <h3 
                    className="mb-2"
                    style={{
                      fontFamily: "'Lora', serif",
                      fontWeight: 600,
                      fontSize: '1.5rem',
                      lineHeight: 1.35,
                      color: '#374151'
                    }}
                  >
                    {language === 'az' ? 'Məqalə tapılmadı' : language === 'en' ? 'No Articles Found' : 'Статьи не найдены'}
                  </h3>
                  <p className="text-gray-500" style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: '1rem',
                    lineHeight: 1.6
                  }}>
                    {language === 'az' ? 'Axtarış şərtlərinizə uyğun məqalə tapılmadı' : language === 'en' ? 'No articles found matching your search criteria' : 'Статьи не найдены по вашим критериям поиска'}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.slice(0, visibleArticlesCount).map((article) => (
                  <div
                    key={article.id}
                    className="bg-white transition-all duration-300 ease-out transform hover:-translate-y-1"
                    style={{
                      borderRadius: '12px',
                      boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)';
                    }}
                  >
                    {/* Article Schema JSON-LD */}
                    <script
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generateArticleSchema(article))
                      }}
                    />
                    {/* Cover Image */}
                    <div className="relative">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                      />
                      
                      {/* PDF Badge & Download Icon for PDF files */}
                      {article.type === 'pdf' && (
                        <div className="absolute top-3 right-3 flex items-center gap-2">
                          <span className="px-2 py-1 bg-red-500 text-white font-semibold rounded"
                                style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem' }}>
                            PDF
                          </span>
                          <div className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                            <Download className="w-4 h-4 text-gray-700" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Card Content */}
                    <div className="p-6">
                      {/* Title */}
                      <h3 className="mb-3" style={{
                        fontFamily: "'Lora', serif",
                        fontWeight: 600,
                        fontSize: '1.5rem',
                        lineHeight: 1.35,
                        color: '#1E1E1E',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {article.title}
                      </h3>
                      
                      {/* Excerpt */}
                      <p className="mb-4" style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 400,
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        color: '#1E1E1E',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {article.excerpt}
                      </p>
                      
                      {/* Meta Line */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span style={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '0.75rem',
                            color: '#666666',
                            fontWeight: 500
                          }}>
                            {article.readTime}
                          </span>
                        </div>
                        <span style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '0.75rem',
                          color: '#666666'
                        }}>
                          {new Date(article.date).toLocaleDateString(language === 'az' ? 'az-AZ' : language === 'en' ? 'en-US' : 'ru-RU')}
                        </span>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 2).map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 font-medium bg-gray-100 text-gray-600 rounded-full"
                            style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem' }}
                          >
                            {availableTags.find(t => t.key === tag)?.label || tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Action Button */}
                      <button
                        onClick={() => {
                          if (article.type === 'pdf') {
                            window.open(article.downloadUrl, '_blank');
                          } else {
                            window.open(article.url, '_blank');
                          }
                        }}
                        className="w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                        style={{
                          backgroundColor: article.type === 'pdf' ? '#02A44E' : '#2166FF',
                          color: 'white',
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: '1rem',
                          fontWeight: 600,
                          letterSpacing: '0.3px',
                          transform: 'scale(1)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = article.type === 'pdf' ? '#028A42' : '#1d5def';
                          e.target.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = article.type === 'pdf' ? '#02A44E' : '#2166FF';
                          e.target.style.transform = 'scale(1)';
                        }}
                      >
                        {article.type === 'pdf' ? (
                          <>
                            <Download className="w-4 h-4" />
                            {t('downloadPdf')}
                          </>
                        ) : (
                          <>
                            <FileText className="w-4 h-4" />
                            {t('readMore')}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  ))}
                </div>
                
                {/* Load More Articles Button */}
                {visibleArticlesCount < filteredArticles.length && (
                  <div className="text-center mt-12">
                    <button
                      onClick={loadMoreArticles}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: '1rem'
                      }}
                    >
                      {t('loadMoreArticles')}
                      <span className="ml-2">({filteredArticles.length - visibleArticlesCount} {t('remaining')})</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
        
        </div>
      </div>
      
      {/* Conversion CTA Section - Appears for both tabs */}
      <section style={{backgroundColor: '#FFFFFF', paddingTop: '6rem', paddingBottom: '5rem', marginBottom: '4rem'}}>
        <div className="container mx-auto px-4">
          <ConversionCTA setCurrentPage={setCurrentPage} />
        </div>
      </section>
      
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X size={32} />
            </button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title[language] || selectedImage.name}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
              <h3 className="mb-2" style={{
                fontFamily: "'Lora', serif",
                fontWeight: 600,
                fontSize: '1.5rem',
                lineHeight: 1.35,
                color: '#FFFFFF'
              }}>
                {selectedImage.title[language] || selectedImage.name}
              </h3>
              {selectedImage.description[language] && (
                <p className="text-gray-200">
                  {selectedImage.description[language]}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;