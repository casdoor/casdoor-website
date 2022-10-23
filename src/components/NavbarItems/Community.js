import React, {useEffect, useState} from "react";
import NavbarNavLink from "@theme/NavbarItem/NavbarNavLink";

export default function Community(props) {
  const [mainland, setMainland] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("mainland") === "true") {
      setMainland(true);
    }
  }, []);

  if (mainland) {
    return (
      <>
        <NavbarNavLink
          href="https://qm.qq.com/cgi-bin/qm/qr?k=SCBnKNj_1ljeXFT2dk8cwoGQwc5lFy8l&jump_from=webapi"
          className="navbar__item navbar__link header-community-qq"
          {...props}
        />
        <NavbarNavLink
          href="/img/wechat.jpg"
          target="_blank"
          className="navbar__item navbar__link header-community-wechat"
          {...props}
        />
      </>
    );
  } else {
    return (
      <NavbarNavLink
        href="https://gitter.im/casbin/casdoor"
        className="navbar__item navbar__link header-community-gitter"
        {...props}
      />
    );
  }
}
