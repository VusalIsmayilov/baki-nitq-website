import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';

const CoursesPage = ({ setCurrentPage }) => {
  const { t, language } = useLanguage();
  const { courses } = useContent();
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  // Debug logging to see what courses are being used
  console.log('📚 CoursesPage render - courses from context:', courses);
  console.log('📚 CoursesPage - active courses:', courses.filter(course => course.active));
  
  const openCourseModal = (course) => {
    setSelectedCourse(course);
  };
  
  const closeCourseModal = () => {
    setSelectedCourse(null);
  };
  
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
                    <div className="flex space-x-2 mt-6">
                      <button 
                        onClick={() => openCourseModal(course)}
                        className="flex-1 bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition-colors font-semibold"
                      >
                        {t('learnMore')}
                      </button>
                      <button 
                        onClick={() => setCurrentPage('contact')}
                        className="flex-1 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors font-semibold"
                      >
                        {t('contact')}
                      </button>
                    </div>
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
      
      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.name[language]}</h2>
                <button
                  onClick={closeCourseModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <h3 className="text-white text-3xl font-bold">{selectedCourse.name[language]}</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Course Overview</h4>
                    <p className="text-gray-700 leading-relaxed">{selectedCourse.description[language]}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">{t('duration')}:</span>
                        <span className="text-blue-600 font-semibold">{selectedCourse.duration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{t('price')}:</span>
                        <span className="text-green-600 font-bold text-lg">{selectedCourse.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">What You'll Learn</h4>
                  <ul className="list-disc list-inside text-blue-800 space-y-1">
                    {selectedCourse.id === 1 && (
                      <>
                        <li>Proper pronunciation and articulation techniques</li>
                        <li>Voice modulation and tone control</li>
                        <li>Professional communication skills</li>
                        <li>Cultural aspects of speech in Azerbaijani</li>
                      </>
                    )}
                    {selectedCourse.id === 2 && (
                      <>
                        <li>Public speaking confidence building</li>
                        <li>Presentation structure and delivery</li>
                        <li>Audience engagement techniques</li>
                        <li>Overcoming stage fright</li>
                      </>
                    )}
                    {selectedCourse.id === 3 && (
                      <>
                        <li>Voice projection and breathing techniques</li>
                        <li>Clear pronunciation exercises</li>
                        <li>Accent reduction and neutralization</li>
                        <li>Professional voice training</li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => {
                        closeCourseModal();
                        setCurrentPage('contact');
                      }}
                      className="flex-1 bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition-colors font-semibold"
                    >
                      Enroll Now
                    </button>
                    <button 
                      onClick={closeCourseModal}
                      className="flex-1 bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 transition-colors font-semibold"
                    >
                      Close
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