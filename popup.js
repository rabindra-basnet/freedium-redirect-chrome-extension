document.getElementById("open-freedium").addEventListener("click", (e) => {
  e.preventDefault();
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (tab?.url && tab.url.startsWith("https://medium.com/")) {
      chrome.tabs.create({ url: "https://freedium-mirror.cfd/" + tab.url });
    } else {
      alert("This only works on Medium article pages.");
    }
  });
});
