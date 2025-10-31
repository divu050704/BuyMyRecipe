import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: "BuyMyRecipe",
    host_permissions: [
      "https://*.youtube.com/*",
       "https://plugin.progardenindia.com/*"
    ],
    permissions: [
    "webRequest",
    "storage",
    "tabs",
    "activeTab"
    ],
    web_accessible_resources: [
      {
        resources: ["pages/index.html"],
        matches: ["<all_urls>"],
      },
    ],
  }
});
