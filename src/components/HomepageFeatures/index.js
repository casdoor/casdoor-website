import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Translate, {translate} from "@docusaurus/Translate";
import {useColorMode} from "@docusaurus/theme-common";

// MCP square icon only (no text), extracted from official MCP docs logo
const MCP_ICON_LIGHT = "/img/mcp-icon-light.svg";
const MCP_ICON_DARK = "/img/mcp-icon-dark.svg";

// Local feature icons (same pattern as MCP: /img/...)
const FEATURE_ICON_SRC = [
  null,  // AI & MCP uses MCP icon (iconSrcLight/iconSrcDark) instead
  "/img/feature-shield.svg",   // Enterprise
  "/img/feature-building.svg", // Architecture
  "/img/feature-chart.svg",    // SaaS
];

const FeatureList = [
  {
    title: translate({
      message: "AI Agent Identity & MCP Server",
    }),
    iconSrcLight: MCP_ICON_LIGHT,
    iconSrcDark: MCP_ICON_DARK,
    description: (
      <>
        <Translate>
        Built-in MCP server with Streamable HTTP lets AI agents manage Casdoor in natural language. OAuth 2.1 for agents with Dynamic Client Registration, per-tool permissions, and secure agent-to-agent auth.
        </Translate>{" "}
        <a href="/docs/how-to-connect/mcp/integration"><Translate>Learn more about MCP</Translate></a>.
      </>
    ),
  },
  {
    title: translate({
      message: "Enterprise-Grade Authentication",
    }),
    iconSrc: FEATURE_ICON_SRC[1],
    description: (
      <>
        <Translate>
        Go from zero to production in minutes. An intuitive console for auth and authorization, built for teams and scale.
        </Translate>
      </>
    ),
  },
  {
    title: translate({
      message: "Modern Architecture",
    }),
    iconSrc: FEATURE_ICON_SRC[2],
    description: (
      <>
        <Translate>
        Clean frontend-backend separation, fast web UI, and horizontal scalability for high concurrency.
        </Translate>
      </>
    ),
  },
  {
    title: translate({
      message: "SaaS Management Platform",
    }),
    iconSrc: FEATURE_ICON_SRC[3],
    description: (
      <>
        <Translate>
        Full SaaS billing: plans, pricing tiers, and payment providers. Manage products, subscriptions, and revenue in one place.</Translate>{" "}
        <a href="/docs/pricing/overview"><Translate>SaaS docs</Translate></a>.
      </>
    ),
  },
];

function Feature({title, description, iconSrc, iconSrcLight, iconSrcDark}) {
  const {colorMode} = useColorMode();
  const src = (iconSrcLight && iconSrcDark)
    ? (colorMode === "dark" ? iconSrcDark : iconSrcLight)
    : iconSrc;
  return (
    <div className={clsx("col col--6 col--lg-3")}>
      <div className={styles.featureIconWrap}>
        {src && (
          <img
            src={src}
            alt=""
            className={styles.featureIcon}
            width={120}
            height={120}
            loading="lazy"
          />
        )}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
