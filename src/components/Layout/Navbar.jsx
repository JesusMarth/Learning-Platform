import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePoints } from '../../context/PointsContext';
import './Navbar.css';
import { useTranslation } from 'react-i18next';

const getUserProfileData = (email) => {
  const all = JSON.parse(localStorage.getItem('userProfileData') || '{}');
  return all[email] || {};
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const { points } = usePoints();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    function updateProfile() {
      if (user) {
        const profile = getUserProfileData(user.email);
        setAvatar(profile.avatar || null);
        setDisplayName(profile.displayName || user.displayName || user.name || user.email);
      } else {
        setAvatar(null);
        setDisplayName('');
      }
    }
    updateProfile();
    
    function handleStorage(e) {
      if (e.key === 'userProfileData') updateProfile();
    }
    function handleCustom() { updateProfile(); }
    window.addEventListener('storage', handleStorage);
    window.addEventListener('profileDataChanged', handleCustom);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('profileDataChanged', handleCustom);
    };
  }, [user]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(dm => !dm);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg glass-navbar py-3 sticky-top" style={{ minHeight: 80, zIndex: 1040 }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-3 text-primary" to="/">
          <span className="bi bi-lightbulb me-2"></span>Aprende<span className="logo-plus">+</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            <li className="nav-item d-flex align-items-center">
              <button
                className="theme-toggle-btn"
                onClick={toggleDarkMode}
                title={darkMode ? t('profile.light_mode') : t('profile.dark_mode')}
                aria-label={darkMode ? t('profile.light_mode') : t('profile.dark_mode')}
              >
                <span className={`theme-icon ${darkMode ? 'sun-icon' : 'moon-icon'} animate__animated animate__fadeIn`}>
                  <i className={`bi ${darkMode ? 'bi-sun-fill' : 'bi-moon-stars-fill'}`}></i>
                </span>
              </button>
            </li>
            <li className="nav-item d-flex align-items-center">
              <div className="language-selector d-flex align-items-center">
                <button
                  className={`language-btn ${i18n.language === 'es' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('es')}
                  title="Español"
                >
                  <span className="flag-icon bi bi-flag-fill"></span>
                  <span className="language-text">ES</span>
                </button>
                <button
                  className={`language-btn ${i18n.language === 'en' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('en')}
                  title="English"
                >
                  <span className="flag-icon bi bi-translate"></span>
                  <span className="language-text">EN</span>
                </button>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-animated-link fs-5" to="/dashboard">{t('navbar.panel')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-animated-link fs-5" to="/games">{t('navbar.games')}</Link>
            </li>
            {user && (
              <li className="nav-item mx-2">
                <span className="badge bg-primary fs-5 px-3 py-2">{t('navbar.points')}: {points}</span>
              </li>
            )}
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="/login">{t('navbar.login')}</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="/register">{t('navbar.register')}</Link>
                </li>
              </>
            )}
            {user && (
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle d-flex align-items-center gap-3" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ cursor: 'pointer' }}>
                  {avatar ? (
                    <img src={avatar} alt="avatar" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2.5px solid var(--color-primary)' }} />
                  ) : (
                    <span className="d-inline-flex justify-content-center align-items-center bg-primary text-white rounded-circle" style={{ width: 48, height: 48, fontWeight: 'bold', fontSize: 24 }}>
                      {(displayName[0] || user.email[0] || 'U').toUpperCase()}
                    </span>
                  )}
                  <span className="fw-semibold fs-5">{displayName}</span>
                </span>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <span className="bi bi-person me-2"></span>{t('navbar.profile')}
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}><span className="bi bi-box-arrow-right me-2"></span>{t('navbar.logout')}</button></li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 