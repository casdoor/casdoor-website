import React, {useEffect, useRef, useState} from "react";

// Casdoor pages autofocus their first input, which scrolls this page to the iframe, even when this
// window is in the background. Hand the focus back and undo any scroll the user didn't make, unless
// the user is pointing at the iframe or has clicked into it. A hidden tab only fires that scroll event
// once it is shown again, so watch for it then too.
function usePreventAutofocusScroll(ref) {
  useEffect(() => {
    const frame = ref.current;
    const events = ["wheel", "touchstart", "keydown", "pointerdown"];
    let lastY = window.scrollY;
    let hovered = false;
    let guardUntil = Date.now() + 15000;
    let inputAt = 0;
    let stolenAt = 0;
    let hiddenWhileGuarded = false;

    const takeFocusBack = () => {
      if (document.activeElement !== frame || hovered || Date.now() > guardUntil) {
        return false;
      }
      stolenAt = Date.now();
      frame.blur();
      return true;
    };
    const onScroll = () => {
      const now = Date.now();
      const stolen = takeFocusBack() || (!hovered && now - inputAt > 500 &&
        (now - stolenAt < 2000 || (!document.hasFocus() && now < guardUntil)));
      if (stolen) {
        window.scrollTo({top: lastY, behavior: "instant"});
      } else {
        lastY = window.scrollY;
      }
    };
    const onBlur = () => setTimeout(() => {
      if (document.activeElement === frame && hovered) {
        guardUntil = 0;
      } else {
        takeFocusBack();
      }
    });
    const onInput = () => {
      inputAt = Date.now();
    };
    const onLoad = () => {
      guardUntil = Math.max(guardUntil, Date.now() + 10000);
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        hiddenWhileGuarded = hiddenWhileGuarded || Date.now() < guardUntil;
      } else if (hiddenWhileGuarded) {
        hiddenWhileGuarded = false;
        stolenAt = Date.now();
      }
    };
    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };

    window.addEventListener("scroll", onScroll, {passive: true});
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibilityChange);
    events.forEach((event) => window.addEventListener(event, onInput, {capture: true, passive: true}));
    frame.addEventListener("load", onLoad);
    frame.addEventListener("mouseenter", onEnter);
    frame.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      events.forEach((event) => window.removeEventListener(event, onInput, {capture: true}));
      frame.removeEventListener("load", onLoad);
      frame.removeEventListener("mouseenter", onEnter);
      frame.removeEventListener("mouseleave", onLeave);
    };
  }, []);
}

export default function CasdoorCard(props) {
  const ref = useRef(null);
  const [src, setSrc] = useState();
  usePreventAutofocusScroll(ref);
  // Load the page only after hydration and while the tab is shown, so the scroll guard is in place
  // before it can autofocus
  useEffect(() => {
    const load = () => document.visibilityState === "visible" && setSrc(props.src);
    load();
    document.addEventListener("visibilitychange", load);
    return () => document.removeEventListener("visibilitychange", load);
  }, [props.src]);

  return (
    <iframe
      ref={ref}
      src={src}
      width={props.width}
      height={props.height}
      style={{borderRadius: "20px"}}
      frameBorder="0"
      scrolling="no"
    ></iframe>
  );
}

CasdoorCard.defaultProps = {
  src: "https://door.casdoor.com",
  width: "600",
  height: "700",
};
