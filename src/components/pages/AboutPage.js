import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';

const AboutPage = () => {
  const { t, language } = useLanguage();
  const { siteContent } = useContent();
  
  return (
    <div className="about-section">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">{t('aboutTitle')}</h1>
        
        <div className="max-w-5xl mx-auto">
          {/* Introduction Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12 border border-blue-100">
            <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
              {t('aboutIntro')}
            </h2>
          </div>
          
          {/* Main Content */}
          <div className="prose max-w-none mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {t('aboutDescription')}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {t('aboutApproach')}
              </p>
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                <p className="text-xl font-semibold text-blue-900 text-center">
                  {t('aboutConclusion')}
                </p>
              </div>
            </div>
          </div>
          
          {/* Our Trainers Section */}
          <section className="mt-16">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl text-purple-600">👥</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('trainersTitle')}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {language === 'az' ? 'Sahələrində təcrübəli və peşəkar təlimçi heyətimizlə tanış olun' :
                 language === 'en' ? 'Meet our experienced and professional training team in their fields' :
                 'Познакомьтесь с нашей опытной и профессиональной командой тренеров в их областях'}
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Firuzə Aslanova */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center">
                      <span className="text-4xl text-white font-bold">FA</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('firuzeName')}</h3>
                    <p className="text-lg text-purple-600 font-medium mb-4">{t('firuzeTitle')}</p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {t('firuzeDesc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pərvin Pərlan */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center">
                      <span className="text-4xl text-white font-bold">PP</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('pervinName')}</h3>
                    <p className="text-lg text-green-600 font-medium mb-4">{t('pervinTitle')}</p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {t('pervinDesc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lalə Mustafayeva */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center">
                      <span className="text-4xl text-white font-bold">LM</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('laleName')}</h3>
                    <p className="text-lg text-pink-600 font-medium mb-4">{t('laleTitle')}</p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {t('laleDesc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ayşən Hüseynova */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                      <span className="text-4xl text-white font-bold">AH</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('aysenName')}</h3>
                    <p className="text-lg text-orange-600 font-medium mb-4">{t('aysenTitle')}</p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {t('aysenDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
};

export default AboutPage;