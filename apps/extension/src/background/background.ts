console.log("🚀 Background Loaded");

chrome.runtime.onInstalled.addListener(() => {
  console.log("Mini Apty Installed 🚀");
});

chrome.runtime.onMessage.addListener((message) => {
  console.log("Background received:", message);
});

export {};