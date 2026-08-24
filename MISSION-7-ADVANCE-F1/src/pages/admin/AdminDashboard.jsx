import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '../../hooks/useCourses';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCourses: 0,
    activeCourses: 0,
    totalLearners: 0,
    notVerifiedLearners: 0,
  });
  const navigate = useNavigate();
  const { fetchCourses, loading } = useCourses();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const courses = await fetchCourses();
        const totalCourses = courses.length;
        const activeCourses = courses.filter(c => c.status === 'ACTIVE' || c.status === 'PUBLISHED').length;
        const totalLearners = courses.reduce((sum, c) => sum + (c.learners || 0), 0);
        
        setStats({
          totalCourses,
          activeCourses,
          totalLearners,
          notVerifiedLearners: 0 // Mock value as there is no learners data yet
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };

    loadStats();
  }, [fetchCourses]);

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">Welcome back, Admin! Here's what's happening with your platform today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 text-blue-500 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-0.5">Total Courses</p>
            <p className="text-2xl font-bold text-gray-900 leading-none">
              {loading ? '-' : stats.totalCourses}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex items-center gap-4">
          <div className="bg-green-50 text-green-500 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-0.5">Active Courses</p>
            <p className="text-2xl font-bold text-gray-900 leading-none">
              {loading ? '-' : stats.activeCourses}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex items-center gap-4">
          <div className="bg-purple-50 text-purple-500 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-0.5">Total Learners</p>
            <p className="text-2xl font-bold text-gray-900 leading-none">
              {loading ? '-' : stats.totalLearners}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex items-center gap-4">
          <div className="bg-rose-50 text-rose-500 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-0.5">Not Verified Learners</p>
            <p className="text-2xl font-bold text-gray-900 leading-none">
              {loading ? '-' : stats.notVerifiedLearners}
            </p>
          </div>
        </div>

      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => navigate('/admin/courses/create')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-5 py-3 rounded-xl transition-colors"
          >
            + Create New Course
          </button>
          <button 
            onClick={() => navigate('/admin/learners')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-5 py-3 rounded-xl transition-colors"
          >
            Manage Learners
          </button>
        </div>
      </div>
      
    </div>
  );
}
