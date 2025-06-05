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
      phone: '+994 XX XXX XX XX',
      email: 'info@bakinitqmerkezi.az',
      address: 'Bakı, Azərbaycan',
      hours: 'Mon-Fri: 9:00-18:00'
    },
    siteSettings: {
      siteName: 'Bakı Nitq Mərkəzi',
      defaultLanguage: 'az',
      enableAnalytics: true
    }
  });

  const [mediaLibrary, setMediaLibrary] = useState([
    { id: 1, name: 'classroom1.jpg', type: 'image', size: '2.4 MB', uploaded: '2025-01-15', url: '#' },
    { id: 2, name: 'student-presentation.mp4', type: 'video', size: '15.2 MB', uploaded: '2025-01-14', url: '#' },
    { id: 3, name: 'course-outline.pdf', type: 'document', size: '1.1 MB', uploaded: '2025-01-13', url: '#' }
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

  // Media Management Functions
  const addMediaFile = (file) => {
    const newFile = {
      id: mediaLibrary.length + 1,
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 
            file.type.startsWith('video/') ? 'video' : 'document',
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      uploaded: new Date().toISOString().split('T')[0],
      url: URL.createObjectURL(file)
    };
    setMediaLibrary(prev => [newFile, ...prev]);
    return newFile;
  };

  const deleteMediaFile = (fileId) => {
    setMediaLibrary(prev => prev.filter(file => file.id !== fileId));
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
      testimonials,
      
      // Content Management
      updateContent,
      updateMultipleContent,
      updateSiteSettings,
      
      // Media Management
      addMediaFile,
      deleteMediaFile,
      
      // Course Management
      addCourse,
      updateCourse,
      deleteCourse,
      
      // Testimonial Management
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      approveTestimonial,
      
      // Analytics
      updateStats,
      
      // Direct state setters for advanced operations
      setSiteContent,
      setCourses,
      setTestimonials
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