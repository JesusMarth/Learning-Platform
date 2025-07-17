// Barra de navegación principal de la plataforma
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      {/* Logo y nombre de la plataforma */}
      <Link className="navbar-brand" to="/">Aprende+</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {/* Enlaces de navegación */}
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Panel</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/games">Minijuegos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">Perfil</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar; 