import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const HomePage = ({ setCurrentPage }) => {
  const { t, language } = useLanguage();
  const { siteContent, courses, getFeaturedNews, getActiveTeamMembers, testimonials } = useContent();
  
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
        <div className="container mx-auto px-4 text-left">
          <div className="max-w-md">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {siteContent.homeHero?.[language] || t('welcome')}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              {siteContent.homeDesc?.[language] || t('welcomeDesc')}
            </p>
            <button 
              onClick={() => setCurrentPage('about')}
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors mb-8"
            >
              {t('learnMore')}
            </button>
            
            {/* Social Networks - Under Button */}
            <div className="flex space-x-3">
              <a href="#" className="text-white hover:text-blue-200 transition-colors bg-black bg-opacity-20 p-2 rounded-full">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors bg-black bg-opacity-20 p-2 rounded-full">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors bg-black bg-opacity-20 p-2 rounded-full">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors bg-black bg-opacity-20 p-2 rounded-full">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Differences Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-left mb-12">{t('newsTitle')}</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Practical Approach */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-3xl text-blue-600">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{t('practicalApproach')}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-center">
                {t('practicalApproachDesc')}
              </p>
            </div>

            {/* Professional Trainers */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-3xl text-green-600">👨‍🏫</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{t('professionalTrainers')}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-center">
                {t('professionalTrainersDesc')}
              </p>
            </div>

            {/* Modern Methodology */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-3xl text-purple-600">🚀</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{t('modernMethodology')}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-center">
                {t('modernMethodologyDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-left mb-12">{t('teamTitle')}</h2>
          
          <div className="space-y-16">
            {getActiveTeamMembers().map((member, index) => (
              <div 
                key={member.id} 
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Story/Text Section */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-lg text-blue-600 font-medium mb-4">
                      {member.position[language]}
                    </p>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {member.story[language]}
                    </p>
                  </div>
                </div>
                
                {/* Photo Section */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl">
                      <img 
                        src={member.imageUrl} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-600 rounded-2xl opacity-20"></div>
                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-300 rounded-full opacity-30"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-left mb-12">{t('ourServices')}</h2>
          
          {/* Course Categories */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Speech and Communication Development */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl text-blue-600">🗣️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {t('speechCommunicationDev')}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm mb-6">
                {t('speechCommunicationDevDesc')}
              </p>
              <button 
                onClick={() => setCurrentPage('courses')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                {t('learnMore')}
              </button>
            </div>

            {/* Personal Development and Psychological Support */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl text-green-600">🧠</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {t('personalDevSupport')}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm mb-6">
                {t('personalDevSupportDesc')}
              </p>
              <button 
                onClick={() => setCurrentPage('courses')}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                {t('learnMore')}
              </button>
            </div>

            {/* Corporate Skills and Leadership */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl text-purple-600">👥</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {t('corporateLeadershipSkills')}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm mb-6">
                {t('corporateLeadershipSkillsDesc')}
              </p>
              <button 
                onClick={() => setCurrentPage('courses')}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                {t('learnMore')}
              </button>
            </div>
          </div>
          
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-left mb-12">{t('testimonialsTitle')}</h2>
          
          {testimonials.filter(testimonial => testimonial.approved).length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-lg">
                <div className="text-4xl mb-4">💬</div>
                <p className="text-gray-600">No testimonials available at the moment.</p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials
                .filter(testimonial => testimonial.approved)
                .map((testimonial) => (
                  <div key={testimonial.id} className="testimonial-card">
                    <div className="mb-4">
                      <div className="text-4xl text-blue-600 mb-2">"</div>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {testimonial.text[language]}
                      </p>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-blue-600 font-bold text-lg">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">Student</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;