import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLearners, addLearner, updateLearnerStatus, deleteLearner } from '../../store/slices/learnerSlice';
import AddLearnerModal from './components/AddLearnerModal';

export default function ManageLearners() {
  const dispatch = useDispatch();
  const { learners, status } = useSelector((state) => state.learner);
  const isLoading = status === 'loading';
  const [filteredLearners, setFilteredLearners] = useState([]);
  
  // Modals & Popups
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  // Pagination & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
    // Close dropdown on outside click
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Filter logic
    let result = learners;
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(l => 
        (l.name && l.name.toLowerCase().includes(lowerQuery)) || 
        (l.email && l.email.toLowerCase().includes(lowerQuery))
      );
    }
    setFilteredLearners(result);
    setCurrentPage(1); // Reset to first page on search
  }, [searchQuery, learners]);

  const fetchData = async () => {
    try {
      await dispatch(fetchLearners());
    } catch (error) {
      console.error("Failed to fetch learners", error);
    }
  };

  // Add Manual
  const handleAddManual = async (formData) => {
    try {
      await dispatch(addLearner({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone
      }));
      setIsAddModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Failed to add manual learner", error);
      alert("Gagal menambahkan learner");
    }
  };

  // Add CSV
  const handleAddCSV = async (dataArray) => {
    try {
      // Simulate adding multiple via loop (in real app, use bulk API)
      for (const item of dataArray) {
        if (item.Name || item.Email) {
          await dispatch(addLearner({
            name: item.Name || '',
            email: item.Email || '',
            phone: item.PhoneNumber || ''
          }));
        }
      }
      setIsAddModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Failed to import CSV", error);
      alert("Terjadi kesalahan saat mengimpor CSV");
    }
  };

  // Status Action Handlers
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await dispatch(updateLearnerStatus({ id, newStatus }));
      fetchData();
      setActiveDropdownId(null);
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this learner?")) {
      try {
        await dispatch(deleteLearner(id));
        fetchData();
        setActiveDropdownId(null);
      } catch (error) {
        console.error("Failed to delete learner", error);
      }
    }
  };

  // Badges rendering
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>;
      case 'Banned':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Banned</span>;
      case 'Verification Failed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">Verification Failed</span>;
      case 'Not Verified':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Not Verified</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status || 'Unknown'}</span>;
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredLearners.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLearners = filteredLearners.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Manage Learners</h1>
          <p className="text-sm text-gray-500">Overview and manage all learners across the platform.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-colors shadow-sm"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Manual Learner
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <input 
              type="text" 
              placeholder="Search learners by name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <svg className="absolute left-3 top-2.5 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filter
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-medium bg-gray-100 px-3 py-1 rounded-full">{filteredLearners.length} Total Learners</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Learner Name & Email</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Joined</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Enrolled</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex justify-center items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading learners...
                    </div>
                  </td>
                </tr>
              ) : paginatedLearners.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No learners found.
                  </td>
                </tr>
              ) : (
                paginatedLearners.map((learner) => (
                  <tr key={learner.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                          {learner.name ? learner.name.substring(0, 2).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{learner.name || 'Unknown User'}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{learner.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {learner.phone || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {learner.registeredAt ? new Date(learner.registeredAt).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : '-'}
                    </td>
                    <td className="px-6 py-4">
                      {renderStatusBadge(learner.status)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {learner.enrolledCourses && learner.enrolledCourses.length > 0 
                        ? `${learner.enrolledCourses.length} Courses` 
                        : 'No course yet'}
                    </td>
                    <td className="px-6 py-4 text-center relative">
                      <button 
                        onClick={() => setActiveDropdownId(activeDropdownId === learner.id ? null : learner.id)}
                        className="p-1.5 rounded-md text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="12" cy="5" r="1"></circle>
                          <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                      </button>
                      
                      {/* Action Dropdown Menu */}
                      {activeDropdownId === learner.id && (
                        <div 
                          ref={dropdownRef} 
                          className="absolute right-8 top-10 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 text-left"
                        >
                          {(learner.status === 'Active' || !learner.status) && (
                            <>
                              <button onClick={() => alert('View Progress Clicked')} className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                View Progress
                              </button>
                              <button onClick={() => alert('Edit Details Clicked')} className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                Edit Details
                              </button>
                              <button onClick={() => alert('Assign to Course Clicked')} className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                                Assign to Course
                              </button>
                              <div className="h-px bg-gray-100 my-1"></div>
                              <button onClick={() => handleStatusUpdate(learner.id, 'Banned')} className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
                                Ban Learner
                              </button>
                            </>
                          )}
                          
                          {learner.status === 'Banned' && (
                            <>
                              <button onClick={() => alert('View Details Clicked')} className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                View Details
                              </button>
                              <button onClick={() => handleStatusUpdate(learner.id, 'Active')} className="w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50 flex items-center gap-2 font-medium">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                Unban Learner
                              </button>
                              <div className="h-px bg-gray-100 my-1"></div>
                              <button onClick={() => handleDelete(learner.id)} className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                Remove Learner
                              </button>
                            </>
                          )}
                          
                          {learner.status === 'Verification Failed' && (
                            <>
                              <button onClick={() => handleStatusUpdate(learner.id, 'Active')} className="w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50 flex items-center gap-2 font-medium">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                Verify Manually
                              </button>
                              <div className="h-px bg-gray-100 my-1"></div>
                              <button onClick={() => handleDelete(learner.id)} className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                Remove Learner
                              </button>
                            </>
                          )}

                          {learner.status === 'Not Verified' && (
                            <>
                              <button onClick={() => { alert('Verification Email Resent'); setActiveDropdownId(null); }} className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                Resend Verification
                              </button>
                              <button onClick={() => handleStatusUpdate(learner.id, 'Active')} className="w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50 flex items-center gap-2 font-medium">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                Verify Manually
                              </button>
                              <div className="h-px bg-gray-100 my-1"></div>
                              <button onClick={() => handleDelete(learner.id)} className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                Remove Learner
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Item per page</span>
            <select 
              value={itemsPerPage} 
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button 
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AddLearnerModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onAddManual={handleAddManual}
        onAddCSV={handleAddCSV}
      />
    </div>
  );
}
