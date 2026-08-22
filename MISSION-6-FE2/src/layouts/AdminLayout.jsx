import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoSmkDkv from '../assets/icons/Logo SMK DKV.svg';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    localStorage.removeItem('auth_token');
    navigate('/');
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      )
    },
    {
      name: 'Manage Courses',
      path: '/admin/courses',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      )
    },
    {
      name: 'Learners',
      path: '/admin/learners',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-2.82.33 1.65 1.65 0 0 0-.1 1.51 2 2 0 0 1-1.72 2.76h-1.04a2 2 0 0 1-1.72-2.76 1.65 1.65 0 0 0-.1-1.51 1.65 1.65 0 0 0-2.82-.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-.1 2 2 0 0 1-2.76-1.72v-1.04a2 2 0 0 1 2.76-1.72 1.65 1.65 0 0 0 1.51-.1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 2.82-.33 1.65 1.65 0 0 0 .1-1.51 2 2 0 0 1 1.72-2.76h1.04a2 2 0 0 1 1.72 2.76 1.65 1.65 0 0 0 .1 1.51 1.65 1.65 0 0 0 2.82.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51.1 2 2 0 0 1 2.76 1.72v1.04a2 2 0 0 1-2.76 1.72 1.65 1.65 0 0 0-1.51.1z"></path>
        </svg>
      )
    }
  ];

  const adminName = localStorage.getItem('user_name') || 'Admin Utama';
  const adminEmail = localStorage.getItem('user_email') || 'admin.dkv@idn.sch.id';

  return (
    <div className="flex h-screen bg-[#FAFAFA] overflow-hidden">
      
      <aside className="w-[260px] bg-white border-r border-gray-100 flex flex-col justify-between shrink-0 h-full relative z-20">
        <div>
          <div className="h-[80px] px-6 flex items-center border-b border-gray-100">
            <Link to="/" className="flex items-center">
              <img src={logoSmkDkv} alt="SMK DKV IDN" className="h-[28px] w-auto" />
            </Link>
          </div>
          
          <div className="px-4 py-6 flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 font-semibold' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-red-500 hover:bg-red-50 p-3 rounded-xl transition-colors font-medium"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        
        <header className="h-[80px] bg-white border-b border-gray-100 px-8 flex items-center justify-end shrink-0">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900 leading-tight">{adminName}</p>
              <p className="text-xs text-gray-500 mt-0.5">{adminEmail}</p>
            </div>
            <div className="bg-blue-100 text-blue-600 font-bold rounded-full w-10 h-10 flex items-center justify-center shrink-0">
              AU
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
