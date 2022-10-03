import React, {cloneElement, isValidElement, useState} from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

function isTabItem(comp) {
  return "value" in comp.props;
}
export default function TabList(props) {
  const {
    className,
  } = props;
  const children = React.Children.map(props.children, (child) => {
    if (isValidElement(child) && isTabItem(child)) {
      return child;
    }
  });
  const values =
    children.map(({props: {value, label, attributes}}) => ({
      value,
      label,
      attributes,
    }));
  const [selectedValue, setSelectedValue] = useState(values[0].value);
  const tabRefs = [];
  const handleTabChange = (event) => {
    const newTab = event.currentTarget;
    const newTabIndex = tabRefs.indexOf(newTab);
    const newTabValue = values[newTabIndex].value;
    if (newTabValue !== selectedValue) {
      setSelectedValue(newTabValue);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.tabList}>
        <ul
          role="tablist"
          aria-orientation="horizontal"
          className={clsx(
            "tabs",
            className
          )}>
          <div className={styles.buttons}>
            <span className={styles.dot} style={{background: "#f25f58"}} />
            <span className={styles.dot} style={{background: "#fbbe3c"}} />
            <span className={styles.dot} style={{background: "#58cb42"}} />
          </div>
          {values.map(({value, label, attributes}) => (
            <li
              role="tab"
              tabIndex={selectedValue === value ? 0 : -1}
              aria-selected={selectedValue === value}
              key={value}
              ref={(tabControl) => tabRefs.push(tabControl)}
              onFocus={handleTabChange}
              onClick={handleTabChange}
              {...attributes}
              className={clsx(
                "tabs__item",
                styles.tabItem,
                attributes?.className,
                {
                  "tabs__item--active": selectedValue === value,
                }
              )}>
              {label ?? value}
            </li>
          ))}
        </ul>
        {children.map((tabItem, i) =>
          cloneElement(tabItem, {
            key: i,
            hidden: tabItem.props.value !== selectedValue,
          })
        )}
      </div>
    </div>
  );
}
