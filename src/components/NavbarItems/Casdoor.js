import React from "react";
import {useEffect, useState} from "react";
import NavbarNavLink from "@theme/NavbarItem/NavbarNavLink";

export default function Casdoor(props) {
  const [link, setLink] = useState("https://door.casdoor.org/");
  if(props.src === "") {
    useEffect(() => {
      if(localStorage.getItem("CasdoorLink") === "https://door.casdoor.org/") {
        setLink("https://gitter.im/casbin/casdoor");
      }else{
        setLink("https://qm.qq.com/cgi-bin/qm/qr?k=SCBnKNj_1ljeXFT2dk8cwoGQwc5lFy8l&jump_from=webapi");
      }
    }, []);
  }else{
    useEffect(() => {
      setLink(localStorage.getItem("CasdoorLink"));
    }, []);
  }
  return (
    <NavbarNavLink
      href={link + props.src}
      {...props}
    />
  );
}
