import React, { useState } from 'react';

const RecipeDetail = ({ recipe, onBack }) => {
  // Hangi malzemelerin işaretlendiğini tutan state
  const [checkedItems, setCheckedItems] = useState({});

  const toggleIngredient = (index) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Subtle 3D tilt on the hero image, same holo-card language as the grid
  const handleTilt = (e) => {
    const wrap = e.currentTarget;
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -6;
    const rotateY = ((x / rect.width) - 0.5) * 6;
    wrap.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTilt = (e) => {
    e.currentTarget.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div className="detail-container">
      <button className="back-button" onClick={onBack}>
        ← Deftere Geri Dön
      </button>

      <h1 className="detail-title">{recipe.title}</h1>

      <span className="detail-tag" style={{ backgroundColor: recipe.color }}>
        {recipe.category}
      </span>

      {recipe.image && (
        <div
          className="detail-image-wrapper"
          style={{ marginTop: '25px' }}
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
        >
          <img src={recipe.image} alt={recipe.title} />
        </div>
      )}

      <div className="detail-grid">
        {/* SOL TARAF: İnteraktif Malzemeler */}
        <div>
          <h3 className="section-heading">malzemeler</h3>
          <ul className="ingredient-list">
            {recipe.ingredients?.map((ing, index) => (
              <li
                key={index}
                className={`ingredient-item ${checkedItems[index] ? 'checked' : ''}`}
                onClick={() => toggleIngredient(index)}
              >
                <div className="check-circle">{checkedItems[index] ? '✓' : ''}</div>
                {ing}
              </li>
            ))}
          </ul>
        </div>

        {/* SAĞ TARAF: Yapılışı */}
        <div className="instructions">
          <h3 className="section-heading">nasil_yapiyorum</h3>
          {recipe.instructions?.map((step, index) => (
            <div className="instruction-line" key={index}>
              <span className="instruction-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="instruction-text">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
