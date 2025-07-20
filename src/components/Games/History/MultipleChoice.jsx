import React, { useState } from 'react';
import { usePoints } from '../../../context/PointsContext';
import { useNavigate } from 'react-router-dom';
import { useAchievements } from '../../../context/AchievementsContext';
import { useStatistics } from '../../../context/StatisticsContext';
import fondoBlurry from '../../../assets/Fondo_blurry.png';
import { useTranslation } from 'react-i18next';

const questionsES = [
  {
    q: '¿En qué año comenzó la Segunda Guerra Mundial?',
    options: ['1939', '1914', '1945', '1929'],
    answer: '1939',
  },
  {
    q: '¿Quién fue el primer presidente de Estados Unidos?',
    options: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'John Adams'],
    answer: 'George Washington',
  },
  {
    q: '¿Dónde se construyeron las pirámides de Giza?',
    options: ['Egipto', 'México', 'Perú', 'China'],
    answer: 'Egipto',
  },
  {
    q: '¿En qué año llegó el hombre a la Luna?',
    options: ['1969', '1959', '1979', '1989'],
    answer: '1969',
  },
  {
    q: '¿Quién pintó la Mona Lisa?',
    options: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Miguel Ángel'],
    answer: 'Leonardo da Vinci',
  },
  {
    q: '¿Cuál fue la civilización que inventó la escritura cuneiforme?',
    options: ['Sumerios', 'Egipcios', 'Griegos', 'Romanos'],
    answer: 'Sumerios',
  },
  {
    q: '¿En qué país se originaron los Juegos Olímpicos?',
    options: ['Grecia', 'Italia', 'Francia', 'Alemania'],
    answer: 'Grecia',
  },
  {
    q: '¿Quién fue el conquistador del Imperio Azteca?',
    options: ['Hernán Cortés', 'Francisco Pizarro', 'Simón Bolívar', 'Cristóbal Colón'],
    answer: 'Hernán Cortés',
  },
  {
    q: '¿Cuál es la capital del antiguo Imperio Bizantino?',
    options: ['Constantinopla', 'Roma', 'Atenas', 'París'],
    answer: 'Constantinopla',
  },
  {
    q: '¿Quién escribió "El Quijote"?',
    options: ['Miguel de Cervantes', 'Gabriel García Márquez', 'Lope de Vega', 'Federico García Lorca'],
    answer: 'Miguel de Cervantes',
  },
];

const questionsEN = [
  {
    q: 'In what year did World War II begin?',
    options: ['1939', '1914', '1945', '1929'],
    answer: '1939',
  },
  {
    q: 'Who was the first president of the United States?',
    options: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'John Adams'],
    answer: 'George Washington',
  },
  {
    q: 'Where were the pyramids of Giza built?',
    options: ['Egypt', 'Mexico', 'Peru', 'China'],
    answer: 'Egypt',
  },
  {
    q: 'In what year did man reach the Moon?',
    options: ['1969', '1959', '1979', '1989'],
    answer: '1969',
  },
  {
    q: 'Who painted the Mona Lisa?',
    options: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
    answer: 'Leonardo da Vinci',
  },
  {
    q: 'Which civilization invented cuneiform writing?',
    options: ['Sumerians', 'Egyptians', 'Greeks', 'Romans'],
    answer: 'Sumerians',
  },
  {
    q: 'In which country did the Olympic Games originate?',
    options: ['Greece', 'Italy', 'France', 'Germany'],
    answer: 'Greece',
  },
  {
    q: 'Who was the conqueror of the Aztec Empire?',
    options: ['Hernán Cortés', 'Francisco Pizarro', 'Simón Bolívar', 'Christopher Columbus'],
    answer: 'Hernán Cortés',
  },
  {
    q: 'What was the capital of the ancient Byzantine Empire?',
    options: ['Constantinople', 'Rome', 'Athens', 'Paris'],
    answer: 'Constantinople',
  },
  {
    q: 'Who wrote "Don Quixote"?',
    options: ['Miguel de Cervantes', 'Gabriel García Márquez', 'Lope de Vega', 'Federico García Lorca'],
    answer: 'Miguel de Cervantes',
  },
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
  const { t, i18n } = useTranslation();

  const questions = i18n.language === 'en' ? questionsEN : questionsES;

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
        <h4 className="mb-3">{t('minigame.select_correct_answer')}</h4>
        <h2 className="mb-4 fw-bold">{questions[current].q}</h2>
        <form onSubmit={handleSubmit} className="mb-3 d-flex flex-column gap-3 align-items-center">
          {questions[current].options.map(option => (
            <button
              type="button"
              key={option}
              className={`minigame-option-btn btn w-100 mb-2 ${selected === option ? 'selected' : ''}`}
              style={{
                maxWidth: 320,
                borderRadius: '1.2rem',
                border: selected === option ? '2px solid #8b5cf6' : '2px solid #e2e8f0',
                background: selected === option ? 'linear-gradient(135deg, #8b5cf6, #a855f7)' : 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                color: selected === option ? '#fff' : '#334155',
                fontWeight: 500,
                fontSize: 20,
                transition: 'all 0.2s',
                boxShadow: selected === option ? '0 4px 12px rgba(139, 92, 246, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
              }}
              onClick={() => setSelected(option)}
            >
              {option}
            </button>
          ))}
          <button className="btn minigame-btn btn-accent w-100" type="submit" disabled={!selected || feedback} style={{ maxWidth: 320, fontWeight: 700, fontSize: 20, borderRadius: '1.2rem' }}>{t('minigame.check')}</button>
        </form>
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

export default MultipleChoice; 