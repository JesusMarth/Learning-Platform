import fondoBlurry from '../../assets/Fondo_blurry.png';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import { useAuth } from '../../context/AuthContext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.message);
      }
    }, 500);
  };

  return (
    <div className="minigame-bg d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <img src={fondoBlurry} alt={t('common.decorative_bg')} className="minigame-blur-bg" />
      <div className="minigame-overlay"></div>
      <div className="mx-auto animate__animated animate__fadeInDown" style={{ maxWidth: 420, width: '100%' }}>
        <div className="auth-card bg-white bg-opacity-90 shadow-sm px-4 py-5 rounded-4 border-0 d-flex flex-column align-items-center" style={{backdropFilter:'blur(10px)', minHeight: 480}}>
          <div className="mb-3">
            <i className="bi bi-person-circle text-primary" style={{ fontSize: 54 }}></i>
          </div>
          <h2 className="fw-bold mb-1">{t('auth.login_title')}</h2>
          <div className="mb-4 text-secondary">{t('auth.login_subtitle')}</div>
          <AuthForm onSubmit={handleLogin} loading={loading} error={error} professional />
          <div className="d-flex justify-content-between w-100 mt-2 mb-1 small">
            <span></span>
            <Link to="/register" className="text-decoration-none">
              {t('auth.no_account')} <span className="fw-semibold">{t('auth.register_link')}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 