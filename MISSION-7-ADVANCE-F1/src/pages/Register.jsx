import React from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import RegisterModal from '../components/RegisterModal';

function Register() {
  const navigate = useNavigate();

  return (
    <>
      {/* Background Home */}
      <Home />
      
      {/* Register Modal Overlay */}
      <RegisterModal 
        isOpen={true} 
        onClose={() => navigate('/')} 
      />
    </>
  );
}

export default Register;
