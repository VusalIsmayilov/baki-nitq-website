import { Users, Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';

const ConversionCTA = ({ setCurrentPage, className = "" }) => {
  const { t } = useLanguage();
  const { siteContent } = useContent();

  return (
    <>
        <h3 className="mb-4 text-center" style={{
          fontFamily: "'Lora', serif",
          fontWeight: 600,
          fontSize: '1.5rem',
          lineHeight: 1.35,
          color: '#1E1E1E'
        }}>
          {t('needHelpChoosing')}
        </h3>
        
        <p className="mb-6 text-center" style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 400,
          fontSize: '1.125rem',
          lineHeight: 1.6,
          color: '#1E1E1E'
        }}>
          {t('teamReady')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary Contact Us Button */}
          <button
            onClick={() => {
              setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'auto' });
            }}
            className="flex-1 sm:flex-none text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              backgroundColor: '#2166FF',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: '0.6px',
              transform: 'scale(1)',
              minWidth: '160px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1d5def';
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#2166FF';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <Users className="w-4 h-4" />
            {t('contactUs')}
          </button>
          
          {/* Phone Link */}
          <a
            href={`tel:${siteContent.contactInfo?.phone || '+994102271404'}`}
            className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1rem',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            <Phone className="w-4 h-4" />
            {t('callUs')}
          </a>
          
          {/* WhatsApp Link */}
          <a
            href={`https://wa.me/${(siteContent.contactInfo?.phone || '+994102271404').replace(/[^\d]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-3 border border-green-300 rounded-lg text-green-700 hover:bg-green-50 transition-all duration-200"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1rem',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            <MessageCircle className="w-4 h-4" />
            {t('whatsappUs')}
          </a>
        </div>
    </>
  );
};

export default ConversionCTA;