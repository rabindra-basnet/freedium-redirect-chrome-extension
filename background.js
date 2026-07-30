chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "openFreedium") {
    chrome.tabs.create({ url: msg.url, index: sender.tab.index + 1 });
    sendResponse({ success: true });
    return true;
  }
});
