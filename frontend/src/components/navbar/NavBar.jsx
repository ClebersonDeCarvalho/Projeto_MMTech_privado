import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="flex-space"></div>
        <button className="menu-toggle" onClick={toggleMenu}>
          &#9776;
        </button>
        <ul className={`navbar-nav ${isMenuOpen ? 'open' : ''}`}>
          {isLoggedIn ? (
            <>
              <NavLink to="/manual" className={({ isActive }) => (isActive ? 'active' : '')}>Manual</NavLink>
              <NavLink to="/criarTime" className={({ isActive }) => (isActive ? 'active' : '')}>Criar time</NavLink>
              <NavLink to="/adicionarMembros" className={({ isActive }) => (isActive ? 'active' : '')}>Adicionar membros</NavLink>
              <NavLink to="/gerenciarTimes" className={({ isActive }) => (isActive ? 'active' : '')}>Gerenciar times</NavLink>
              <NavLink to="/gerenciarMembros" className={({ isActive }) => (isActive ? 'active' : '')}>Gerenciar membros</NavLink>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
              <NavLink to="/cadastrar" className={({ isActive }) => (isActive ? 'active' : '')}>Cadastrar</NavLink>
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
