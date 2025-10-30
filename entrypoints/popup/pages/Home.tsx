import { useState } from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Eye, EyeOff, ShoppingCart, AlertCircle } from 'lucide-react';
import { HomeProps, RecipeData, Ingredient, Instructions } from '../types/Home';

function Home({ handleingredient, recipeData, loading, onGetRecipe }: HomeProps) {
  const [expandedIngredients, setExpandedIngredients] = useState<Set<number>>(new Set());
  const [currentStep, setCurrentStep] = useState(0);
  const [showOverview, setShowOverview] = useState(false);

  const toggleIngredient = (index: number) => {
    setExpandedIngredients(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleBuyIntent = (ingredientName: string) => {
    handleingredient(ingredientName);
  };

  const nextStep = () => {
    if (recipeData && currentStep < recipeData.instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className='w-96 h-[600px] bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col'>
      {/* Header */}
      <div className='bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-5 py-6 shrink-0 shadow-lg'>
        <h1 className='text-lg font-bold mb-1'>Recipe Extractor</h1>
        <p className='text-emerald-100 text-xs opacity-90'>Extract recipes from video transcripts</p>
      </div>

      {!recipeData ? (
        <div className='flex-1 flex justify-center items-center p-6'>
          <button
            className='bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed w-full'
            onClick={onGetRecipe}
            disabled={loading}
          >
            {loading ? (
              <span className='flex items-center justify-center gap-2'>
                <span className='inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
                Processing transcript
              </span>
            ) : (
              'Extract Recipe'
            )}
          </button>
        </div>
      ) : recipeData.success === false ? (
        <div className='flex-1 flex justify-center items-center p-6'>
          <div className='bg-red-50 border-2 border-red-200 rounded-xl p-6 w-full'>
            <div className='flex items-start gap-3'>
              <AlertCircle className='text-red-600 shrink-0 mt-0.5' size={20} strokeWidth={2.5} />
              <div className='flex-1'>
                <h3 className='text-sm font-bold text-red-900 mb-1'>Error</h3>
                <p className='text-sm text-red-700 leading-relaxed'>
                  {recipeData.message}
                </p>
              </div>
            </div>
            <button
              onClick={onGetRecipe}
              className='mt-4 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-all active:scale-95'
            >
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <div className='flex-1 overflow-y-auto'>
          {/* Instructions Carousel */}
          {recipeData.instructions && recipeData.instructions.length > 0 && (
            <div className='bg-white border-b border-slate-200 shadow-sm'>
              <div className='px-4 py-4'>
                <div className='flex items-center justify-between mb-3'>
                  <h3 className='text-sm font-bold text-slate-800 flex items-center gap-2'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                    </svg>
                    Instructions
                  </h3>
                  <span className='text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-full'>
                    {currentStep + 1}/{recipeData.instructions.length}
                  </span>
                </div>

                <div className='relative'>
                  <div className='overflow-hidden rounded-xl'>
                    <div
                      className='flex transition-transform duration-500 ease-out'
                      style={{ transform: `translateX(-${currentStep * 100}%)` }}
                    >
                      {recipeData.instructions.map((instruction, index) => (
                        <div
                          key={index}
                          className='w-full shrink-0 px-1'
                        >
                          <div className='bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-5 border border-emerald-200 min-h-[140px] flex flex-col items-center justify-center text-center shadow-sm'>
                            <div className='text-4xl mb-3 drop-shadow-sm'>{instruction.emoji}</div>
                            <p className='text-sm text-slate-800 leading-relaxed font-medium'>
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
                    className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 p-2 rounded-full bg-white border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-md'
                  >
                    <ChevronLeft size={16} className='text-emerald-700' strokeWidth={2.5} />
                  </button>

                  <button
                    onClick={nextStep}
                    disabled={currentStep === recipeData.instructions.length - 1}
                    className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 p-2 rounded-full bg-white border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-md'
                  >
                    <ChevronRight size={16} className='text-emerald-700' strokeWidth={2.5} />
                  </button>
                </div>

                {/* Step dots */}
                <div className='flex justify-center gap-2 mt-4'>
                  {recipeData.instructions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`h-1.5 rounded-full transition-all ${
                        index === currentStep
                          ? 'w-8 bg-emerald-600 shadow-sm'
                          : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Overview - Collapsible */}
          <div className='border-b border-slate-200 bg-white shadow-sm'>
            <button
              onClick={() => setShowOverview(!showOverview)}
              className='w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors group'
            >
              <h3 className='text-sm font-bold text-slate-800 flex items-center gap-2'>
                {showOverview ? (
                  <EyeOff size={14} className='text-emerald-600' />
                ) : (
                  <Eye size={14} className='text-emerald-600' />
                )}
                Overview
              </h3>
              {showOverview ? (
                <ChevronUp size={18} className='text-slate-400 group-hover:text-slate-600' />
              ) : (
                <ChevronDown size={18} className='text-slate-400 group-hover:text-slate-600' />
              )}
            </button>

            {showOverview && (
              <div className='px-4 pb-4 bg-slate-50'>
                <div className="prose prose-sm prose-slate max-w-none text-slate-700 leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {recipeData.summary}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>

          {/* Ingredients */}
          <div className='bg-white shadow-sm'>
            <div className='p-4'>
              <h3 className='text-sm font-bold text-slate-800 mb-3 flex items-center gap-2'>
                <svg className='w-4 h-4 text-emerald-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                </svg>
                Ingredients
              </h3>

              <div className='space-y-2'>
                {recipeData.requiredIngredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className='bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 hover:border-emerald-200 hover:shadow-md transition-all duration-200'
                  >
                    {/* Main ingredient row */}
                    <div className='p-3'>
                      <div className='flex items-center gap-3'>
                        <div className='flex-1 min-w-0'>
                          <div className='font-semibold text-slate-900 text-sm truncate'>
                            {ingredient.ingredientName}
                          </div>
                          <div className='text-xs text-slate-500 mt-0.5 font-medium'>
                            {ingredient.quantity}
                          </div>
                        </div>

                        <button
                          onClick={() => handleBuyIntent(ingredient.ingredientName)}
                          className='shrink-0 p-2.5 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 active:scale-95 transition-all shadow-md hover:shadow-lg'
                          title={`Buy ${ingredient.ingredientName}`}
                        >
                          <ShoppingCart size={14} className='text-white' strokeWidth={2.5} />
                        </button>
                      </div>

                      {/* Alternatives toggle */}
                      {ingredient.alternatives.length > 0 && (
                        <button
                          onClick={() => toggleIngredient(index)}
                          className='flex items-center gap-1 text-emerald-700 hover:text-emerald-800 text-xs font-medium mt-2 transition-colors'
                        >
                          <span>
                            {ingredient.alternatives.length} alternative{ingredient.alternatives.length > 1 ? 's' : ''}
                          </span>
                          {expandedIngredients.has(index) ? (
                            <ChevronUp size={12} strokeWidth={2.5} />
                          ) : (
                            <ChevronDown size={12} strokeWidth={2.5} />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Alternatives dropdown */}
                    {ingredient.alternatives.length > 0 && expandedIngredients.has(index) && (
                      <div className='border-t border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-3'>
                        <div className='space-y-2'>
                          {ingredient.alternatives.map((alt, altIndex) => (
                            <div
                              key={altIndex}
                              className='p-2.5 bg-white rounded-lg border border-slate-200 hover:border-emerald-200 hover:shadow-sm transition-all'
                            >
                              <div className='flex items-center gap-2'>
                                <div className='flex-1 min-w-0'>
                                  <div className='font-semibold text-slate-900 text-xs truncate'>
                                    {alt.name}
                                  </div>
                                  <div className='flex items-center gap-2 mt-1'>
                                    <span className='text-[10px] px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full font-medium'>
                                      {alt.speciality}
                                    </span>
                                    <span className='text-xs text-slate-500 font-medium'>
                                      {alt.quantity}
                                    </span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleBuyIntent(alt.name)}
                                  className='shrink-0 p-2 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 active:scale-95 transition-all shadow-sm hover:shadow-md'
                                  title={`Buy ${alt.name}`}
                                >
                                  <ShoppingCart size={12} className='text-white' strokeWidth={2.5} />
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
  );
}

export default Home;