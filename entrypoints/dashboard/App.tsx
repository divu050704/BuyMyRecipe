import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Play,
  BookMarked,
  Clock,
  ChefHat,
  ExternalLink,
  Loader2,
  ShoppingBag,
} from 'lucide-react';
import './style.css';

function App() {
  const [savedRecipes, setSavedRecipes] = useState<Record<string, Recipe>>({});
  const [selectedRecipeUrl, setSelectedRecipeUrl] = useState<string | null>(null);
  const [expandedIngredients, setExpandedIngredients] = useState<Set<number>>(new Set());
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showBuySection, setShowBuySection] = useState<boolean>(false);
  const [selectedIngredient, setSelectedIngredient] = useState<string>('');
  const [buyData, setBuyData] = useState<BuyData>({
    status: 'SUCCESS',
    products: {
      blinkit: [],
      zepto: [],
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  const loadingMessages = [
    'Searching 100,000+ products on Blinkit...',
    'Scanning Zepto inventory...',
    'Getting you the best deals...',
    'Comparing prices across platforms...',
    'Finding fresh ingredients...',
    'Almost there...',
  ];

  useEffect(() => {
    (async () => {
      const data = await browser.storage.local.get(null);
      setSavedRecipes(data);

      const firstUrl = Object.keys(data)[0];
      if (firstUrl) setSelectedRecipeUrl(firstUrl);
    })();
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    let messageIndex = 0;
    setLoadingMessage(loadingMessages[0]);

    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setLoadingMessage(loadingMessages[messageIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoading]);

  const selectedRecipe = selectedRecipeUrl ? savedRecipes[selectedRecipeUrl] : null;

  const toggleIngredient = (index: number) => {
    setExpandedIngredients((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) newSet.delete(index);
      else newSet.add(index);
      return newSet;
    });
  };

  const nextStep = () => {
    if (selectedRecipe && currentStep < selectedRecipe.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getVideoId = (url: string): string | null => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };

  const handleRecipeSelect = (url: string) => {
    setSelectedRecipeUrl(url);
    setCurrentStep(0);
    setExpandedIngredients(new Set());
    setShowBuySection(false);
  };

  const handleBuyIngredient = async (ingredientName: string) => {
    setSelectedIngredient(ingredientName);
    setShowBuySection(true);
    setIsLoading(true);

    try {
      const response = await browser.runtime.sendMessage({type: "INGREDIENTS", name: ingredientName})
      console.log(response)
      setBuyData(response)
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyClick = (link: string) => {
    console.log(link)
    window.open(link, '_blank');
  };

  const allProducts: Product[] = [
    ...buyData.products.blinkit.map((product) => ({
      ...product,
      platform: 'blinkit' as const,
    })),
    ...buyData.products.zepto.map((product) => ({
      ...product,
      platform: 'zepto' as const,
    })),
  ].sort((a, b) => {
    const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
    const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
    return priceA - priceB;
  });
  console.log(allProducts)
  if (Object.keys(savedRecipes).length === 0) {
    return (
      <div className='w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-8'>
        <div className='text-center'>
          <BookMarked size={64} className='text-slate-300 mx-auto mb-4' />
          <h2 className='text-2xl font-bold text-slate-700 mb-2'>No Saved Recipes</h2>
          <p className='text-slate-500'>Start saving recipes to see them here!</p>
        </div>
      </div>
    );
  }

  if (showBuySection) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Buy Ingredients</h2>
          <p className="text-sm opacity-90 truncate">
            Shopping for: {selectedIngredient}
          </p>
        </div>
        <button
          onClick={() => setShowBuySection(false)}
          className="p-2 rounded-full hover:bg-emerald-500 transition-all"
        >
          ✕
        </button>
      </div>

      {/* Products Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Loader2 size={56} className="text-emerald-600 animate-spin mb-4" />
            <p className="text-slate-700 font-semibold text-base mb-2">
              Finding the best options...
            </p>
            <p className="text-emerald-600 text-sm font-medium animate-pulse">
              {loadingMessage}
            </p>
          </div>
        ) : allProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag size={48} className="text-slate-300 mb-3" />
            <p className="text-slate-600 font-medium">No products found</p>
            <p className="text-slate-400 text-sm mt-1">
              Try searching for another ingredient
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {allProducts.map((product, idx) => (
              <div
                key={`${product.platform}-${idx}`}
                className="bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 hover:border-emerald-200 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <div className="p-4 flex gap-4">
                  {/* Product Image */}
                  <div className="shrink-0 w-20 h-20 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-slate-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start gap-2 mb-1">
                        <h3 className="flex-1 font-semibold text-slate-900 text-base leading-tight line-clamp-2">
                          {product.name}
                        </h3>
                        <div
                          className={`shrink-0 px-2 py-0.5 rounded text-xs font-bold ${
                            product.platform === 'blinkit'
                              ? 'bg-yellow-400 text-slate-900'
                              : 'bg-purple-600 text-white'
                          }`}
                        >
                          {product.platform.toUpperCase()}
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 font-medium">
                        {product.quantity}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-bold text-emerald-700">
                        {product.price}
                      </span>
                      <button
                        onClick={() => handleBuyClick(product.link)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-sm font-semibold transition-all shadow-sm hover:shadow-md active:scale-95"
                      >
                        <span>Buy</span>
                        <ExternalLink size={14} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
    );
  }

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      {/* Header */}
      <div className='bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-6 shadow-lg'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-3xl font-bold mb-2 flex items-center gap-3'>
            <ChefHat size={32} />
            BuyMyRecipe Dashboard
          </h1>
          <p className='text-emerald-100 text-sm opacity-90'>Your saved recipes collection</p>
        </div>
      </div>

      <div className='max-w-7xl mx-auto p-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Recipe Menu Sidebar */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden sticky top-6'>
              <div className='bg-gradient-to-r from-emerald-50 to-emerald-100 px-5 py-4 border-b border-emerald-200'>
                <h2 className='text-lg font-bold text-slate-800 flex items-center gap-2'>
                  <BookMarked size={20} className='text-emerald-600' />
                  Saved Recipes ({Object.keys(savedRecipes).length})
                </h2>
              </div>
              <div className='max-h-[calc(100vh-200px)] overflow-y-auto'>
                {Object.entries(savedRecipes).map(([url, recipe]) => (
                  <button
                    key={url}
                    onClick={() => handleRecipeSelect(url)}
                    className={`w-full text-left px-5 py-4 border-b border-slate-100 hover:bg-emerald-50 transition-all ${selectedRecipeUrl === url ? 'bg-emerald-50 border-l-4 border-l-emerald-600' : ''
                      }`}
                  >
                    <div className='font-semibold text-slate-900 mb-1 flex items-center gap-2'>
                      {selectedRecipeUrl === url && (
                        <div className='w-2 h-2 bg-emerald-600 rounded-full animate-pulse'></div>
                      )}
                      {recipe.recipeName}
                    </div>
                    <div className='text-xs text-slate-500 flex items-center gap-2 mt-1'>
                      <Clock size={12} />
                      {recipe.instructions?.length || 0} steps
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className='lg:col-span-2'>
            {selectedRecipe && (
              <div className='space-y-6'>
                {/* Video Player */}
                {selectedRecipeUrl && getVideoId(selectedRecipeUrl) && (
                  <div className='bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden'>
                    <div className='bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-3 flex items-center gap-2 text-white'>
                      <Play size={16} />
                      <span className='text-sm font-semibold'>Recipe Video</span>
                    </div>

                    <div className='flex flex-col items-center justify-center aspect-video bg-black text-white'>
                      <p className='text-sm mb-3 opacity-80'>Watch this recipe on YouTube</p>
                      <button
                        onClick={() => window.open(selectedRecipeUrl, '_blank')}
                        className='flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all'
                      >
                        <Play size={16} />
                        Open on YouTube
                      </button>
                    </div>
                  </div>
                )}


                {/* Recipe Title */}
                <div className='bg-white rounded-2xl shadow-lg border border-slate-200 p-6'>
                  <h2 className='text-3xl font-bold text-slate-900 mb-3'>{selectedRecipe.recipeName}</h2>
                  <p className='text-slate-600 leading-relaxed'>{selectedRecipe.summary}</p>
                </div>

                {/* Instructions Carousel */}
                {selectedRecipe.instructions && selectedRecipe.instructions.length > 0 && (
                  <div className='bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden'>
                    <div className='bg-gradient-to-r from-emerald-50 to-emerald-100 px-5 py-4 border-b border-emerald-200'>
                      <div className='flex items-center justify-between'>
                        <h3 className='text-lg font-bold text-slate-800 flex items-center gap-2'>
                          <svg className='w-5 h-5 text-emerald-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                          </svg>
                          Cooking Instructions
                        </h3>
                        <span className='text-sm text-emerald-600 font-bold bg-white px-3 py-1 rounded-full'>
                          {currentStep + 1}/{selectedRecipe.instructions.length}
                        </span>
                      </div>
                    </div>

                    <div className='p-6'>
                      <div className='relative'>
                        <div className='overflow-hidden rounded-2xl'>
                          <div
                            className='flex transition-transform duration-500 ease-out'
                            style={{ transform: `translateX(-${currentStep * 100}%)` }}
                          >
                            {selectedRecipe.instructions.map((instruction, index) => (
                              <div key={index} className='w-full shrink-0 px-2'>
                                <div className='bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 border-2 border-emerald-200 min-h-[200px] flex flex-col items-center justify-center text-center shadow-sm'>
                                  <div className='text-6xl mb-4 drop-shadow-sm'>{instruction.emoji}</div>
                                  <p className='text-base text-slate-800 leading-relaxed font-medium max-w-lg'>
                                    {instruction.step}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={prevStep}
                          disabled={currentStep === 0}
                          className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-3 rounded-full bg-white border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-lg'
                        >
                          <ChevronLeft size={20} className='text-emerald-700' strokeWidth={2.5} />
                        </button>

                        <button
                          onClick={nextStep}
                          disabled={currentStep === selectedRecipe.instructions.length - 1}
                          className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-3 rounded-full bg-white border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-lg'
                        >
                          <ChevronRight size={20} className='text-emerald-700' strokeWidth={2.5} />
                        </button>
                      </div>

                      <div className='flex justify-center gap-2 mt-6'>
                        {selectedRecipe.instructions.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentStep(index)}
                            className={`h-2 rounded-full transition-all ${index === currentStep
                                ? 'w-10 bg-emerald-600 shadow-sm'
                                : 'w-2 bg-slate-300 hover:bg-slate-400'
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Ingredients */}
                <div className='bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden'>
                  <div className='bg-gradient-to-r from-emerald-50 to-emerald-100 px-5 py-4 border-b border-emerald-200'>
                    <h3 className='text-lg font-bold text-slate-800 flex items-center gap-2'>
                      <svg className='w-5 h-5 text-emerald-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                      </svg>
                      Ingredients ({selectedRecipe.requiredIngredients?.length || 0})
                    </h3>
                  </div>

                  <div className='p-5'>
                    <div className='grid gap-3'>
                      {selectedRecipe.requiredIngredients?.map((ingredient, index) => (
                        <div
                          key={index}
                          className='bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 hover:border-emerald-200 hover:shadow-md transition-all duration-200'
                        >
                          <div className='p-4'>
                            <div className='flex items-center gap-3'>
                              <div className='flex-1 min-w-0'>
                                <div className='font-semibold text-slate-900 text-base truncate'>
                                  {ingredient.ingredientName}
                                </div>
                                <div className='text-sm text-slate-500 mt-1 font-medium'>
                                  {ingredient.quantity}
                                </div>
                              </div>

                              <button
                                onClick={() => handleBuyIngredient(ingredient.ingredientName)}
                                className='shrink-0 p-3 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 active:scale-95 transition-all shadow-md hover:shadow-lg'
                                title={`Buy ${ingredient.ingredientName}`}
                              >
                                <ShoppingCart size={16} className='text-white' strokeWidth={2.5} />
                              </button>
                            </div>

                            {ingredient.alternatives?.length > 0 && (
                              <button
                                onClick={() => toggleIngredient(index)}
                                className='flex items-center gap-1 text-emerald-700 hover:text-emerald-800 text-sm font-medium mt-3 transition-colors'
                              >
                                <span>
                                  {ingredient.alternatives.length} alternative{ingredient.alternatives.length > 1 ? 's' : ''}
                                </span>
                                {expandedIngredients.has(index) ? (
                                  <ChevronUp size={14} strokeWidth={2.5} />
                                ) : (
                                  <ChevronDown size={14} strokeWidth={2.5} />
                                )}
                              </button>
                            )}
                          </div>

                          {ingredient.alternatives?.length > 0 && expandedIngredients.has(index) && (
                            <div className='border-t border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-4'>
                              <div className='space-y-2'>
                                {ingredient.alternatives.map((alt, altIndex) => (
                                  <div
                                    key={altIndex}
                                    className='p-3 bg-white rounded-lg border border-slate-200 hover:border-emerald-200 hover:shadow-sm transition-all'
                                  >
                                    <div className='flex items-center gap-3'>
                                      <div className='flex-1 min-w-0'>
                                        <div className='font-semibold text-slate-900 text-sm truncate'>
                                          {alt.name}
                                        </div>
                                        <div className='flex items-center gap-2 mt-1'>
                                          <span className='text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded-full font-medium'>
                                            {alt.speciality}
                                          </span>
                                          <span className='text-xs text-slate-500 font-medium'>
                                            {alt.quantity}
                                          </span>
                                        </div>
                                      </div>
                                      <button
                                        onClick={() => handleBuyIngredient(alt.name)}
                                        className='shrink-0 p-2.5 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 active:scale-95 transition-all shadow-sm hover:shadow-md'
                                        title={`Buy ${alt.name}`}
                                      >
                                        <ShoppingCart size={14} className='text-white' strokeWidth={2.5} />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}