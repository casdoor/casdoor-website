import {useLocation} from "@docusaurus/router";
import {useEffect, useMemo, useState} from "react";
import {readSearchTags} from "@site/src/pages/ecosystem/_components/ShowcaseTagSelect";
import {readOperator} from "@site/src/pages/ecosystem/_components/ShowcaseFilterToggle";
import {sortedList} from "@site/src/tableData/tableData";

const SearchNameQueryKey = "name";

export function useFilteredList() {
  const location = useLocation();
  const [operator, setOperator] = useState("OR");
  // On SSR / first mount (hydration) no tag is selected
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchName, setSearchName] = useState(null);
  // Sync tags from QS to state (delayed on purpose to avoid SSR/Client
  // hydration mismatch)
  useEffect(() => {
    setSelectedTags(readSearchTags(location.search));
    setOperator(readOperator(location.search));
    setSearchName(readSearchName(location.search));
    restoreUserState(location.state);
  }, [location]);

  return useMemo(
    () => filterList(sortedList, selectedTags, operator, searchName),
    [selectedTags, operator, searchName]
  );
}

function readSearchName(search) {
  return new URLSearchParams(search).get(SearchNameQueryKey);
}

function restoreUserState(userState) {
  const {scrollTopPosition, focusedElementId} = userState ?? {
    scrollTopPosition: 0,
    focusedElementId: undefined,
  };
  document.getElementById(focusedElementId)?.focus();
  window.scrollTo({top: scrollTopPosition});
}

function filterList(list, selectedTags, operator, searchName) {
  if (searchName) {
    // eslint-disable-next-line no-param-reassign
    list = list.filter((item) =>
      item.title.toLowerCase().includes(searchName.toLowerCase())
    );
  }
  if (selectedTags.length === 0) {
    return list;
  }
  return list.filter((item) => {
    if (item.tags.length === 0) {
      return false;
    }
    if (operator === "AND") {
      return selectedTags.every((tag) => item.tags.includes(tag));
    }
    return selectedTags.some((tag) => item.tags.includes(tag));
  });
}
