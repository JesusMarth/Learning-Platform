import React, { useState } from 'react';
import { usePoints } from '../../../context/PointsContext';
import { useNavigate } from 'react-router-dom';
import { useAchievements } from '../../../context/AchievementsContext';
import { useStatistics } from '../../../context/StatisticsContext';
import fondoBlurry from '../../../assets/Fondo_blurry.png';
import { useTranslation } from 'react-i18next';

const questionsES = [
  { q: 'Cristóbal Colón llegó a América en 1492.', a: true },
  { q: 'La Primera Guerra Mundial terminó en 1918.', a: true },
  { q: 'La Gran Muralla China fue construida en el siglo XX.', a: false },
  { q: 'Napoleón Bonaparte fue emperador de Francia.', a: true },
  { q: 'La Revolución Francesa comenzó en 1789.', a: true },
  { q: 'El Imperio Romano cayó en 476 d.C.', a: true },
  { q: 'La Segunda Guerra Mundial empezó en 1935.', a: false },
  { q: 'Cleopatra fue reina de Egipto.', a: true },
  { q: 'La independencia de México fue en 1810.', a: true },
  { q: 'La imprenta fue inventada por Isaac Newton.', a: false },
];

const questionsEN = [
  { q: 'Christopher Columbus arrived in America in 1492.', a: true },
  { q: 'World War I ended in 1918.', a: true },
  { q: 'The Great Wall of China was built in the 20th century.', a: false },
  { q: 'Napoleon Bonaparte was emperor of France.', a: true },
  { q: 'The French Revolution began in 1789.', a: true },
  { q: 'The Roman Empire fell in 476 AD.', a: true },
  { q: 'World War II started in 1935.', a: false },
  { q: 'Cleopatra was queen of Egypt.', a: true },
  { q: 'Mexico\'s independence was in 1810.', a: true },
  { q: 'The printing press was invented by Isaac Newton.', a: false },
];

const TrueFalse = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [finished, setFinished] = useState(false);
  const { addPoints } = usePoints();
  const { unlock, isUnlocked } = useAchievements();
  const { addGame } = useStatistics();
  const navigate = useNavigate();
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [hasFailed, setHasFailed] = useState(false);
  const { t, i18n } = useTranslation();

  const questions = i18n.language === 'en' ? questionsEN : questionsES;

  const handleAnswer = (answer) => {
    let correct = false;
    if (answer === questions[current].a) {
      setScore(score + 1);
      setFeedback(t('minigame.correct'));
      addPoints(10);
      setStreak(streak + 1);
      setMaxStreak(Math.max(maxStreak, streak + 1));
      correct = true;
    } else {
      setFeedback(t('minigame.incorrect'));
      setStreak(0);
      if (!hasFailed) {
        unlock('first_fail');
        setHasFailed(true);
      }
    }
    setTimeout(() => {
      setFeedback('');
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
        addGame('history', questions.length, score, questions.length - score, maxStreak);
        setFinished(true);
      }
      if (correct && streak + 1 >= 5 && !isUnlocked('5_correct')) unlock('5_correct');
      if (correct && streak + 1 >= 10 && !isUnlocked('10_correct')) unlock('10_correct');
    }, 1200);
  };

  const volverBtn = (
    <button className="minigame-back" onClick={() => navigate('/games/history')} title="Volver">
      <i className="bi bi-arrow-left"></i>
    </button>
  );

  if (finished) {
    return (
      <div className="minigame-bg minigame-history">
        <img src={fondoBlurry} alt="Fondo decorativo" className="minigame-blur-bg" />
        <div className="minigame-overlay"></div>
        {volverBtn}
        <div className="minigame-card mx-auto text-center animate__animated animate__fadeInDown">
          <div className="minigame-title mb-3">
            <i className="bi bi-book-half"></i>
            {t('games.history_title')}
          </div>
          <h3 className="mb-3">{t('minigame.finished')}</h3>
          <p className="mb-2">{t('minigame.score', { score, total: questions.length })}</p>
          <button className="btn minigame-btn btn-primary w-100 mb-2" onClick={() => {
            setCurrent(0); setScore(0); setFinished(false);
          }}>{t('minigame.play_again')}</button>
          <button className="btn minigame-btn btn-outline-secondary w-100" onClick={() => navigate('/games/history')}>{t('minigame.back_to_games')}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="minigame-bg minigame-history">
      <img src={fondoBlurry} alt="Fondo decorativo" className="minigame-blur-bg" />
      <div className="minigame-overlay"></div>
      {volverBtn}
      <div className="minigame-card mx-auto text-center animate__animated animate__fadeInDown">
        <div className="minigame-title mb-3">
          <i className="bi bi-book-half"></i>
          {t('games.history_title')}
        </div>
        <h4 className="mb-3">{t('minigame.true_false_question')}</h4>
        <h2 className="mb-4 fw-bold">{questions[current].q}</h2>
        <div className="d-flex justify-content-center gap-3 mb-3">
          <button className="btn minigame-btn btn-success px-4" onClick={() => handleAnswer(true)} disabled={!!feedback}>{t('minigame.true')}</button>
          <button className="btn minigame-btn btn-danger px-4" onClick={() => handleAnswer(false)} disabled={!!feedback}>{t('minigame.false')}</button>
        </div>
        {feedback && (
          <div className={`minigame-feedback badge ${feedback.includes(t('minigame.correct')) ? 'bg-success' : 'bg-danger'} mb-3`}>
            {feedback}
          </div>
        )}
        <div className="mb-2 text-secondary">{t('minigame.question_number', { current: current + 1, total: questions.length })}</div>
        <div className="mb-2">{t('minigame.score', { score, total: questions.length })}</div>
      </div>
    </div>
  );
};

export default TrueFalse; 