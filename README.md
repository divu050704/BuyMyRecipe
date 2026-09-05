<div align="center">

# **BuyMyRecipe Chrome Extension**

<img src="./screenshots/Untitled design (2).png" alt="BuyMyRecipe Banner" />

[![Chrome Extension](https://img.shields.io/badge/Chrome_Extension-MV3-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![WXT](https://img.shields.io/badge/WXT-18181B?style=for-the-badge&logo=wxt&logoColor=white)](https://wxt.dev/)

</div>

---

## **Introduction**

**BuyMyRecipe** is an AI-powered browser extension that transforms how users extract, organize, and shop for recipes directly from YouTube video content. By leveraging Firebase AI Logic's Hybrid AI capabilities, BuyMyRecipe analyzes YouTube cooking videos to extract structured recipe overviews, step-by-step instructions, and exact ingredient lists. Designed with quick-commerce integration for Indian households, it allows users to instantly search for required ingredients on platforms like Blinkit and Zepto, while offering smart substitute suggestions suited for local markets.

This Chrome extension is built using the **Hybrid AI** feature offered by **Firebase AI Logic**.
It fetches details such as the **overview**, **instructions**, and **ingredients** from a YouTube video.

It also offers a feature for the **Indian audience** to find the best suitable ingredients available on **Blinkit** and **Zepto**, relevant to the recipe.

Users can **save recipes** for future reference and access them anytime by opening **“My Cookbook.”**

---

## **Features**

* **🤖 AI-Powered Recipe Extraction**: Automatically extracts overview summaries, step-by-step cooking instructions, and comprehensive ingredient lists directly from YouTube recipe videos using Firebase AI Logic (Hybrid AI).
* **🛒 Quick-Commerce Integration (Blinkit & Zepto)**: Seamlessly search and compare extracted ingredients on popular Indian quick-commerce delivery platforms like Blinkit and Zepto for instant ordering.
* **💡 Smart Ingredient Substitutes**: Recommends healthier, budget-friendly, and locally available Indian market alternatives for hard-to-find ingredients.
* **📖 Digital Cookbook ("My Cookbook")**: Save your favorite extracted recipes locally and access them anytime with full details, instructions, and ingredients.
* **⚡ Modern Tech Stack & UI**: Built with WXT Framework, React 19, TypeScript, and Tailwind CSS for a fast, responsive, and seamless extension user experience.

---

## **Installation**

The installation process can be achieved in three ways:

1. **Direct Installation**
2. **Development Build**
3. **Production Build**

---

### **1. Direct Installation**

1. Clone the repository

   ```bash
   git clone https://github.com/divu050704/BuyMyRecipe.git
   ```

2. Open `chrome://extensions` and load the unpacked extension from
   `.output/chrome-mv3`

---

### **2. Development Build**

1. Clone the repository

   ```bash
   git clone https://github.com/divu050704/BuyMyRecipe.git
   ```

2. Install dependencies

   ```bash
   npm i
   ```

3. Create a `.env` or `.env.development` file from the template `.env.template`

   ```env
   VITE_BACKEND_URL=https://plugin.progardenindia.com
   VITE_API_KEY=
   VITE_AUTH_DOMAIN=
   VITE_PROJECT_ID=
   VITE_STORAGE_BUCKET=
   VITE_MESSAGING_SENDER_ID=
   VITE_APP_ID=
   VITE_MEASUREMENT_ID=
   ```

4. Create the development build

   ```bash
   npm run dev
   ```

5. Open `chrome://extensions` and load the unpacked extension from
   `.output/chrome-mv3-dev`

---

### **3. Production Build**

1. Clone the repository

   ```bash
   git clone https://github.com/divu050704/BuyMyRecipe.git
   ```

2. Install dependencies

   ```bash
   npm i
   ```

3. Create a `.env` or `.env.production` file from the template `.env.template`

   ```env
   VITE_BACKEND_URL=https://plugin.progardenindia.com
   VITE_API_KEY=
   VITE_AUTH_DOMAIN=
   VITE_PROJECT_ID=
   VITE_STORAGE_BUCKET=
   VITE_MESSAGING_SENDER_ID=
   VITE_APP_ID=
   VITE_MEASUREMENT_ID=
   ```

4. Create the production build

   ```bash
   npm run build
   ```

5. Open `chrome://extensions` and load the unpacked extension from
   `.output/chrome-mv3`

---

## **How to Use**

* Open a YouTube video that contains a recipe.
* Click on the **BuyMyRecipe** extension to start the extraction process.

> **Note:** If the extension prompts you to enable captions, try toggling them off and then back on.

---

### **Screenshots**

![Step-by-step instructions generated from the recipe](./screenshots/1.png)
*Step-by-step instructions generated from the recipe.*

![Option to quickly search and compare products on Blinkit and Zepto](./screenshots/2.png)
*Option to quickly search and compare products on Blinkit and Zepto.*

![Ingredients used in the recipe](./screenshots/3.png)
*Ingredients used in the recipe.*

!["My Cookbook" page displaying saved recipes and their descriptions](./screenshots/4.png)
*"My Cookbook" page displaying saved recipes and their descriptions.*

![Alternative ingredients suggested by the model, based on easy availability in Indian markets (can also suggest cheaper and healthier options)](./screenshots/5.png)
*Alternative ingredients suggested by the model, based on easy availability in Indian markets (can also suggest cheaper and healthier options).*

[![Watch the video](https://img.youtube.com/vi/_V8wtZmMlNQ/0.jpg)](https://www.youtube.com/watch?v=_V8wtZmMlNQ)