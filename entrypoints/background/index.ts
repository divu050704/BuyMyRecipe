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

  // Option 1: Return true and use sendResponse
  browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "START"){
      analyseCaption(caption).then(captionAnalysis => {
        sendResponse({analysis: captionAnalysis});
      }).catch(err => {
        sendResponse({error: err.message});
      });
      return true; // CRITICAL: Indicates async response
    }
  });

});