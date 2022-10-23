import React from "react";
import {useEffect, useState} from "react";
import NavbarNavLink from "@theme/NavbarItem/NavbarNavLink";

export default function Casdoor(props) {
  const [link, setLink] = useState(props.int);
  useEffect(() => {
    if(localStorage.getItem("mainland") === "true") {
      setLink(props.cn);
    }
  }, []);
  return (
    <NavbarNavLink
      href={link}
      {...props}
    />
  );
}
