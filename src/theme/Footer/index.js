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

function autoRedirect() {
  const {restUrl, currentLanguage} = getCurrentLanguage();

  if (sessionStorage.getItem("redirected") === null) {
    sessionStorage.setItem("redirected", "true");
    const betterLanguage = getBetterLanguage();
    if (currentLanguage === "en" && betterLanguage !== "en") {
      window.location.href = `/${betterLanguage}${restUrl}`;
    }
  }

  localStorage.setItem("preferredLanguage", currentLanguage);
}

/**
 * @returns restUrl: string - the rest of the url after the language. like "/docs/overview"
 * @returns currentLanguage: string - the current language. like "en"
 */
function getCurrentLanguage() {
  const pathname = window.location.pathname;
  const pos1 = pathname.indexOf("/");
  const pos2 = pathname.indexOf("/", pos1 + 1);
  const temp = (pos2 === -1) ? pathname.substring(pos1 + 1) : pathname.substring(pos1 + 1, pos2);
  const currentLanguage = (temp === "" || temp === "docs") ? "en" : temp;
  const restUrl = (currentLanguage === "en") ? pathname.substring(0) : pathname.substring(pos2);

  return {restUrl, currentLanguage};
}

/**
 * @returns If user visits our website for the first time, return the browser language, otherwise return the language before the user left last time.
 */
function getBetterLanguage() {
  if (localStorage.getItem("preferredLanguage") === null) {
    const lang = global.navigator?.language || navigator?.language;
    switch (lang) {
    case "zh-CN":
      localStorage.setItem("preferredLanguage", "zh");
      break;
    case "fr":
      localStorage.setItem("preferredLanguage", "fr");
      break;
    case "de":
      localStorage.setItem("preferredLanguage", "de");
      break;
    case "ko":
      localStorage.setItem("preferredLanguage", "ko");
      break;
    case "ja":
      localStorage.setItem("preferredLanguage", "ja");
      break;
    case "ru":
      localStorage.setItem("preferredLanguage", "ru");
      break;
    default:
      localStorage.setItem("preferredLanguage", "en");
    }
  }

  return localStorage.getItem("preferredLanguage");
}
