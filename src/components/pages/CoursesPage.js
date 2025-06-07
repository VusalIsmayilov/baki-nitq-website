import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';

const CoursesPage = () => {
  const { t, language } = useLanguage();
  const { courses } = useContent();
  
  // Debug logging to see what courses are being used
  console.log('📚 CoursesPage render - courses from context:', courses);
  console.log('📚 CoursesPage - active courses:', courses.filter(course => course.active));
  
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">{t('coursesTitle')}</h1>
        
        {courses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No courses available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses
              .filter(course => course.active)
              .map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <h3 className="text-2xl font-bold">{course.name[language]}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">{course.name[language]}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{course.description[language]}</p>
                    <div className="space-y-2 text-sm border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{t('duration')}:</span>
                        <span className="text-blue-600 font-semibold">{course.duration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{t('price')}:</span>
                        <span className="text-green-600 font-bold text-lg">{course.price}</span>
                      </div>
                    </div>
                    <button className="w-full mt-6 bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition-colors font-semibold">
                      {t('learnMore')}
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        )}
        
        {/* Debug Info - Remove this in production */}
        <div className="bg-blue-50 p-4 mt-8 border border-blue-200 rounded">
          <h4 className="font-semibold text-blue-800">🔍 Debug Info (Admin can see this):</h4>
          <p className="text-sm text-blue-700">
            Total Courses: {courses.length} | Active Courses: {courses.filter(c => c.active).length}
          </p>
          <p className="text-sm text-blue-700">
            Course IDs: {courses.map(c => c.id).join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;