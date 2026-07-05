import React from 'react';

const recipes = [
  { id: 1, title: 'Mercimek Çorbası', time: '30 dk', color: 'var(--accent-mint)' },
  { id: 2, title: 'Fırında Karnıyarık', time: '60 dk', color: 'var(--accent-peach)' },
  { id: 3, title: 'Anne Sütlacı', time: '45 dk', color: 'var(--accent-yellow)' },
];

const RecipeList = () => {
  return (
    <main>
      <section className="hero">
        <h1 className="main-title">Ne Pişirsem?</h1>
        <span className="handwritten-note">Bugün canın ne çekiyor...</span>
        
        <div className="cute-search">
          <input type="text" placeholder="Malzeme veya yemek adı yaz..." />
          <button>Tarif Bul</button>
        </div>
      </section>

      <section className="recipe-grid">
        {recipes.map((recipe) => (
          <article key={recipe.id} className="polaroid-card">
            <div className="tape"></div> {/* Real life element! */}
            <div className="polaroid-image" style={{ backgroundColor: recipe.color }}></div>
            <h3>{recipe.title}</h3>
            <div className="cute-tag">⏱ {recipe.time}</div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default RecipeList;