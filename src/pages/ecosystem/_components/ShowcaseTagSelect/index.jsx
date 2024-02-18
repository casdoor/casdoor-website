import React, {useCallback, useEffect, useState} from "react";
import {useHistory, useLocation} from "@docusaurus/router";

import styles from "./styles.module.css";
import {prepareListState} from "@site/src/pages/ecosystem/_components/SearchBar";

const TagQueryStringKey = "tags";

export function readSearchTags(search) {
  return new URLSearchParams(search).getAll(TagQueryStringKey);
}

function replaceSearchTags(search, newTags) {
  const searchParams = new URLSearchParams(search);
  searchParams.delete(TagQueryStringKey);
  newTags.forEach((tag) => searchParams.append(TagQueryStringKey, tag));
  return searchParams.toString();
}

function ShowcaseTagSelect({id, icon, label, tag, ...rest}, ref) {
  const location = useLocation();
  const history = useHistory();
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    const tags = readSearchTags(location.search);
    setSelected(tags.includes(tag));
  }, [tag, location]);
  const toggleTag = useCallback(() => {
    const tags = readSearchTags(location.search);
    const newTags = toggleListItem(tags, tag);

    const newSearch = replaceSearchTags(location.search, newTags);
    history.push({
      ...location,
      search: newSearch,
      state: prepareListState(),
    });
  }, [tag, location, history]);
  return (
    <>
      <input
        type="checkbox"
        id={id}
        className="screen-reader-only"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            toggleTag();
          }
        }}
        onFocus={(e) => {
          if (e.relatedTarget) {
            e.target.nextElementSibling?.dispatchEvent(
              new KeyboardEvent("focus")
            );
          }
        }}
        onBlur={(e) => {
          e.target.nextElementSibling?.dispatchEvent(new KeyboardEvent("blur"));
        }}
        onChange={toggleTag}
        checked={selected}
        {...rest}
      />
      <label ref={ref} htmlFor={id} className={styles.checkboxLabel}>
        {label.slice(0, 1).toUpperCase() + label.slice(1)}
        {icon}
      </label>
    </>
  );
}

export default React.forwardRef(ShowcaseTagSelect);

export function toggleListItem(list, item) {
  const itemIndex = list.indexOf(item);
  if (itemIndex === -1) {
    return list.concat(item);
  }
  const newList = [...list];
  newList.splice(itemIndex, 1);

  return newList;
}
