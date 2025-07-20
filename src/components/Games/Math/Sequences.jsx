import React, { useState } from 'react';
import { usePoints } from '../../../context/PointsContext';
import { useNavigate } from 'react-router-dom';
import { useAchievements } from '../../../context/AchievementsContext';
import { useStatistics } from '../../../context/StatisticsContext';
import fondoBlurry from '../../../assets/Fondo_blurry.png';
import { useTranslation } from 'react-i18next';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSequence() {
  // Secuencias simples: suma, resta, multiplicación
  const type = getRandomInt(0, 2);
  let start = getRandomInt(1, 10);
  let step = getRandomInt(1, 5);
  let seq = [];
  let missingIndex = getRandomInt(1, 3);
  switch (type) {
    case 0: // suma
      for (let i = 0; i < 5; i++) seq.push(start + i * step);
      break;
    case 1: // resta
      for (let i = 0; i < 5; i++) seq.push(start + i * -step);
      break;
    case 2: // multiplicación
      for (let i = 0; i < 5; i++) seq.push(start * Math.pow(step, i));
      break;
    default:
      for (let i = 0; i < 5; i++) seq.push(i);
  }
  const answer = seq[missingIndex];
  seq[missingIndex] = '__';
  return { seq, answer };
}

const Sequences = () => {
  const [question, setQuestion] = useState(generateSequence());
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(1);
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
    if (parseInt(input) === question.answer) {
      setScore(score + 1);
      setFeedback(t('minigame.correct'));
      addPoints(10);
      setStreak(streak + 1);
      setMaxStreak(Math.max(maxStreak, streak + 1));
      correct = true;
    } else {
      setFeedback(t('minigame.incorrect', { answer: question.answer }));
      setStreak(0);
      if (!hasFailed) {
        unlock('first_fail');
        setHasFailed(true);
      }
    }
    setTimeout(() => {
      setFeedback('');
      setInput('');
      if (count < 10) {
        setQuestion(generateSequence());
        setCount(count + 1);
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
        addGame('math', 10, score, 10 - score, maxStreak);
        setFinished(true);
      }
      if (correct && streak + 1 >= 5 && !isUnlocked('5_correct')) unlock('5_correct');
      if (correct && streak + 1 >= 10 && !isUnlocked('10_correct')) unlock('10_correct');
    }, 1200);
  };

  const volverBtn = (
    <button className="minigame-back" onClick={() => navigate('/games/math')} title="Volver">
      <i className="bi bi-arrow-left"></i>
    </button>
  );

  if (finished) {
    return (
      <div className="minigame-bg minigame-math">
        <img src={fondoBlurry} alt="Fondo decorativo" className="minigame-blur-bg" />
        <div className="minigame-overlay"></div>
        {volverBtn}
        <div className="minigame-card mx-auto text-center animate__animated animate__fadeInDown">
          <div className="minigame-title mb-3">
            <i className="bi bi-calculator"></i>
            Matemáticas
          </div>
          <div className="text-center">
            <h3>{t('minigame.finished')}</h3>
            <p>{t('minigame.score', { score, total: 10 })}</p>
            <button className="btn btn-math" onClick={() => {
            setQuestion(generateSequence()); setScore(0); setCount(1); setFinished(false);
            }}>{t('minigame.play_again')}</button>
            <button className="btn btn-secondary mt-2" onClick={() => navigate('/games/math')}>{t('minigame.back_to_games')}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="minigame-bg minigame-math">
      <img src={fondoBlurry} alt="Fondo decorativo" className="minigame-blur-bg" />
      <div className="minigame-overlay"></div>
      {volverBtn}
      <div className="minigame-card mx-auto text-center animate__animated animate__fadeInDown">
        <div className="minigame-title mb-3">
          <i className="bi bi-calculator"></i>
          Matemáticas
        </div>
        <h4 className="mb-3">{t('minigame.what_number_is_missing')}</h4>
        <h2 className="mb-4 fw-bold">{question.seq.join(', ')}</h2>
        <form onSubmit={handleSubmit} className="mb-3">
          <input
            type="number"
            className="form-control form-control-lg mb-2 text-center"
            placeholder={t('minigame.number_to_fill')}
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
            style={{ fontSize: '1.3rem', borderRadius: '0.7rem' }}
          />
          <button className="btn btn-math w-100" type="submit" disabled={!input || feedback}>{t('minigame.check_button')}</button>
        </form>
        {feedback && (
          <div className={`minigame-feedback badge ${feedback.includes(t('minigame.correct')) ? 'bg-success' : 'bg-danger'} mb-3`}>
            {feedback}
          </div>
        )}
        <div className="mb-2 text-secondary">{t('minigame.question_count', { count, total: 10 })}</div>
        <div className="mb-2">{t('minigame.score', { score })}</div>
      </div>
    </div>
  );
};

export default Sequences; 