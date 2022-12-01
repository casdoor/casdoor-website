import React from "react";
import clsx from "clsx";
import {ThemeClassNames} from "@docusaurus/theme-common";
import {useDoc} from "@docusaurus/theme-common/internal";
import EditThisPage from "@theme/EditThisPage";
import TagsListInline from "@theme/TagsListInline";
import styles from "./styles.module.css";
import Translate from "@docusaurus/Translate";

// Eject DocItem/Footer

function ContributedBy({authors}) {
  if (authors.length <= 1) {
    return (
      <>
        <span>
          <Translate>
            Created by
          </Translate>
        </span>
        <a href={`https://github.com/${authors[0]}`} target="_blank" rel="noreferrer" >
          <img alt={`${authors[0]}`} src={`https://avatars.githubusercontent.com/${authors[0]}`} width="24px" style={{borderRadius: "12px", verticalAlign: "sub", marginLeft: "4px"}} />  {authors[0]}
        </a>
      </>
    );
  } else if (authors.length <= 3) {
    return (
      <>
        <span>
          <Translate>
            Modified by
          </Translate>
        </span>
        {authors.map((author) => {
          return (
            <a key={author} href={`https://github.com/${author}`} target="_blank" rel="noreferrer" >
              <img alt={`${author}`} src={`https://avatars.githubusercontent.com/${author}`} width="24px" style={{borderRadius: "12px", verticalAlign: "sub", marginLeft: "4px"}} /> {author}
            </a>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        <span>
          <Translate>
            Modified by
          </Translate>
        </span>
        {authors.map((author) => {
          return (
            <a key={author} href={`https://github.com/${author}`} target="_blank" rel="noreferrer" >
              <img alt={`${author}`} src={`https://avatars.githubusercontent.com/${author}`} width="24px" style={{borderRadius: "12px", verticalAlign: "sub", marginLeft: "4px"}} />
            </a>
          );
        })}
      </>
    );
  }
}

function TagsRow(props) {
  return (
    <div
      className={clsx(
        ThemeClassNames.docs.docFooterTagsRow,
        "row margin-bottom--sm"
      )}>
      <div className="col">
        <TagsListInline {...props} />
      </div>
    </div>
  );
}

function EditMetaRow({editUrl, authors}) {
  return (
    <div className={clsx(ThemeClassNames.docs.docFooterEditMetaRow, "row")}>
      <div className="col">{editUrl && <EditThisPage editUrl={editUrl} />}</div>

      <div className={clsx("col", styles.lastUpdated)}>
        <ContributedBy authors={authors} />
      </div>
    </div>
  );
}

export default function DocItemFooter() {
  const {metadata} = useDoc();
  const {editUrl, tags} = metadata;
  const authors = metadata.frontMatter.authors || ["casdoor"];
  const canDisplayTagsRow = tags.length > 0;
  const canDisplayEditMetaRow = !!(editUrl);
  const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;
  if (!canDisplayFooter) {
    return null;
  }
  return (
    <footer
      className={clsx(ThemeClassNames.docs.docFooter, "docusaurus-mt-lg")}>
      {canDisplayTagsRow && <TagsRow tags={tags} />}
      {canDisplayEditMetaRow && (
        <EditMetaRow
          editUrl={editUrl}
          authors={authors}
        />
      )}
    </footer>
  );
}
