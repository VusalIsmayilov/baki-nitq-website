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
    updateContactInfo,
    addMediaFile, 
    deleteMediaFile,
    updateMediaFile,
    toggleMediaInGallery,
    getGalleryItems,
    addCourse,
    updateCourse,
    deleteCourse,
    updateCourseCurriculum,
    addCurriculumItem,
    removeCurriculumItem,
    updateCurriculumItem,
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
  const [editingCurriculum, setEditingCurriculum] = useState(null);

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
    { id: 'contact', name: 'Contact Information', icon: Globe },
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
            onClick={() => setActiveSection('contact')}
            className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors"
          >
            <Globe className="mx-auto text-purple-600 mb-2" size={24} />
            <span className="block font-semibold">Contact Info</span>
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
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">
                      Curriculum items: {course.curriculum?.[language]?.length || 0}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingCurriculum(course)}
                    className="text-green-600 hover:text-green-800 p-1"
                    title="Edit curriculum"
                  >
                    <BookOpen size={16} />
                  </button>
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

      {editingCurriculum && (
        <CurriculumEditor
          course={editingCurriculum}
          language={language}
          onClose={() => setEditingCurriculum(null)}
          onUpdateCurriculum={updateCourseCurriculum}
          onAddItem={addCurriculumItem}
          onRemoveItem={removeCurriculumItem}
          onUpdateItem={updateCurriculumItem}
        />
      )}

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

  const renderContent = () => {
    switch (activeSection) {
      case 'overview': return renderOverview();
      case 'content': return renderContentManagement();
      case 'courses': return renderCourseManagement();
      case 'contact': return <ContactInformationSection />;
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

// Contact Information Component
const ContactInformationSection = () => {
  const { siteContent, updateContactInfo } = useContent();
  const [contactData, setContactData] = useState({
    phone: siteContent.contactInfo?.phone || '+994 XX XXX XX XX',
    email: siteContent.contactInfo?.email || 'info@bakinitqmerkezi.az',
    address: siteContent.contactInfo?.address || 'Bakı, Azərbaycan',
    hours: siteContent.contactInfo?.hours || 'Mon-Fri: 9:00-18:00',
    instagram: siteContent.contactInfo?.instagram || 'https://instagram.com/bakinitqmerkezi',
    facebook: siteContent.contactInfo?.facebook || 'https://facebook.com/bakinitqmerkezi'
  });
  const [hasUnsavedContactChanges, setHasUnsavedContactChanges] = useState(false);

  const handleContactChange = (field, value) => {
    setContactData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedContactChanges(true);
  };

  const saveContactInfo = () => {
    updateContactInfo(contactData);
    setHasUnsavedContactChanges(false);
    alert('✅ Contact information updated successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-6">Contact Information Management</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800">Basic Information</h4>
          <input
            type="text"
            value={contactData.phone}
            onChange={(e) => handleContactChange('phone', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Phone Number"
          />
          <input
            type="email"
            value={contactData.email}
            onChange={(e) => handleContactChange('email', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Email Address"
          />
          <input
            type="text"
            value={contactData.address}
            onChange={(e) => handleContactChange('address', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Address"
          />
          <input
            type="text"
            value={contactData.hours}
            onChange={(e) => handleContactChange('hours', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Working Hours"
          />
        </div>
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800">Social Media</h4>
          <input
            type="url"
            value={contactData.instagram}
            onChange={(e) => handleContactChange('instagram', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Instagram URL"
          />
          <input
            type="url"
            value={contactData.facebook}
            onChange={(e) => handleContactChange('facebook', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Facebook URL"
          />
        </div>
      </div>
      <button
        onClick={saveContactInfo}
        className={`mt-6 px-6 py-2 rounded-md font-semibold ${
          hasUnsavedContactChanges 
            ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse' 
            : 'bg-blue-900 hover:bg-blue-800 text-white'
        }`}
      >
        {hasUnsavedContactChanges ? 'Save Changes!' : 'Save Contact Info'}
      </button>
    </div>
  );
};

// Curriculum Editor Component
const CurriculumEditor = ({ course, language, onClose, onAddItem, onRemoveItem, onUpdateItem }) => {
  const [newItem, setNewItem] = useState('');
  const [editingItems, setEditingItems] = useState({});
  
  const curriculum = course.curriculum?.[language] || [];
  
  const handleAddItem = () => {
    if (newItem.trim()) {
      onAddItem(course.id, language, newItem.trim());
      setNewItem('');
      alert('✅ Curriculum item added successfully!');
    }
  };
  
  const handleUpdateItem = (index, value) => {
    onUpdateItem(course.id, language, index, value);
    setEditingItems(prev => ({ ...prev, [index]: false }));
    alert('✅ Curriculum item updated successfully!');
  };
  
  const handleRemoveItem = (index) => {
    if (window.confirm('Are you sure you want to remove this curriculum item?')) {
      onRemoveItem(course.id, language, index);
      alert('✅ Curriculum item removed successfully!');
    }
  };
  
  const startEditing = (index) => {
    setEditingItems(prev => ({ ...prev, [index]: curriculum[index] }));
  };
  
  const cancelEditing = (index) => {
    setEditingItems(prev => ({ ...prev, [index]: false }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold">
          Edit Curriculum: {course.name[language]} ({language.toUpperCase()})
        </h4>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>
      
      <div className="mb-6 p-4 bg-green-50 rounded-lg">
        <p className="text-green-800 text-sm">
          💡 <strong>Managing "What You'll Learn":</strong> Add, edit, or remove curriculum items that will appear in the course details modal.
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <h5 className="font-semibold text-gray-700">Current Curriculum Items:</h5>
        {curriculum.length === 0 ? (
          <p className="text-gray-500 italic">No curriculum items yet. Add some below!</p>
        ) : (
          curriculum.map((item, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600 mt-1">•</span>
              <div className="flex-1">
                {editingItems[index] !== false ? (
                  <div className="space-y-2">
                    <textarea
                      value={editingItems[index]}
                      onChange={(e) => setEditingItems(prev => ({ ...prev, [index]: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      rows={2}
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateItem(index, editingItems[index])}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => cancelEditing(index)}
                        className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-700">{item}</span>
                )}
              </div>
              {editingItems[index] === false && (
                <div className="flex space-x-1">
                  <button
                    onClick={() => startEditing(index)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                    title="Edit item"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-600 hover:text-red-800 p-1"
                    title="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="border-t pt-4">
        <h5 className="font-semibold text-gray-700 mb-3">Add New Curriculum Item:</h5>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Enter new curriculum item..."
            className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
          />
          <button
            onClick={handleAddItem}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>Add</span>
          </button>
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

export default AdminDashboard;