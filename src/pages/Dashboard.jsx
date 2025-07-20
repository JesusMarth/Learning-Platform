import React from 'react';
import { usePoints } from '../context/PointsContext';
import Achievements from '../components/Profile/Achievements';
import UserStatistics from '../components/Profile/UserStatistics';
import fondoBlurry from '../assets/Fondo_blurry.png';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  const { points } = usePoints();

  return (
    <div className="minigame-bg position-relative d-flex flex-column align-items-center w-100 min-vh-100" style={{ overflow: 'hidden' }}>
      {/* Fondo blurry */}
      <img src={fondoBlurry} alt={t('common.decorative_bg')} className="minigame-blur-bg position-absolute top-0 start-0 w-100 h-100" style={{ objectFit: 'cover', zIndex: 0, pointerEvents: 'none', userSelect: 'none' }} />
      {/* Overlay degradado */}
      <div className="minigame-overlay"></div>
      {/* Contenido */}
      <div className="container py-5" style={{ zIndex: 2, maxWidth: 950 }}>
        <UserStatistics />
        <h2 className="mb-3 fw-bold display-6 text-center">{t('dashboard.user_stats')}</h2>
        <div className="mb-4 text-center">
          <span className="badge bg-primary fs-4 px-4 py-2 shadow-sm">{t('dashboard.total_points')}: {points}</span>
        </div>
        <h4 className="mb-3 fw-semibold text-center">{t('dashboard.achievements')}</h4>
        <Achievements />
        <p className="mt-4 mb-0 text-center text-secondary">{t('dashboard.progress_info')}</p>
      </div>
    </div>
  );
};

export default Dashboard; 