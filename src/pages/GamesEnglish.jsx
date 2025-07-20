import React from 'react';
import { useNavigate } from 'react-router-dom';
import fondoBlurry from '../assets/Fondo_blurry.png';
import { useTranslation } from 'react-i18next';

const ENGLISH_GAMES = [
  { key: 'direct', name: 'games.english_direct', color: 'success', icon: 'bi-arrow-left-right', to: '/games/languages/english/translate' },
  { key: 'multiple', name: 'games.english_multiple', color: 'info', icon: 'bi-ui-radios', to: '/games/languages/english/multiple-choice' },
  { key: 'order', name: 'games.english_order', color: 'warning', icon: 'bi-list-ol', to: '/games/languages/english/letter-order' },
];

const GamesEnglish = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const volverBtn = (
    <button className="minigame-back" onClick={() => navigate('/games/languages')} title={t('common.back')}>
      <i className="bi bi-arrow-left"></i>
    </button>
  );
  return (
    <div className="minigame-bg minigame-language">
      <img src={fondoBlurry} alt={t('common.decorative_bg')} className="minigame-blur-bg" />
      <div className="minigame-overlay"></div>
      {volverBtn}
      <div className="minigame-card mx-auto text-center animate__animated animate__fadeInDown" style={{ maxWidth: 520 }}>
        <div className="minigame-title mb-4">
          <i className="bi bi-translate"></i>
          {t('games.english')}
        </div>
        <h4 className="mb-4">{t('games.select_game')}</h4>
        {ENGLISH_GAMES.map(game => (
          <button key={game.key} className={`btn minigame-btn btn-${game.color} w-100 mb-3 d-flex align-items-center justify-content-center`} style={{ fontSize: 20, minHeight: 56 }} onClick={() => navigate(game.to)}>
            <i className={`bi ${game.icon} me-2 fs-5`}></i> {t(game.name)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GamesEnglish; 