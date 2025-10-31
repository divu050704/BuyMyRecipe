import { Chrome } from "lucide-react";
import { fetchCaptions, cleanCaptions } from "./captionHandling";
import geminiRecipe from "./geminiRecipe";

const seen = new Set<string>();
let caption = "";

export default defineBackground(() => {
  // Capture YouTube caption requests

  browser.webRequest.onBeforeRequest.addListener(
    (details) => {
      const url = details.url.split("&t=")[0];
      if (url.includes("www.youtube.com/api/timedtext")) {
        if (seen.has(url)) return {};
        seen.add(url);

        fetchCaptions(details.url)
          .then((res) => res.json())
          .then((json) => {
            const captionArray = json.events;
            caption = cleanCaptions(captionArray);
            setTimeout(() => seen.delete(url), 1000000);
          })
          .catch(console.error);
      }
      return {};
    },
    { urls: ["*://www.youtube.com/api/timedtext*"] }
  );

  // Handle messages from popup or content script
  browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "START") {
      if (caption.trim().length === 0) {
        sendResponse({ analysis: { success: false, message: "Try Enabling Captions" } });
      } else {
        geminiRecipe(caption)
          .then((captionAnalysis: any) => {
            sendResponse({ analysis: captionAnalysis });
          })
          .catch((err: Error) => {
            sendResponse({ error: err.message });
          });
      }
      return true; // async response
    }

    if (msg.type === "INGREDIENTS") {
      (async () => {
        try {
          const backendUrl = import.meta.env.VITE_BACKEND_URL;
          const res = await fetch(`${backendUrl}/api/search-ingredient?ingredient=${msg.name}`);
          const data = await res.json();
          sendResponse(data);
        } catch (err: any) {
          sendResponse({ error: err.message });
        }
      })();
      return true; // async response
    }


    if (msg.type === "SAVE") {
      browser.tabs.query({ active: true, currentWindow: true })
        .then(async ([tab]) => {
          if (tab && tab.url) {
            // Store with URL as the key
            await browser.storage.local.set({ [tab.url]: msg.recipeData });
            sendResponse({ saved: true });
          } else {
            console.error("No active tab or URL unavailable");
            sendResponse({ saved: false });
          }
        })
        .catch(error => {
          console.error("Error saving:", error);
          sendResponse({ saved: false, error: error.message });
        });

      return true; // Keep message channel open
    }

    if (msg.type === "READ") {
      browser.tabs.query({ active: true, currentWindow: true })
        .then(async ([tab]) => {
          if (tab && tab.url) {
            const storage = await browser.storage.local.get(tab.url);

            // Check if the key exists in storage
            if (storage[tab.url]) {
              sendResponse({ data: storage[tab.url], available: true });
            } else {
              sendResponse({ available: false });
            }
          } else {
            sendResponse({ saved: false });
            console.error("No active tab or URL unavailable");
          }
        })
        .catch(error => {
          console.error("Error:", error);
          sendResponse({ error: error.message });
        });

      return true; // Keep message channel open for async response
    }
  });
});
