import React, { useState } from 'react';
import { usePoints } from '../../../context/PointsContext';
import { useNavigate } from 'react-router-dom';
import { useAchievements } from '../../../context/AchievementsContext';
import { useStatistics } from '../../../context/StatisticsContext';
import { useTranslation } from 'react-i18next';
import fondoBlurry from '../../../assets/Fondo_blurry.png';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
  const ops = ['+', '-', '×', '÷'];
  const op = ops[getRandomInt(0, 3)];
  let a, b, answer;
  switch (op) {
    case '+':
      a = getRandomInt(1, 50); b = getRandomInt(1, 50); answer = a + b; break;
    case '-':
      a = getRandomInt(10, 99); b = getRandomInt(1, a); answer = a - b; break;
    case '×':
      a = getRandomInt(2, 12); b = getRandomInt(2, 12); answer = a * b; break;
    case '÷':
      b = getRandomInt(2, 12); answer = getRandomInt(2, 12); a = b * answer; break;
    default:
      a = b = answer = 0;
  }
  return { a, b, op, answer };
}

const BasicOperations = () => {
  const [question, setQuestion] = useState(generateQuestion());
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
    }
    setTimeout(() => {
      setFeedback('');
      setInput('');
      if (count < 10) {
        setQuestion(generateQuestion());
        setCount(count + 1);
      } else {
        unlock('first_game');
        unlock('all_areas');
        const played = parseInt(localStorage.getItem('gamesPlayed') || '0') + 1;
        localStorage.setItem('gamesPlayed', played);
        if (played >= 10) unlock('10_games');
        const totalPoints = parseInt(localStorage.getItem('userPoints') || '0');
        if (totalPoints >= 100) unlock('100_points');
        addGame('math', 10, score, 10 - score, maxStreak);
        setFinished(true);
      }
      if (correct && streak + 1 >= 5 && !isUnlocked('5_correct')) unlock('5_correct');
    }, 1200);
  };

  const volverBtn = (
    <button className="minigame-back" onClick={() => navigate('/games/math')} title={t('common.back')}>
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
            {t('games.math_title')}
          </div>
          <h3>{t('minigame.finished')}</h3>
          <p>{t('minigame.score', { score, total: 10 })}</p>
        <button className="btn btn-math" onClick={() => {
          setQuestion(generateQuestion()); setScore(0); setCount(1); setFinished(false);
          }}>{t('minigame.play_again')}</button>
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
          {t('games.math_title')}
        </div>
        <h4>{t('minigame.solve_operation')}</h4>
      <h2 className="mb-4">{question.a} {question.op} {question.b}</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          type="number"
          className="form-control form-control-lg mb-2 text-center"
            placeholder={t('minigame.answer_placeholder')}
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
        />
          <button className="btn btn-math w-100" type="submit" disabled={!input || feedback}>{t('minigame.check_button')}</button>
      </form>
      {feedback && <div className="alert alert-info">{feedback}</div>}
        <div className="mb-2">{t('minigame.question_count', { count, total: 10 })}</div>
        <div>{t('minigame.score', { score, total: 10 })}</div>
      </div>
    </div>
  );
};

export default BasicOperations; 