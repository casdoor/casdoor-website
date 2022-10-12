(function() {
  const preferredLanguage = localStorage.getItem("preferredLanguage");
  const pathname = window.location.pathname;
  const pos1 = pathname.indexOf("/");
  const pos2 = pathname.indexOf("/", pos1 + 1);
  const temp = (pos2 === -1) ? pathname.substring(pos1 + 1) : pathname.substring(pos1 + 1, pos2);
  const currentLanguage = (temp === "" || temp === "docs") ? "en" : temp;
  const restUrl = (currentLanguage === "en") ? pathname.substring(0) : pathname.substring(pos2);
  if (preferredLanguage === null) {
    const lang = global.navigator?.language || navigator?.language;
    if (lang !== null && lang.toLowerCase() === "zh-cn") {
      localStorage.setItem("preferredLanguage", "zh");
      window.location.href = "/zh" + restUrl;
    }
  } else if (preferredLanguage !== currentLanguage) {
    if (sessionStorage.getItem("autoRedirect") === null) {
      sessionStorage.setItem("autoRedirect", "true");
      if (preferredLanguage === "en") {
        window.location.href = restUrl;
      } else {
        window.location.href = "/" + preferredLanguage + restUrl;
      }
    } else {
      localStorage.setItem("preferredLanguage", currentLanguage);
    }
  }
})();
