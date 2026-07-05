import React from 'react';

const Header = () => {
  return (
    <header className="cute-header">
      <a href="/" className="logo-container">
        <div className="logo-symbol">
          {/* Custom SVG Symbol: A cute cooking pot with steam */}
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path>
            <line x1="6" y1="17" x2="18" y2="17"></line>
            <path d="M10 2v2"></path>
            <path d="M14 2v2"></path>
          </svg>
        </div>
        <span className="logo-text">TarifSepeti</span>
      </a>
      
      <nav>
        <ul className="nav-links">
          <li><a href="/">Ana Sayfa</a></li>
          <li><a href="/categories">Kategoriler</a></li>
          <li><a href="/saved">Defterim</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;