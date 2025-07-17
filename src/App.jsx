import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Games from './pages/Games';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const App = () => (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/games" element={<Games />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);

export default App;
