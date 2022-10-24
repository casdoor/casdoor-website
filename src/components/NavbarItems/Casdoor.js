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
  const [link, setLink] = useState(props.int);
  useEffect(() => {
    if (localStorage.getItem("mainland") === "true") {
      setLink(props.cn);
    }
  }, []);
  return (
    <Comp
      href={link}
      {...props}
      activeClassName={
        props.activeClassName ??
        (mobile ? "menu__link--active" : "navbar__link--active")
      }
    />
  );
}
