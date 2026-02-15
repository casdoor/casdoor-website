import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Translate, {translate} from "@docusaurus/Translate";
import {useColorMode} from "@docusaurus/theme-common";

const FeatureList = [
  {
    title: translate({
      message: "AI Agent Identity & MCP Server",
    }),
    path: "/img/ai-mcp",
    description: (
      <>
        <Translate>
        Built-in MCP server with Streamable HTTP enables AI agents to manage Casdoor via natural language. Features OAuth 2.1 for AI agents with Dynamic Client Registration (RFC 7591), Authorization Server Metadata (RFC 8414), Resource Indicators (RFC 8707), and per-tool permission control for secure agent-to-agent authentication.
        </Translate>{" "}
        <a href="/docs/how-to-connect/mcp/integration"><Translate>Learn more about MCP</Translate></a>.
      </>
    ),
  },
  {
    title: translate({
      message: "Enterprise-Grade Authentication",
    }),
    path: "/img/model",
    description: (
      <>
        <Translate>
        Deploy a production-ready Casdoor application in minutes. Streamline authentication and authorization management with an intuitive interface designed for enterprise needs.
        </Translate>
      </>
    ),
  },
  {
    title: translate({
      message: "Modern Architecture",
    }),
    path: "/img/storage",
    description: (
      <>
        <Translate>
        Built with a modern frontend-backend separation architecture, Casdoor delivers an intuitive web UI with exceptional performance and scalability for high-concurrency environments.
        </Translate>
      </>
    ),
  },
  {
    title: translate({
      message: "SaaS Management Platform",
    }),
    path: "/img/language",
    description: (
      <>
        <Translate>Comprehensive SaaS subscription and payment management with support for multiple plans, pricing tiers, and payment providers. Manage products, subscriptions, and transactions seamlessly. To learn more, visit</Translate> <a href="/docs/pricing/overview"><Translate>SaaS Management documentation</Translate></a>.
      </>
    ),
  },
];

function Feature({title, path, description}) {
  const {colorMode} = useColorMode();
  return (
    <div className={clsx("col col--6 col--lg-3")}>
      <div className="text--center">
        <img src={colorMode === "light" ? path + ".png" : path + "-dark.png"} className={styles.featureSvg} alt={title} />
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
