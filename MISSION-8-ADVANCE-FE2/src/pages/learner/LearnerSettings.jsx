import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, updatePassword } from '../../store/slices/authSlice';

export default function LearnerSettings() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || 'Hazrul Aswad',
    email: user?.email || user?.identifier || 'azrulspace@gmail.com',
    phone: '6285810882584',
    bio: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: ''
  });

  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  useEffect(() => {
    // Initialize profile with local storage data if available
    const storedName = localStorage.getItem('user_name');
    const storedEmail = localStorage.getItem('user_email');
    if (storedName) {
      setProfileForm(prev => ({ ...prev, fullName: storedName }));
    }
    if (storedEmail) {
      setProfileForm(prev => ({ ...prev, email: storedEmail }));
    }
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingProfile(true);
    try {
      if (!user?.id) {
        throw new Error("User ID not found");
      }
      await dispatch(updateProfile({
        userId: user.id,
        payload: {
          fullName: profileForm.fullName,
          email: profileForm.email,
          phone: profileForm.phone,
          bio: profileForm.bio
        }
      })).unwrap();
      
      alert('Profile updated successfully!');
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      alert('Current and new passwords cannot be empty!');
      return;
    }
    
    setIsSubmittingPassword(true);
    try {
      if (!user?.id) {
        throw new Error("User ID not found");
      }
      await dispatch(updatePassword({
        userId: user.id,
        payload: {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        }
      })).unwrap();
      alert('Password updated successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '' });
    } catch (error) {
      alert(error || 'Failed to update password.');
      console.error(error);
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account settings and preferences.</p>
      </div>

      <div className="bg-white rounded-[24px] border border-gray-200 p-8 shadow-sm mb-8">
        <div className="mb-6 pb-6 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900 mb-1">Profile Information</h2>
          <p className="text-xs text-gray-500">Update your account's profile information and email address.</p>
        </div>

        <form onSubmit={handleProfileSubmit}>
          <div className="flex items-center gap-4 mb-8">
            <div className="relative group cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 text-xl font-bold flex items-center justify-center relative overflow-hidden">
                {getInitials(profileForm.fullName)}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-full border-2 border-white cursor-pointer hover:bg-blue-700 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
              </div>
              <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Profile Photo</p>
              <p className="text-xs text-gray-400 mt-0.5">We recommend a 1:1 image. Max 2MB.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={profileForm.fullName}
                  onChange={handleProfileChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pl-10 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pl-10 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Phone Number (WhatsApp)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="phone"
                  value={profileForm.phone}
                  onChange={handleProfileChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pl-10 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Bio</label>
              <textarea
                name="bio"
                value={profileForm.bio}
                onChange={handleProfileChange}
                className="w-full rounded-xl border border-gray-200 p-4 text-sm focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none focus:outline-none"
                placeholder="Write a little bit about yourself"
              ></textarea>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmittingProfile}
              className="bg-[#0070F3] hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl text-sm flex items-center gap-2 shadow-sm transition-colors disabled:opacity-70"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              {isSubmittingProfile ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-[24px] border border-gray-200 p-8 shadow-sm">
        <div className="mb-6 pb-6 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900 mb-1">Update Password</h2>
          <p className="text-xs text-gray-500">Ensure your account is using a long, random password to stay secure.</p>
        </div>

        <form onSubmit={handlePasswordSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmittingPassword}
              className="bg-[#08091E] hover:bg-[#151733] text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-sm transition-colors disabled:opacity-70"
            >
              {isSubmittingPassword ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
