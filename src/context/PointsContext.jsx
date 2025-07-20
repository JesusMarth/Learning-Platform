import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const PointsContext = createContext();
export const usePoints = () => useContext(PointsContext);

export const PointsProvider = ({ children }) => {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (user) {
      const userPoints = JSON.parse(localStorage.getItem('userPoints') || '{}');
      setPoints(userPoints[user.email] || 0);
    }
  }, [user]);

  const addPoints = (amount) => {
    if (!user) return;
    const userPoints = JSON.parse(localStorage.getItem('userPoints') || '{}');
    const newPoints = (userPoints[user.email] || 0) + amount;
    userPoints[user.email] = newPoints;
    localStorage.setItem('userPoints', JSON.stringify(userPoints));
    setPoints(newPoints);
  };

  const resetPoints = () => {
    if (!user) return;
    const userPoints = JSON.parse(localStorage.getItem('userPoints') || '{}');
    userPoints[user.email] = 0;
    localStorage.setItem('userPoints', JSON.stringify(userPoints));
    setPoints(0);
  };

  return (
    <PointsContext.Provider value={{ points, addPoints, resetPoints }}>
      {children}
    </PointsContext.Provider>
  );
}; 