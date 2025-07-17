import React from 'react';

const Sidebar = () => (
  <aside className="d-none d-lg-block bg-light border-end vh-100 p-3" style={{width: '220px'}}>
    <h5>Menú</h5>
    <ul className="nav flex-column">
      <li className="nav-item"><a className="nav-link" href="/dashboard">Panel</a></li>
      <li className="nav-item"><a className="nav-link" href="/games">Minijuegos</a></li>
      <li className="nav-item"><a className="nav-link" href="/profile">Perfil</a></li>
    </ul>
  </aside>
);

export default Sidebar; 