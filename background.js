chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.action === "openFreedium") {
    chrome.tabs.create({ url: msg.url });
  }
});
