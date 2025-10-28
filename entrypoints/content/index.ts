
export default defineContentScript({
  matches: [
    "https://www.youtube.com/*",
    "https://m.youtube.com/*"
  ],
  runAt: "document_end",
  main() {
    
  },
});
