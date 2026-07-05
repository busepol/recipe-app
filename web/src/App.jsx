import React, { useState, useMemo } from 'react';
import './index.css';
import RecipeDetail from './RecipeDetail';

// Monochrome-blue "terminal" palette -- every accent is a shade of blue
const colors = {
  ice: '#A9E2FF',    // pale ice-blue -> desserts
  teal: '#2FD6C9',   // blue-teal -> mezze
  deep: '#4C6FFF',   // indigo-blue -> olive-oil dishes
  steel: '#6B87A6',  // muted steel-blue -> meat dishes
  cyan: '#22D3EE',   // bright cyan -> drinks
  brand: '#3AA0FF',  // electric blue -> "all"
};

const allRecipes = [
  {
    id: 1,
    title: 'Gerçek Fırın Sütlaç',
    category: 'TATLILAR',
    color: colors.ice,
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
    color: colors.ice,
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
  { id: 3, title: 'Süzme Haydari', category: 'MEZELER', color: colors.teal, time: '15 dk', image: '' },
  { id: 4, title: 'Zeytinyağlı Enginar', category: 'ZEYTİNYAĞLILAR', color: colors.deep, time: '40 dk', image: '' },
];

const categories = [
  { id: 'HEPSİ', color: colors.brand },
  { id: 'TATLILAR', color: colors.ice },
  { id: 'MEZELER', color: colors.teal },
  { id: 'ZEYTİNYAĞLILAR', color: colors.deep },
  { id: 'ET YEMEKLERİ', color: colors.steel },
  { id: 'İÇECEKLER', color: colors.cyan },
];

// A small, original floating companion -- glowing orb with a sparkle trail.
// Not modeled on any specific character; just a quiet nod to that "cozy magic" vibe.
const SpiritCompanion = () => (
  <div className="mascot-container">
    <svg viewBox="0 0 100 100" width="92" height="92">
      <defs>
        <radialGradient id="spiritBody" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#EAF6FF" />
          <stop offset="55%" stopColor="#3AA0FF" />
          <stop offset="100%" stopColor="#153E75" />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="58" rx="30" ry="26" fill="url(#spiritBody)" />
      <ellipse cx="50" cy="34" rx="4" ry="10" fill="#153E75" opacity="0.7" />
      <circle cx="38" cy="56" r="4.5" fill="#05070d" className="spirit-eye" />
      <circle cx="62" cy="56" r="4.5" fill="#05070d" className="spirit-eye" />
      <path d="M42 68 Q50 74 58 68" stroke="#05070d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="20" cy="30" r="2.5" fill="#22D3EE" className="spirit-sparkle" />
      <circle cx="80" cy="20" r="2" fill="#A9E2FF" className="spirit-sparkle" style={{ animationDelay: '0.8s' }} />
      <circle cx="78" cy="70" r="1.8" fill="#2FD6C9" className="spirit-sparkle" style={{ animationDelay: '1.5s' }} />
    </svg>
  </div>
);

// Sakura petals drifting in the background -- quiet ambience, not a costume.
const Petals = () => {
  const petals = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 14,
        duration: 12 + Math.random() * 10,
      })),
    []
  );

  return (
    <>
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}vw`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </>
  );
};

function App() {
  const [activeCategory, setActiveCategory] = useState('HEPSİ');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filteredRecipes = activeCategory === 'HEPSİ'
    ? allRecipes
    : allRecipes.filter(r => r.category === activeCategory);

  // 3D holo-card tilt, driven by cursor position
  const handleTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -12;
    const rotateY = ((x / rect.width) - 0.5) * 12;
    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);
    card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
  };

  const resetTilt = (e) => {
    const card = e.currentTarget;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="app-container">
      <div className="bg-aurora" />
      <div className="bg-grid" />
      <Petals />
      <SpiritCompanion />

      <nav className="dark-nav enter" style={{ '--d': '0ms' }}>
        <a href="/" className="nav-logo" onClick={(e) => {
          e.preventDefault();
          setSelectedRecipe(null);
          setActiveCategory('HEPSİ');
        }}>
          <h1 className="logo-title">TATLAR_DEFTERI</h1>
          <span className="logo-subtitle">// ozledigim ve unutmamam gereken lezzetler</span>
        </a>
        <ul className="nav-links">
          <li onClick={() => {
            setSelectedRecipe(null);
            setActiveCategory('HEPSİ');
          }}>KOLEKSIYON</li>
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
          <div className="route-wrapper enter" style={{ '--d': '120ms' }}>
            <div className="category-pills">
              {categories.map((cat, i) => (
                <div
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`pill ${activeCategory === cat.id ? 'active' : ''}`}
                  style={{
                    backgroundColor: activeCategory === cat.id ? `${cat.color}22` : '#0c121c',
                    borderColor: activeCategory === cat.id ? cat.color : '#1c2b3d',
                    color: activeCategory === cat.id ? cat.color : '#7d8ba0',
                  }}
                >
                  {cat.id}
                </div>
              ))}
            </div>
          </div>

          <div className="recipe-grid">
            {filteredRecipes.map((recipe, i) => (
              <div
                key={recipe.id}
                className="recipe-card enter"
                style={{ '--glow': recipe.color, '--d': `${180 + i * 70}ms` }}
                onClick={() => setSelectedRecipe(recipe)}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
              >
                <div
                  className="card-image-area"
                  style={{
                    backgroundColor: recipe.image ? '#1a1a26' : recipe.color,
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
