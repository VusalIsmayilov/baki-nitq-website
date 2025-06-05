import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { courses } from '../../data/courses';

const HomePage = () => {
  const { t, language } = useLanguage();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t('welcome')}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">{t('welcomeDesc')}</p>
          <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            {t('learnMore')}
          </button>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('ourServices')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <h3 className="text-xl font-semibold mb-4">{course.name[language]}</h3>
                <p className="text-gray-600 mb-6">{course.description[language]}</p>
                <div className="space-y-2 text-sm">
                  <p><strong>{t('duration')}:</strong> {course.duration}</p>
                  <p><strong>{t('price')}:</strong> {course.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;