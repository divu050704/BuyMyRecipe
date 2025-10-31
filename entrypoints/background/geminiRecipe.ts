import { initializeApp } from 'firebase/app';
import { getAI, getGenerativeModel, GoogleAIBackend, Schema } from 'firebase/ai';

// Initialize Firebase (do this once in your app initialization)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};


const app = initializeApp(firebaseConfig);
const googleAI = getAI(app, { backend: new GoogleAIBackend() });

export default async function geminiRecipe(data: string) {
  try {

    // Step 1: Define the structured response schema using Firebase AI Logic Schema
    const jsonSchema = Schema.object({
      properties: {
        success: Schema.boolean({
          description: "Indicates if the analysis was successful, and the caption is of a recipe",
        }),
        message: Schema.string({
          description: "Message stating that process was a success, if not what was the issue"
        }),
        recipeName: Schema.string({
          description: "Name of the recipe that can be inferred from the captions"
        }),
        summary: Schema.string({
          description: "Summarized recipe with clear step-by-step instructions",
        }),
        requiredIngredients: Schema.array({
          description: "List of required ingredients with alternatives",
          items: Schema.object({
            properties: {
              ingredientName: Schema.string({
                description: "Name of the ingredient",
              }),
              quantity: Schema.string({
                description: "Quantity of the ingredient, if not specified give it yourself",
              }),
              alternatives: Schema.array({
                description: "Alternative ingredients and their details",
                items: Schema.object({
                  properties: {
                    name: Schema.string(),
                    speciality: Schema.enumString(
                      {
                        enum: ["HEALTHIER", "CHEAPER", "EASY TO FIND"],
                        description: "Reason for alternative",
                      }
                    ),
                    quantity: Schema.string(),
                  },
                }),
              }),
            },
          }),
        }),
        instructions: Schema.array({
          description: "Step-by-step cooking instructions",
          items: Schema.object({
            properties: {
              step: Schema.string(),
              emoji: Schema.string(),
            },
          }),
        }),
      },
    });

    // Step 2: Create model with hybrid fallback and structured output
    const model = getGenerativeModel(googleAI, {
      mode: 'prefer_on_device', // Uses Prompt API when available, falls back to cloud
      inCloudParams: {
        model: 'gemini-2.5-flash',
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: jsonSchema,
        },
      },
      onDeviceParams: {
        promptOptions: {
          responseConstraint: jsonSchema,
        },
      },
    });

    // Step 3: Build the system instruction prompt
    const systemInstruction = `You are provided with the captions of a YouTube video describing a cookie recipe.
You must extract and structure the following details:
1. Summarized Recipe: Complete recipe in markdown format (excluding heading tags).
2. Ingredients: List each ingredient with quantity and possible alternatives labeled as HEALTHIER, CHEAPER, or EASY TO FIND.
3. Instructions: Step-by-step cooking process with suitable emojis.

Return a valid JSON response.`;

    const prompt = `${systemInstruction}\n\nRecipe captions:\n${data}`;

    // Step 4: Generate content (use generateContent for structured output)
    const result = await model.generateContent(prompt);

    // Step 5: Parse the JSON response
    const responseText = result.response.text();
    const parsed = JSON.parse(responseText);
    console.log(parsed)
    // Step 6: Return the formatted output
    return { ...parsed };

  } catch (error) {
    console.error("Firebase AI Logic error:", error);

    return {success: false, message: "An error occurred"}
  
  }
}

// Optional: Check what mode is being used for debugging
export async function checkAIMode() {
  try {
    const model = getGenerativeModel(googleAI, { mode: 'prefer_on_device' });
    // You can add custom logging here to see if on-device or cloud is used
    console.log("Firebase AI Logic initialized with hybrid mode");
  } catch (error) {
    console.error("Failed to initialize AI:", error);
  }
}