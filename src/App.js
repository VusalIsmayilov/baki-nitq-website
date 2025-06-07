import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ContentProvider } from './context/ContentContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import CoursesPage from './components/pages/CoursesPage';
import TestimonialsPage from './components/pages/TestimonialsPage';
import GalleryPage from './components/pages/GalleryPage';
import ContactPage from './components/pages/ContactPage';
import LoginPage from './components/pages/LoginPage';
import AdminDashboard from './components/pages/AdminDashboard';
import PrivacyPage from './components/pages/PrivacyPage';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'courses':
        return <CoursesPage setCurrentPage={setCurrentPage} />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage setIsAdmin={setIsAdmin} setCurrentPage={setCurrentPage} />;
      case 'admin':
        return isAdmin ? <AdminDashboard /> : <LoginPage setIsAdmin={setIsAdmin} setCurrentPage={setCurrentPage} />;
      case 'privacy':
        return <PrivacyPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };
  
  return (
    <LanguageProvider>
      <ContentProvider>
        <div className="min-h-screen bg-gray-50">
          {currentPage !== 'login' && (
            <Header 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
            />
          )}
          
          <main>
            {renderPage()}
          </main>
          
          {currentPage !== 'login' && (
            <Footer setCurrentPage={setCurrentPage} />
          )}
        </div>
      </ContentProvider>
    </LanguageProvider>
  );
};

export default App;