import React from 'react';
import { useAchievements } from '../../context/AchievementsContext';
import { useTranslation } from 'react-i18next';

// Mapeo de iconos Bootstrap para cada logro
const ICONS = {
  first_game: 'bi-flag',
  '100_points': 'bi-star',
  '5_correct': 'bi-lightning',
  all_areas: 'bi-globe',
  '10_games': 'bi-controller',
};

const AchievementUnlockedModal = () => {
  const { currentUnlocked, nextUnlocked, ACHIEVEMENTS } = useAchievements();
  const { t } = useTranslation();

  if (!currentUnlocked) return null;

  const achievement = ACHIEVEMENTS.find(a => a.id === currentUnlocked.id);
  if (!achievement) return null;

  const onClose = () => {
    nextUnlocked();
  };

  return (
    <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.4)' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content shadow-lg rounded-4 animate__animated animate__bounceIn">
          <div className="modal-header border-0 bg-success bg-opacity-75 rounded-top-4">
            <h5 className="modal-title text-white fw-bold">
              <i className="bi bi-trophy me-2"></i> {t('achievements.unlocked_title')}
            </h5>
          </div>
          <div className="modal-body text-center py-4">
            <div className="mb-2 fs-5">{t('achievements.unlocked_message')}</div>
            <div className="fw-bold fs-4 mb-2">{t(`achievements.${achievement.id}.name`)}</div>
            <div className="mb-3 text-secondary">{t(`achievements.${achievement.id}.desc`)}</div>
            <button className="btn btn-success px-4" onClick={onClose}>{t('achievements.close')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementUnlockedModal; 