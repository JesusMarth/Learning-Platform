import React, { useState } from 'react';
import { usePoints } from '../../../context/PointsContext';
import { useNavigate } from 'react-router-dom';
import { useAchievements } from '../../../context/AchievementsContext';
import { useStatistics } from '../../../context/StatisticsContext';
import fondoBlurry from '../../../assets/Fondo_blurry.png';
import { useTranslation } from 'react-i18next';

const questionsES = [
  {
    events: [
      { event: 'Descubrimiento de América', year: 1492 },
      { event: 'Caída del Imperio Romano', year: 476 },
      { event: 'Revolución Francesa', year: 1789 },
      { event: 'Llegada a la Luna', year: 1969 },
    ],
  },
  {
    events: [
      { event: 'Independencia de México', year: 1810 },
      { event: 'Primera Guerra Mundial', year: 1914 },
      { event: 'Segunda Guerra Mundial', year: 1939 },
      { event: 'Caída del Muro de Berlín', year: 1989 },
    ],
  },
  {
    events: [
      { event: 'Invención de la imprenta', year: 1440 },
      { event: 'Descubrimiento de la penicilina', year: 1928 },
      { event: 'Construcción de la Gran Muralla China', year: -700 },
      { event: 'Fundación de Roma', year: -753 },
    ],
  },
  {
    events: [
      { event: 'Nacimiento de Jesucristo', year: 0 },
      { event: 'Coronación de Carlomagno', year: 800 },
      { event: 'Viaje de Magallanes alrededor del mundo', year: 1519 },
      { event: 'Revolución Industrial', year: 1760 },
    ],
  },
  {
    events: [
      { event: 'Guerra de Independencia de EE.UU.', year: 1776 },
      { event: 'Abolición de la esclavitud en EE.UU.', year: 1865 },
      { event: 'Primera transmisión de radio', year: 1906 },
      { event: 'Invención de Internet', year: 1983 },
    ],
  },
];

const questionsEN = [
  {
    events: [
      { event: 'Discovery of America', year: 1492 },
      { event: 'Fall of the Roman Empire', year: 476 },
      { event: 'French Revolution', year: 1789 },
      { event: 'Moon Landing', year: 1969 },
    ],
  },
  {
    events: [
      { event: 'Mexican Independence', year: 1810 },
      { event: 'World War I', year: 1914 },
      { event: 'World War II', year: 1939 },
      { event: 'Fall of the Berlin Wall', year: 1989 },
    ],
  },
  {
    events: [
      { event: 'Invention of the Printing Press', year: 1440 },
      { event: 'Discovery of Penicillin', year: 1928 },
      { event: 'Construction of the Great Wall of China', year: -700 },
      { event: 'Foundation of Rome', year: -753 },
    ],
  },
  {
    events: [
      { event: 'Birth of Jesus Christ', year: 0 },
      { event: 'Coronation of Charlemagne', year: 800 },
      { event: 'Magellan\'s Voyage Around the World', year: 1519 },
      { event: 'Industrial Revolution', year: 1760 },
    ],
  },
  {
    events: [
      { event: 'American War of Independence', year: 1776 },
      { event: 'Abolition of Slavery in the US', year: 1865 },
      { event: 'First Radio Transmission', year: 1906 },
      { event: 'Invention of the Internet', year: 1983 },
    ],
  },
];

function shuffle(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

const OrderEvents = () => {
  const [current, setCurrent] = useState(0);
  const [order, setOrder] = useState(shuffle(questionsES[0].events));
  const [selected, setSelected] = useState([]);
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

  React.useEffect(() => {
    setOrder(shuffle(questions[current].events));
  }, [i18n.language, current, questions]);

  const handleSelect = (idx) => {
    if (selected.includes(idx)) return;
    setSelected([...selected, idx]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctOrder = order.slice().sort((a, b) => a.year - b.year);
    const userOrder = selected.map(i => order[i]);
    const isCorrect = userOrder.every((ev, i) => ev.event === correctOrder[i].event);
    let correct = false;
    if (isCorrect) {
      setScore(score + 1);
      setFeedback(t('minigame.correct'));
      addPoints(10);
      setStreak(streak + 1);
      setMaxStreak(Math.max(maxStreak, streak + 1));
      correct = true;
    } else {
      const correctAnswerText = correctOrder.map((ev, index) => `${index + 1}. ${ev.event}`).join('\n');
      setFeedback(t('minigame.incorrect', { answer: correctAnswerText }));
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
        setOrder(shuffle(questions[current + 1].events));
        setSelected([]);
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
    }, 3000);
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
            setCurrent(0); setScore(0); setFinished(false); setOrder(shuffle(questions[0].events)); setSelected([]);
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
        <h4 className="mb-3">{t('minigame.order_events')}</h4>
        <form onSubmit={handleSubmit} className="mb-3">
          <ol className="list-group mb-3">
            {order.map((ev, idx) => (
              <li
                key={ev.event}
                className={`list-group-item ${selected.includes(idx) ? 'active' : ''}`}
                style={{ cursor: selected.includes(idx) ? 'not-allowed' : 'pointer' }}
                onClick={() => handleSelect(idx)}
              >
                {selected.includes(idx) ? `${selected.indexOf(idx) + 1}. ` : ''}{ev.event}
              </li>
            ))}
          </ol>
          <button className="btn minigame-btn btn-accent w-100" type="submit" disabled={selected.length !== order.length || feedback}>{t('minigame.check_answer')}</button>
        </form>
        {feedback && (
          <div className={`minigame-feedback badge ${feedback.includes(t('minigame.correct')) ? 'bg-success' : 'bg-danger'} mb-3`}>
            {feedback}
          </div>
        )}
        <div className="mb-2 text-secondary">{t('minigame.question', { current: current + 1, total: questions.length })}</div>
        <div className="mb-2">{t('minigame.score', { score, total: questions.length })}</div>
      </div>
    </div>
  );
};

export default OrderEvents; 