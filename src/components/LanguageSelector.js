import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className="language-selector">
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
        className="focus:outline-none focus:ring-2"
        style={{
          padding: '0.5rem 1rem',
          border: '1px solid var(--border-light)',
          borderRadius: '4px',
          backgroundColor: '#fff',
          color: 'var(--text-dark)',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        <option value="az">AZ</option>
        <option value="en">EN</option>
        <option value="ru">RU</option>
      </select>
    </div>
  );
};

export default LanguageSelector;