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

  return (
    <div className="detail-container">
      <button className="back-button" onClick={onBack}>
        ← Deftere Geri Dön
      </button>

      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', marginBottom: '10px', color: '#2C2C2C' }}>
        {recipe.title}
      </h1>
      
      <span style={{ backgroundColor: recipe.color, color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
        {recipe.category}
      </span>

      <div className="detail-image-wrapper" style={{ marginTop: '25px' }}>
        {/* Placeholder fotoğraf. Kendi fotoğraflarını buraya ekleyebilirsin! */}
        <img src={recipe.image} alt={recipe.title} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', marginTop: '40px' }}>
        
        {/* SOL TARAF: İnteraktif Malzemeler */}
        <div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '20px' }}>Malzemeler</h3>
          <ul className="ingredient-list">
            {recipe.ingredients.map((ing, index) => (
              <li 
                key={index} 
                className={`ingredient-item ${checkedItems[index] ? 'checked' : ''}`}
                onClick={() => toggleIngredient(index)}
              >
                <div className="check-circle"></div>
                {ing}
              </li>
            ))}
          </ul>
        </div>

        {/* SAĞ TARAF: Yapılışı */}
        <div className="instructions">
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '20px' }}>Nasıl Yapıyorum?</h3>
          {recipe.instructions.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RecipeDetail;