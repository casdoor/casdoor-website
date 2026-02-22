/* eslint-disable react/jsx-key */
import React from "react";
// import { createRoot } from "react-dom/client";
import {Highlight, themes} from "prism-react-renderer";
import {useColorMode} from "@docusaurus/theme-common";

export default function CodeCard(props) {
  const {colorMode} = useColorMode();
  return (
    <Highlight theme={colorMode === "light" ? themes.github : themes.dracula} code={props.children} language={props.language}>
      {({className, tokens, getLineProps, getTokenProps}) => (
        <pre className={className} style={{backgroundColor: "transparent", fontSize: "15px"}}>
          {tokens.map((line, i) => (
            <div {...getLineProps({line, key: i})}>
              {line.map((token, key) => (
                <span {...getTokenProps({token, key})} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
