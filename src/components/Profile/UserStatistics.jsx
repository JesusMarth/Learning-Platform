import React from 'react';
import { useStatistics } from '../../context/StatisticsContext';
import { useTranslation } from 'react-i18next';

const areaNames = {
  languages: 'areas.languages',
  math: 'areas.math',
  history: 'areas.history',
};

const ICONS = {
  totalGames: 'bi-controller',
  totalQuestions: 'bi-question-circle',
  correctAnswers: 'bi-check-circle',
  wrongAnswers: 'bi-x-circle',
  maxStreak: 'bi-lightning',
  percent: 'bi-graph-up',
};

const UserStatistics = () => {
  const { stats } = useStatistics();
  const { t } = useTranslation();
  const { totalGames, totalQuestions, correctAnswers, wrongAnswers, maxStreak, areaGames, registrationDate } = stats;
  const percent = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  return (
    <div className="card shadow-sm mb-4 p-3 border-0" style={{ borderRadius: '1.2rem', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)' }}>
      <div className="card-body p-0">
        <h5 className="fw-bold mb-4 d-flex align-items-center gap-2 justify-content-center" style={{ fontSize: '1.3rem' }}>
          <span className="bi bi-bar-chart text-primary fs-3"></span>
          {t('dashboard.user_stats')}
        </h5>
        <div className="row g-3 mb-4 justify-content-center text-center">
          <div className="col-6 col-md-4 d-flex flex-column align-items-center gap-2">
            <span className="bi bi-controller text-secondary fs-4"></span>
            <div>
              <div className="small text-muted">{t('stats.games_played')}</div>
              <div className="fw-bold fs-5">{totalGames}</div>
            </div>
          </div>
          <div className="col-6 col-md-4 d-flex flex-column align-items-center gap-2">
            <span className="bi bi-question-circle text-secondary fs-4"></span>
            <div>
              <div className="small text-muted">{t('stats.questions_answered')}</div>
              <div className="fw-bold fs-5">{totalQuestions}</div>
            </div>
          </div>
          <div className="col-6 col-md-4 d-flex flex-column align-items-center gap-2">
            <span className="bi bi-lightning text-warning fs-4"></span>
            <div>
              <div className="small text-muted">{t('stats.max_streak')}</div>
              <div className="fw-bold fs-5">{maxStreak}</div>
            </div>
          </div>
          <div className="col-6 col-md-4 d-flex flex-column align-items-center gap-2">
            <span className="bi bi-check-circle text-success fs-4"></span>
            <div>
              <div className="small text-muted">{t('stats.correct')}</div>
              <div className="fw-bold fs-5">{correctAnswers}</div>
            </div>
          </div>
          <div className="col-6 col-md-4 d-flex flex-column align-items-center gap-2">
            <span className="bi bi-x-circle text-danger fs-4"></span>
            <div>
              <div className="small text-muted">{t('stats.wrong')}</div>
              <div className="fw-bold fs-5">{wrongAnswers}</div>
            </div>
          </div>
          <div className="col-6 col-md-4 d-flex flex-column align-items-center gap-2">
            <span className="bi bi-graph-up text-info fs-4"></span>
            <div>
              <div className="small text-muted">{t('stats.accuracy')}</div>
              <div className="fw-bold fs-5">{percent}%</div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="text-center small fw-semibold mb-2" style={{ letterSpacing: 0.5 }}>{t('stats.correct_vs_wrong')}</div>
          <div className="progress mx-auto" style={{ height: '1.5rem', borderRadius: '0.7rem', background: '#e9ecef', maxWidth: 420 }}>
            <div className="progress-bar bg-success d-flex align-items-center justify-content-center" role="progressbar" style={{ width: `${percent}%`, fontWeight: 600, fontSize: '1rem', borderRadius: '0.7rem 0 0 0.7rem' }}>
              {correctAnswers > 0 ? correctAnswers : ''}
            </div>
            <div className="progress-bar bg-danger d-flex align-items-center justify-content-center" role="progressbar" style={{ width: `${100 - percent}%`, fontWeight: 600, fontSize: '1rem', borderRadius: `0 ${percent === 100 ? '0.7rem' : '0'} 0.7rem 0` }}>
              {wrongAnswers > 0 ? wrongAnswers : ''}
            </div>
          </div>
        </div>
        <div className="mb-2">
          <div className="text-center small fw-semibold mb-2" style={{ letterSpacing: 0.5 }}>{t('stats.games_by_area')}</div>
          <ul className="list-group list-group-flush bg-transparent mx-auto" style={{ maxWidth: 420 }}>
            {Object.keys(areaGames).map(area => (
              <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0 ps-0 pe-2" key={area}>
                <span className="d-flex align-items-center gap-2">
                  <span className={`bi ${area === 'languages' ? 'bi-translate' : area === 'math' ? 'bi-calculator' : 'bi-globe'} text-primary fs-5`}></span>
                  {t(areaNames[area]) || area}
                </span>
                <span className="badge bg-primary rounded-pill fs-6">{areaGames[area]}</span>
              </li>
            ))}
          </ul>
        </div>
        {registrationDate && (
          <div className="text-muted small mt-3 text-center"><span className="bi bi-calendar me-1"></span>{t('stats.registered_since')}: {new Date(registrationDate).toLocaleDateString()}</div>
        )}
      </div>
    </div>
  );
};

export default UserStatistics; 