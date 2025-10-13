import React from "react";
import clsx from "clsx";
import {ThemeClassNames} from "@docusaurus/theme-common";
import {useDoc} from "@docusaurus/theme-common/internal";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import EditThisPage from "@theme/EditThisPage";
import TagsListInline from "@theme/TagsListInline";
import styles from "./styles.module.css";
import Translate from "@docusaurus/Translate";
import {useLocation} from "@docusaurus/router";

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

function IconPrint(props) {
  return (
    <svg
      fill="currentColor"
      height="20"
      width="20"
      viewBox="0 0 24 24"
      aria-hidden
      {...props}
    >
      <path
        d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"
      />
    </svg>
  );
}

function IconIssue(props) {
  return (
    <svg
      fill="currentColor"
      height="20"
      width="20"
      viewBox="0 0 24 24"
      aria-hidden
      {...props}
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
      />
    </svg>
  );
}

function IconShare(props) {
  return (
    <svg
      fill="currentColor"
      height="20"
      width="20"
      viewBox="0 0 24 24"
      aria-hidden
      {...props}
    >
      <path
        d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
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

function ActionButtons({docPath}) {
  const location = useLocation();
  const {siteConfig} = useDocusaurusContext();
  const currentUrl = siteConfig.url + location.pathname;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async() => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: currentUrl,
        });
      } catch (err) {
        // User cancelled or share failed - silently ignore
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(currentUrl).then(() => {
        alert("Link copied to clipboard!");
      }).catch(() => {
        // Failed to copy - silently ignore
      });
    }
  };

  const issueUrl = `https://github.com/casdoor/casdoor-website/issues/new?title=Issue in ${docPath}&body=Issue description for: ${currentUrl}`;

  return (
    <div className={styles.docItemActionButtons}>
      <button
        className={styles.actionButton}
        onClick={handlePrint}
        title="Print this page"
        aria-label="Print this page"
      >
        <IconPrint style={{marginRight: "0.3em", verticalAlign: "sub"}} />
        <Translate>Print</Translate>
      </button>
      <a
        href={issueUrl}
        target="_blank"
        rel="noreferrer noopener"
        className={styles.actionButton}
        title="Open doc issue"
        aria-label="Open doc issue"
      >
        <IconIssue style={{marginRight: "0.3em", verticalAlign: "sub"}} />
        <Translate>Open doc issue</Translate>
      </a>
      <button
        className={styles.actionButton}
        onClick={handleShare}
        title="Share this page"
        aria-label="Share this page"
      >
        <IconShare style={{marginRight: "0.3em", verticalAlign: "sub"}} />
        <Translate>Share</Translate>
      </button>
    </div>
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

  const location = useLocation();
  const docPath = location.pathname.replace(/^\/docs\//, "");

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
      <ActionButtons docPath={docPath} />
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
