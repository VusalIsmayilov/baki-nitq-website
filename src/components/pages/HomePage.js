import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';

const HomePage = ({ setCurrentPage }) => {
  const { t, language } = useLanguage();
  const { siteContent, courses, getFeaturedNews } = useContent();
  
  const featuredNews = getFeaturedNews().slice(0, 3); // Get latest 3 featured news
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'az' ? 'az-AZ' : language === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
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
          <button 
            onClick={() => setCurrentPage('about')}
            className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
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
                      <button 
                        onClick={() => setCurrentPage('courses')}
                        className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors font-semibold"
                      >
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

      {/* News & Activities Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('newsTitle')}</h2>
          
          {featuredNews.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-lg">
                <div className="text-4xl mb-4">📰</div>
                <p className="text-gray-600">No news available at the moment.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredNews.map((newsItem) => (
                  <article key={newsItem.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${newsItem.imageUrl})` }}>
                      <div className="h-full bg-black bg-opacity-30 flex items-end">
                        <div className="p-4">
                          <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {newsItem.category[language]}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span className="mr-2">📅</span>
                        <time>{formatDate(newsItem.date)}</time>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 line-clamp-2">{newsItem.title[language]}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{newsItem.excerpt[language]}</p>
                      <button 
                        onClick={() => {
                          // For now, just show an alert. Later you can create a news detail page
                          alert(`Reading: ${newsItem.title[language]}\n\n${newsItem.content[language]}`);
                        }}
                        className="text-blue-600 font-semibold hover:text-blue-800 transition-colors flex items-center"
                      >
                        {t('readMore')} 
                        <span className="ml-2">→</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <button 
                  onClick={() => {
                    // For now, just show an alert. Later you can create a news page
                    alert('News page will be implemented soon!');
                  }}
                  className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                >
                  {t('viewAllNews')}
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;