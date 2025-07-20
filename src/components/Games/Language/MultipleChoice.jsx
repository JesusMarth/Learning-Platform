import React, { useState } from 'react';
import { usePoints } from '../../../context/PointsContext';
import { useNavigate } from 'react-router-dom';
import { useAchievements } from '../../../context/AchievementsContext';
import { useStatistics } from '../../../context/StatisticsContext';
import fondoBlurry from '../../../assets/Fondo_blurry.png';
import { useTranslation } from 'react-i18next';

const questions = [
  { es: 'Gato', options: ['Cat', 'Dog', 'House', 'Book'], answer: 'Cat' },
  { es: 'Perro', options: ['Apple', 'Dog', 'Book', 'House'], answer: 'Dog' },
  { es: 'Casa', options: ['Book', 'House', 'Cat', 'Dog'], answer: 'House' },
  { es: 'Libro', options: ['Dog', 'Apple', 'Book', 'Cat'], answer: 'Book' },
  { es: 'Manzana', options: ['Apple', 'House', 'Dog', 'Book'], answer: 'Apple' },
];

const MultipleChoice = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState('');
  const [feedback, setFeedback] = useState('');
  const [finished, setFinished] = useState(false);
  const { addPoints } = usePoints();
  const { unlock, isUnlocked } = useAchievements();
  const { addGame } = useStatistics();
  const navigate = useNavigate();
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [hasFailed, setHasFailed] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = e => {
    e.preventDefault();
    let correct = false;
    if (selected === questions[current].answer) {
      setScore(score + 1);
      setFeedback(t('minigame.correct'));
      addPoints(10);
      setStreak(streak + 1);
      setMaxStreak(Math.max(maxStreak, streak + 1));
      correct = true;
    } else {
      setFeedback(t('minigame.incorrect', { answer: questions[current].answer }));
      setStreak(0);
      if (!hasFailed) {
        unlock('first_fail');
        setHasFailed(true);
      }
    }
    setTimeout(() => {
      setFeedback('');
      setSelected('');
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        unlock('first_game');
        unlock('all_areas');
        const played = parseInt(localStorage.getItem('gamesPlayed') || '0') + 1;
        localStorage.setItem('gamesPlayed', played);
        if (played >= 10) unlock('10_games');
        const totalPoints = parseInt(localStorage.getItem('userPoints') || '0');
        if (totalPoints >= 100) unlock('100_points');
        if (!hasFailed) unlock('perfect_game');
        if (maxStreak >= 10) unlock('10_correct');
        addGame('languages', questions.length, score, questions.length - score, maxStreak);
        setFinished(true);
      }
      if (correct && streak + 1 >= 5 && !isUnlocked('5_correct')) unlock('5_correct');
      if (correct && streak + 1 >= 10 && !isUnlocked('10_correct')) unlock('10_correct');
    }, 1200);
  };

  const volverBtn = (
    <button className="minigame-back" onClick={() => navigate('/games/languages/english')} title={t('common.back')}>
      <i className="bi bi-arrow-left"></i>
    </button>
  );

  if (finished) {
    return (
      <div className="minigame-bg minigame-language">
        <img src={fondoBlurry} alt={t('common.decorative_bg')} className="minigame-blur-bg" />
        <div className="minigame-overlay"></div>
        {volverBtn}
        <div className="minigame-card mx-auto text-center animate__animated animate__fadeInDown">
          <div className="minigame-title mb-3">
            <i className="bi bi-translate"></i>
            {t('games.english')}
          </div>
          <h3 className="mb-3">{t('minigame.finished')}</h3>
          <p className="mb-2">{t('minigame.score', { score, total: questions.length })}</p>
          <button className="btn minigame-btn btn-primary w-100 mb-2" onClick={() => {
            setCurrent(0); setScore(0); setFinished(false);
          }}>{t('minigame.play_again')}</button>
          <button className="btn minigame-btn btn-outline-secondary w-100" onClick={() => navigate('/games/languages/english')}>{t('minigame.back_to_games')}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="minigame-bg minigame-language">
      <img src={fondoBlurry} alt={t('common.decorative_bg')} className="minigame-blur-bg" />
      <div className="minigame-overlay"></div>
      {volverBtn}
      <div className="minigame-card mx-auto text-center animate__animated animate__fadeInDown">
        <div className="minigame-title mb-3">
          <i className="bi bi-translate"></i>
          {t('games.english')}
        </div>
        <h4 className="mb-3">{t('minigame.which_is_translation')}</h4>
        <h2 className="mb-4 fw-bold">{questions[current].es}</h2>
        <form onSubmit={handleSubmit} className="mb-3 d-flex flex-column gap-3 align-items-center">
          {questions[current].options.map(option => (
            <button
              type="button"
              key={option}
              className={`minigame-option-btn btn w-100 mb-2 ${selected === option ? 'selected' : ''}`}
              style={{
                maxWidth: 320,
                borderRadius: '1.2rem',
                border: selected === option ? '2px solid #4f5b93' : '2px solid #444',
                background: selected === option ? '#4f5b93' : '#23272f',
                color: selected === option ? '#fff' : '#f1f1f1',
                fontWeight: 500,
                fontSize: 20,
                transition: 'all 0.2s',
                boxShadow: selected === option ? '0 0 0 2px #4f5b9355' : 'none',
              }}
              onClick={() => setSelected(option)}
            >
              {option}
            </button>
          ))}
          <button
            className="btn minigame-btn btn-primary w-100 mt-2"
            type="submit"
            disabled={!selected || feedback}
            style={{ maxWidth: 320, fontWeight: 700, fontSize: 20, borderRadius: '1.2rem' }}
          >
            {t('minigame.check')}
          </button>
        </form>
        {feedback && (
          <div className={`minigame-feedback badge ${feedback.includes(t('minigame.correct')) ? 'bg-success' : 'bg-danger'} mb-3`}>
            {feedback}
          </div>
        )}
        <div className="mb-2 text-secondary">{t('minigame.question_x_of_y', { current: current + 1, total: questions.length })}</div>
        <div className="mb-2">{t('minigame.score_short', { score })}</div>
      </div>
    </div>
  );
};

export default MultipleChoice; 