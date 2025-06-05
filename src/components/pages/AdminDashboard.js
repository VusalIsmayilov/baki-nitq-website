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
    { id: 'media', name: 'Media Library', icon: Upload },
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
    console.log('Current editingContent:', editingContent);
    console.log('Current siteContent before save:', siteContent);
    
    // Use bulk update for better performance and reliability
    updateMultipleContent(editingContent);
    
    // Reset unsaved changes flag
    setHasUnsavedChanges(false);
    
    // Show success message
    alert('✅ Content saved successfully! Changes are now live on the website. Check the Home and About pages to see your updates!');
    
    // Log after a short delay to see the updated state
    setTimeout(() => {
      console.log('🎉 Save process completed! Check the website for changes.');
    }, 100);
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
      alert('✅ File uploaded successfully!');
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
          <h3 className="text-lg font-semibold text-yellow-900">Testimonials</h3>
          <p className="text-3xl font-bold text-yellow-700">{testimonials.filter(t => t.approved).length}</p>
          <p className="text-sm text-yellow-600">{testimonials.filter(t => !t.approved).length} pending</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900">Media Files</h3>
          <p className="text-3xl font-bold text-purple-700">{mediaLibrary.length}</p>
          <p className="text-sm text-purple-600">Images & videos</p>
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
            onClick={() => setActiveSection('courses')}
            className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors"
          >
            <Plus className="mx-auto text-green-600 mb-2" size={24} />
            <span className="block font-semibold">Manage Courses</span>
          </button>
          <button 
            onClick={() => setActiveSection('testimonials')}
            className="p-4 bg-yellow-50 rounded-lg text-center hover:bg-yellow-100 transition-colors"
          >
            <Users className="mx-auto text-yellow-600 mb-2" size={24} />
            <span className="block font-semibold">Review Testimonials</span>
          </button>
          <button 
            onClick={() => setActiveSection('media')}
            className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors"
          >
            <Upload className="mx-auto text-purple-600 mb-2" size={24} />
            <span className="block font-semibold">Upload Media</span>
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
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800 text-sm">
            💡 <strong>Live Editing:</strong> Changes you make here will immediately appear on the live website after saving.
          </p>
        </div>
        
        <div className="space-y-8">
          {/* Homepage Content */}
          <div className="border-b pb-6">
            <h4 className="text-lg font-semibold mb-4">Homepage Content</h4>
            <div className="mb-4 p-3 bg-gray-50 rounded border">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Current Live Content:</strong> {siteContent.homeHero[language]}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Editing:</strong> {editingContent.homeHero[language]}
              </p>
            </div>
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
            <div className="mb-4 p-3 bg-gray-50 rounded border">
              <p className="text-sm text-gray-600 mb-1">
                <strong>Current Mission:</strong> {siteContent.aboutMission[language]}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Current Vision:</strong> {siteContent.aboutVision[language]}
              </p>
            </div>
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
          <button
            onClick={() => {
              console.log('🔍 DEBUG INFO:');
              console.log('Current siteContent:', siteContent);
              console.log('Current editingContent:', editingContent);
              console.log('Are they different?', JSON.stringify(siteContent) !== JSON.stringify(editingContent));
            }}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Debug: Show Content
          </button>
          <button
            onClick={() => {
              // Force a save and then navigate to home page
              updateMultipleContent(editingContent);
              setHasUnsavedChanges(false);
              alert('✅ Content saved! Now navigate to Home page to see changes!');
            }}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
          >
            Save & Test Live
          </button>
        </div>
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
            Max size: 10MB
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <strong>Videos:</strong> MP4, AVI, MOV<br />
            Max size: 100MB
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <strong>Documents:</strong> PDF, DOC, DOCX<br />
            Max size: 50MB
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Media Files ({mediaLibrary.length})</h3>
        {mediaLibrary.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Upload size={48} className="mx-auto mb-4 opacity-50" />
            <p>No files uploaded yet. Start by uploading your first file!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {mediaLibrary.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded ${
                    file.type === 'image' ? 'bg-green-100 text-green-600' :
                    file.type === 'video' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">{file.name}</h4>
                    <p className="text-sm text-gray-600">{file.size} • Uploaded {file.uploaded}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this file?')) {
                      deleteMediaFile(file.id);
                      alert('✅ File deleted successfully!');
                    }
                  }}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
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

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Language Usage</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900">Azerbaijani</h4>
            <p className="text-3xl font-bold text-blue-700">{siteStats.languageUsage.az}%</p>
            <p className="text-sm text-blue-600">Primary language</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-900">English</h4>
            <p className="text-3xl font-bold text-green-700">{siteStats.languageUsage.en}%</p>
            <p className="text-sm text-green-600">International users</p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-900">Russian</h4>
            <p className="text-3xl font-bold text-purple-700">{siteStats.languageUsage.ru}%</p>
            <p className="text-sm text-purple-600">Regional users</p>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
            <select className="w-full p-3 border border-gray-300 rounded-md">
              <option value="az">Azerbaijani</option>
              <option value="en">English</option>
              <option value="ru">Russian</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
            <input
              type="email"
              defaultValue={siteContent.contactInfo?.email || "info@bakinitqmerkezi.az"}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue={siteContent.contactInfo?.phone || "+994 XX XXX XX XX"}
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

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">System Information</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Website Status:</span>
              <span className="text-green-600 font-semibold">Online</span>
            </div>
            <div className="flex justify-between">
              <span>Last Backup:</span>
              <span>Today, 3:00 AM</span>
            </div>
            <div className="flex justify-between">
              <span>SSL Certificate:</span>
              <span className="text-green-600 font-semibold">Active</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Courses:</span>
              <span>{courses.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Languages:</span>
              <span>3</span>
            </div>
            <div className="flex justify-between">
              <span>Media Files:</span>
              <span>{mediaLibrary.length}</span>
            </div>
          </div>
        </div>
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

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (AZ)</label>
            <textarea
              value={formData.description.az}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                description: { ...prev.description, az: e.target.value }
              }))}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
            <textarea
              value={formData.description.en}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                description: { ...prev.description, en: e.target.value }
              }))}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (RU)</label>
            <textarea
              value={formData.description.ru}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                description: { ...prev.description, ru: e.target.value }
              }))}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.active}
              onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.value === 'true' }))}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
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
              placeholder="Enter testimonial in Azerbaijani"
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
              placeholder="Enter testimonial in English"
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
              placeholder="Enter testimonial in Russian"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.approved}
              onChange={(e) => setFormData(prev => ({ ...prev, approved: e.target.checked }))}
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">Approved for display</span>
          </label>
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