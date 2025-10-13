import React from "react";

export default function CasdoorCard(props) {
  return (
    <iframe
      src={props.src}
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
