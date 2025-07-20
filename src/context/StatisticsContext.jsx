import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const defaultStats = {
  totalGames: 0,
  totalQuestions: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  maxStreak: 0,
  areaGames: { languages: 0, math: 0, history: 0 },
  areaQuestions: { languages: 0, math: 0, history: 0 },
  registrationDate: null,
};

const StatisticsContext = createContext();
export const useStatistics = () => useContext(StatisticsContext);

export const StatisticsProvider = ({ children }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState(defaultStats);

  // Cargar estadísticas al iniciar sesión
  useEffect(() => {
    if (user) {
      const allStats = JSON.parse(localStorage.getItem('userStatistics') || '{}');
      let userStats = allStats[user.email];
      if (!userStats) {
        userStats = { ...defaultStats, registrationDate: new Date().toISOString() };
        allStats[user.email] = userStats;
        localStorage.setItem('userStatistics', JSON.stringify(allStats));
      }
      setStats(userStats);
    }
  }, [user]);

  // Guardar estadísticas
  const saveStats = (newStats) => {
    if (!user) return;
    const allStats = JSON.parse(localStorage.getItem('userStatistics') || '{}');
    allStats[user.email] = newStats;
    localStorage.setItem('userStatistics', JSON.stringify(allStats));
    setStats(newStats);
  };

  // Métodos para actualizar estadísticas
  const addGame = (area, questions, correct, wrong, streak) => {
    const newStats = { ...stats };
    newStats.totalGames += 1;
    newStats.totalQuestions += questions;
    newStats.correctAnswers += correct;
    newStats.wrongAnswers += wrong;
    newStats.maxStreak = Math.max(newStats.maxStreak, streak);
    if (area && newStats.areaGames[area] !== undefined) {
      newStats.areaGames[area] += 1;
      newStats.areaQuestions[area] += questions;
    }
    saveStats(newStats);
  };

  const addAnswer = (area, correct) => {
    const newStats = { ...stats };
    newStats.totalQuestions += 1;
    if (correct) newStats.correctAnswers += 1;
    else newStats.wrongAnswers += 1;
    if (area && newStats.areaQuestions[area] !== undefined) {
      newStats.areaQuestions[area] += 1;
    }
    saveStats(newStats);
  };

  const updateMaxStreak = (streak) => {
    if (streak > stats.maxStreak) {
      const newStats = { ...stats, maxStreak: streak };
      saveStats(newStats);
    }
  };

  return (
    <StatisticsContext.Provider value={{ stats, addGame, addAnswer, updateMaxStreak }}>
      {children}
    </StatisticsContext.Provider>
  );
}; 