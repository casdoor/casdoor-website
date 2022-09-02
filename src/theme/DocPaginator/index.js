import React from "react";
import DocPaginator from "@theme-original/DocPaginator";
import Giscus from "@giscus/react";
import {useColorMode} from "@docusaurus/theme-common";

export default function DocPaginatorWrapper(props) {
  const {colorMode} = useColorMode();
  return (
    <>
      <DocPaginator {...props} />
      <br />
      <Giscus
        id="comments"
        repo="casdoor/casdoor"
        repoId="MDEwOlJlcG9zaXRvcnkzMDYzNjY5MDA="
        category="Docs comments"
        categoryId="DIC_kwDOEkLJtM4CRIiC"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={colorMode}
        lang="en"
        loading="lazy"
      />
    </>
  );
}
