import React from "react";
import clsx from "clsx";
import {ThemeClassNames} from "@docusaurus/theme-common";
import {useDoc} from "@docusaurus/theme-common/internal";
import EditThisPage from "@theme/EditThisPage";
import TagsListInline from "@theme/TagsListInline";
import styles from "./styles.module.css";

// Eject DocItem/Footer

function CreatedByUser({author}) {
  return (
    <>
      <a href={`https://github.com/${author}`} target="_blank" rel="noreferrer" >
        Created by <img alt={`${author}`} src={`https://avatars.githubusercontent.com/${author}`} width="20px" style={{borderRadius: "10px", verticalAlign: "sub"}} />  {author}
      </a>
    </>
  );
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

function EditMetaRow({
  editUrl,
  author,
}) {
  return (
    <div className={clsx(ThemeClassNames.docs.docFooterEditMetaRow, "row")}>
      <div className="col">{editUrl && <EditThisPage editUrl={editUrl} />}</div>

      <div className={clsx("col", styles.lastUpdated)}>
        {(author) && (
          <CreatedByUser
            author={author}
          />
        )}
      </div>
    </div>
  );
}

export default function DocItemFooter() {
  const {metadata} = useDoc();
  const {editUrl, tags} = metadata;
  const author = metadata.frontMatter.author || "casdoor";
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
          author={author}
        />
      )}
    </footer>
  );
}
