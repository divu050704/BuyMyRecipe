# **BuyMyRecipe Chrome Extension**

This Chrome extension is built using the **Hybrid AI** feature offered by **Firebase AI Logic**.
It fetches details such as the **overview**, **instructions**, and **ingredients** from a YouTube video.

It also offers a feature for the **Indian audience** to find the best suitable ingredients available on **Blinkit** and **Zepto**, relevant to the recipe.

Users can **save recipes** for future reference and access them anytime by opening **“My Cookbook.”**

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