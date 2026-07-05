import React, { useState } from 'react';
import './index.css'; 
import RecipeDetail from './RecipeDetail'; // Detay sayfasını içeri alıyoruz

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
  { 
    id: 1, 
    title: 'Gerçek Fırın Sütlaç', 
    category: 'Tatlılar', 
    color: colors.rose,
    time: '45 dk',
    image: 'public/firinda-sutlac.png', 
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
    category: 'Tatlılar', 
    color: colors.rose,
    time: '30 dk',
    image: 'public/cakma-tiramisu.png', 
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
  
  { id: 3, title: 'Süzme Haydari', category: 'Mezeler', color: colors.sage, time: '15 dk' },
  { id: 4, title: 'Zeytinyağlı Enginar', category: 'Zeytinyağlılar', color: colors.ochre, time: '40 dk' },
  { id: 5, title: 'Ali Nazik Kebabı', category: 'Et Yemekleri', color: colors.terra, time: '60 dk' },
  { id: 6, title: 'Reyhan Şerbeti', category: 'İçecekler', color: colors.slate, time: '20 dk' },
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
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Hangi tarifin açık olduğunu tutar

  const filteredRecipes = activeCategory === 'Hepsi' 
    ? allRecipes 
    : allRecipes.filter(r => r.category === activeCategory);

  return (
    <div className="app-container">
      
      {/* 1. ELEGANT FLOATING NAV BAR WITH NEW TITLE (Burası her zaman üstte kalır) */}
      <nav className="elegant-nav">
        <a 
          href="/" 
          className="nav-logo" 
          onClick={(e) => {
            e.preventDefault(); 
            setSelectedRecipe(null); // Logoya tıklayınca ana sayfaya döner
          }}
        >
          Tatlar Defteri
          <span className="logo-subtitle">Özlediğim ve unutmamam gereken lezzetler</span>
        </a>
        <ul className="nav-links">
          <li onClick={() => setSelectedRecipe(null)}>Koleksiyon</li>
          <li>Hakkımda</li>
          <li>İletişim</li>
        </ul>
      </nav>

      {/* TARİF SEÇİLDİYSE DETAY SAYFASINI, SEÇİLMEDİYSE SENİN LİSTENİ GÖSTER */}
      {selectedRecipe ? (
        <RecipeDetail 
          recipe={selectedRecipe} 
          onBack={() => setSelectedRecipe(null)} 
        />
      ) : (
        <>
          {/* 2. TASTEFUL CATEGORY PILLS (Senin orijinal kodun) */}
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

          {/* 3. ELEGANT RECIPE CARDS (Senin orijinal kodun, tıklanabilirlik eklendi) */}
          <div className="recipe-grid">
            {filteredRecipes.map((recipe) => (
              <div 
                key={recipe.id} 
                className="recipe-card"
                onClick={() => setSelectedRecipe(recipe)} // Karta tıklayınca açılması için eklendi
              >
                
                <div 
                  className="card-image-area" 
                  style={{ 
                    backgroundColor: recipe.color,
                    backgroundImage: recipe.image ? `url(${recipe.image})` : 'none', // Resim varsa göster
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
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
        </>
      )}
      
    </div>
  );
}

export default App;