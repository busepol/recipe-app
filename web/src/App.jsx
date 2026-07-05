import React, { useState } from 'react';
import './index.css'; 

// Sophisticated Color Palette
const colors = {
  rose: '#D98A8A',    // Dusty Rose
  sage: '#8B9D77',    // Sage Olive
  ochre: '#D4A373',   // Muted Mustard
  terra: '#C06C5B',   // Terracotta
  slate: '#7A90A4',   // Slate Blue
  dark: '#2C2C2C',    // Dark Charcoal
};

const allRecipes = [
  { id: 1, title: 'Fırın Sütlaç', category: 'Tatlılar', color: colors.rose, time: '45 dk' },
  { id: 2, title: 'Süzme Haydari', category: 'Mezeler', color: colors.sage, time: '15 dk' },
  { id: 3, title: 'Zeytinyağlı Enginar', category: 'Zeytinyağlılar', color: colors.ochre, time: '40 dk' },
  { id: 4, title: 'Geleneksel Ali Nazik', category: 'Et Yemekleri', color: colors.terra, time: '60 dk' },
  { id: 5, title: 'Reyhan Şerbeti', category: 'İçecekler', color: colors.slate, time: '20 dk' },
  { id: 6, title: 'Cevizli Şekerpare', category: 'Tatlılar', color: colors.rose, time: '50 dk' },
  { id: 7, title: 'Tahinli Humus', category: 'Mezeler', color: colors.sage, time: '25 dk' },
];

const categories = [
  { id: 'Hepsi', color: colors.dark },
  { id: 'Tatlılar', color: colors.rose },
  { id: 'Mezeler', color: colors.sage },
  { id: 'Zeytinyağlılar', color: colors.ochre },
  { id: 'Et Yemekleri', color: colors.terra },
  { id: 'İçecekler', color: colors.slate },
];

function App() {
  const [activeCategory, setActiveCategory] = useState('Hepsi');

  const filteredRecipes = activeCategory === 'Hepsi' 
    ? allRecipes 
    : allRecipes.filter(r => r.category === activeCategory);

  return (
    <div className="app-container">
      
      {/* 1. ELEGANT FLOATING NAV BAR WITH NEW TITLE */}
      <nav className="elegant-nav">
        <a href="/" className="nav-logo">
          Tatlar Defteri
          <span className="logo-subtitle">Özlediğim ve unutmamam gereken lezzetler</span>
        </a>
        <ul className="nav-links">
          <li>Koleksiyon</li>
          <li>Hakkımda</li>
          <li>İletişim</li>
        </ul>
      </nav>

      {/* 2. TASTEFUL CATEGORY PILLS */}
      <div className="category-pills">
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <div 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`pill ${isActive ? 'active' : ''}`}
              style={{ 
                backgroundColor: isActive ? cat.color : 'transparent',
                borderColor: isActive ? cat.color : '#E5E0D8',
                color: isActive ? 'white' : '#666'
              }}
            >
              {cat.id}
            </div>
          );
        })}
      </div>

      {/* 3. ELEGANT RECIPE CARDS */}
      <div className="recipe-grid">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            
            <div 
              className="card-image-area" 
              style={{ backgroundColor: recipe.color }}
            ></div>
            
            <div className="card-content">
              <div 
                className="card-category-tag" 
                style={{ color: recipe.color }}
              >
                {recipe.category}
              </div>
              <h3 className="card-title">{recipe.title}</h3>
              
              <div className="card-footer">
                <span>✦ Hazırlama: {recipe.time}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
      
    </div>
  );
}

export default App;