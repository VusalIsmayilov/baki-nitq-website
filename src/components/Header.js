import React, { useState } from 'react';
import { Menu, X, User, LogOut, Settings, Home, Users, BookOpen, MessageCircle, Image, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Header = ({ currentPage, setCurrentPage, isAdmin, setIsAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminTrigger, setShowAdminTrigger] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();
  
  const navigation = [
    { key: 'home', icon: Home },
    { key: 'about', icon: Users },
    { key: 'courses', icon: BookOpen },
    // { key: 'testimonials', icon: MessageCircle }, // Temporarily deactivated
    { key: 'gallery', icon: Image },
    { key: 'contact', icon: Phone }
  ];

  // Method 1: Secret Click Sequence on Logo
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState(null);

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    
    // Reset counter after 3 seconds of inactivity
    if (clickTimer) clearTimeout(clickTimer);
    setClickTimer(setTimeout(() => {
      setClickCount(0);
    }, 3000));

    // Show admin trigger after 5 clicks within 3 seconds
    if (clickCount >= 4) {
      setShowAdminTrigger(true);
      setClickCount(0);
      if (clickTimer) clearTimeout(clickTimer);
    }
  };

  // Method 2: Check for admin URL parameter
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setShowAdminTrigger(true);
    }
  }, []);

  // Method 3: Check for specific localStorage flag (development only)
  React.useEffect(() => {
    // Only enable in development mode
    if (process.env.NODE_ENV === 'development') {
      const adminFlag = localStorage.getItem('showAdminLogin');
      if (adminFlag === 'true') {
        setShowAdminTrigger(true);
      }
    }
  }, []);

  // Method 4: Keyboard shortcut (Ctrl+Shift+A)
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        setShowAdminTrigger(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track scroll position for shadow effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`bg-white fixed top-0 left-0 right-0 z-50 transition-shadow duration-200 ${
      isScrolled ? 'shadow-md' : 'shadow-none'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center space-x-4">
            <img 
              src="/nitg_logo.jpg" 
              alt="Bakı Nitq Mərkəzi" 
              className="h-12 w-12 cursor-pointer select-none"
              onClick={handleLogoClick}
              title={process.env.NODE_ENV === 'development' ? 'Click 5 times for admin access' : ''}
            />
          </div>
          
          <nav className="hidden md:flex space-x-6">
            {navigation.map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setCurrentPage(key)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors whitespace-nowrap ${
                  currentPage === key 
                    ? (key === 'contact' ? 'bg-blue-800 text-white' : 'bg-blue-100 text-blue-900')
                    : (key === 'contact' ? 'bg-blue-800 text-white hover:bg-blue-900' : 'text-gray-700 hover:text-blue-900')
                }`}
              >
                <Icon size={18} />
                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: key === 'contact' ? 600 : 600,
                  textTransform: 'uppercase',
                  letterSpacing: key === 'contact' ? '0.6px' : '0.5px',
                  fontSize: key === 'contact' ? '0.9rem' : '0.95rem',
                  lineHeight: key === 'contact' ? 1.35 : 1.4
                }}>{t(key)}</span>
              </button>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            {/* Admin Controls - Only show if admin access is triggered or user is already admin */}
            {(showAdminTrigger || isAdmin) && (
              <>
                {isAdmin ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage('admin')}
                      className="flex items-center space-x-1 px-3 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 whitespace-nowrap"
                    >
                      <Settings size={18} />
                      <span>{t('dashboard')}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsAdmin(false);
                        setShowAdminTrigger(false); // Hide admin access after logout
                      }}
                      className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 whitespace-nowrap"
                    >
                      <LogOut size={18} />
                      <span>{t('logout')}</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setCurrentPage('login')}
                    className="flex items-center space-x-1 px-3 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 whitespace-nowrap"
                  >
                    <User size={18} />
                    <span>{t('adminLogin')}</span>
                  </button>
                )}
              </>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {navigation.map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => {
                  setCurrentPage(key);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md transition-colors ${
                  currentPage === key 
                    ? 'bg-blue-100 text-blue-900' 
                    : 'text-gray-700 hover:text-blue-900'
                }`}
              >
                <Icon size={18} />
                <span>{t(key)}</span>
              </button>
            ))}
            
            {/* Mobile Admin Access */}
            {(showAdminTrigger || isAdmin) && (
              <div className="border-t mt-4 pt-4">
                {isAdmin ? (
                  <>
                    <button
                      onClick={() => {
                        setCurrentPage('admin');
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 bg-blue-900 text-white rounded-md mb-2"
                    >
                      <Settings size={18} />
                      <span>{t('dashboard')}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsAdmin(false);
                        setShowAdminTrigger(false);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 bg-red-600 text-white rounded-md"
                    >
                      <LogOut size={18} />
                      <span>{t('logout')}</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setCurrentPage('login');
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 bg-blue-900 text-white rounded-md"
                  >
                    <User size={18} />
                    <span>{t('adminLogin')}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
    </header>
  );
};

export default Header;