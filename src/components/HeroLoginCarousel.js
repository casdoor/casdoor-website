import React, {useEffect, useState} from "react";
import Translate from "@docusaurus/Translate";
import CasdoorCard from "./CasdoorCard";
import {useWindowSize} from "@docusaurus/theme-common";

// Sign-in themes from the Casdoor Marketplace, shown on the demo site with `?theme=<id>`
const THEMES = [
  {id: "aurora", name: "Aurora"},
  {id: "brutal", name: "Brutal"},
  {id: "midnight", name: "Midnight"},
  {id: "material", name: "Material"},
  {id: "terminal", name: "Terminal"},
  {id: "paper", name: "Paper"},
  {id: "pixel", name: "Pixel"},
  {id: "fluent", name: "Fluent"},
  {id: "dracula", name: "Dracula"},
  {id: "backdrop", name: "Backdrop"},
  {id: "cupertino", name: "Cupertino"},
  {id: "retro", name: "Retro"},
  {id: "prism", name: "Prism"},
  {id: "blueprint", name: "Blueprint"},
  {id: "nord", name: "Nord"},
  {id: "sketch", name: "Sketch"},
  {id: "mono", name: "Mono"},
  {id: "waves", name: "Waves"},
  {id: "catppuccin", name: "Catppuccin"},
  {id: "civic", name: "Civic"},
  {id: "solarized", name: "Solarized"},
  {id: "halves", name: "Halves"},
  {id: "split", name: "Split"},
  {id: "bare", name: "Bare"},
];

const DEMO_URL = "https://door.casdoor.com/login";
const MARKETPLACE_URL = "https://marketplace.casdoor.com";
const DEFAULT_INTERVAL_MS = 5000;

export default function HeroLoginCarousel(props) {
  const {
    themes = THEMES,
    width = "550",
    height = "720",
    intervalMs = DEFAULT_INTERVAL_MS,
    className,
  } = props;

  const [activeIndex, setActiveIndex] = useState(0);
  const [mouseState, setMouseState] = useState(false);
  const windowSize = useWindowSize();
  const isMobile = windowSize === "mobile";

  // the themes stop while the visitor is looking at one
  useEffect(() => {
    if (mouseState) {
      return undefined;
    }
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % themes.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [themes.length, intervalMs, mouseState]);

  const maskStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    background: "rgba(0,0,0,0.4)",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "center",
  };
  const labelStyle = {
    position: "absolute",
    left: "16px",
    bottom: "16px",
    zIndex: 5,
    padding: "4px 12px",
    borderRadius: "999px",
    background: "rgba(0,0,0,0.6)",
    color: "#fff",
    fontSize: "0.8rem",
    fontWeight: 600,
    pointerEvents: "none",
  };

  const current = themes[activeIndex];
  const nextIndex = (activeIndex + 1) % themes.length;
  const prevIndex = (activeIndex - 1 + themes.length) % themes.length;
  const getDemoUrl = (theme) => `${DEMO_URL}?theme=${theme.id}`;
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
  const buttonMargin = isMobile ? "1rem" : "3rem";

  return (
    <div
      className={className}
      style={{position: "relative"}}
      onMouseEnter={() => setMouseState(true)}
      onMouseLeave={() => setMouseState(false)}
    >
      {/* In-flow sizer so wrapper keeps same size as original single iframe, avoiding layout shift */}
      <div style={sizeStyle} aria-hidden />
      {/* only the theme on show is loaded, with the next one ready to fade in and the last one fading out */}
      {themes.map((theme, index) => [prevIndex, activeIndex, nextIndex].includes(index) ? (
        <div
          key={theme.id}
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
          <CasdoorCard src={getDemoUrl(theme)} width={width} height={height} />
        </div>
      ) : null)}
      <span style={{...labelStyle, visibility: mouseState ? "hidden" : "visible"}}>
        {current.name} <Translate>theme</Translate>
      </span>
      <div style={{...maskStyle, visibility: mouseState ? "visible" : "hidden"}}>
        <a
          className="button button--secondary button--lg"
          href={getDemoUrl(current)}
          target="_blank"
          rel="noopener noreferrer"
          style={{marginRight: buttonMargin, marginLeft: buttonMargin}}
        >
          <Translate>Online Demo</Translate>
        </a>
        <a
          className="button button--primary"
          href={`${MARKETPLACE_URL}/integrations/${current.id}/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Translate>Get this theme from the Marketplace</Translate>
        </a>
      </div>
    </div>
  );
}
