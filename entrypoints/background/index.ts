import { fetchCaptions, cleanCaptions, analyseCaption } from "./captionHandling";

const seen = new Set<string>();
var caption = "";

export default defineBackground(() => {
  browser.webRequest.onBeforeRequest.addListener(
    (details) => {
      const url = details.url.split("&t=")[0];
      if (url.includes("www.youtube.com/api/timedtext")) {
        if (seen.has(url)) return {};
        seen.add(url);

        fetchCaptions(details.url)
          .then(res => res.json())
          .then(json => {
            const captionArray = json.events
            caption = cleanCaptions(captionArray)
            setTimeout(() => seen.delete(url), 1000000);
          })
          .catch(console.error);
      }
      return {};
    },
    { urls: ["*://www.youtube.com/api/timedtext*"] }
  );

  browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "START") {
      if (caption.trim().length === 0) {
        sendResponse({analysis: {success: false, message: "Try Enabling Captions"}})
      }
      else {
        analyseCaption(caption).then(captionAnalysis => {
          sendResponse({ analysis: captionAnalysis });
        }).catch(err => {
          sendResponse({ error: err.message });
        });
      }
      return true; // CRITICAL: Indicates async response
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
      return true; // again: indicate async sendResponse
    }
  });

});