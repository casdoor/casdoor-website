import React from "react";
import clsx from "clsx";
import NavbarNavLink from "@theme/NavbarItem/NavbarNavLink";
import {useEffect, useState} from "react";

function DefaultNavbarItemDesktop({
  className,
  isDropdownItem = false,
  ...props
}) {
  const element = (
    <NavbarNavLink
      className={clsx(
        isDropdownItem ? "dropdown__link" : "navbar__item navbar__link",
        className
      )}
      isDropdownLink={isDropdownItem}
      {...props}
    />
  );
  if (isDropdownItem) {
    return <li>{element}</li>;
  }
  return element;
}
function DefaultNavbarItemMobile({className, isDropdownItem, ...props}) {
  return (
    <li className="menu__list-item">
      <NavbarNavLink className={clsx("menu__link", className)} {...props} />
    </li>
  );
}
export default function DefaultNavbarItem({
  mobile = false,
  position, // Need to destructure position from props so that it doesn't get passed on.
  ...props
}) {
  const Comp = mobile ? DefaultNavbarItemMobile : DefaultNavbarItemDesktop;
  const [mainland, setMainland] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("mainland") === "true") {
      setMainland(true);
    }
  }, []);
  if (mainland) {
    return (
      <>
        <Comp
          href="https://qm.qq.com/cgi-bin/qm/qr?k=SCBnKNj_1ljeXFT2dk8cwoGQwc5lFy8l&jump_from=webapi"
          className="header-community-qq"
          {...props}
          activeClassName={
            props.activeClassName ??
            (mobile ? "menu__link--active" : "navbar__link--active")
          }
        />
        <Comp
          href="/img/wechat.jpg"
          target="_blank"
          className="header-community-wechat"
          {...props}
          activeClassName={
            props.activeClassName ??
            (mobile ? "menu__link--active" : "navbar__link--active")
          }
        />
      </>
    );
  } else {
    return (
      <Comp
        href="https://gitter.im/casbin/casdoor"
        className="header-community-gitter"
        {...props}
        activeClassName={
          props.activeClassName ??
          (mobile ? "menu__link--active" : "navbar__link--active")
        }
      />
    );
  }

}
