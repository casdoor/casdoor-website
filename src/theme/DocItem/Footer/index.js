import React from "react";
import clsx from "clsx";
import {ThemeClassNames} from "@docusaurus/theme-common";
import {useDoc} from "@docusaurus/theme-common/internal";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
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

function IconTrans(props) {
  return (
    <svg
      fill="currentColor"
      height="20"
      width="20"
      viewBox="0 0 25 25"
      aria-hidden
      {...props}
    >
      <path
        d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"
      />
    </svg>
  );
}

function TransThisPage(props) {
  return (
    <>
      <a
        href={props.transUrl}
        target="_blank"
        rel="noreferrer noopener"
        className={ThemeClassNames.common.editThisPage}
        {...props}
      >
        <IconTrans style={{marginRight: "0.3em", verticalAlign: "sub"}} />
        <Translate>
          Translate this page
        </Translate>
      </a>
    </>
  );
}

function EditMetaRow({editUrl, transUrl, authors}) {
  return (
    <div className={clsx(ThemeClassNames.docs.docFooterEditMetaRow, "row")}>
      <div className="col">
        {editUrl && <EditThisPage editUrl={editUrl} />} {transUrl && <TransThisPage transUrl={transUrl} style={{marginLeft: "2rem"}} />}
      </div>
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

  // get current locale
  const {i18n} = useDocusaurusContext();
  const locale = i18n.currentLocale;
  // null if locale is en, don't show translate button
  let transUrl = null;
  // let transUrl = "https://crowdin.com/project/casdoor-website";
  if (locale === "zh") {
    transUrl = "https://crowdin.com/project/casdoor-website/zh-CN";
  } else if (locale !== "en") {
    transUrl = `https://crowdin.com/project/casdoor-website/${locale}`;
  }

  return (
    <footer
      className={clsx(ThemeClassNames.docs.docFooter, "docusaurus-mt-lg")}>
      {canDisplayTagsRow && <TagsRow tags={tags} />}
      {canDisplayEditMetaRow && (
        <EditMetaRow
          editUrl={editUrl}
          transUrl={transUrl}
          authors={authors}
        />
      )}
    </footer>
  );
}
