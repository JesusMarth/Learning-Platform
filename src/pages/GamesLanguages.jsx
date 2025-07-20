import React from 'react';
import { useNavigate } from 'react-router-dom';
import fondoBlurry from '../assets/Fondo_blurry.png';
import { useTranslation } from 'react-i18next';

const GamesLanguages = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const volverBtn = (
    <button className="minigame-back" onClick={() => navigate('/games')} title={t('common.back')}>
      <i className="bi bi-arrow-left"></i>
    </button>
  );
  return (
    <div className="minigame-bg minigame-language">
      <img src={fondoBlurry} alt={t('common.decorative_bg')} className="minigame-blur-bg" />
      <div className="minigame-overlay"></div>
      {volverBtn}
      <div className="minigame-card mx-auto text-center animate__animated animate__fadeInDown">
        <div className="minigame-title mb-3">
          <i className="bi bi-translate"></i>
          {t('games.languages_title')}
        </div>
        <button className="btn minigame-btn btn-primary w-100" onClick={() => navigate('/games/languages/english')}>
          <i className="bi bi-translate me-2"></i> {t('games.english')}
            </button>
      </div>
    </div>
  );
};

export default GamesLanguages; 