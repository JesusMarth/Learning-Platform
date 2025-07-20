import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Games from './pages/Games';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/Common/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { PointsProvider } from './context/PointsContext';
import { AchievementsProvider } from './context/AchievementsContext';
import GamesLanguages from './pages/GamesLanguages';
import GamesEnglish from './pages/GamesEnglish';
import DirectTranslation from './components/Games/Language/DirectTranslation';
import MultipleChoice from './components/Games/Language/MultipleChoice';
import LetterOrder from './components/Games/Language/LetterOrder';
import GamesMath from './pages/GamesMath';
import BasicOperations from './components/Games/Math/BasicOperations';
import FillResult from './components/Games/Math/FillResult';
import Sequences from './components/Games/Math/Sequences';
import GamesHistory from './pages/GamesHistory';
import TrueFalse from './components/Games/History/TrueFalse';
import HistoryMultipleChoice from './components/Games/History/MultipleChoice';
import OrderEvents from './components/Games/History/OrderEvents';
import AchievementUnlockedModal from './components/Profile/AchievementUnlockedModal';
import { StatisticsProvider } from './context/StatisticsContext';

const App = () => (
  <AuthProvider>
    <PointsProvider>
      <AchievementsProvider>
        <StatisticsProvider>
          <Router>
            <div className="d-flex flex-column min-vh-100">
              <Navbar />
              <main className="flex-fill d-flex w-100">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/games" element={<ProtectedRoute><Games /></ProtectedRoute>} />
                  <Route path="/games/languages" element={<ProtectedRoute><GamesLanguages /></ProtectedRoute>} />
                  <Route path="/games/languages/english" element={<ProtectedRoute><GamesEnglish /></ProtectedRoute>} />
                  <Route path="/games/languages/english/translate" element={<ProtectedRoute><DirectTranslation /></ProtectedRoute>} />
                  <Route path="/games/languages/english/multiple-choice" element={<ProtectedRoute><MultipleChoice /></ProtectedRoute>} />
                  <Route path="/games/languages/english/letter-order" element={<ProtectedRoute><LetterOrder /></ProtectedRoute>} />
                  <Route path="/games/math" element={<ProtectedRoute><GamesMath /></ProtectedRoute>} />
                  <Route path="/games/math/basic-operations" element={<ProtectedRoute><BasicOperations /></ProtectedRoute>} />
                  <Route path="/games/math/fill-result" element={<ProtectedRoute><FillResult /></ProtectedRoute>} />
                  <Route path="/games/math/sequences" element={<ProtectedRoute><Sequences /></ProtectedRoute>} />
                  <Route path="/games/history" element={<ProtectedRoute><GamesHistory /></ProtectedRoute>} />
                  <Route path="/games/history/true-false" element={<ProtectedRoute><TrueFalse /></ProtectedRoute>} />
                  <Route path="/games/history/multiple-choice" element={<ProtectedRoute><HistoryMultipleChoice /></ProtectedRoute>} />
                  <Route path="/games/history/order-events" element={<ProtectedRoute><OrderEvents /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <AchievementUnlockedModal />
              </main>
              <Footer />
            </div>
          </Router>
        </StatisticsProvider>
      </AchievementsProvider>
    </PointsProvider>
  </AuthProvider>
);

export default App;
