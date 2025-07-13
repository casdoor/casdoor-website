(function(w, d, s, c, i) 
{const j = d.createElement(s);
    j.async = false;j.src = "https://tcdn.casibase.org/casibase.js";
    j.onload = function() {
    const t=86400000,a=localStorage.getItem("casibaseChatClosed"),i=Date.now(),r=!a||i-parseInt(a)>t;
    w[c]("init", {
      endpoint: "https://ai.casbin.com",
      themeColor: "rgb(64,59,121)",
      popupTime: r?5:0,
    });
    w[c]("on","close",()=>{try{localStorage.setItem("casibaseChatClosed",Date.now().toString())}catch(e){console.error("Failed to save chat closed time:",e)}});

  };const f = d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j, f);w[c] = w[c] || function() {(w[c].q = w[c].q || []).push(arguments);};})(window, document, "script", "casibaseChat");