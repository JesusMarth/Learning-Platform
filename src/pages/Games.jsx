import React from 'react';
import { useNavigate } from 'react-router-dom';
import fondoBlurry from '../assets/Fondo_blurry.png';
import { useTranslation } from 'react-i18next';

const Games = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const volverBtn = (
    <button className="minigame-back" onClick={() => navigate('/')} title={t('common.back')}>
      <i className="bi bi-arrow-left"></i>
    </button>
  );
  return (
    <div className="minigame-bg">
      <img src={fondoBlurry} alt={t('common.decorative_bg')} className="minigame-blur-bg" />
      <div className="minigame-overlay"></div>
      {volverBtn}
      <div className="minigame-card mx-auto text-center animate__animated animate__fadeInDown">
        <div className="minigame-title mb-3">
          <i className="bi bi-controller"></i>
          {t('games.select_area')}
        </div>
        <button className="btn minigame-btn btn-primary w-100 mb-3 d-flex align-items-center justify-content-center" style={{ fontSize: 20, minHeight: 56 }} onClick={() => navigate('/games/languages')}>
          <i className="bi bi-translate me-2 fs-5"></i> {t('games.practice_languages')}
            </button>
        <button className="btn minigame-btn btn-success w-100 mb-3 d-flex align-items-center justify-content-center" style={{ fontSize: 20, minHeight: 56 }} onClick={() => navigate('/games/math')}>
          <i className="bi bi-calculator me-2 fs-5"></i> {t('games.practice_math')}
            </button>
        <button className="btn minigame-btn btn-warning w-100 d-flex align-items-center justify-content-center" style={{ fontSize: 20, minHeight: 56 }} onClick={() => navigate('/games/history')}>
          <i className="bi bi-globe-europe-africa me-2 fs-5"></i> {t('games.practice_history')}
            </button>
      </div>
    </div>
  );
};

export default Games; 