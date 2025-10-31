import { useState, useEffect } from 'react';
import Buy from "./pages/Buy";
import Home from "./pages/Home";
import { Section } from "./types/App";
import { RecipeData } from "./types/Home";
import getRecipe from "./utils/getRecipe";

export default function App() {
  const [sectionOpen, setSectionOpen] = useState<Section>("Home");
  const [ingredient, setIngredient] = useState("");
  const [recipeData, setRecipeData] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState(false);
  
  function handleSectionOpen(section: Section) {
    setSectionOpen(section);
  }
  
  function handleIngredient(ingredient: string) {
    setIngredient(ingredient);
    setSectionOpen("Buy");
  }

  const handleGetRecipe = async () => {
    setRecipeData(null)
    setLoading(true);
    const request = await browser.runtime.sendMessage({ type: "READ" })
    console.log(request)
    if (request.available){
      setRecipeData(request.data)
      return 
    }   
  
    try {
      const data = await getRecipe();
      setRecipeData(data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log([{ ingredient: ingredient, sectionOpen: sectionOpen }]);
  }, [ingredient, sectionOpen]);
  
  return sectionOpen === "Buy" && ingredient ? (
    <Buy 
      handleSectionOpen={() => handleSectionOpen("Home")} 
      ingredientName={ingredient} 
    />
  ) : (
    <Home 
      handleingredient={handleIngredient}
      recipeData={recipeData}
      loading={loading}
      onGetRecipe={handleGetRecipe}
    />
  );
}