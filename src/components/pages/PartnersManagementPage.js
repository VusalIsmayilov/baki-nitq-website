import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Plus, Edit2, Trash2, Eye, EyeOff, ArrowUp, ArrowDown, ExternalLink } from 'lucide-react';

const PartnersManagementPage = () => {
  const { 
    partners, 
    addPartner, 
    updatePartner, 
    deletePartner, 
    togglePartnerActive, 
    updatePartnerOrder,
    getActivePartners 
  } = useContent();
  
  const [editingPartner, setEditingPartner] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    colorClass: 'from-blue-500 to-blue-700',
    textColor: 'text-blue-600',
    active: true
  });

  const colorOptions = [
    { class: 'from-blue-500 to-blue-700', text: 'text-blue-600', label: 'Blue' },
    { class: 'from-green-500 to-green-700', text: 'text-green-600', label: 'Green' },
    { class: 'from-red-500 to-red-700', text: 'text-red-600', label: 'Red' },
    { class: 'from-purple-500 to-purple-700', text: 'text-purple-600', label: 'Purple' },
    { class: 'from-indigo-500 to-indigo-700', text: 'text-indigo-600', label: 'Indigo' },
    { class: 'from-yellow-500 to-yellow-700', text: 'text-yellow-600', label: 'Yellow' },
    { class: 'from-pink-500 to-pink-700', text: 'text-pink-600', label: 'Pink' },
    { class: 'from-gray-500 to-gray-700', text: 'text-gray-600', label: 'Gray' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPartner) {
      updatePartner(editingPartner.id, formData);
      setEditingPartner(null);
    } else {
      addPartner(formData);
      setShowAddForm(false);
    }
    setFormData({
      name: '',
      website: '',
      colorClass: 'from-blue-500 to-blue-700',
      textColor: 'text-blue-600',
      active: true
    });
  };

  const handleEdit = (partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      website: partner.website || '',
      colorClass: partner.colorClass,
      textColor: partner.textColor,
      active: partner.active
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setEditingPartner(null);
    setShowAddForm(false);
    setFormData({
      name: '',
      website: '',
      colorClass: 'from-blue-500 to-blue-700',
      textColor: 'text-blue-600',
      active: true
    });
  };

  const movePartner = (partnerId, direction) => {
    const partner = partners.find(p => p.id === partnerId);
    if (!partner) return;
    
    const newOrder = direction === 'up' ? partner.order - 1 : partner.order + 1;
    updatePartnerOrder(partnerId, newOrder);
  };

  const sortedPartners = [...partners].sort((a, b) => a.order - b.order);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partner Organizations</h1>
          <p className="text-gray-600 mt-2">Manage partner organizations displayed on home and about pages</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Partner
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border">
          <h2 className="text-xl font-semibold mb-4">
            {editingPartner ? 'Edit Partner' : 'Add New Partner'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Partner Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Theme
              </label>
              <div className="grid grid-cols-4 gap-2">
                {colorOptions.map((option) => (
                  <div
                    key={option.class}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.colorClass === option.class 
                        ? 'border-blue-500 ring-2 ring-blue-200' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setFormData({
                      ...formData, 
                      colorClass: option.class,
                      textColor: option.text
                    })}
                  >
                    <div className={`w-full h-8 rounded bg-gradient-to-r ${option.class} mb-2`}></div>
                    <span className="text-sm text-gray-600">{option.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({...formData, active: e.target.checked})}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="active" className="text-sm font-medium text-gray-700">
                Active (show on website)
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {editingPartner ? 'Update Partner' : 'Add Partner'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Partners List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">All Partners ({partners.length})</h2>
          <p className="text-gray-600 text-sm mt-1">
            Active partners: {getActivePartners().length}
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Website
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Color
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedPartners.map((partner) => (
                <tr key={partner.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-900">{partner.order}</span>
                      <div className="flex flex-col">
                        <button
                          onClick={() => movePartner(partner.id, 'up')}
                          className="text-gray-400 hover:text-gray-600 p-1"
                          disabled={partner.order === 1}
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => movePartner(partner.id, 'down')}
                          className="text-gray-400 hover:text-gray-600 p-1"
                          disabled={partner.order === partners.length}
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded bg-gradient-to-r ${partner.colorClass} flex items-center justify-center mr-3`}>
                        <span className="text-white text-xs font-semibold">
                          {partner.name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {partner.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {partner.website ? (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Visit
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">No website</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`w-16 h-4 rounded bg-gradient-to-r ${partner.colorClass}`}></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      partner.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {partner.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePartnerActive(partner.id)}
                        className={`${
                          partner.active 
                            ? 'text-orange-600 hover:text-orange-800' 
                            : 'text-green-600 hover:text-green-800'
                        } transition-colors`}
                      >
                        {partner.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleEdit(partner)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this partner?')) {
                            deletePartner(partner.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PartnersManagementPage;