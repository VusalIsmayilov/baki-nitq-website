import { useEffect } from 'react';

// Google Analytics Measurement ID - Replace with your actual ID
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (path) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track custom events
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: parameters.category || 'engagement',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      ...parameters,
    });
  }
};

// Track user interactions
export const trackUserInteraction = (action, element, page) => {
  trackEvent('user_interaction', {
    category: 'ui',
    label: `${action}_${element}`,
    page: page,
    action: action,
    element: element,
  });
};

// Track navigation
export const trackNavigation = (from, to) => {
  trackEvent('page_navigation', {
    category: 'navigation',
    label: `${from}_to_${to}`,
    from_page: from,
    to_page: to,
  });
};

// Track course interactions
export const trackCourseInteraction = (courseId, action) => {
  trackEvent('course_interaction', {
    category: 'courses',
    label: `${action}_${courseId}`,
    course_id: courseId,
    action: action,
  });
};

// Track contact form submissions
export const trackContactForm = (formType) => {
  trackEvent('contact_form_submit', {
    category: 'contact',
    label: formType,
    form_type: formType,
  });
};

// React component to handle page tracking
const GoogleAnalytics = ({ currentPage }) => {
  useEffect(() => {
    // Track page view when currentPage changes
    if (currentPage) {
      trackPageView(`/${currentPage}`);
    }
  }, [currentPage]);

  return null;
};

export default GoogleAnalytics;