import React from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import LoginModal from '../components/LoginModal';

function Login() {
  const navigate = useNavigate();

  return (
    <>
      {/* Background Home */}
      <Home />
      
      {/* Login Modal Overlay */}
      <LoginModal 
        isOpen={true} 
        onClose={() => navigate('/')} 
      />
    </>
  );
}

export default Login;
