import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import IconBeginner from '../../assets/icons/course-card/icon-skill-level-beginner.svg';
import IconIntermediate from '../../assets/icons/course-card/icon-skill-level-intermediate.svg';
import IconAdvance from '../../assets/icons/course-card/icon-skill-level-advance.svg';
import IconPdf from '../../assets/icons/Product Page/file-pdf.svg';
import IconSlide from '../../assets/icons/Product Page/papers-text.svg';
import IconText from '../../assets/icons/Product Page/note-text.svg';
import IconVideo from '../../assets/icons/Product Page/video-play.svg';

const levelOptions = [
  { value: 'Beginner', label: 'Beginner', icon: IconBeginner },
  { value: 'Intermediate', label: 'Intermediate', icon: IconIntermediate },
  { value: 'Advanced', label: 'Advanced', icon: IconAdvance }
];

const materialTypeOptions = [
  { value: 'PDF', label: 'PDF', icon: IconPdf },
  { value: 'SLIDE', label: 'Slide', icon: IconSlide },
  { value: 'VIDEO', label: 'Video', icon: IconVideo },
  { value: 'TEXT_BASED', label: 'Text Based', icon: IconText }
];

// Helper for custom select outside click
function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
}

function CustomSelect({ options, value, onChange, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useOutsideClick(ref, () => setIsOpen(false));

  const selectedOption = options.find(o => o.value === value) || options[0];

  return (
    <div className={`relative ${className}`} ref={ref}>
      <div 
        className="flex items-center justify-between w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm bg-white cursor-pointer hover:border-blue-500 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {selectedOption.icon && <img src={selectedOption.icon} alt="" className="w-5 h-5 shrink-0" />}
          <span className="font-medium text-gray-700 whitespace-nowrap truncate">{selectedOption.label}</span>
        </div>
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
          {options.map((option) => (
            <div 
              key={option.value}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${value === option.value ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700'}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.icon && <img src={option.icon} alt="" className="w-5 h-5" />}
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default function CourseForm({ initialData, onSubmit, onCancel }) {
  const [courseForm, setCourseForm] = useState(initialData || {
    title: '',
    description: '',
    level: 'Beginner',
    software: '',
    price: 0,
    isFree: true,
    thumbnailUrl: '',
    status: 'PUBLISHED', // 'DRAFT' | 'COMING_SOON' | 'PUBLISHED'
    sections: [
      {
        id: `sec-${Date.now()}`,
        title: 'Sesi 1: Pengantar',
        materials: [
          {
            id: `mat-${Date.now()}`,
            type: 'PDF',
            title: '',
            duration: '00:10:00',
            urlLink: '',
            textContent: '',
            coverImage: '',
            description: ''
          }
        ]
      }
    ],
    educators: [
      {
        id: `edu-${Date.now()}`,
        name: '',
        role: '',
        linkedinUrl: '',
        avatarUrl: ''
      }
    ]
  });

  const handleChange = (field, value) => {
    setCourseForm(prev => ({ ...prev, [field]: value }));
  };

  // Sections
  const handleAddSection = () => {
    setCourseForm(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: `sec-${Date.now()}`,
          title: `Sesi ${prev.sections.length + 1}: `,
          materials: []
        }
      ]
    }));
  };

  const handleUpdateSection = (index, field, value) => {
    setCourseForm(prev => {
      const newSections = [...prev.sections];
      newSections[index][field] = value;
      return { ...prev, sections: newSections };
    });
  };

  const handleRemoveSection = (index) => {
    setCourseForm(prev => {
      const newSections = [...prev.sections];
      newSections.splice(index, 1);
      return { ...prev, sections: newSections };
    });
  };

  // Materials
  const handleAddMaterial = (sectionIndex) => {
    setCourseForm(prev => {
      const newSections = [...prev.sections];
      newSections[sectionIndex].materials.push({
        id: `mat-${Date.now()}`,
        type: 'PDF',
        title: '',
        duration: '00:10:00',
        urlLink: '',
        textContent: '',
        coverImage: '',
        description: ''
      });
      return { ...prev, sections: newSections };
    });
  };

  const handleUpdateMaterial = (sectionIndex, materialIndex, field, value) => {
    setCourseForm(prev => {
      const newSections = [...prev.sections];
      newSections[sectionIndex].materials[materialIndex][field] = value;
      return { ...prev, sections: newSections };
    });
  };

  const handleRemoveMaterial = (sectionIndex, materialIndex) => {
    setCourseForm(prev => {
      const newSections = [...prev.sections];
      newSections[sectionIndex].materials.splice(materialIndex, 1);
      return { ...prev, sections: newSections };
    });
  };

  // Educators
  const handleAddEducator = () => {
    if (courseForm.educators.length >= 4) {
      alert("Maksimal 4 educator yang diizinkan.");
      return;
    }
    setCourseForm(prev => ({
      ...prev,
      educators: [
        ...prev.educators,
        {
          id: `edu-${Date.now()}`,
          name: '',
          role: '',
          linkedinUrl: '',
          avatarUrl: ''
        }
      ]
    }));
  };

  const handleUpdateEducator = (index, field, value) => {
    setCourseForm(prev => {
      const newEducators = [...prev.educators];
      newEducators[index][field] = value;
      return { ...prev, educators: newEducators };
    });
  };

  const handleRemoveEducator = (index) => {
    setCourseForm(prev => {
      const newEducators = [...prev.educators];
      newEducators.splice(index, 1);
      return { ...prev, educators: newEducators };
    });
  };

  const isFormFullyCompleted = () => {
    if (!courseForm.title || !courseForm.description || !courseForm.software || !courseForm.thumbnailUrl) return false;
    
    if (courseForm.sections.length === 0) return false;
    for (const sec of courseForm.sections) {
      if (!sec.title) return false;
      if (sec.materials.length === 0) return false;
      for (const mat of sec.materials) {
        if (!mat.title || !mat.duration) return false;
        if (mat.type === 'TEXT_BASED') {
          if (!mat.textContent || !mat.coverImage) return false;
        } else {
          if (!mat.urlLink) return false;
        }
      }
    }

    if (courseForm.educators.length === 0) return false;
    for (const edu of courseForm.educators) {
      if (!edu.name || !edu.role || !edu.linkedinUrl || !edu.avatarUrl) return false;
    }

    return true;
  };

  const isComplete = isFormFullyCompleted();

  useEffect(() => {
    if (!isComplete && (courseForm.status === 'PUBLISHED' || courseForm.status === 'COMING_SOON')) {
      handleChange('status', 'DRAFT');
    }
  }, [isComplete]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isComplete && courseForm.status !== 'DRAFT') {
      alert("Please complete all fields to publish as Public or Coming Soon. Otherwise, save as Draft.");
      return;
    }
    onSubmit(courseForm);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[800px] mx-auto pb-20">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          type="button"
          onClick={onCancel}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {initialData ? 'Edit Course' : 'Create New Course'}
        </h1>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Basic Information</h2>
        
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Course Title</label>
            <input 
              type="text"
              required
              value={courseForm.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter course title"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea 
              value={courseForm.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="What will students learn?"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all resize-y min-h-[128px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Level</label>
              <CustomSelect 
                options={levelOptions}
                value={courseForm.level}
                onChange={(val) => handleChange('level', val)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Software / Tools</label>
              <input 
                type="text"
                value={courseForm.software}
                onChange={(e) => handleChange('software', e.target.value)}
                placeholder="e.g. Figma, Adobe Illustrator"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price (Rp)</label>
              <input 
                type="number"
                min="0"
                value={courseForm.price}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  handleChange('price', val);
                  handleChange('isFree', val === 0);
                }}
                placeholder="0"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image (Thumbnail) URL</label>
              <input 
                type="text"
                value={courseForm.thumbnailUrl}
                onChange={(e) => handleChange('thumbnailUrl', e.target.value)}
                placeholder="https://..."
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Builder */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">Curriculum Builder</h2>
          <button 
            type="button"
            onClick={handleAddSection}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            + Add Section
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {courseForm.sections.map((section, sIdx) => (
            <div key={section.id} className="border border-gray-200 rounded-xl bg-gray-50/30">
              
              <div className="bg-gray-50 border-b border-gray-200 rounded-t-xl p-4 flex items-center gap-4">
                <div className="cursor-move text-gray-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg>
                </div>
                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Section {sIdx + 1}:</span>
                <input 
                  type="text"
                  value={section.title}
                  onChange={(e) => handleUpdateSection(sIdx, 'title', e.target.value)}
                  placeholder="Section title"
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => handleRemoveSection(sIdx)}
                  className="text-gray-400 hover:text-red-500 p-1"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>

              <div className="p-4 flex flex-col gap-3">
                {section.materials.map((material, mIdx) => (
                  <div key={material.id} className="bg-white border border-gray-200 rounded-lg p-4 relative">
                    <div className="flex items-start gap-4">
                      <div className="cursor-move text-gray-400 mt-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg>
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3">
                        <div className="md:col-span-3">
                          <CustomSelect 
                            options={materialTypeOptions}
                            value={material.type}
                            onChange={(val) => handleUpdateMaterial(sIdx, mIdx, 'type', val)}
                            className="!rounded-lg"
                          />
                        </div>
                        <div className="md:col-span-6">
                          <input 
                            type="text"
                            value={material.title}
                            onChange={(e) => handleUpdateMaterial(sIdx, mIdx, 'title', e.target.value)}
                            placeholder="Material title"
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all h-[42px]"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <input 
                            type="text"
                            value={material.duration}
                            onChange={(e) => handleUpdateMaterial(sIdx, mIdx, 'duration', e.target.value)}
                            placeholder="00:10:00"
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all h-[42px]"
                          />
                        </div>
                        
                        {/* Dynamic Fields */}
                        {material.type === 'TEXT_BASED' ? (
                          <>
                            <div className="md:col-span-12">
                              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Text Content:</label>
                              <ReactQuill 
                                theme="snow"
                                value={material.textContent}
                                onChange={(value) => handleUpdateMaterial(sIdx, mIdx, 'textContent', value)}
                                placeholder="Write the content here..."
                                className="bg-white [&_.ql-toolbar]:rounded-t-xl [&_.ql-toolbar]:border-gray-200 [&_.ql-container]:rounded-b-xl [&_.ql-container]:border-gray-200 [&_.ql-editor]:min-h-[128px] [&_.ql-editor]:text-sm [&_.ql-editor]:font-sans"
                              />
                            </div>
                            <div className="md:col-span-12 flex items-center gap-3">
                              <span className="text-xs font-semibold text-gray-500 w-[80px]">Cover Image:</span>
                              <input 
                                type="text"
                                value={material.coverImage}
                                onChange={(e) => handleUpdateMaterial(sIdx, mIdx, 'coverImage', e.target.value)}
                                placeholder="Paste Image URL here..."
                                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all h-[42px]"
                              />
                            </div>
                          </>
                        ) : (
                          <div className="md:col-span-12 flex items-center gap-3">
                            <span className="text-xs font-semibold text-gray-500 w-[60px]">URL Link:</span>
                            <input 
                              type="text"
                              value={material.urlLink}
                              onChange={(e) => handleUpdateMaterial(sIdx, mIdx, 'urlLink', e.target.value)}
                              placeholder={material.type === 'VIDEO' ? "Paste YouTube Link here..." : "Paste Google Drive Link here..."}
                              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all h-[42px]"
                            />
                          </div>
                        )}

                        <div className="md:col-span-12 mt-2">
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Material Description / About This Material</label>
                          <textarea 
                            value={material.description || ''}
                            onChange={(e) => handleUpdateMaterial(sIdx, mIdx, 'description', e.target.value)}
                            placeholder="This material will guide you through... Write description or instructions here"
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all resize-y min-h-[80px]"
                          />
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => handleRemoveMaterial(sIdx, mIdx)}
                        className="text-gray-400 hover:text-red-500 p-1 mt-1 shrink-0"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                    </div>
                  </div>
                ))}

                <button 
                  type="button"
                  onClick={() => handleAddMaterial(sIdx)}
                  className="w-full border border-dashed border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>+</span> Add Material
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Educators */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">Educators / Instructors</h2>
          {courseForm.educators.length < 4 && (
            <button 
              type="button"
              onClick={handleAddEducator}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              + Add Educator
            </button>
          )}
        </div>

        <div className="flex flex-col gap-5">
          {courseForm.educators.map((educator, eIdx) => (
            <div key={educator.id} className="border border-gray-100 rounded-xl p-5 bg-gray-50/50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{eIdx + 1}ST EDUCATOR/INSTRUCTOR</span>
                <button 
                  type="button"
                  onClick={() => handleRemoveEducator(eIdx)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Name</label>
                  <input 
                    type="text"
                    value={educator.name}
                    onChange={(e) => handleUpdateEducator(eIdx, 'name', e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Position / Role</label>
                  <input 
                    type="text"
                    value={educator.role}
                    onChange={(e) => handleUpdateEducator(eIdx, 'role', e.target.value)}
                    placeholder="e.g. Senior UI/UX Designer"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">LinkedIn Link</label>
                  <input 
                    type="text"
                    value={educator.linkedinUrl}
                    onChange={(e) => handleUpdateEducator(eIdx, 'linkedinUrl', e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Image Link (Avatar)</label>
                  <input 
                    type="text"
                    value={educator.avatarUrl}
                    onChange={(e) => handleUpdateEducator(eIdx, 'avatarUrl', e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Publication Setting */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Publication Setting</h2>
        <div className="flex flex-wrap items-center gap-6">
          
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative w-5 h-5">
              <input 
                type="radio"
                name="status"
                value="DRAFT"
                checked={courseForm.status === 'DRAFT'}
                onChange={() => handleChange('status', 'DRAFT')}
                className="peer sr-only"
              />
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-blue-600 peer-checked:border-[6px] transition-all"></div>
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Save as Draft</span>
          </label>

          <label className={`flex items-center gap-2 group ${!isComplete ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
            <div className="relative w-5 h-5">
              <input 
                type="radio"
                name="status"
                value="COMING_SOON"
                disabled={!isComplete}
                checked={courseForm.status === 'COMING_SOON'}
                onChange={() => handleChange('status', 'COMING_SOON')}
                className="peer sr-only"
              />
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-blue-600 peer-checked:border-[6px] transition-all"></div>
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Set as Coming Soon</span>
          </label>

          <label className={`flex items-center gap-2 group ${!isComplete ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
            <div className="relative w-5 h-5">
              <input 
                type="radio"
                name="status"
                value="PUBLISHED"
                disabled={!isComplete}
                checked={courseForm.status === 'PUBLISHED'}
                onChange={() => handleChange('status', 'PUBLISHED')}
                className="peer sr-only"
              />
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-blue-600 peer-checked:border-[6px] transition-all"></div>
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Publish as Public</span>
          </label>

        </div>
        {!isComplete && (
          <p className="text-xs text-amber-600 mt-4 bg-amber-50 p-2 rounded-lg border border-amber-200">
            * Please complete all course information, curriculum, and educator details to unlock Public and Coming Soon publication options.
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <button 
          type="submit"
          className="bg-[#0070F3] hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors flex items-center gap-2 shadow-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
          Publish
        </button>
      </div>

    </form>
  );
}
