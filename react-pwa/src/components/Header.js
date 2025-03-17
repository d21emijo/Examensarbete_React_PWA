import React, { useState, useEffect } from 'react';
import './Header.css'; 
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Tillstånd för att kontrollera om menyn är öppen

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Byt mellan öppen/stängd meny

    
  };

  
  return (
    <header className="header">
      <h1>My E-commerce Store</h1>

      {/* Hamburgermenyikon */}
      <div className="hamburger-icon" onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
      </div>

      {/* Navigeringsmeny*/}
      <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#shop">Shop</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
