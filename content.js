(function () {
  const url = window.location.href;
  const isMediumDomain = /^https:\/\/([\w-]+\.)?medium\.com\//.test(url);
  const isArticle = isMediumDomain && !/\/\/([\w-]+\.)?medium\.com\/?$/.test(url);
  const isMediumPage = isArticle || document.querySelector('meta[name="medium"], meta[property="al:android:app_name"][content="Medium"]');

  if (!isMediumPage) return;

  const btn = document.createElement("button");
  btn.id = "freedium-redirect-btn";
  btn.textContent = "Read on Freedium";
  Object.assign(btn.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: "2147483647",
    padding: "12px 20px",
    background: "#1a8917",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    fontFamily: "system-ui, sans-serif",
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
    transition: "opacity 0.2s",
  });

  btn.addEventListener("mouseenter", () => (btn.style.opacity = "0.85"));
  btn.addEventListener("mouseleave", () => (btn.style.opacity = "1"));
  btn.addEventListener("click", () => {
    window.location.href =
      "https://freedium-mirror.cfd/" + window.location.href;
  });

  document.body.appendChild(btn);
})();
