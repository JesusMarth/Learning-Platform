import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ACHIEVEMENTS = [
  { id: 'first_game', name: '¡Primer juego!', desc: 'Completa tu primer minijuego.' },
  { id: '100_points', name: '100 puntos', desc: 'Alcanza 100 puntos.' },
  { id: '5_correct', name: 'Racha de 5', desc: 'Consigue 5 respuestas correctas seguidas.' },
  { id: '10_correct', name: 'Racha de 10', desc: 'Consigue 10 respuestas correctas seguidas.' },
  { id: 'all_areas', name: 'Explorador', desc: 'Juega al menos un minijuego en cada área.' },
  { id: '10_games', name: 'Jugador constante', desc: 'Juega 10 minijuegos.' },
  { id: 'perfect_game', name: '¡Perfecto!', desc: 'Termina un minijuego sin fallos.' },
  { id: 'first_fail', name: 'Aprendiendo del error', desc: 'Comete tu primer error en un minijuego.' },
  { id: '3_days_row', name: 'Constancia', desc: 'Juega 3 días seguidos (simulado).' },
  { id: 'hidden', name: 'Logro oculto', desc: 'Descubre el logro secreto.' },
  { id: 'first_avatar', name: '¡Nuevo look!', desc: 'Personaliza tu avatar por primera vez.' },
  { id: 'first_name_change', name: 'Identidad renovada', desc: 'Cambia tu nombre de usuario.' },
  { id: 'first_theme', name: 'Personalización', desc: 'Cambia el tema de la plataforma.' },
];

const AchievementsContext = createContext();
export const useAchievements = () => useContext(AchievementsContext);

export const AchievementsProvider = ({ children }) => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState([]); // [{id, unlockedAt}]
  const [unlockedQueue, setUnlockedQueue] = useState([]); // [{id, unlockedAt}]

  useEffect(() => {
    if (user) {
      const userAch = JSON.parse(localStorage.getItem('userAchievements') || '{}');
      setAchievements(userAch[user.email] || []);
    }
  }, [user]);

  const unlock = (id) => {
    if (!user) return false;
    const userAch = JSON.parse(localStorage.getItem('userAchievements') || '{}');
    const current = userAch[user.email] || [];
    if (!current.find(a => a.id === id)) {
      const unlocked = [...current, { id, unlockedAt: new Date().toISOString() }];
      userAch[user.email] = unlocked;
      localStorage.setItem('userAchievements', JSON.stringify(userAch));
      setAchievements(unlocked);
      setUnlockedQueue(queue => [...queue, { id, unlockedAt: new Date().toISOString() }]);
      return true;
    }
    return false;
  };

  const isUnlocked = (id) => achievements.some(a => a.id === id);

  const nextUnlocked = () => setUnlockedQueue(queue => queue.slice(1));
  const currentUnlocked = unlockedQueue.length > 0 ? unlockedQueue[0] : null;

  return (
    <AchievementsContext.Provider value={{ achievements, unlock, isUnlocked, ACHIEVEMENTS, currentUnlocked, nextUnlocked }}>
      {children}
    </AchievementsContext.Provider>
  );
}; 