import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';

const HomePage = () => {
  const { t, language } = useLanguage();
  const { siteContent, courses } = useContent();
  
  // Debug logging to see what content is being used
  console.log('🏠 HomePage render - siteContent:', siteContent);
  console.log('🏠 HomePage - homeHero:', siteContent.homeHero);
  console.log('🏠 HomePage - courses from context:', courses);
  console.log('🏠 HomePage - current language:', language);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {siteContent.homeHero?.[language] || t('welcome')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {siteContent.homeDesc?.[language] || t('welcomeDesc')}
          </p>
          <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            {t('learnMore')}
          </button>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="courses-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('ourServices')}</h2>
          
          {courses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading courses...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {courses
                .filter(course => course.active)
                .map((course) => (
                  <div key={course.id} className="course-card hover:shadow-xl transition-shadow duration-300">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <span className="text-2xl text-blue-600">📚</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-center">{course.name[language]}</h3>
                    <p className="text-gray-600 mb-6 text-center leading-relaxed">{course.description[language]}</p>
                    <div className="space-y-2 text-sm border-t pt-4">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">{t('duration')}:</span>
                        <span className="text-blue-600 font-semibold">{course.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">{t('price')}:</span>
                        <span className="text-green-600 font-bold">{course.price}</span>
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <button className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors font-semibold">
                        {t('learnMore')}
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
          )}
        </div>
      </section>
      
      {/* Debug Info - Remove this in production */}
      <div className="bg-yellow-50 p-4 mx-4 mb-4 border border-yellow-200 rounded">
        <h4 className="font-semibold text-yellow-800">🔍 Debug Info (Admin can see this):</h4>
        <p className="text-sm text-yellow-700">
          Current Hero Title: "{siteContent.homeHero?.[language]}"
        </p>
        <p className="text-sm text-yellow-700">
          Current Description: "{siteContent.homeDesc?.[language]}"
        </p>
        <p className="text-sm text-yellow-700">
          Active Courses Count: {courses.filter(c => c.active).length}
        </p>
      </div>
    </div>
  );
};

export default HomePage;