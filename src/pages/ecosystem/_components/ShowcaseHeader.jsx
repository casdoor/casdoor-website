import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import React from "react";
import {DESCRIPTION, TITLE} from "@site/src/pages/ecosystem";
import Tooltip from "@site/src/pages/ecosystem/_components/ShowcaseTooltip";

const SUBMIT_URL = "https://github.com/casdoor/casdoor-website/tree/master/static/data";

export default function ShowcaseHeader() {
  const tooltipText = "fork repo, find specific files in data folder, add a new item, make a PR.(click to open data folder)";

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
