import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';

const TestimonialsPage = () => {
  const { t, language } = useLanguage();
  const { testimonials } = useContent();
  
  return (
    <div className="py-16 bg-white" style={{minHeight: '85vh', display: 'flex', alignItems: 'center'}}>
      <div className="container mx-auto px-4">
        <h1 
        className="text-center mb-12"
        style={{
          fontFamily: "'Lora', serif",
          fontWeight: 700,
          fontSize: 'clamp(2.6rem, 6vw, 4.2rem)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em'
        }}
      >
        {t('testimonialsTitle')}
      </h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.filter(testimonial => testimonial.approved).map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="mb-4">
                  <h3 className="font-semibold">{testimonial.name}</h3>
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