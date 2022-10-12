import React from "react";
import Footer from "@theme-original/Footer";
import {useEffect} from "react";

export default function FooterWrapper(props) {
  useEffect(autoRedirect, []);
  return (
    <>
      <Footer {...props} />
    </>
  );
}

/*
* When the user visits for the first time, if he is a Chinese user, auto redirect to the Chinese page.
* Remember the language user uses before closed the page, and auto redirect to that language the next time the user visits our site.
*/
function autoRedirect() {
  const pathname = window.location.pathname;
  const pos1 = pathname.indexOf("/");
  const pos2 = pathname.indexOf("/", pos1 + 1);
  const temp = (pos2 === -1) ? pathname.substring(pos1 + 1) : pathname.substring(pos1 + 1, pos2);
  const currentLanguage = (temp === "" || temp === "docs") ? "en" : temp;
  const restUrl = (currentLanguage === "en") ? pathname.substring(0) : pathname.substring(pos2);
  const preferredLanguage = localStorage.getItem("preferredLanguage");

  if (preferredLanguage !== currentLanguage) {
    const lang = global.navigator?.language || navigator?.language;
    if (lang !== null && lang.toLowerCase() === "zh-cn") {
      localStorage.setItem("preferredLanguage", "zh");
      window.location.href = "/zh" + restUrl;
    }
  } else if (preferredLanguage === null) {
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
}
