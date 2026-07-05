import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function RecipeDetail() {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/recipes/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(setRecipe)
      .catch(() => setError("We couldn't find that recipe. It might have been removed."));
  }, [slug]);

  if (error) {
    return (
      <div className="detail-shell">
        <Link to="/" className="back-link">&larr; Back to recipes</Link>
        <p className="state-message">{error}</p>
      </div>
    );
  }

  if (!recipe) {
    return <div className="detail-shell"><p className="state-message">Loading your recipe...</p></div>;
  }

  return (
    <div className="detail-shell">
      <Link to="/" className="back-link">&larr; Back to recipes</Link>

      <div className="detail-card">
        {recipe.tags?.[0] && <span className="margin-note">{recipe.tags[0]}</span>}
        <h1>{recipe.title}</h1>
        <div className="detail-meta">
          <span>{recipe.prep_time_min + recipe.cook_time_min} min · serves {recipe.servings}</span>
          {recipe.tags?.slice(1).map(tag => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>

        <hr className="detail-divider" />

        <div className="detail-grid">
          <div>
            <h2>Ingredients</h2>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>{ing.amount} {ing.unit || ""} {ing.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Steps</h2>
            <ol className="steps-list">
              {recipe.steps.map(step => <li key={step.order}>{step.text}</li>)}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;