import {Section} from "../types/App"

export interface alternativeIngredients {
  name: string,
  speciality: string,
  quantity: string
}

export interface Ingredient {
  ingredientName: string;
  alternatives: alternativeIngredients[];
  quantity: string;
}

export interface Instructions {
  step: string,
  emoji: string
}

export interface RecipeData {
  success: boolean;
  summary: string;
  requiredIngredients: Ingredient[];
  instructions: Instructions[],
  message: string,
  recipeName: string

}

export interface HomeProps {
  handleingredient: (ingredient: string) => void;
  recipeData: RecipeData | null;
  loading: boolean;
  onGetRecipe: () => void;
}