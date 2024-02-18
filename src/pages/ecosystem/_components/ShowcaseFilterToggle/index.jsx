import React, {useCallback, useEffect, useState} from "react";
import clsx from "clsx";
import {useHistory, useLocation} from "@docusaurus/router";

import styles from "./styles.module.css";
import {prepareListState} from "@site/src/pages/ecosystem/_components/SearchBar";

export const OperatorQueryKey = "operator";

export function readOperator(search) {
  return new URLSearchParams(search).get(OperatorQueryKey) ?? "OR";
}

export default function ShowcaseFilterToggle() {
  const id = "showcase_filter_toggle";
  const location = useLocation();
  const history = useHistory();
  const [operator, setOperator] = useState(false);
  useEffect(() => {
    setOperator(readOperator(location.search) === "AND");
  }, [location]);
  const toggleOperator = useCallback(() => {
    setOperator((o) => !o);
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete(OperatorQueryKey);
    if (!operator) {
      searchParams.append(OperatorQueryKey, "AND");
    }
    history.push({
      ...location,
      search: searchParams.toString(),
      state: prepareListState(),
    });
  }, [operator, location, history]);

  const ClearTag = () => {
    history.push({
      ...location,
      search: "",
      state: prepareListState(),
    });
  };

  return (
    <div className="row" style={{alignItems: "center"}}>
      <input
        type="checkbox"
        id={id}
        className="screen-reader-only"
        aria-label="Toggle between or and and for the tags you selected"
        onChange={toggleOperator}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            toggleOperator();
          }
        }}
        checked={operator}
      />
      <label htmlFor={id} className={clsx(styles.checkboxLabel, "shadow--md")}>
        <span className={styles.checkboxLabelOr}>OR</span>
        <span className={styles.checkboxLabelAnd}>AND</span>
      </label>

      <button
        className="button button--outline button--primary"
        type="button"
        onClick={() => ClearTag()}
      >
        Clear All
      </button>
    </div>
  );
}
