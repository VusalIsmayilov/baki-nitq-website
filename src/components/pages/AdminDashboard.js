import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';
import { FileText, Upload, BarChart3, Edit, Save, X, Plus, Trash2, Users, Globe, Settings, Check, BookOpen, Newspaper, Eye, EyeOff, Star } from 'lucide-react';

const AdminDashboard = () => {
  const { t, language } = useLanguage();
  const { 
    siteContent, 
    mediaLibrary, 
    siteStats, 
    courses,
    testimonials,
    news,
    teamMembers,
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
    approveTestimonial,
    addNews,
    updateNews,
    deleteNews,
    publishNews,
    toggleNewsFeatured,
    getPublishedNews,
    getFeaturedNews,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    getActiveTeamMembers
  } = useContent();
  
  const [activeSection, setActiveSection] = useState('overview');
  const [editingContent, setEditingContent] = useState({
    homeHero: { ...siteContent.homeHero },
    homeDesc: { ...siteContent.homeDesc },
    aboutMission: { ...siteContent.aboutMission },
    aboutVision: { ...siteContent.aboutVision }
  });
  
  // Team Management State
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
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
    { id: 'news', name: 'News & Activities', icon: Newspaper },
    { id: 'team', name: 'Team Management', icon: Users },
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

  const handleNewsSubmit = (newsData) => {
    if (editingNews) {
      updateNews(editingNews.id, newsData);
      alert('✅ News updated successfully!');
    } else {
      addNews(newsData);
      alert('✅ News added successfully!');
    }
    setShowNewsForm(false);
    setEditingNews(null);
  };

  const handlePublishToggle = (newsId) => {
    const newsItem = news.find(item => item.id === newsId);
    if (newsItem) {
      updateNews(newsId, { published: !newsItem.published });
      alert(`✅ News ${newsItem.published ? 'unpublished' : 'published'} successfully!`);
    }
  };

  const handleFeaturedToggle = (newsId) => {
    toggleNewsFeatured(newsId);
    alert('✅ Featured status updated successfully!');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 style={{
            fontFamily: "'Lora', serif",
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.35,
            color: '#1E3A8A'
          }}>Total Visitors</h3>
          <p className="text-3xl font-bold text-blue-700">{siteStats.totalVisitors}</p>
          <p className="text-sm text-blue-600">+12% from last month</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6">
          <h3 style={{
            fontFamily: "'Lora', serif",
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.35,
            color: '#14532D'
          }}>Active Courses</h3>
          <p className="text-3xl font-bold text-green-700">{courses.filter(c => c.active).length}</p>
          <p className="text-sm text-green-600">All courses active</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-6">
          <h3 style={{
            fontFamily: "'Lora', serif",
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.35,
            color: '#78350F'
          }}>Published News</h3>
          <p className="text-3xl font-bold text-yellow-700">{getPublishedNews().length}</p>
          <p className="text-sm text-yellow-600">{getFeaturedNews().length} featured</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6">
          <h3 style={{
            fontFamily: "'Lora', serif",
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.35,
            color: '#581C87'
          }}>Testimonials</h3>
          <p className="text-3xl font-bold text-purple-700">{testimonials.filter(t => t.approved).length}</p>
          <p className="text-sm text-purple-600">{testimonials.filter(t => !t.approved).length} pending</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 style={{
          fontFamily: "'Lora', serif",
          fontWeight: 600,
          fontSize: '1.25rem',
          lineHeight: 1.35,
          color: '#1E1E1E',
          marginBottom: '1rem'
        }}>Quick Actions</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          <button 
            onClick={() => setActiveSection('content')}
            className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors"
          >
            <FileText className="mx-auto text-blue-600 mb-2" size={24} />
            <span className="block font-semibold">Edit Content</span>
          </button>
          <button 
            onClick={() => setActiveSection('news')}
            className="p-4 bg-orange-50 rounded-lg text-center hover:bg-orange-100 transition-colors"
          >
            <Newspaper className="mx-auto text-orange-600 mb-2" size={24} />
            <span className="block font-semibold">Manage News</span>
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
          <h3 style={{
            fontFamily: "'Lora', serif",
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.35,
            color: '#1E1E1E'
          }}>Edit Website Content</h3>
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

  const renderNewsManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">{t('newsManagement')}</h3>
          <button
            onClick={() => setShowNewsForm(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>{t('addNews')}</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {news.length === 0 ? (
            <div className="text-center py-8">
              <Newspaper className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600">No news articles yet. Create your first news article!</p>
            </div>
          ) : (
            news.map((newsItem) => (
              <div key={newsItem.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-lg">{newsItem.title[language]}</h4>
                      <div className="flex items-center space-x-2">
                        {newsItem.published ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                            {t('published')}
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">
                            {t('draft')}
                          </span>
                        )}
                        {newsItem.featured && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                            ⭐ {t('featured')}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{newsItem.excerpt[language]}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>📅 {formatDate(newsItem.date)}</span>
                      <span>📂 {newsItem.category[language]}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handlePublishToggle(newsItem.id)}
                      className={`p-2 rounded text-white ${
                        newsItem.published 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-green-500 hover:bg-green-600'
                      }`}
                      title={newsItem.published ? t('unpublish') : t('publish')}
                    >
                      {newsItem.published ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      onClick={() => handleFeaturedToggle(newsItem.id)}
                      className={`p-2 rounded ${
                        newsItem.featured 
                          ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                          : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                      }`}
                      title={t('toggleFeatured')}
                    >
                      <Star size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setEditingNews(newsItem);
                        setShowNewsForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 p-2"
                      title={t('edit')}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this news article?')) {
                          deleteNews(newsItem.id);
                          alert('✅ News article deleted successfully!');
                        }
                      }}
                      className="text-red-600 hover:text-red-800 p-2"
                      title={t('delete')}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showNewsForm && (
        <NewsForm
          news={editingNews}
          onSubmit={handleNewsSubmit}
          onCancel={() => {
            setShowNewsForm(false);
            setEditingNews(null);
          }}
        />
      )}
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

  const handleAddTeamMember = (memberData) => {
    addTeamMember(memberData);
    setShowTeamForm(false);
    alert('Team member added successfully!');
  };

  const handleUpdateTeamMember = (memberData) => {
    updateTeamMember(editingTeamMember.id, memberData);
    setEditingTeamMember(null);
    alert('Team member updated successfully!');
  };

  const handleDeleteTeamMember = (memberId) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      deleteTeamMember(memberId);
      alert('Team member deleted successfully!');
    }
  };

  const renderTeamManagement = () => {

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 
            style={{
              fontFamily: "'Lora', serif",
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em'
            }}
          >
            Team Management
          </h2>
          <button
            onClick={() => setShowTeamForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus size={16} className="mr-2" />
            Add Team Member
          </button>
        </div>

        {/* Team Members List */}
        <div className="grid gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Image */}
                <div className="flex-shrink-0">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-lg text-blue-600 font-medium mb-3">
                    {member.position[language]}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {member.story[language]}
                  </p>
                  <div className="flex items-center mt-4 space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      member.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {member.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setEditingTeamMember(member)}
                    className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center text-sm"
                  >
                    <Edit size={14} className="mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTeamMember(member.id)}
                    className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center text-sm"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Form */}
        {(showTeamForm || editingTeamMember) && (
          <TeamMemberForm
            member={editingTeamMember}
            onSubmit={editingTeamMember ? handleUpdateTeamMember : handleAddTeamMember}
            onCancel={() => {
              setShowTeamForm(false);
              setEditingTeamMember(null);
            }}
          />
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview': return renderOverview();
      case 'content': return renderContentManagement();
      case 'courses': return renderCourseManagement();
      case 'news': return renderNewsManagement();
      case 'team': return renderTeamManagement();
      case 'contact': return <ContactInformationSection />;
      default: return renderOverview();
    }
  };

  return (
    <div className="py-8 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 
            style={{
              fontFamily: "'Lora', serif",
              fontWeight: 700,
              fontSize: 'clamp(2.6rem, 6vw, 4.2rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}
          >
            {t('dashboard')}
          </h1>
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

// News Form Component
const NewsForm = ({ news, onSubmit, onCancel }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    title: news?.title || { az: '', en: '', ru: '' },
    content: news?.content || { az: '', en: '', ru: '' },
    excerpt: news?.excerpt || { az: '', en: '', ru: '' },
    category: news?.category || { az: '', en: '', ru: '' },
    imageUrl: news?.imageUrl || '',
    published: news?.published ?? false,
    featured: news?.featured ?? false
  });
  const [imageUploadError, setImageUploadError] = useState('');

  const handleSubmit = () => {
    if (formData.title.az && formData.title.en && formData.title.ru && 
        formData.content.az && formData.content.en && formData.content.ru) {
      onSubmit(formData);
    } else {
      alert('Please fill in all required fields for all languages');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h4 className="text-lg font-semibold mb-4">{news ? t('editNews') : t('addNews')}</h4>
      
      <div className="space-y-6">
        {/* Title Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('newsTitle')}</label>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Azerbaijani</label>
              <input
                type="text"
                value={formData.title.az}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  title: { ...prev.title, az: e.target.value }
                }))}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Xəbər başlığı..."
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">English</label>
              <input
                type="text"
                value={formData.title.en}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  title: { ...prev.title, en: e.target.value }
                }))}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="News title..."
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Russian</label>
              <input
                type="text"
                value={formData.title.ru}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  title: { ...prev.title, ru: e.target.value }
                }))}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Заголовок новости..."
              />
            </div>
          </div>
        </div>

        {/* Excerpt Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('newsExcerpt')}</label>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Azerbaijani</label>
              <textarea
                value={formData.excerpt.az}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  excerpt: { ...prev.excerpt, az: e.target.value }
                }))}
                rows={2}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Qısa məzmun..."
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">English</label>
              <textarea
                value={formData.excerpt.en}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  excerpt: { ...prev.excerpt, en: e.target.value }
                }))}
                rows={2}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Short excerpt..."
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Russian</label>
              <textarea
                value={formData.excerpt.ru}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  excerpt: { ...prev.excerpt, ru: e.target.value }
                }))}
                rows={2}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Краткое содержание..."
              />
            </div>
          </div>
        </div>

        {/* Content Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('newsContent')}</label>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Azerbaijani</label>
              <textarea
                value={formData.content.az}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  content: { ...prev.content, az: e.target.value }
                }))}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Tam məzmun..."
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">English</label>
              <textarea
                value={formData.content.en}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  content: { ...prev.content, en: e.target.value }
                }))}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Full content..."
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Russian</label>
              <textarea
                value={formData.content.ru}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  content: { ...prev.content, ru: e.target.value }
                }))}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Полное содержание..."
              />
            </div>
          </div>
        </div>

        {/* Category Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('newsCategory')}</label>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Azerbaijani</label>
              <input
                type="text"
                value={formData.category.az}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  category: { ...prev.category, az: e.target.value }
                }))}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Kateqoriya..."
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">English</label>
              <input
                type="text"
                value={formData.category.en}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  category: { ...prev.category, en: e.target.value }
                }))}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Category..."
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Russian</label>
              <input
                type="text"
                value={formData.category.ru}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  category: { ...prev.category, ru: e.target.value }
                }))}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Категория..."
              />
            </div>
          </div>
        </div>

        {/* Image Upload and Settings */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">News Image</label>
            
            {/* File Upload */}
            <div className="mb-4">
              <label className="block text-xs text-gray-500 mb-2">Upload from Computer</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImageUploadError('');
                  
                  if (file) {
                    // Validate file size (5MB max)
                    if (file.size > 5 * 1024 * 1024) {
                      setImageUploadError('File size must be less than 5MB');
                      return;
                    }
                    
                    // Validate file type
                    if (!file.type.startsWith('image/')) {
                      setImageUploadError('Please select a valid image file');
                      return;
                    }
                    
                    // Create a local URL for preview
                    const imageUrl = URL.createObjectURL(file);
                    setFormData(prev => ({ ...prev, imageUrl }));
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Supported formats: JPG, PNG, GIF (max 5MB)</p>
              {imageUploadError && (
                <p className="text-xs text-red-500 mt-1">{imageUploadError}</p>
              )}
            </div>
            
            {/* URL Input as alternative */}
            <div className="mb-4">
              <label className="block text-xs text-gray-500 mb-2">Or Enter Image URL</label>
              <input
                type="url"
                value={formData.imageUrl?.startsWith('blob:') ? '' : (formData.imageUrl || '')}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            {/* Preview */}
            {formData.imageUrl && (
              <div className="mt-2">
                <label className="block text-xs text-gray-500 mb-2">Preview</label>
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-32 h-24 rounded-lg object-cover border-2 border-gray-200"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">{t('newsStatus')}</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                  className="mr-2"
                />
                {t('published')}
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="mr-2"
                />
                {t('featured')}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleSubmit}
          className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700"
        >
          {news ? t('save') : t('addNews')}
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
        >
          {t('cancel')}
        </button>
      </div>
    </div>
  );
};

// Contact Information Component
const ContactInformationSection = () => {
  const { siteContent, updateContactInfo } = useContent();
  const [contactData, setContactData] = useState({
    phone: siteContent.contactInfo?.phone || '+994102271404',
    email: siteContent.contactInfo?.email || 'info@bakinitqmerkezi.az',
    address: siteContent.contactInfo?.address || 'Bakı şəhəri, Nərimanov rayonu, Əhməd Rəcəbli 156, Aynalı Plaza',
    hours: siteContent.contactInfo?.hours || 'Monday - Friday: 9:00-18:00',
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

// Team Member Form Component
const TeamMemberForm = ({ member, onSubmit, onCancel }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: member?.name || '',
    position: member?.position || { az: '', en: '', ru: '' },
    story: member?.story || { az: '', en: '', ru: '' },
    imageUrl: member?.imageUrl || '',
    active: member?.active ?? true
  });
  const [uploadError, setUploadError] = useState('');

  const handleSubmit = () => {
    if (formData.name && 
        formData.position.az && formData.position.en && formData.position.ru &&
        formData.story.az && formData.story.en && formData.story.ru &&
        formData.imageUrl) {
      onSubmit(formData);
    } else {
      alert('Please fill in all required fields for all languages');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h4 className="text-lg font-semibold mb-4">
        {member ? 'Edit Team Member' : 'Add New Team Member'}
      </h4>
      
      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Full Name"
          />
        </div>

        {/* Position Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Azerbaijani</label>
              <input
                type="text"
                value={formData.position.az}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  position: { ...prev.position, az: e.target.value }
                }))}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                placeholder="Position in Azerbaijani"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">English</label>
              <input
                type="text"
                value={formData.position.en}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  position: { ...prev.position, en: e.target.value }
                }))}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                placeholder="Position in English"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Russian</label>
              <input
                type="text"
                value={formData.position.ru}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  position: { ...prev.position, ru: e.target.value }
                }))}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                placeholder="Position in Russian"
              />
            </div>
          </div>
        </div>

        {/* Story Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Story/Biography</label>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Azerbaijani</label>
              <textarea
                value={formData.story.az}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  story: { ...prev.story, az: e.target.value }
                }))}
                className="w-full p-3 border border-gray-300 rounded-md text-sm"
                rows="4"
                placeholder="Biography in Azerbaijani"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">English</label>
              <textarea
                value={formData.story.en}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  story: { ...prev.story, en: e.target.value }
                }))}
                className="w-full p-3 border border-gray-300 rounded-md text-sm"
                rows="4"
                placeholder="Biography in English"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Russian</label>
              <textarea
                value={formData.story.ru}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  story: { ...prev.story, ru: e.target.value }
                }))}
                className="w-full p-3 border border-gray-300 rounded-md text-sm"
                rows="4"
                placeholder="Biography in Russian"
              />
            </div>
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Team Member Photo</label>
          
          {/* File Upload */}
          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-2">Upload from Computer</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setUploadError('');
                
                if (file) {
                  // Validate file size (5MB max)
                  if (file.size > 5 * 1024 * 1024) {
                    setUploadError('File size must be less than 5MB');
                    return;
                  }
                  
                  // Validate file type
                  if (!file.type.startsWith('image/')) {
                    setUploadError('Please select a valid image file');
                    return;
                  }
                  
                  // Create a local URL for preview
                  const imageUrl = URL.createObjectURL(file);
                  setFormData(prev => ({ ...prev, imageUrl }));
                }
              }}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">Supported formats: JPG, PNG, GIF (max 5MB)</p>
            {uploadError && (
              <p className="text-xs text-red-500 mt-1">{uploadError}</p>
            )}
          </div>
          
          {/* URL Input as alternative */}
          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-2">Or Enter Photo URL</label>
            <input
              type="url"
              value={formData.imageUrl?.startsWith('blob:') ? '' : (formData.imageUrl || '')}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              placeholder="https://example.com/photo.jpg"
            />
          </div>
          
          {/* Preview */}
          {formData.imageUrl && (
            <div className="mt-2">
              <label className="block text-xs text-gray-500 mb-2">Preview</label>
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="w-32 h-32 rounded-lg object-cover border-2 border-gray-200"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Active Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="active"
            checked={formData.active}
            onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
            className="mr-2"
          />
          <label htmlFor="active" className="text-sm font-medium text-gray-700">
            Active (Show on website)
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <Save size={16} className="mr-2" />
          {member ? 'Update' : 'Add'} Team Member
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