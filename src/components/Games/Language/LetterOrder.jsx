import React, { useState } from 'react';
import { usePoints } from '../../../context/PointsContext';
import { useNavigate } from 'react-router-dom';
import { useAchievements } from '../../../context/AchievementsContext';
import { useStatistics } from '../../../context/StatisticsContext';
import fondoBlurry from '../../../assets/Fondo_blurry.png';
import { useTranslation } from 'react-i18next';

const questions = [
  { es: 'Gato', en: 'Cat' },
  { es: 'Perro', en: 'Dog' },
  { es: 'Casa', en: 'House' },
  { es: 'Libro', en: 'Book' },
  { es: 'Manzana', en: 'Apple' },
];

function shuffle(word) {
  let shuffled = word.split('').sort(() => Math.random() - 0.5).join('');
  // Asegurar que la palabra esté desordenada
  while (shuffled === word) {
    shuffled = word.split('').sort(() => Math.random() - 0.5).join('');
  }
  return shuffled;
}

const LetterOrder = () => {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [finished, setFinished] = useState(false);
  const [shuffled, setShuffled] = useState(shuffle(questions[0].en));
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
    if (input.trim().toLowerCase() === questions[current].en.toLowerCase()) {
      setScore(score + 1);
      setFeedback(t('minigame.correct'));
      addPoints(10);
      setStreak(streak + 1);
      setMaxStreak(Math.max(maxStreak, streak + 1));
      correct = true;
    } else {
      setFeedback(t('minigame.incorrect', { answer: questions[current].en }));
      setStreak(0);
      if (!hasFailed) {
        unlock('first_fail');
        setHasFailed(true);
      }
    }
    setTimeout(() => {
      setFeedback('');
      setInput('');
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setShuffled(shuffle(questions[current + 1].en));
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
            setCurrent(0); setScore(0); setFinished(false); setShuffled(shuffle(questions[0].en));
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
        <h4 className="mb-3">{t('minigame.order_letters')}</h4>
        <h2 className="mb-4 fw-bold">{shuffled}</h2>
        <form onSubmit={handleSubmit} className="mb-3">
          <input
            type="text"
            className="form-control form-control-lg mb-2 text-center"
            placeholder={t('minigame.english_word_placeholder')}
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
            style={{ fontSize: '1.3rem', borderRadius: '0.7rem' }}
          />
          <button className="btn minigame-btn btn-primary w-100" type="submit" disabled={!input || feedback}>{t('minigame.check')}</button>
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

export default LetterOrder; 