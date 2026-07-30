(function () {
  const url = window.location.href;
  const isMediumDomain = /^https:\/\/([\w-]+\.)?medium\.com\//.test(url);
  const isArticle = isMediumDomain && !/\/\/([\w-]+\.)?medium\.com\/?$/.test(url);
  const isMediumPage = isArticle || document.querySelector(
    'meta[name="medium"], ' +
    'meta[property="al:android:app_name"][content="Medium"], ' +
    'meta[property="og:site_name"][content="Medium"]'
  );

  if (!isMediumPage) return;

  function injectButton() {
    const writeBtn = document.querySelector(
      'a[href="https://medium.com/new-story"], ' +
      'a[data-action="new-story"], ' +
      'a[href*="/new-story"]'
    );
    if (!writeBtn || document.getElementById("freedium-redirect-btn")) return;

    const btn = document.createElement("button");
    btn.id = "freedium-redirect-btn";
    btn.textContent = "Read on Freedium";
    Object.assign(btn.style, {
      background: "none",
      border: "none",
      color: "rgb(26, 137, 23)",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      fontFamily: "system-ui, sans-serif",
      padding: "0 12px",
      height: "100%",
      whiteSpace: "nowrap",
    });
    btn.addEventListener("mouseenter", () => (btn.style.opacity = "0.7"));
    btn.addEventListener("mouseleave", () => (btn.style.opacity = "1"));
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      chrome.runtime.sendMessage({
        action: "openFreedium",
        url: "https://freedium-mirror.cfd/" + window.location.href
      });
    });

    writeBtn.parentNode.insertBefore(btn, writeBtn);
  }

  injectButton();
  const observer = new MutationObserver(injectButton);
  observer.observe(document.body, { childList: true, subtree: true });
})();
