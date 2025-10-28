import { useState } from 'react';
import getRecipe from "./utils/getRecipe";

interface Ingredient {
  ingridientName: string;
  alternatives: string[];
  quantity: string;
}

interface RecipeData {
  success: boolean;
  message: string;
  received: string;
  analysis: {
    success: boolean;
    analysis: {
      summary: string;
      requiredIngridients: Ingredient[];
    };
  };
}

function App() {
  const [recipeData, setRecipeData] = useState<RecipeData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetRecipe = async () => {
    setLoading(true);
    try {
      const data = await getRecipe();
      console.log(data)
      setRecipeData(data as unknown as RecipeData);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-linear-to-br from-orange-50 to-amber-50 p-6 min-w-100'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-orange-800 mb-2'>Recipe Extractor</h1>
          <p className='text-gray-600'>Get detailed recipe information from video transcripts</p>
        </div>

        {!recipeData ? (
          <div className='flex justify-center items-center min-h-64'>
            <button 
              className='bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed' 
              onClick={handleGetRecipe}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Get Recipe'}
            </button>
          </div>
        ) : (
          <div className='bg-white rounded-xl shadow-xl overflow-hidden'>
            {/* Header */}
            {/* <div className='bg-linear-to-r from-orange-500 to-amber-500 p-6 text-white'>
              <h2 className='text-3xl font-bold mb-2'>Paneer Butter Masala</h2>
              <p className='text-orange-100'>By Ranveer Brar</p>
            </div> */}

            {/* Summary */}
            <div className='p-6 border-b border-gray-200'>
              <h3 className='text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2'>
                <span className='text-2xl'>📝</span> Recipe Summary
              </h3>
              <p className='text-gray-700 leading-relaxed'>{recipeData.analysis.analysis.summary}</p>
            </div>

            {/* Ingredients */}
            <div className='p-6'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                <span className='text-2xl'>🥘</span> Required Ingredients
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                {recipeData.analysis.analysis.requiredIngridients.map((ingredient: Ingredient, index: number) => (
                  <div 
                    key={index} 
                    className='bg-linear-to-r from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200 hover:shadow-md transition-shadow'
                  >
                    <div className='flex justify-between items-start'>
                      <span className='font-semibold text-gray-800'>{ingredient.ingridientName}</span>
                      <span className='text-orange-600 font-medium text-sm'>{ingredient.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className='bg-gray-50 p-4 text-center'>
              <button 
                className='text-orange-600 hover:text-orange-700 font-medium' 
                onClick={() => setRecipeData(null)}
              >
                ← Get Another Recipe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;