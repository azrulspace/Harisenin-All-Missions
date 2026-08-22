import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, sendOtpWhatsApp, verifyOtpWhatsApp } from '../services/authService';

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState('DEFAULT'); // 'DEFAULT' | 'WA_INPUT' | 'WA_OTP'
  
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [waNumber, setWaNumber] = useState('');
  const [waOtp, setWaOtp] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (countdown > 0 && step === 'WA_OTP') {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown, step]);

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
      const result = await loginUser(formData);
      setFormData({ identifier: '', password: '' });
      onClose();
      
      if (result.data.user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard/learning/1');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Terjadi kesalahan saat login.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendWaOtp = async (e) => {
    if(e) e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    try {
      await sendOtpWhatsApp(waNumber);
      setStep('WA_OTP');
      setCountdown(59);
    } catch (error) {
      setErrorMessage(error.message || 'Gagal mengirim OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyWaOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    try {
      await verifyOtpWhatsApp({ phoneNumber: waNumber, otpCode: waOtp });
      setWaNumber('');
      setWaOtp('');
      setStep('DEFAULT');
      onClose();
    } catch (error) {
      setErrorMessage(error.message || 'Kode OTP tidak valid.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const renderDefaultStep = () => (
    <div className="animate-fade-in">
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

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center">
          {errorMessage}
        </div>
      )}

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

      <div className="flex items-center my-6 text-xs text-gray-400">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-3">Atau</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <button type="button" className="border border-gray-200 rounded-xl py-3 px-4 flex items-center justify-center gap-3 font-medium text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full">
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.918H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4"/>
            <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8766 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853"/>
            <path d="M11.0051 28.6006C9.99973 25.6197 9.99973 22.3928 11.0051 19.4119V13.23H3.03296C-0.371021 20.0112 -0.371021 28.0013 3.03296 34.7825L11.0051 28.6006Z" fill="#FBBC05"/>
            <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2005 2.18703 30.4214 -0.068932 24.48 0.00161733C15.4056 0.00161733 7.10718 5.11644 3.03296 13.2212L11.0051 19.4031C12.901 13.7239 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335"/>
          </svg>
          Masuk dengan akun Google
        </button>

        <button 
          type="button" 
          onClick={() => {
            setErrorMessage('');
            setStep('WA_INPUT');
          }}
          className="border border-gray-200 rounded-xl py-3 px-4 flex items-center justify-center gap-3 font-medium text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M20.5 3.5C18.2 1.2 15.2 0 12 0C5.4 0 0 5.4 0 12C0 14.1 0.5 16.2 1.5 18L0 24L6.1 22.4C7.9 23.4 9.9 23.9 12 23.9C18.6 23.9 24 18.5 24 12C24 8.8 22.8 5.8 20.5 3.5ZM12 21.9C10.2 21.9 8.4 21.4 6.8 20.5L6.4 20.2L2.5 21.2L3.6 17.5L3.2 17.1C2.2 15.6 1.7 13.8 1.7 12C1.7 6.3 6.3 1.7 12 1.7C14.7 1.7 17.3 2.8 19.3 4.7C21.2 6.7 22.3 9.3 22.3 12C22.3 17.7 17.7 22.3 12 22.3V21.9ZM17.7 14.1C17.4 14 15.9 13.2 15.6 13.1C15.3 13 15.1 13 14.9 13.3C14.7 13.6 14.2 14.2 14 14.4C13.8 14.6 13.7 14.7 13.3 14.5C13 14.3 12 14 10.9 13C10 12.2 9.4 11.2 9.2 10.9C9 10.6 9.2 10.4 9.3 10.3C9.5 10.1 9.6 10 9.8 9.8C10 9.6 10.1 9.4 10.2 9.2C10.3 8.9 10.2 8.7 10.1 8.5C10 8.3 9.4 6.8 9.2 6.2C8.9 5.6 8.7 5.7 8.5 5.7C8.3 5.7 8.1 5.7 7.9 5.7C7.7 5.7 7.4 5.8 7.1 6.1C6.8 6.4 6 7.1 6 8.6C6 10.1 7.2 11.5 7.4 11.7C7.6 11.9 9.5 14.8 12.4 16.1C13.1 16.4 13.6 16.6 14.1 16.7C14.8 16.9 15.4 16.9 15.9 16.8C16.4 16.7 17.5 16.1 17.8 15.4C18 14.7 18 14.1 17.9 14.1C17.9 14 17.8 14.1 17.7 14.1Z" fill="#25D366"/>
          </svg>
          Masuk dengan nomor whatsapp
        </button>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        Belum punya akun?{' '}
        <button 
          type="button"
          onClick={() => {
            onClose();
            navigate('/register');
          }}
          className="font-semibold text-gray-900 hover:text-[#0070F3] transition-colors"
        >
          Daftar akun
        </button>
      </div>
    </div>
  );

  const renderWaInputStep = () => (
    <div className="animate-fade-in relative">
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

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSendWaOtp} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="waNumber">
            Nomor Whatsapp
          </label>
          <input
            type="tel"
            id="waNumber"
            name="waNumber"
            value={waNumber}
            onChange={(e) => setWaNumber(e.target.value.replace(/\D/g, ''))}
            placeholder="081234567890"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0070F3]/20 focus:border-[#0070F3] transition-all text-sm placeholder:text-gray-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !waNumber}
          className="w-full bg-[#0070F3] text-white font-semibold py-3.5 rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 mt-2"
        >
          {isLoading ? 'Memproses...' : 'Kirim Kode OTP'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        Belum punya akun?{' '}
        <button 
          type="button"
          onClick={() => {
            onClose();
            navigate('/register');
          }}
          className="font-semibold text-gray-900 hover:text-[#0070F3] transition-colors"
        >
          Daftar akun
        </button>
      </div>
    </div>
  );

  const renderWaOtpStep = () => (
    <div className="animate-fade-in relative">
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

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleVerifyWaOtp} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="waOtp">
            Masukkan Kode OTP
          </label>
          <input
            type="text"
            id="waOtp"
            name="waOtp"
            value={waOtp}
            onChange={(e) => setWaOtp(e.target.value.replace(/\D/g, ''))}
            maxLength="6"
            placeholder="0 0 0 0 0 0"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0070F3]/20 focus:border-[#0070F3] transition-all text-center tracking-[0.5em] text-lg font-medium placeholder:text-gray-400 placeholder:tracking-[0.5em] placeholder:font-normal"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || waOtp.length < 4}
          className="w-full bg-[#0070F3] text-white font-semibold py-3.5 rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 mt-2"
        >
          {isLoading ? 'Verifikasi...' : 'Masuk'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500 flex flex-col gap-2">
        {countdown > 0 ? (
          <span>Kirim ulang kode OTP dalam <span className="font-semibold text-gray-900">{formatTime(countdown)}</span></span>
        ) : (
          <span>
            Belum menerima kode OTP?{' '}
            <button 
              type="button"
              onClick={handleSendWaOtp}
              disabled={isLoading}
              className="font-semibold text-gray-900 hover:text-[#0070F3] transition-colors"
            >
              Kirim ulang
            </button>
          </span>
        )}
        
        <span className="mt-2">
          Menggunakan nomor berbeda?{' '}
          <button 
            type="button"
            onClick={() => {
              setErrorMessage('');
              setStep('WA_INPUT');
            }}
            className="font-semibold text-gray-900 hover:text-[#0070F3] transition-colors"
          >
            Ganti Nomor
          </button>
        </span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] max-w-[480px] w-full p-8 shadow-2xl relative transition-all duration-300 min-h-[300px]">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 -m-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-50 z-10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="relative">
          {step === 'DEFAULT' && renderDefaultStep()}
          {step === 'WA_INPUT' && renderWaInputStep()}
          {step === 'WA_OTP' && renderWaOtpStep()}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
