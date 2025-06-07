import React, { useState } from 'react';
import { Menu, X, User, LogOut, Settings, Home, Users, BookOpen, MessageCircle, Image, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Header = ({ currentPage, setCurrentPage, isAdmin, setIsAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  
  const navigation = [
    { key: 'home', icon: Home },
    { key: 'about', icon: Users },
    { key: 'courses', icon: BookOpen },
    { key: 'testimonials', icon: MessageCircle },
    { key: 'gallery', icon: Image },
    { key: 'contact', icon: Phone }
  ];
  
  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-blue-900 whitespace-nowrap">Bakı Nitq Mərkəzi</h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            {navigation.map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setCurrentPage(key)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors whitespace-nowrap ${
                  currentPage === key 
                    ? 'bg-blue-100 text-blue-900' 
                    : 'text-gray-700 hover:text-blue-900'
                }`}
              >
                <Icon size={18} />
                <span>{t(key)}</span>
              </button>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
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
                  onClick={() => setIsAdmin(false)}
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
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;