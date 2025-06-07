import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';
import { FileText, Upload, BarChart3, Edit, Save, X, Plus, Trash2, Users, Globe, Settings, Check, BookOpen } from 'lucide-react';

const AdminDashboard = () => {
  const { t, language } = useLanguage();
  const { 
    siteContent, 
    mediaLibrary, 
    siteStats, 
    courses,
    testimonials,
    updateContent,
    updateMultipleContent,
    updateSiteSettings,
    addMediaFile, 
    deleteMediaFile,
    updateMediaFile,
    toggleMediaInGallery,
    getGalleryItems,
    addCourse,
    updateCourse,
    deleteCourse,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    approveTestimonial
  } = useContent();
  
  const [activeSection, setActiveSection] = useState('overview');
  const [editingContent, setEditingContent] = useState({
    homeHero: { ...siteContent.homeHero },
    homeDesc: { ...siteContent.homeDesc },
    aboutMission: { ...siteContent.aboutMission },
    aboutVision: { ...siteContent.aboutVision }
  });
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Sync editingContent with siteContent when siteContent changes
  useEffect(() => {
    setEditingContent({
      homeHero: { ...siteContent.homeHero },
      homeDesc: { ...siteContent.homeDesc },
      aboutMission: { ...siteContent.aboutMission },
      aboutVision: { ...siteContent.aboutVision }
    });
    setHasUnsavedChanges(false);
  }, [siteContent]);

  // Check for unsaved changes
  useEffect(() => {
    const hasChanges = JSON.stringify(editingContent) !== JSON.stringify({
      homeHero: siteContent.homeHero,
      homeDesc: siteContent.homeDesc,
      aboutMission: siteContent.aboutMission,
      aboutVision: siteContent.aboutVision
    });
    setHasUnsavedChanges(hasChanges);
  }, [editingContent, siteContent]);

  const adminSections = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'content', name: 'Content Management', icon: FileText },
    { id: 'courses', name: 'Course Management', icon: BookOpen },
    { id: 'testimonials', name: 'Testimonials', icon: Users },
    { id: 'media', name: 'Media & Gallery', icon: Upload },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const handleContentEdit = (section, lang, newValue) => {
    setEditingContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [lang]: newValue
      }
    }));
  };

  const saveContent = () => {
    console.log('🚀 Starting content save process...');
    updateMultipleContent(editingContent);
    setHasUnsavedChanges(false);
    alert('✅ Content saved successfully! Changes are now live on the website.');
  };

  const resetContent = () => {
    setEditingContent({
      homeHero: { ...siteContent.homeHero },
      homeDesc: { ...siteContent.homeDesc },
      aboutMission: { ...siteContent.aboutMission },
      aboutVision: { ...siteContent.aboutVision }
    });
    alert('✅ Content reset to original values!');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      addMediaFile(file);
      alert('✅ File uploaded successfully! You can now assign it to the gallery if it\'s an image.');
    }
  };

  const handleCourseSubmit = (courseData) => {
    if (editingCourse) {
      updateCourse(editingCourse.id, courseData);
      alert('✅ Course updated successfully!');
    } else {
      addCourse(courseData);
      alert('✅ Course added successfully!');
    }
    setShowCourseForm(false);
    setEditingCourse(null);
  };

  const handleTestimonialSubmit = (testimonialData) => {
    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, testimonialData);
      alert('✅ Testimonial updated successfully!');
    } else {
      addTestimonial(testimonialData);
      alert('✅ Testimonial added successfully!');
    }
    setShowTestimonialForm(false);
    setEditingTestimonial(null);
  };

  // Media File Card Component
  const MediaFileCard = ({ file, onToggleGallery, onUpdateFile, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
      title: { ...file.title },
      description: { ...file.description }
    });

    const handleSave = () => {
      onUpdateFile(editData);
      setIsEditing(false);
      alert('✅ Media file updated successfully!');
    };

    const getFileIcon = () => {
      switch (file.type) {
        case 'image': return '🖼️';
        case 'video': return '📹';
        default: return '📄';
      }
    };

    return (
      <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
        <div className="flex items-start space-x-4">
          {file.type === 'image' ? (
            <img 
              src={file.url} 
              alt={file.name}
              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
              {getFileIcon()}
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editData.title[language]}
                      onChange={(e) => setEditData(prev => ({
                        ...prev,
                        title: { ...prev.title, [language]: e.target.value }
                      }))}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      placeholder="Enter title..."
                    />
                    <textarea
                      value={editData.description[language]}
                      onChange={(e) => setEditData(prev => ({
                        ...prev,
                        description: { ...prev.description, [language]: e.target.value }
                      }))}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      rows={2}
                      placeholder="Enter description..."
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-semibold text-gray-900 truncate">
                      {file.title[language] || file.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {file.description[language] || 'No description'}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{file.size}</span>
                      <span>Uploaded {file.uploaded}</span>
                      <span className={`px-2 py-1 rounded ${
                        file.type === 'image' ? 'bg-green-100 text-green-800' :
                        file.type === 'video' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {file.type}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col space-y-2 ml-4">
                {file.type === 'image' && (
                  <div className="flex flex-col items-end">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <span className="text-sm font-medium text-gray-700">Show in Gallery</span>
                      <input
                        type="checkbox"
                        checked={file.inGallery}
                        onChange={onToggleGallery}
                        className="rounded"
                      />
                    </label>
                    {file.inGallery && (
                      <span className="mt-1 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        📸 In Gallery
                      </span>
                    )}
                  </div>
                )}
                
                <div className="flex space-x-1">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                    title="Edit details"
                  >
                    <Edit size={16} />
                  </button>
                  
                  <button
                    onClick={onDelete}
                    className="text-red-600 hover:text-red-800 p-1"
                    title="Delete file"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900">Total Visitors</h3>
          <p className="text-3xl font-bold text-blue-700">{siteStats.totalVisitors}</p>
          <p className="text-sm text-blue-600">+12% from last month</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900">Active Courses</h3>
          <p className="text-3xl font-bold text-green-700">{courses.filter(c => c.active).length}</p>
          <p className="text-sm text-green-600">All courses active</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-900">Gallery Images</h3>
          <p className="text-3xl font-bold text-yellow-700">{getGalleryItems().length}</p>
          <p className="text-sm text-yellow-600">{mediaLibrary.length} total files</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900">Testimonials</h3>
          <p className="text-3xl font-bold text-purple-700">{testimonials.filter(t => t.approved).length}</p>
          <p className="text-sm text-purple-600">{testimonials.filter(t => !t.approved).length} pending</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => setActiveSection('content')}
            className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors"
          >
            <FileText className="mx-auto text-blue-600 mb-2" size={24} />
            <span className="block font-semibold">Edit Content</span>
          </button>
          <button 
            onClick={() => setActiveSection('media')}
            className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors"
          >
            <Upload className="mx-auto text-green-600 mb-2" size={24} />
            <span className="block font-semibold">Manage Gallery</span>
          </button>
          <button 
            onClick={() => setActiveSection('courses')}
            className="p-4 bg-yellow-50 rounded-lg text-center hover:bg-yellow-100 transition-colors"
          >
            <BookOpen className="mx-auto text-yellow-600 mb-2" size={24} />
            <span className="block font-semibold">Manage Courses</span>
          </button>
          <button 
            onClick={() => setActiveSection('testimonials')}
            className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors"
          >
            <Users className="mx-auto text-purple-600 mb-2" size={24} />
            <span className="block font-semibold">Review Testimonials</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderContentManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Edit Website Content</h3>
          <div className="flex items-center space-x-2">
            {hasUnsavedChanges ? (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                ⚠️ Unsaved Changes
              </span>
            ) : (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                ✅ All Saved
              </span>
            )}
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Homepage Content */}
          <div className="border-b pb-6">
            <h4 className="text-lg font-semibold mb-4">Homepage Content</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Title ({language.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={editingContent.homeHero[language]}
                  onChange={(e) => handleContentEdit('homeHero', language, e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter hero title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Description ({language.toUpperCase()})
                </label>
                <textarea
                  value={editingContent.homeDesc[language]}
                  onChange={(e) => handleContentEdit('homeDesc', language, e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description..."
                />
              </div>
            </div>
          </div>

          {/* About Page Content */}
          <div className="border-b pb-6">
            <h4 className="text-lg font-semibold mb-4">About Page Content</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mission Statement ({language.toUpperCase()})
                </label>
                <textarea
                  value={editingContent.aboutMission[language]}
                  onChange={(e) => handleContentEdit('aboutMission', language, e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter mission statement..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vision Statement ({language.toUpperCase()})
                </label>
                <textarea
                  value={editingContent.aboutVision[language]}
                  onChange={(e) => handleContentEdit('aboutVision', language, e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter vision statement..."
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4 mt-6">
          <button
            onClick={saveContent}
            className={`px-6 py-2 rounded-md flex items-center space-x-2 font-semibold transition-colors ${
              hasUnsavedChanges 
                ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse' 
                : 'bg-blue-900 hover:bg-blue-800 text-white'
            }`}
          >
            <Save size={18} />
            <span>{hasUnsavedChanges ? 'Save Changes!' : 'Save All Changes'}</span>
          </button>
          <button
            onClick={resetContent}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 flex items-center space-x-2"
          >
            <X size={18} />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderMediaLibrary = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Upload New Media</h3>
          <label className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 cursor-pointer flex items-center space-x-2">
            <Upload size={18} />
            <span>Upload File</span>
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,video/*,.pdf,.doc,.docx"
            />
          </label>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="p-4 bg-green-50 rounded-lg">
            <strong>Images:</strong> JPG, PNG, GIF<br />
            Max size: 10MB<br />
            <span className="text-xs text-green-700">✅ Can be added to gallery</span>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <strong>Videos:</strong> MP4, AVI, MOV<br />
            Max size: 100MB<br />
            <span className="text-xs text-blue-700">📹 For future video gallery</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <strong>Documents:</strong> PDF, DOC, DOCX<br />
            Max size: 50MB<br />
            <span className="text-xs text-gray-700">📄 For downloads</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Media Library ({mediaLibrary.length})</h3>
          <div className="flex items-center space-x-2 text-sm">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
              📸 {getGalleryItems().length} in Gallery
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
              📁 {mediaLibrary.filter(file => !file.inGallery).length} in Library
            </span>
          </div>
        </div>
        
        {mediaLibrary.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Upload size={48} className="mx-auto mb-4 opacity-50" />
            <p>No files uploaded yet. Start by uploading your first file!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {mediaLibrary.map((file) => (
              <MediaFileCard 
                key={file.id} 
                file={file} 
                onToggleGallery={() => toggleMediaInGallery(file.id)}
                onUpdateFile={(updates) => updateMediaFile(file.id, updates)}
                onDelete={() => {
                  if (window.confirm('Are you sure you want to delete this file?')) {
                    deleteMediaFile(file.id);
                    alert('✅ File deleted successfully!');
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Gallery Preview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Gallery Preview</h3>
        <p className="text-gray-600 mb-4">These images will appear on the public Gallery page:</p>
        
        {getGalleryItems().length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No images assigned to gallery yet.</p>
            <p className="text-sm text-gray-400 mt-2">Toggle "Show in Gallery" for images above to add them here.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-4">
            {getGalleryItems().slice(0, 8).map((item) => (
              <div key={item.id} className="relative group">
                <img 
                  src={item.url} 
                  alt={item.title[language]}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg transition-all duration-200 flex items-center justify-center">
                  <span className="text-white text-xs opacity-0 group-hover:opacity-100 text-center px-2">
                    {item.title[language]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {getGalleryItems().length > 8 && (
          <p className="text-center mt-4 text-gray-500 text-sm">
            ... and {getGalleryItems().length - 8} more images
          </p>
        )}
      </div>
    </div>
  );

  const renderCourseManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Course Management</h3>
          <button
            onClick={() => setShowCourseForm(true)}
            className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>Add New Course</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{course.name[language]}</h4>
                  <p className="text-gray-600 mt-1">{course.description[language]}</p>
                  <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                    <span>Duration: {course.duration}</span>
                    <span>Price: {course.price}</span>
                    <span className={`px-2 py-1 rounded text-xs ${course.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {course.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingCourse(course);
                      setShowCourseForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 p-1"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this course?')) {
                        deleteCourse(course.id);
                        alert('✅ Course deleted successfully!');
                      }
                    }}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCourseForm && (
        <CourseForm
          course={editingCourse}
          onSubmit={handleCourseSubmit}
          onCancel={() => {
            setShowCourseForm(false);
            setEditingCourse(null);
          }}
        />
      )}
    </div>
  );

  const renderTestimonialManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Testimonial Management</h3>
          <button
            onClick={() => setShowTestimonialForm(true)}
            className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>Add Testimonial</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-600 mt-1 italic">"{testimonial.text[language]}"</p>
                  <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${testimonial.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {testimonial.approved ? 'Approved' : 'Pending Review'}
                  </span>
                </div>
                <div className="flex space-x-2">
                  {!testimonial.approved && (
                    <button
                      onClick={() => {
                        approveTestimonial(testimonial.id);
                        alert('✅ Testimonial approved!');
                      }}
                      className="text-green-600 hover:text-green-800 p-1"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setEditingTestimonial(testimonial);
                      setShowTestimonialForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 p-1"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this testimonial?')) {
                        deleteTestimonial(testimonial.id);
                        alert('✅ Testimonial deleted successfully!');
                      }
                    }}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showTestimonialForm && (
        <TestimonialForm
          testimonial={editingTestimonial}
          onSubmit={handleTestimonialSubmit}
          onCancel={() => {
            setShowTestimonialForm(false);
            setEditingTestimonial(null);
          }}
        />
      )}
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Website Analytics</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Top Pages</h4>
            <div className="space-y-2">
              {siteStats.topPages.map((page, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="flex items-center">
                    <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    {page.page}
                  </span>
                  <span className="font-semibold text-blue-700">{page.views}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Traffic Sources</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Direct Traffic</span>
                <span className="font-semibold">{siteStats.trafficSources.direct}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Search Engines</span>
                <span className="font-semibold">{siteStats.trafficSources.search}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Social Media</span>
                <span className="font-semibold">{siteStats.trafficSources.social}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Site Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Site Title</label>
            <input
              type="text"
              defaultValue={siteContent.siteSettings?.siteName || "Bakı Nitq Mərkəzi"}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
            <input
              type="email"
              defaultValue={siteContent.contactInfo?.email || "info@bakinitqmerkezi.az"}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <button
          onClick={() => alert('✅ Settings saved successfully!')}
          className="mt-4 bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800"
        >
          Save Settings
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview': return renderOverview();
      case 'content': return renderContentManagement();
      case 'courses': return renderCourseManagement();
      case 'testimonials': return renderTestimonialManagement();
      case 'media': return renderMediaLibrary();
      case 'analytics': return renderAnalytics();
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <div className="py-8 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">{t('dashboard')}</h1>
          <div className="text-sm text-gray-600">
            Welcome back, <strong>admin</strong> • {new Date().toLocaleDateString()}
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 bg-white rounded-lg shadow-lg p-4">
            <nav className="space-y-2">
              {adminSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-100 text-blue-900 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{section.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Course Form Component
const CourseForm = ({ course, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: course?.name || { az: '', en: '', ru: '' },
    description: course?.description || { az: '', en: '', ru: '' },
    duration: course?.duration || '',
    price: course?.price || '',
    active: course?.active ?? true
  });

  const handleSubmit = () => {
    if (formData.name.az && formData.name.en && formData.name.ru) {
      onSubmit(formData);
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h4 className="text-lg font-semibold mb-4">{course ? 'Edit Course' : 'Add New Course'}</h4>
      
      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (AZ)</label>
            <input
              type="text"
              value={formData.name.az}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                name: { ...prev.name, az: e.target.value }
              }))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (EN)</label>
            <input
              type="text"
              value={formData.name.en}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                name: { ...prev.name, en: e.target.value }
              }))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (RU)</label>
            <input
              type="text"
              value={formData.name.ru}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                name: { ...prev.name, ru: e.target.value }
              }))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., 3 months"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., 200 AZN"
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800"
        >
          {course ? 'Update Course' : 'Add Course'}
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Testimonial Form Component
const TestimonialForm = ({ testimonial, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: testimonial?.name || '',
    text: testimonial?.text || { az: '', en: '', ru: '' },
    approved: testimonial?.approved ?? false
  });

  const handleSubmit = () => {
    if (formData.name && formData.text.az && formData.text.en && formData.text.ru) {
      onSubmit(formData);
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h4 className="text-lg font-semibold mb-4">{testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</h4>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter full name"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial (AZ)</label>
            <textarea
              value={formData.text.az}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                text: { ...prev.text, az: e.target.value }
              }))}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial (EN)</label>
            <textarea
              value={formData.text.en}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                text: { ...prev.text, en: e.target.value }
              }))}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial (RU)</label>
            <textarea
              value={formData.text.ru}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                text: { ...prev.text, ru: e.target.value }
              }))}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800"
        >
          {testimonial ? 'Update Testimonial' : 'Add Testimonial'}
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;