interface Alternative {
  name: string;
  speciality: string;
  quantity: string;
}

interface Ingredient {
  ingredientName: string;
  quantity: string;
  alternatives: Alternative[];
}

interface Instruction {
  emoji: string;
  step: string;
}

interface Recipe {
  recipeName: string;
  summary: string;
  instructions: Instruction[];
  requiredIngredients: Ingredient[];
}

interface Product {
  index: number;
  name: string;
  image: string | null;
  price: string;
  quantity: string;
  link: string;
  platform: 'blinkit' | 'zepto';
}

interface BuyData {
  status: string;
  products: {
    blinkit: Product[];
    zepto: Product[];
  };
}

