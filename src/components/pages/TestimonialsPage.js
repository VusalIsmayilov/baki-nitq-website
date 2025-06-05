import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { testimonials } from '../../data/testimonials';

const TestimonialsPage = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">{t('testimonialsTitle')}</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text[language]}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;