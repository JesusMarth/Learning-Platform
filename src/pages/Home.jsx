import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import fondoBlurry from '../assets/Fondo_blurry.png';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCTA = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/games');
    } else {
      navigate('/login');
    }
  };

  const features = [
    { icon: 'bi-controller', title: t('home.feature1_title'), desc: t('home.feature1_desc') },
    { icon: 'bi-bar-chart', title: t('home.feature2_title'), desc: t('home.feature2_desc') },
    { icon: 'bi-award', title: t('home.feature3_title'), desc: t('home.feature3_desc') },
    { icon: 'bi-palette', title: t('home.feature4_title'), desc: t('home.feature4_desc') },
  ];

  return (
    <div className="home-bg position-relative d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: '100vh', height: '100vh', overflow: 'hidden' }}>
      {/* Fondo blurry */}
      <img src={fondoBlurry} alt="Fondo decorativo" className="home-blur-bg position-absolute top-0 start-0 w-100 h-100" style={{ objectFit: 'cover', zIndex: 0, pointerEvents: 'none', userSelect: 'none' }} />
      {/* Contenido */}
      <div className="mb-4 animate__animated animate__fadeInDown" style={{ zIndex: 2 }}>
        <h1 className="display-3 fw-bold mb-3" style={{ letterSpacing: 1 }}>
          {i18n.language === 'es' ? (
            <>Bienvenido a Aprende<span className="logo-plus">+</span></>
          ) : (
            <>Welcome to Aprende<span className="logo-plus">+</span></>
          )}
        </h1>
        <p className="lead mb-4 text-secondary">{t('home.subtitle')}</p>
        <button className="btn btn-lg btn-primary px-5 py-3 shadow-sm home-cta animate__animated animate__pulse animate__infinite" onClick={handleCTA}>{t('home.cta')}</button>
      </div>
      <div className="row justify-content-center g-4 w-100 animate__animated animate__fadeInUp" style={{ maxWidth: 900, zIndex: 2 }}>
        {features.map((f, i) => (
          <div key={i} className="col-12 col-md-6 col-lg-3">
            <div className="home-feature-card p-4 h-100 text-center animate__animated animate__fadeInUp">
              <i className={`bi ${f.icon} mb-3`} style={{ fontSize: 38 }}></i>
              <h5 className="fw-bold mb-2">{f.title}</h5>
              <p className="text-secondary mb-0">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home; 