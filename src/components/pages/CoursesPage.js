import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { courses } from '../../data/courses';

const CoursesPage = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">{t('coursesTitle')}</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{course.name[language]}</h3>
                <p className="text-gray-600 mb-4">{course.description[language]}</p>
                <div className="space-y-2 text-sm">
                  <p><strong>{t('duration')}:</strong> {course.duration}</p>
                  <p><strong>{t('price')}:</strong> {course.price}</p>
                </div>
                <button className="w-full mt-4 bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition-colors">
                  {t('learnMore')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;