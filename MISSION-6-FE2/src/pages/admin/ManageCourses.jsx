import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses, saveCourses } from '../../services/courseData';

export default function ManageCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load courses on mount
  useEffect(() => {
    setCourses(getCourses());
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const updated = courses.filter(course => course.id !== id);
      setCourses(updated);
      saveCourses(updated);
    }
  };

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses;
    const query = searchQuery.toLowerCase();
    return courses.filter(course => 
      course.title.toLowerCase().includes(query) || 
      course.software.toLowerCase().includes(query)
    );
  }, [courses, searchQuery]);

  const renderStatusBadge = (status) => {
    if (status === 'ACTIVE') {
      return <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold">Active</span>;
    }
    if (status === 'COMING_SOON') {
      return <span className="bg-amber-50 text-amber-600 border border-amber-200 px-3 py-1 rounded-full text-xs font-semibold">Coming Soon</span>;
    }
    return <span className="bg-gray-100 text-gray-600 border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold">Draft</span>;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manage Courses</h1>
          <p className="text-sm text-gray-500">Create, edit, and manage your courses here.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/courses/create')}
          className="bg-[#0070F3] hover:bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
        >
          + Create New Course
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative w-full max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search course name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0070F3]/20 focus:border-[#0070F3] transition-all"
          />
        </div>
        <button className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors whitespace-nowrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          Filter <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs ml-1">0</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5f5f5] border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Course Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Course Price</th>
                <th className="px-6 py-4">Total Learner</th>
                <th className="px-6 py-4">Last Edit</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 text-sm line-clamp-1">{course.title}</span>
                        <span className="text-xs text-gray-500 mt-1">{course.level} Level • {course.software}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {renderStatusBadge(course.status)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {course.price === 'GRATIS' ? 'GRATIS' : `Rp ${Number(course.price).toLocaleString('id-ID')}`}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {course.learners || 0}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {course.lastEdit || 'Sat, 22 Aug 2026'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => navigate(`/course/${course.id}`)}
                          className="text-gray-400 hover:text-gray-600 transition-colors" 
                          title="Preview"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </button>
                        <button 
                          onClick={() => navigate(`/admin/courses/edit/${course.id}`)}
                          className="text-gray-400 hover:text-blue-500 transition-colors" 
                          title="Edit"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDelete(course.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors" 
                          title="Delete"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 mb-3">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                      <p className="font-medium text-gray-900 mb-1">No courses found</p>
                      <p className="text-sm">We couldn't find anything matching "{searchQuery}"</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 px-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>Item per Page</span>
            <div className="border border-gray-200 rounded-md px-2 py-1 flex items-center bg-white cursor-pointer hover:bg-gray-50">
              <span className="mr-2">7</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
          <span>Showing {filteredCourses.length} of {courses.length} course records</span>
        </div>

        <div className="flex items-center gap-1">
          <button className="flex items-center gap-1 border border-gray-200 bg-white hover:bg-gray-50 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Previous
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 rounded-md">1</button>
          <button className="w-8 h-8 flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 rounded-md">2</button>
          <button className="w-8 h-8 flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 rounded-md">3</button>
          <span className="w-8 h-8 flex items-center justify-center text-gray-400">...</span>
          <button className="w-8 h-8 flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 rounded-md">10</button>
          <button className="flex items-center gap-1 border border-gray-200 bg-white hover:bg-gray-50 px-3 py-1.5 rounded-md transition-colors disabled:opacity-50">
            Next
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </div>
      
    </div>
  );
}
