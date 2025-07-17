import React, { useState, useEffect } from 'react';
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
import GoogleAnalytics, { initGA, trackPageView, trackNavigation } from './components/GoogleAnalytics';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [previousPage, setPreviousPage] = useState('');

  // Initialize Google Analytics when app starts
  useEffect(() => {
    initGA();
    trackPageView(`/${currentPage}`);
  }, []);

  // Track page changes
  useEffect(() => {
    if (previousPage && previousPage !== currentPage) {
      trackNavigation(previousPage, currentPage);
    }
    trackPageView(`/${currentPage}`);
    setPreviousPage(currentPage);
  }, [currentPage, previousPage]);

  // Enhanced setCurrentPage function with tracking
  const setCurrentPageWithTracking = (page) => {
    setCurrentPage(page);
  };
  
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPageWithTracking} />;
      case 'about':
        return <AboutPage setCurrentPage={setCurrentPageWithTracking} />;
      case 'courses':
        return <CoursesPage setCurrentPage={setCurrentPageWithTracking} />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage setIsAdmin={setIsAdmin} setCurrentPage={setCurrentPageWithTracking} />;
      case 'admin':
        return isAdmin ? <AdminDashboard /> : <LoginPage setIsAdmin={setIsAdmin} setCurrentPage={setCurrentPageWithTracking} />;
      case 'privacy':
        return <PrivacyPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPageWithTracking} />;
    }
  };
  
  return (
    <LanguageProvider>
      <ContentProvider>
        <div className="min-h-screen bg-gray-50">
          {currentPage !== 'login' && (
            <Header 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPageWithTracking}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
            />
          )}
          
          <main>
            {renderPage()}
          </main>
          
          {currentPage !== 'login' && (
            <Footer setCurrentPage={setCurrentPageWithTracking} />
          )}
          
          {/* Google Analytics Component */}
          <GoogleAnalytics currentPage={currentPage} />
        </div>
      </ContentProvider>
    </LanguageProvider>
  );
};

export default App;