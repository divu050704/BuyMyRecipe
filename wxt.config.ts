import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: "BuyMyRecipe",
    host_permissions: [
      "https://*.youtube.com/*",
    ],
    permissions: [
    "webRequest"
  ],
  }
});
