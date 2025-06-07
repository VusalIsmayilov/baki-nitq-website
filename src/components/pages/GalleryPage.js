import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';
import { X, ZoomIn } from 'lucide-react';

const GalleryPage = () => {
  const { t, language } = useLanguage();
  const { getGalleryItems } = useContent();
  const [selectedImage, setSelectedImage] = useState(null);
  
  const galleryItems = getGalleryItems();
  
  const openLightbox = (item) => {
    setSelectedImage(item);
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
  };
  
  return (
    <div className="gallery-section">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">{t('galleryTitle')}</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {t('galleryDesc')}
        </p>
        
        {galleryItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-lg p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{t('noGalleryImages')}</h3>
              <p className="text-gray-500">
                {t('noGalleryDesc')}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item) => (
                <div 
                  key={item.id} 
                  className="gallery-item group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
                  onClick={() => openLightbox(item)}
                >
                  <img 
                    src={item.url} 
                    alt={item.title[language] || item.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn 
                      size={32} 
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-white font-semibold">
                      {item.title[language] || item.name}
                    </h3>
                    {item.description[language] && (
                      <p className="text-gray-200 text-sm mt-1">
                        {item.description[language]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="font-semibold text-blue-900 mb-2">{t('aboutGallery')}</h3>
                <p className="text-blue-700 text-sm">
                  {t('aboutGalleryDesc')}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X size={32} />
            </button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.title[language] || selectedImage.name}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
              <h3 className="text-xl font-semibold mb-2">
                {selectedImage.title[language] || selectedImage.name}
              </h3>
              {selectedImage.description[language] && (
                <p className="text-gray-200">
                  {selectedImage.description[language]}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;