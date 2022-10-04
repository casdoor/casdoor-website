/* eslint-disable react/jsx-key */
import React from "react";
// import { createRoot } from "react-dom/client";
import Highlight, {defaultProps} from "prism-react-renderer";
import github from "prism-react-renderer/themes/github";
import dracula from "prism-react-renderer/themes/dracula";
import {useColorMode} from "@docusaurus/theme-common";

export default function CodeCard(props) {
  const {colorMode} = useColorMode();
  return (
    <Highlight {...defaultProps} theme={colorMode === "light" ? github : dracula} code={props.children} language={props.language}>
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
