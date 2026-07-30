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
      display: "inline-flex",
      alignItems: "center",
      background: "#1a8917",
      border: "none",
      color: "#fff",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "400",
      fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
      padding: "4px 14px",
      borderRadius: "99em",
      height: "30px",
      whiteSpace: "nowrap",
      lineHeight: "22px",
      marginRight: "10px",
      textDecoration: "none",
      transition: "background 0.1s",
      boxSizing: "border-box",
    });
    btn.addEventListener("mouseenter", () => (btn.style.background = "#156d12"));
    btn.addEventListener("mouseleave", () => (btn.style.background = "#1a8917"));
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
