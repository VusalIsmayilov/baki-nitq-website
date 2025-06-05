import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const AdminDashboard = () => {
  const { t } = useLanguage();
  
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">{t('dashboard')}</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Content Management</h3>
            <p className="text-gray-600 mb-4">Manage website pages and content</p>
            <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800">
              Manage Content
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Media Library</h3>
            <p className="text-gray-600 mb-4">Upload and manage images, videos</p>
            <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800">
              Media Library
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Analytics</h3>
            <p className="text-gray-600 mb-4">View website statistics</p>
            <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;