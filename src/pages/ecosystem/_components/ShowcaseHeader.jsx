import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import React from "react";
import {DESCRIPTION, TITLE} from "@site/src/pages/ecosystem";
import Tooltip from "@site/src/pages/ecosystem/_components/ShowcaseTooltip";
const SUBMIT_URL = "https://github.com/casbin/casbin-website-v2";

export default function ShowcaseHeader() {
  const tooltipText = "fork repository, find specific files in tableData folder, add a new item, make a PR.(click to open tableData folder)";

  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">{TITLE}</Heading>
      <p>{DESCRIPTION}</p>
      <Tooltip anchorEl="#__docusaurus" text={tooltipText}>
        <Link className="button button--primary" to={SUBMIT_URL}>
          <Translate id="showcase.header.button">🚀 add new one</Translate>
        </Link>
      </Tooltip>
    </section>
  );
}
