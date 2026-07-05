import React, { useState } from 'react';
import './index.css'; 
import RecipeDetail from './RecipeDetail';

// Muted, sophisticated "IDE Dark Theme" colors (No Neons!)
const colors = {
  rose: '#9E3E43',    // Muted Brick Red
  sage: '#4B6E59',    // Muted Forest Green
  ochre: '#B8863A',   // Dark Mustard
  terra: '#A65D37',   // Burnt Rust/Orange
  slate: '#4A6B8C',   // Muted Steel Blue
  dark: '#24272B',    // Soft Charcoal (for 'Hepsi' button)
};

const allRecipes = [
  { 
    id: 1, 
    title: 'Gerçek Fırın Sütlaç', 
    category: 'TATLILAR', 
    color: colors.rose,
    time: '45 dk',
    image: '/firinda-sutlac.png', 
    ingredients: [
      '1 litre süt',
      '1 çay bardağı pirinç',
      '1 su bardağı toz şeker',
      '2 yemek kaşığı buğday nişastası',
      '1 paket vanilya',
      'Yarım su bardağı su (nişastayı açmak için)'
    ],
    instructions: [
      'Pirinci yıkayıp 2 su bardağı su ile yumuşayana kadar haşlıyorum.',
      'Üzerine sütü ve vanilyayı ekleyip kaynamaya bırakıyorum.',
      'Kaynayan süte şekeri ilave edip iyice karıştırıyorum.',
      'Nişastayı yarım bardak suyla ezip yavaşça tencereye ekliyorum ve kıvam alana kadar pişiriyorum.',
      'Sütlacı güveç kaplarına paylaştırıp, fırın tepsisine diziyorum. Tepsinin yarısına kadar soğuk su ekleyip, 200 derece fırının sadece üst ızgarasında üstleri kızarana kadar pişiriyorum.'
    ]
  },
  { 
    id: 2, 
    title: 'Çakma Tiramisu :)', 
    category: 'TATLILAR', 
    color: colors.rose,
    time: '30 dk',
    image: '/cakma-tiramisu.png', 
    ingredients: [
      '1 litre süt',
      '3 yumurta sarısı',
      '1 su bardağı şeker',
      '1 su bardağı un',
      '1 paket vanilya',
      '250 gram labne',
      'Kakaolu hazır kek (alt taban için çok pratik oluyor)',
      'Şekerli sulu nescafe (keki ıslatmak için)',
      'Üzeri için: 1 çay kaşığı Türk kahvesi ve 1 çay kaşığı kakao karışımı (zevke göre değişir)'
    ],
    instructions: [
      'Bir borcama kakaolu keki yerleştiriyorum, eksik kalan yerleri kekleri parçalayarak dolduruyorum.',
      'Şekerli ve sulu bir nescafe yapıp keki güzelce ıslatıyorum.',
      'Bir tencereye 3 yumurta sarısı, şeker, süt, un ve vanilyanın hepsini koyup pişiriyorum. Çok ağır, yoğun bir krema elde ediliyor.',
      'Krema biraz soğuyunca 250 gram labneyi de içine atıp karıştırıyorum.',
      'Her şeyin tamamen soğumasını bekliyorum. Soğuyan sosu kekin üzerine döküyorum.',
      'Dolapta en az 4 saat bekletiyorum.',
      'Sabaha (veya servisten hemen önce) hazırladığım kahve-kakao tozunu üstüne atıyorum. Hazırrr! :)'
    ]
  },
  { id: 3, title: 'Süzme Haydari', category: 'MEZELER', color: colors.sage, time: '15 dk', image: '' },
  { id: 4, title: 'Zeytinyağlı Enginar', category: 'ZEYTİNYAĞLILAR', color: colors.ochre, time: '40 dk', image: '' },
];

const categories = [
  { id: 'HEPSİ', color: colors.dark },
  { id: 'TATLILAR', color: colors.rose },
  { id: 'MEZELER', color: colors.sage },
  { id: 'ZEYTİNYAĞLILAR', color: colors.ochre },
  { id: 'ET YEMEKLERİ', color: colors.terra },
  { id: 'İÇECEKLER', color: colors.slate },
];

const PixelMascot = () => (
  <div className="mascot-container">
    <svg viewBox="0 0 100 100" width="100" height="100">
      <rect x="10" y="15" width="80" height="65" fill="#3B4252" />
      <rect x="15" y="20" width="70" height="55" fill="#2E3440" />
      <rect x="30" y="35" width="8" height="8" fill="#88C0D0" className="pixel-eye" />
      <rect x="62" y="35" width="8" height="8" fill="#88C0D0" className="pixel-eye" />
      <rect x="45" y="55" width="10" height="4" fill="#A3BE8C" />
      <rect x="40" y="80" width="20" height="10" fill="#3B4252" />
      <rect x="25" y="90" width="50" height="5" fill="#3B4252" />
    </svg>
  </div>
);

function App() {
  const [activeCategory, setActiveCategory] = useState('HEPSİ');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filteredRecipes = activeCategory === 'HEPSİ' 
    ? allRecipes 
    : allRecipes.filter(r => r.category === activeCategory);

  return (
    <div className="app-container">
      <PixelMascot />
    
      <nav className="dark-nav">
        <a href="/" className="nav-logo" onClick={(e) => { 
          e.preventDefault(); 
          setSelectedRecipe(null); 
          setActiveCategory('HEPSİ'); // Resets to show all recipes
        }}>
          <h1 className="logo-title">TATLAR_DEFTERI</h1>
          <span className="logo-subtitle">// OZLEDIGIM LEZZETLER</span>
        </a>
        <ul className="nav-links">
          
          {/* 1. KOLEKSIYON: Now closes any open recipe AND resets the filter to 'HEPSİ' */}
          <li onClick={() => {
            setSelectedRecipe(null);
            setActiveCategory('HEPSİ');
          }}>KOLEKSIYON</li>

          {/* 2. HAKKIMDA & ILETISIM: Added temporary alerts so they "work" */}
          <li onClick={() => alert("Hakkımda sayfası yakında kodlanacak! 👾")}>HAKKIMDA</li>
          <li onClick={() => alert("İletişim sayfası yakında kodlanacak! 👾")}>ILETISIM</li>
          
        </ul>
      </nav>

      {selectedRecipe ? (
        <RecipeDetail 
          recipe={selectedRecipe} 
          onBack={() => setSelectedRecipe(null)} 
        />
      ) : (
        <>
          <div className="category-pills">
            {categories.map(cat => (
              <div 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`pill ${activeCategory === cat.id ? 'active' : ''}`}
                style={{
                  backgroundColor: activeCategory === cat.id ? cat.color : '#2B2F36',
                  borderColor: activeCategory === cat.id ? cat.color : '#4A505C',
                  color: activeCategory === cat.id ? '#F8F9FA' : '#A0AABF'
                }}
              >
                {cat.id}
              </div>
            ))}
          </div>

          <div className="recipe-grid">
            {filteredRecipes.map((recipe) => (
              <div 
                key={recipe.id} 
                className="recipe-card"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div 
                  className="card-image-area" 
                  style={{ 
                    backgroundColor: recipe.color,
                    backgroundImage: recipe.image ? `url(${recipe.image})` : 'none',
                  }}
                ></div>
                
                <div className="card-content">
                  <div 
                    className="card-category-tag" 
                    style={{ backgroundColor: recipe.color }}
                  >
                    {recipe.category}
                  </div>
                  <h3 className="card-title">{recipe.title}</h3>
                  
                  <div className="card-footer">
                    <span>✦ HAZIRLAMA: {recipe.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      
    </div>
  );
}

export default App;