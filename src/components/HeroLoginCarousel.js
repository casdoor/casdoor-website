import React, {useEffect, useState} from "react";
import Translate from "@docusaurus/Translate";
import CasdoorCard from "./CasdoorCard";
import {useWindowSize} from "@docusaurus/theme-common";

const DEFAULT_SOURCES = [
  "https://door.casdoor.com/login",
  "https://ciam.jinkosolar.com/login",
  "https://door.casdoor.com/login/oauth/authorize?client_id=0ba528121ea87b3eb54d&response_type=code&redirect_uri=.casbin.com/callback&scope=read&state=casdoor",
  "https://casdoor.tldv.io/login",
];

const DEFAULT_INTERVAL_MS = 5000;

export default function HeroLoginCarousel(props) {
  const {
    sources = DEFAULT_SOURCES,
    width = "550",
    height = "720",
    intervalMs = DEFAULT_INTERVAL_MS,
    className,
  } = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const [mouseState, setMouseState] = useState(false);
  const windowSize = useWindowSize();
  const isMobile = windowSize === "mobile";

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % sources.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [sources.length, intervalMs]);

  const maskStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    background: "rgba(0,0,0,0.4)",
    cursor: "pointer",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const currentUrl = sources[activeIndex];
  const sizeStyle = {
    width: typeof width === "number" ? width : `${width}px`,
    height: typeof height === "number" ? height : `${height}px`,
    visibility: "hidden",
    pointerEvents: "none",
    margin: 0,
    padding: 0,
    border: "none",
    display: "block",
  };

  return (
    <div
      className={className}
      style={{position: "relative"}}
      onMouseEnter={() => setMouseState(true)}
      onMouseLeave={() => setMouseState(false)}
    >
      {/* In-flow sizer so wrapper keeps same size as original single iframe, avoiding layout shift */}
      <div style={sizeStyle} aria-hidden />
      {sources.map((src, index) => (
        <div
          key={src}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: index === activeIndex ? 1 : 0,
            pointerEvents: index === activeIndex ? "auto" : "none",
            zIndex: index === activeIndex ? 1 : 0,
            transition: "opacity 0.4s ease-in-out",
          }}
          aria-hidden={index !== activeIndex}
        >
          <CasdoorCard src={src} width={width} height={height} />
        </div>
      ))}
      <div
        style={{...maskStyle, visibility: mouseState ? "visible" : "hidden"}}
        onClick={() => window.open(currentUrl)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && window.open(currentUrl)}
      >
        <span
          className="button button--secondary button--lg"
          style={{marginRight: isMobile ? "1rem" : "3rem", marginLeft: isMobile ? "1rem" : "3rem"}}
        >
          <Translate>Online Demo</Translate>
        </span>
      </div>
    </div>
  );
}
