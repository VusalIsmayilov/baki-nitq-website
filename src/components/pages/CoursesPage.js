import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const CoursesPage = ({ setCurrentPage }) => {
  const { t, language } = useLanguage();
  const [selectedTraining, setSelectedTraining] = useState(null);
  
  const individualTrainings = [
    {
      id: 'speech',
      title: t('speechTraining'),
      description: t('speechTrainingDesc'),
      category: 'individual'
    },
    {
      id: 'leadership',
      title: t('leadershipCommunication'),
      description: t('leadershipCommunicationDesc'),
      category: 'individual'
    },
    {
      id: 'marketing',
      title: t('marketingTraining'),
      description: t('marketingTrainingDesc'),
      category: 'individual'
    },
    {
      id: 'etiquette',
      title: t('etiquetteTraining'),
      description: t('etiquetteTrainingDesc'),
      category: 'individual'
    }
  ];

  const corporateTrainings = [
    {
      id: 'corporate-leadership',
      title: t('corporateLeadership'),
      description: t('corporateLeadershipDesc'),
      category: 'corporate'
    },
    {
      id: 'leader-voice',
      title: t('leaderVoice'),
      description: t('leaderVoiceDesc'),
      category: 'corporate'
    },
    {
      id: 'speech-expression',
      title: t('speechExpression'),
      description: t('speechExpressionDesc'),
      category: 'corporate'
    }
  ];

  const openTrainingModal = (training) => {
    setSelectedTraining(training);
  };
  
  const closeTrainingModal = () => {
    setSelectedTraining(null);
  };

  const TrainingCard = ({ training, colorScheme }) => (
    <div className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="text-center mb-4">
        <div className={`w-16 h-16 ${colorScheme.bg} rounded-full flex items-center justify-center mb-4 mx-auto`}>
          <span className={`text-2xl ${colorScheme.text}`}>
            {training.category === 'individual' ? '👤' : '🏢'}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
          {training.title}
        </h3>
      </div>
      <p className="text-gray-600 mb-6 leading-relaxed text-sm line-clamp-3">
        {training.description.substring(0, 150)}...
      </p>
      <div className="flex space-x-2">
        <button 
          onClick={() => openTrainingModal(training)}
          className={`flex-1 ${colorScheme.button} text-white py-3 rounded-lg hover:opacity-90 transition-all duration-300 font-semibold`}
        >
          {t('learnMore')}
        </button>
        <button 
          onClick={() => setCurrentPage('contact')}
          className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
          {t('contact')}
        </button>
      </div>
    </div>
  );

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">{t('coursesTitle')}</h1>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          {language === 'az' ? 'Nitq mədəniyyəti, liderlik və ünsiyyət bacarıqlarınızı inkişaf etdirmək üçün peşəkar təlim proqramlarımız' :
           language === 'en' ? 'Professional training programs to develop your speech culture, leadership and communication skills' :
           'Профессиональные учебные программы для развития вашей культуры речи, лидерских и коммуникативных навыков'}
        </p>
        
        {/* Individual Trainings Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-3xl text-blue-600">👤</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('individualTrainings')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'az' ? 'Şəxsi inkişafınız üçün fərdi yanaşma ilə hazırlanmış təlim proqramları' :
               language === 'en' ? 'Training programs designed with individual approach for your personal development' :
               'Учебные программы, разработанные с индивидуальным подходом для вашего личного развития'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {individualTrainings.map((training) => (
              <TrainingCard 
                key={training.id} 
                training={training} 
                colorScheme={{
                  bg: 'bg-blue-100',
                  text: 'text-blue-600',
                  button: 'bg-blue-600'
                }}
              />
            ))}
          </div>
        </section>

        {/* Corporate Trainings Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-3xl text-green-600">🏢</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('corporateTrainings')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'az' ? 'Komanda və idarəetmə bacarıqlarını gücləndirib işgüzar mühitdə liderlik keyfiyyətlərini inkişaf etdirmək üçün korporativ təlimlər' :
               language === 'en' ? 'Corporate trainings to strengthen team and management skills and develop leadership qualities in business environment' :
               'Корпоративные тренинги для укрепления командных и управленческих навыков и развития лидерских качеств в деловой среде'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {corporateTrainings.map((training) => (
              <TrainingCard 
                key={training.id} 
                training={training} 
                colorScheme={{
                  bg: 'bg-green-100',
                  text: 'text-green-600',
                  button: 'bg-green-600'
                }}
              />
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {language === 'az' ? 'Təlimlərimiz haqqında daha ətraflı məlumat almaq istəyirsiniz?' :
             language === 'en' ? 'Want to learn more about our trainings?' :
             'Хотите узнать больше о наших тренингах?'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {language === 'az' ? 'Peşəkar komandamız sizə uyğun təlim proqramını seçməkdə köməklik edəcək' :
             language === 'en' ? 'Our professional team will help you choose the right training program for you' :
             'Наша профессиональная команда поможет вам выбрать подходящую учебную программу'}
          </p>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            {t('contact')}
          </button>
        </section>
      </div>
      
      {/* Training Detail Modal */}
      {selectedTraining && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${selectedTraining.category === 'individual' ? 'bg-blue-100' : 'bg-green-100'} rounded-full flex items-center justify-center mr-4`}>
                    <span className={`text-xl ${selectedTraining.category === 'individual' ? 'text-blue-600' : 'text-green-600'}`}>
                      {selectedTraining.category === 'individual' ? '👤' : '🏢'}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{selectedTraining.title}</h2>
                </div>
                <button
                  onClick={closeTrainingModal}
                  className="text-gray-400 hover:text-gray-600 text-3xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div className={`h-48 bg-gradient-to-r ${selectedTraining.category === 'individual' ? 'from-blue-500 to-blue-600' : 'from-green-500 to-green-600'} rounded-lg flex items-center justify-center`}>
                  <h3 className="text-white text-2xl font-bold text-center px-6">{selectedTraining.title}</h3>
                </div>
                
                <div className="prose max-w-none">
                  <h4 className="font-semibold text-xl mb-4 text-gray-800">
                    {language === 'az' ? 'Təlim Haqqında' :
                     language === 'en' ? 'About the Training' :
                     'О тренинге'}
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                    {selectedTraining.description}
                  </p>
                </div>
                
                <div className={`${selectedTraining.category === 'individual' ? 'bg-blue-50' : 'bg-green-50'} p-6 rounded-lg`}>
                  <h4 className={`font-semibold ${selectedTraining.category === 'individual' ? 'text-blue-900' : 'text-green-900'} mb-3`}>
                    {language === 'az' ? 'Əlaqə' :
                     language === 'en' ? 'Contact Us' :
                     'Свяжитесь с нами'}
                  </h4>
                  <p className={`${selectedTraining.category === 'individual' ? 'text-blue-800' : 'text-green-800'} mb-4`}>
                    {language === 'az' ? 'Bu təlim haqqında daha ətraflı məlumat almaq və qeydiyyatdan keçmək üçün bizimlə əlaqə saxlayın.' :
                     language === 'en' ? 'Contact us to get more detailed information about this training and to register.' :
                     'Свяжитесь с нами, чтобы получить более подробную информацию об этом тренинге и зарегистрироваться.'}
                  </p>
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => {
                        closeTrainingModal();
                        setCurrentPage('contact');
                      }}
                      className={`flex-1 ${selectedTraining.category === 'individual' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} text-white py-3 rounded-md transition-colors font-semibold`}
                    >
                      {language === 'az' ? 'Qeydiyyatdan keç' :
                       language === 'en' ? 'Enroll Now' :
                       'Записаться'}
                    </button>
                    <button 
                      onClick={closeTrainingModal}
                      className="flex-1 bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 transition-colors font-semibold"
                    >
                      {language === 'az' ? 'Bağla' :
                       language === 'en' ? 'Close' :
                       'Закрыть'}
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