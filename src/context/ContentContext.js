import React, { createContext, useContext, useState } from 'react';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [siteContent, setSiteContent] = useState({
    homeHero: {
      az: 'Bakı Nitq Mərkəzinə Xoş Gəlmisiniz',
      en: 'Welcome to Baku Speech Center',
      ru: 'Добро пожаловать в Центр Речи Баку'
    },
    homeDesc: {
      az: 'Nitq mədəniyyəti, natiqlik və diksiya sahəsində peşəkar təlim mərkəzi',
      en: 'Professional training center for speech culture, oratory, and diction',
      ru: 'Профессиональный учебный центр по культуре речи, ораторскому искусству и дикции'
    },
    aboutMission: {
      az: 'Bakı Nitq Mərkəzi olaraq, hər yaşda insanlara nitq mədəniyyəti, natiqlik və diksiya sahələrində keyfiyyətli təlim təqdim etməyi hədəfləyirik.',
      en: 'As Baku Speech Center, we aim to provide quality training in speech culture, oratory, and diction to people of all ages.',
      ru: 'Как Центр Речи Баку, мы стремимся предоставить качественное обучение в области культуры речи, ораторского искусства и дикции людям всех возрастов.'
    },
    aboutVision: {
      az: 'Azərbaycanda nitq təlimi sahəsində aparıcı mərkəz olmaq və cəmiyyətdə kommunikasiya mədəniyyətinin inkişafına töhfə vermək.',
      en: 'To be the leading center in speech training in Azerbaijan and contribute to the development of communication culture in society.',
      ru: 'Стать ведущим центром обучения речи в Азербайджане и внести вклад в развитие культуры общения в обществе.'
    },
    contactInfo: {
      phone: '+994102271404',
      email: 'info@bakinitqmerkezi.az',
      address: 'Bakı şəhəri, Nərimanov rayonu, Əhməd Rəcəbli 156, Aynalı Plaza',
      hours: 'Monday - Friday: 9:00-18:00',
      instagram: 'https://instagram.com/bakinitqmerkezi',
      facebook: 'https://facebook.com/bakinitqmerkezi'
    },
    siteSettings: {
      siteName: 'Bakı Nitq Mərkəzi',
      defaultLanguage: 'az',
      enableAnalytics: true
    }
  });

  const [mediaLibrary, setMediaLibrary] = useState([
    { 
      id: 1, 
      name: 'classroom1.jpg', 
      type: 'image', 
      size: '2.4 MB', 
      uploaded: '2025-01-15', 
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
      inGallery: true,
      title: {
        az: 'Sinif otağı',
        en: 'Classroom',
        ru: 'Классная комната'
      },
      description: {
        az: 'Modern təlim sinfi',
        en: 'Modern training classroom',
        ru: 'Современный учебный класс'
      }
    },
    { 
      id: 2, 
      name: 'student-presentation.jpg', 
      type: 'image', 
      size: '3.1 MB', 
      uploaded: '2025-01-14', 
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      inGallery: true,
      title: {
        az: 'Tələbə təqdimatı',
        en: 'Student presentation',
        ru: 'Презентация студента'
      },
      description: {
        az: 'Tələbə öz təqdimatını edir',
        en: 'Student giving presentation',
        ru: 'Студент делает презентацию'
      }
    },
    { 
      id: 3, 
      name: 'speech-training.jpg', 
      type: 'image', 
      size: '2.8 MB', 
      uploaded: '2025-01-13', 
      url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
      inGallery: true,
      title: {
        az: 'Nitq məşqi',
        en: 'Speech training',
        ru: 'Тренировка речи'
      },
      description: {
        az: 'Qrup halında nitq məşqi',
        en: 'Group speech training session',
        ru: 'Групповая тренировка речи'
      }
    },
    { 
      id: 4, 
      name: 'course-outline.pdf', 
      type: 'document', 
      size: '1.1 MB', 
      uploaded: '2025-01-13', 
      url: '#',
      inGallery: false,
      title: {
        az: 'Kurs proqramı',
        en: 'Course outline',
        ru: 'Программа курса'
      },
      description: {
        az: 'Ətraflı kurs proqramı',
        en: 'Detailed course outline',
        ru: 'Подробная программа курса'
      }
    }
  ]);

  const [news, setNews] = useState([
    {
      id: 1,
      title: {
        az: 'Yeni Natiqlik Kursu Başladı',
        en: 'New Oratory Course Started',
        ru: 'Начался новый курс ораторского искусства'
      },
      content: {
        az: 'Bu ay yeni natiqlik kursumuz böyük maraq görərək başladı. 25 iştirakçı ilə dolu sinifimizda peşəkar natiqlik bacarıqları öyrədilir.',
        en: 'This month our new oratory course started with great interest. Our classroom is full with 25 participants learning professional speaking skills.',
        ru: 'В этом месяце наш новый курс ораторского искусства начался с большим интересом. Наш класс заполнен 25 участниками, изучающими профессиональные навыки выступления.'
      },
      excerpt: {
        az: '25 iştirakçı ilə yeni natiqlik kursu başladı',
        en: 'New oratory course started with 25 participants',
        ru: 'Новый курс ораторского искусства начался с 25 участниками'
      },
      date: '2025-01-15',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      category: {
        az: 'Kurs Xəbərləri',
        en: 'Course News',
        ru: 'Новости курсов'
      },
      published: true,
      featured: true
    },
    {
      id: 2,
      title: {
        az: 'Tələbə Uğur Hekayələri',
        en: 'Student Success Stories',
        ru: 'Истории успеха студентов'
      },
      content: {
        az: 'Mərkəzimizdən məzun olan tələbələrimiz iş həyatlarında böyük uğurlara imza atıb. Onların təcrübələrini paylaşırdıq.',
        en: 'Our graduates have achieved great success in their professional lives. We shared their experiences.',
        ru: 'Наши выпускники добились больших успехов в своей профессиональной жизни. Мы поделились их опытом.'
      },
      excerpt: {
        az: 'Məzunlarımızın iş həyatındakı uğurları',
        en: 'Our graduates success in professional life',
        ru: 'Успехи наших выпускников в профессиональной жизни'
      },
      date: '2025-01-10',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      category: {
        az: 'Uğur Hekayələri',
        en: 'Success Stories',
        ru: 'Истории успеха'
      },
      published: true,
      featured: false
    },
    {
      id: 3,
      title: {
        az: 'Nitq Mədəniyyəti Seminarı',
        en: 'Speech Culture Seminar',
        ru: 'Семинар по культуре речи'
      },
      content: {
        az: 'Gələn həftə ictimaiyyət üçün açıq nitq mədəniyyəti seminarı keçiriləcək. İştirak pulsuz və qeydiyyat tələb olunur.',
        en: 'Next week, a public speech culture seminar will be held. Participation is free and registration is required.',
        ru: 'На следующей неделе состоится открытый семинар по культуре речи. Участие бесплатное, требуется регистрация.'
      },
      excerpt: {
        az: 'Pulsuz açıq seminar gələn həftə',
        en: 'Free public seminar next week',
        ru: 'Бесплатный открытый семинар на следующей неделе'
      },
      date: '2025-01-08',
      imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop',
      category: {
        az: 'Tədbirlər',
        en: 'Events',
        ru: 'Мероприятия'
      },
      published: true,
      featured: true
    }
  ]);

  const [siteStats, setSiteStats] = useState({
    totalVisitors: 1247,
    totalPageViews: 3891,
    averageSessionTime: '3:24',
    topPages: [
      { page: 'Home', views: 1203 },
      { page: 'Courses', views: 856 },
      { page: 'About', views: 634 },
      { page: 'Contact', views: 498 }
    ],
    languageUsage: {
      az: 65,
      en: 25,
      ru: 10
    },
    trafficSources: {
      direct: 45,
      search: 32,
      social: 23
    }
  });

  const [courses, setCourses] = useState([
    {
      id: 1,
      name: {
        az: 'Nitq Mədəniyyəti',
        en: 'Speech Culture',
        ru: 'Культура речи'
      },
      description: {
        az: 'Düzgün və təsirli danışıq qaydalarını öyrənin',
        en: 'Learn proper and effective speaking techniques',
        ru: 'Изучите правильные и эффективные техники речи'
      },
      curriculum: {
        az: [
          'Düzgün tələffüz və artikulyasiya texnikaları',
          'Səs modulyasiyası və ton nəzarəti',
          'Peşəkar ünsiyyət bacarıqları',
          'Azərbaycan dilində nitqin mədəni aspektləri'
        ],
        en: [
          'Proper pronunciation and articulation techniques',
          'Voice modulation and tone control',
          'Professional communication skills',
          'Cultural aspects of speech in Azerbaijani'
        ],
        ru: [
          'Правильные техники произношения и артикуляции',
          'Модуляция голоса и контроль тона',
          'Навыки профессионального общения',
          'Культурные аспекты речи на азербайджанском языке'
        ]
      },
      duration: '3 months',
      price: '200 AZN',
      active: true
    },
    {
      id: 2,
      name: {
        az: 'Natiqlik',
        en: 'Oratory',
        ru: 'Ораторское искусство'
      },
      description: {
        az: 'İctimai çıxış və təqdimat bacarıqlarınızı inkişaf etdirin',
        en: 'Develop your public speaking and presentation skills',
        ru: 'Развивайте навыки публичных выступлений и презентаций'
      },
      curriculum: {
        az: [
          'İctimai çıxış üçün özgüvən artırma',
          'Təqdimat strukturu və çatdırılması',
          'Auditoriya ilə əlaqə texnikaları',
          'Səhnə qorxusunu aradan qaldırma'
        ],
        en: [
          'Public speaking confidence building',
          'Presentation structure and delivery',
          'Audience engagement techniques',
          'Overcoming stage fright'
        ],
        ru: [
          'Повышение уверенности в публичных выступлениях',
          'Структура и подача презентаций',
          'Техники взаимодействия с аудиторией',
          'Преодоление страха сцены'
        ]
      },
      duration: '4 months',
      price: '250 AZN',
      active: true
    },
    {
      id: 3,
      name: {
        az: 'Diksiya',
        en: 'Diction',
        ru: 'Дикция'
      },
      description: {
        az: 'Səs və tələffüz texnikalarını mükəmməlləşdirin',
        en: 'Perfect your voice and pronunciation techniques',
        ru: 'Совершенствуйте техники голоса и произношения'
      },
      curriculum: {
        az: [
          'Səs proyeksiyası və nəfəs texnikaları',
          'Aydın tələffüz məşqləri',
          'Vurğu azaldılması və neytrallaşdırılması',
          'Peşəkar səs təlimi'
        ],
        en: [
          'Voice projection and breathing techniques',
          'Clear pronunciation exercises',
          'Accent reduction and neutralization',
          'Professional voice training'
        ],
        ru: [
          'Техники голосовой проекции и дыхания',
          'Упражнения для четкого произношения',
          'Уменьшение и нейтрализация акцента',
          'Профессиональная подготовка голоса'
        ]
      },
      duration: '2 months',
      price: '180 AZN',
      active: true
    }
  ]);

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: 'Aysel Məmmədova',
      text: {
        az: 'Mərkəzdə aldığım təlim sayəsində özgüvənim artdı və iş həyatımda daha uğurlu oldum.',
        en: 'Thanks to the training I received at the center, my confidence increased and I became more successful in my work life.',
        ru: 'Благодаря обучению, которое я получил в центре, моя уверенность возросла, и я стал более успешным в своей трудовой жизни.'
      },
      approved: true
    },
    {
      id: 2,
      name: 'Rəşad Əliyev',
      text: {
        az: 'Natiqlik kursları mənim üçün çox faydalı oldu. İndi ictimai çıxışlarımdan qorxmuram.',
        en: 'The oratory courses were very useful for me. Now I am not afraid of my public speeches.',
        ru: 'Курсы ораторского искусства были очень полезны для меня. Теперь я не боюсь публичных выступлений.'
      },
      approved: true
    },
    {
      id: 3,
      name: 'Leyla Həsənova',
      text: {
        az: 'Diksiya təlimləri mənim tələffüzümü kökündən dəyişdi. Təlimçilərimizin peşəkarlığından çox məmnunam.',
        en: 'Diction training fundamentally changed my pronunciation. I am very satisfied with the professionalism of our trainers.',
        ru: 'Обучение дикции кардинально изменило мое произношение. Я очень доволен профессионализмом наших тренеров.'
      },
      approved: true
    },
    {
      id: 4,
      name: 'Elnur Qədirov',
      text: {
        az: 'Korporativ təlimlər komandamızın ünsiyyət səviyyəsini əhəmiyyətli dərəcədə yüksəltdi. Hər kəsə tövsiyə edirəm.',
        en: 'Corporate training significantly improved our team\'s communication level. I recommend it to everyone.',
        ru: 'Корпоративное обучение значительно повысило уровень коммуникации нашей команды. Рекомендую всем.'
      },
      approved: true
    },
    {
      id: 5,
      name: 'Səbinə Rəhimova',
      text: {
        az: 'Özünü ifadə etmə kursları həyatımda dönüş nöqtəsi oldu. Artıq fikirlərimi aydın şəkildə çatdıra bilirəm.',
        en: 'Self-expression courses were a turning point in my life. Now I can convey my thoughts clearly.',
        ru: 'Курсы самовыражения стали поворотным моментом в моей жизни. Теперь я могу ясно выражать свои мысли.'
      },
      approved: true
    }
  ]);

  const [activities, setActivities] = useState([
    {
      id: 1,
      title: {
        az: 'Effektiv Nitq Texnikaları Seminarı',
        en: 'Effective Speech Techniques Seminar',
        ru: 'Семинар по эффективным техникам речи'
      },
      description: {
        az: 'Peşəkar nitq bacarıqlarınızı inkişaf etdirmək üçün praktiki seminar',
        en: 'Practical seminar to develop your professional speech skills',
        ru: 'Практический семинар для развития профессиональных навыков речи'
      },
      location: {
        az: 'Bakı Nitq Mərkəzi',
        en: 'Baku Speech Center',
        ru: 'Центр Речи Баку'
      },
      date: '2024-03-15',
      time: '10:00',
      category: 'seminar',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop',
      active: true,
      showOnHomepage: true
    },
    {
      id: 2,
      title: {
        az: 'Liderlik və Ünsiyyət Təlimi',
        en: 'Leadership and Communication Training',
        ru: 'Тренинг по лидерству и коммуникации'
      },
      description: {
        az: 'Liderlik bacarıqları və effektiv ünsiyyət texnikalarını öyrənin',
        en: 'Learn leadership skills and effective communication techniques',
        ru: 'Изучайте навыки лидерства и эффективные техники общения'
      },
      location: {
        az: 'Onlayn',
        en: 'Online',
        ru: 'Онлайн'
      },
      date: '2024-03-20',
      time: '14:00',
      category: 'training',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
      active: true,
      showOnHomepage: true
    },
    {
      id: 3,
      title: {
        az: 'Özgüvən Artırma Workshop-u',
        en: 'Confidence Building Workshop',
        ru: 'Воркшоп по повышению уверенности'
      },
      description: {
        az: 'Özgüvəninizi artırmaq və public speaking qorxusunu aradan qaldırmaq',
        en: 'Boost your confidence and overcome public speaking anxiety',
        ru: 'Повысьте уверенность и преодолейте страх публичных выступлений'
      },
      location: {
        az: 'Bakı Nitq Mərkəzi',
        en: 'Baku Speech Center',
        ru: 'Центр Речи Баку'
      },
      date: '2024-03-25',
      time: '16:00',
      category: 'workshop',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      active: true,
      showOnHomepage: true
    }
  ]);

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Dr. Leyla Əhmədova',
      position: {
        az: 'Baş Müəllim və Mərkəz Direktoru',
        en: 'Head Teacher and Center Director',
        ru: 'Главный преподаватель и директор центра'
      },
      story: {
        az: 'Dr. Leyla Əhmədova 15 illik təcrübəsi olan nitq mütəxəssisidir. Azərbaycan Dillər Universitetində dilçilik üzrə doktorluq dərəcəsi alıb. Mərkəzimizin təsisçisi olaraq, minlərlə tələbəyə nitq mədəniyyəti sahəsində dərin bilik və bacarıqlar öyrədib.',
        en: 'Dr. Leyla Ahmadova is a speech specialist with 15 years of experience. She holds a doctorate in linguistics from Azerbaijan University of Languages. As the founder of our center, she has taught thousands of students deep knowledge and skills in speech culture.',
        ru: 'Доктор Лейла Ахмедова - специалист по речи с 15-летним опытом. Она имеет докторскую степень по лингвистике Азербайджанского университета языков. Как основатель нашего центра, она обучила тысячи студентов глубоким знаниям и навыкам в области культуры речи.'
      },
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      active: true
    },
    {
      id: 2,
      name: 'Elnur Qasımov',
      position: {
        az: 'Natiqlik və İctimai Çıxış Mütəxəssisi',
        en: 'Oratory and Public Speaking Specialist',
        ru: 'Специалист по ораторскому искусству и публичным выступлениям'
      },
      story: {
        az: 'Elnur Qasımov teatr aktyoru və natiqlik müəllimidir. 12 il ərzində müxtəlif yaş qruplarında natiqlik dərsləri keçirib. Onun metodları sayəsində çoxlu tələbə səhnə qorxusunu udub və özgüvənli natiq olub.',
        en: 'Elnur Gasimov is a theater actor and oratory teacher. For 12 years, he has conducted oratory lessons for various age groups. Thanks to his methods, many students have overcome stage fright and become confident speakers.',
        ru: 'Эльнур Касымов - театральный актер и преподаватель ораторского искусства. В течение 12 лет он проводил уроки ораторского искусства для различных возрастных групп. Благодаря его методам многие студенты преодолели страх сцены и стали уверенными ораторами.'
      },
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      active: true
    }
  ]);

  // Content Management Functions
  const updateContent = (section, language, value) => {
    console.log(`🔄 Updating content: ${section}.${language} = "${value}"`);
    setSiteContent(prevContent => {
      const newContent = {
        ...prevContent,
        [section]: {
          ...prevContent[section],
          [language]: value
        }
      };
      console.log(`✅ Updated siteContent.${section}.${language}:`, newContent[section][language]);
      return newContent;
    });
  };

  // Bulk update function for saving multiple changes at once
  const updateMultipleContent = (contentUpdates) => {
    console.log('🔄 Bulk updating content:', contentUpdates);
    setSiteContent(prevContent => {
      const newContent = { ...prevContent };
      
      Object.keys(contentUpdates).forEach(section => {
        if (!newContent[section]) {
          newContent[section] = {};
        }
        Object.keys(contentUpdates[section]).forEach(language => {
          newContent[section][language] = contentUpdates[section][language];
          console.log(`✅ Bulk updated ${section}.${language}:`, contentUpdates[section][language]);
        });
      });
      
      console.log('✅ Final siteContent after bulk update:', newContent);
      return newContent;
    });
  };

  const updateSiteSettings = (newSettings) => {
    setSiteContent(prev => ({
      ...prev,
      siteSettings: {
        ...prev.siteSettings,
        ...newSettings
      }
    }));
  };

  const updateContactInfo = (newContactInfo) => {
    setSiteContent(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        ...newContactInfo
      }
    }));
  };

  // Media Management Functions
  const addMediaFile = (file) => {
    const newFile = {
      id: mediaLibrary.length + 1,
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 
            file.type.startsWith('video/') ? 'video' : 'document',
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      uploaded: new Date().toISOString().split('T')[0],
      url: URL.createObjectURL(file),
      inGallery: false, // Default to not in gallery
      title: {
        az: file.name.split('.')[0],
        en: file.name.split('.')[0],
        ru: file.name.split('.')[0]
      },
      description: {
        az: '',
        en: '',
        ru: ''
      }
    };
    setMediaLibrary(prev => [newFile, ...prev]);
    return newFile;
  };

  const deleteMediaFile = (fileId) => {
    setMediaLibrary(prev => prev.filter(file => file.id !== fileId));
  };

  const updateMediaFile = (fileId, updates) => {
    setMediaLibrary(prev => prev.map(file => 
      file.id === fileId ? { ...file, ...updates } : file
    ));
  };

  const toggleMediaInGallery = (fileId) => {
    setMediaLibrary(prev => prev.map(file => 
      file.id === fileId ? { ...file, inGallery: !file.inGallery } : file
    ));
  };

  // Get gallery items (media files marked for gallery display)
  const getGalleryItems = () => {
    return mediaLibrary.filter(file => file.inGallery && file.type === 'image');
  };

  // News Management Functions
  const addNews = (newsData) => {
    const newNews = {
      id: news.length + 1,
      ...newsData,
      date: new Date().toISOString().split('T')[0],
      published: false
    };
    setNews(prev => [newNews, ...prev]);
    return newNews;
  };

  const updateNews = (newsId, newsData) => {
    setNews(prev => prev.map(item => 
      item.id === newsId ? { ...item, ...newsData } : item
    ));
  };

  const deleteNews = (newsId) => {
    setNews(prev => prev.filter(item => item.id !== newsId));
  };

  const publishNews = (newsId) => {
    setNews(prev => prev.map(item => 
      item.id === newsId ? { ...item, published: true } : item
    ));
  };

  const toggleNewsFeatured = (newsId) => {
    setNews(prev => prev.map(item => 
      item.id === newsId ? { ...item, featured: !item.featured } : item
    ));
  };

  const getPublishedNews = () => {
    return news.filter(item => item.published).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const getFeaturedNews = () => {
    return news.filter(item => item.published && item.featured).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // Course Management Functions
  const addCourse = (courseData) => {
    const newCourse = {
      id: courses.length + 1,
      ...courseData,
      active: true
    };
    setCourses(prev => [...prev, newCourse]);
    return newCourse;
  };

  const updateCourse = (courseId, courseData) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId ? { ...course, ...courseData } : course
    ));
  };

  const deleteCourse = (courseId) => {
    setCourses(prev => prev.filter(course => course.id !== courseId));
  };

  // Course Curriculum Management
  const updateCourseCurriculum = (courseId, language, curriculum) => {
    console.log(`🔄 Updating curriculum for course ${courseId} in ${language}:`, curriculum);
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { 
            ...course, 
            curriculum: {
              ...course.curriculum,
              [language]: curriculum
            }
          } 
        : course
    ));
  };

  const addCurriculumItem = (courseId, language, item) => {
    console.log(`➕ Adding curriculum item to course ${courseId} in ${language}:`, item);
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { 
            ...course, 
            curriculum: {
              ...course.curriculum,
              [language]: [...(course.curriculum?.[language] || []), item]
            }
          } 
        : course
    ));
  };

  const removeCurriculumItem = (courseId, language, index) => {
    console.log(`🗑️ Removing curriculum item ${index} from course ${courseId} in ${language}`);
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { 
            ...course, 
            curriculum: {
              ...course.curriculum,
              [language]: (course.curriculum?.[language] || []).filter((_, i) => i !== index)
            }
          } 
        : course
    ));
  };

  const updateCurriculumItem = (courseId, language, index, newItem) => {
    console.log(`✏️ Updating curriculum item ${index} in course ${courseId} in ${language}:`, newItem);
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { 
            ...course, 
            curriculum: {
              ...course.curriculum,
              [language]: (course.curriculum?.[language] || []).map((item, i) => 
                i === index ? newItem : item
              )
            }
          } 
        : course
    ));
  };

  // Testimonial Management Functions
  const addTestimonial = (testimonialData) => {
    const newTestimonial = {
      id: testimonials.length + 1,
      ...testimonialData,
      approved: false
    };
    setTestimonials(prev => [...prev, newTestimonial]);
    return newTestimonial;
  };

  const updateTestimonial = (testimonialId, testimonialData) => {
    setTestimonials(prev => prev.map(testimonial => 
      testimonial.id === testimonialId ? { ...testimonial, ...testimonialData } : testimonial
    ));
  };

  const deleteTestimonial = (testimonialId) => {
    setTestimonials(prev => prev.filter(testimonial => testimonial.id !== testimonialId));
  };

  const approveTestimonial = (testimonialId) => {
    setTestimonials(prev => prev.map(testimonial => 
      testimonial.id === testimonialId ? { ...testimonial, approved: true } : testimonial
    ));
  };

  // Team Management Functions
  const addTeamMember = (teamData) => {
    const newMember = {
      id: teamMembers.length + 1,
      ...teamData,
      active: true
    };
    setTeamMembers(prev => [...prev, newMember]);
    return newMember;
  };

  const updateTeamMember = (memberId, teamData) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === memberId ? { ...member, ...teamData } : member
    ));
  };

  const deleteTeamMember = (memberId) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const getActiveTeamMembers = () => {
    return teamMembers.filter(member => member.active);
  };

  // Activity Management Functions
  const addActivity = (activityData) => {
    const newActivity = {
      id: activities.length + 1,
      ...activityData,
      active: true
    };
    setActivities(prev => [...prev, newActivity]);
    return newActivity;
  };

  const updateActivity = (activityId, activityData) => {
    setActivities(prev => prev.map(activity => 
      activity.id === activityId ? { ...activity, ...activityData } : activity
    ));
  };

  const deleteActivity = (activityId) => {
    setActivities(prev => prev.filter(activity => activity.id !== activityId));
  };

  // Analytics Functions
  const updateStats = (newStats) => {
    setSiteStats(prev => ({ ...prev, ...newStats }));
  };

  return (
    <ContentContext.Provider value={{
      // State
      siteContent,
      mediaLibrary,
      siteStats,
      courses,
      activities,
      testimonials,
      news,
      teamMembers,
      
      // Content Management
      updateContent,
      updateMultipleContent,
      updateSiteSettings,
      updateContactInfo,
      
      // Media Management
      addMediaFile,
      deleteMediaFile,
      updateMediaFile,
      toggleMediaInGallery,
      getGalleryItems,
      
      // News Management
      addNews,
      updateNews,
      deleteNews,
      publishNews,
      toggleNewsFeatured,
      getPublishedNews,
      getFeaturedNews,
      
      // Course Management
      addCourse,
      updateCourse,
      deleteCourse,
      
      // Course Curriculum Management
      updateCourseCurriculum,
      addCurriculumItem,
      removeCurriculumItem,
      updateCurriculumItem,
      
      // Testimonial Management
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      approveTestimonial,
      
      // Team Management
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
      getActiveTeamMembers,
      
      // Activity Management
      addActivity,
      updateActivity,
      deleteActivity,
      
      // Analytics
      updateStats,
      
      // Direct state setters for advanced operations
      setSiteContent,
      setCourses,
      setTestimonials,
      setMediaLibrary,
      setNews,
      setTeamMembers
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};