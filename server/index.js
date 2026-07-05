import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const recipes = [
  {
    id: 1,
    slug: "lemon-garlic-pasta",
    title: "Lemon garlic pasta",
    photo_url: "",
    prep_time_min: 10,
    cook_time_min: 15,
    servings: 2,
    tags: ["quick", "comfort food"],
    ingredients: [
      { name: "spaghetti", amount: 200, unit: "g" },
      { name: "garlic cloves", amount: 3 },
      { name: "lemon, zested and juiced", amount: 1 }
    ],
    steps: [
      { order: 1, text: "Boil the pasta until al dente." },
      { order: 2, text: "Sauté garlic in olive oil until fragrant." },
      { order: 3, text: "Toss pasta with garlic, lemon zest and juice." }
    ]
  }
];

app.get("/api/recipes", (req, res) => res.json(recipes));

app.get("/api/recipes/:slug", (req, res) => {
  const recipe = recipes.find(r => r.slug === req.params.slug);
  if (!recipe) return res.status(404).json({ error: "Not found" });
  res.json(recipe);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));