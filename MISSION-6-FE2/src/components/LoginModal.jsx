import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      await loginUser(formData);
      setFormData({ identifier: '', password: '' });
      onClose(); // Optional: or navigate to dashboard
    } catch (error) {
      setErrorMessage(error.message || 'Terjadi kesalahan saat login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] max-w-[480px] w-full p-8 shadow-2xl relative animate-fade-in">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 tracking-wider text-center uppercase mb-1">
            MASUK
          </p>
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Selamat datang kembali
          </h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            Masuk untuk mengakses ruang belajar kelas DKV.
          </p>
        </div>

        {/* Social Login */}
        <button type="button" className="border border-gray-200 rounded-xl py-3 px-4 flex items-center justify-center gap-3 font-medium text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full mb-6">
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.918H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4"/>
            <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8766 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853"/>
            <path d="M11.0051 28.6006C9.99973 25.6197 9.99973 22.3928 11.0051 19.4119V13.23H3.03296C-0.371021 20.0112 -0.371021 28.0013 3.03296 34.7825L11.0051 28.6006Z" fill="#FBBC05"/>
            <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2005 2.18703 30.4214 -0.068932 24.48 0.00161733C15.4056 0.00161733 7.10718 5.11644 3.03296 13.2212L11.0051 19.4031C12.901 13.7239 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335"/>
          </svg>
          Masuk dengan akun Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-6 text-xs text-gray-400">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-3">Atau</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="identifier">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Olivia Rodrigo"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0070F3]/20 focus:border-[#0070F3] transition-all text-sm placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <button type="button" className="text-xs text-gray-500 hover:underline">
                Lupa password?
              </button>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Input your password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0070F3]/20 focus:border-[#0070F3] transition-all text-sm placeholder:text-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0070F3] text-white font-semibold py-3.5 rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 mt-2"
          >
            {isLoading ? 'Memproses...' : 'Masuk Akun'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Belum punya akun?{' '}
          <button 
            type="button"
            onClick={() => navigate('/register')}
            className="font-semibold text-gray-900 hover:text-[#0070F3] transition-colors"
          >
            Daftar akun
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
