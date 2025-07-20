import React from 'react';
import { useAchievements } from '../../context/AchievementsContext';
import { useTranslation } from 'react-i18next';

const ICONS = {
  first_game: 'bi-flag',
  '100_points': 'bi-trophy',
  '5_correct': 'bi-lightning',
  all_areas: 'bi-globe',
  '10_games': 'bi-star',
};

const Achievements = () => {
  const { achievements, ACHIEVEMENTS, isUnlocked } = useAchievements();
  const { t } = useTranslation();

  return (
    <div className="row g-3 justify-content-center">
      {ACHIEVEMENTS.map(a => {
        const unlocked = isUnlocked(a.id);
        const icon = ICONS[a.id] || 'bi-award';
        return (
          <div key={a.id} className="col-12 col-md-6 col-lg-4">
            <div className={`card h-100 shadow-sm ${unlocked ? 'border-success' : 'border-secondary'}`}>
              <div className="card-body text-center">
                <i className={`bi ${icon} mb-2`} style={{ fontSize: 40, color: unlocked ? '#198754' : '#adb5bd' }}></i>
                <h5 className="card-title mb-1">{t(`achievements.${a.id}.name`)}</h5>
                <p className="card-text mb-2">{t(`achievements.${a.id}.desc`)}</p>
                {unlocked ? (
                  <span className="badge bg-success">{t('achievements.unlocked')}</span>
                ) : (
                  <span className="badge bg-secondary">{t('achievements.locked')}</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Achievements; 