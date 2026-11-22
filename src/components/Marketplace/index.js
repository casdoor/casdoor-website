import React from "react";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import catalog from "@site/src/data/marketplaceCatalog.json";
import styles from "./styles.module.css";

// The Casdoor Marketplace catalog, generated from casdoor-integrations and casdoor-integrations-pro.
const marketplaceUrl = catalog.url;
const integrations = catalog.integrations;

const featuredThemes = ["midnight", "split", "paper", "pixel"];

function pageUrl(integration) {
  return `${marketplaceUrl}/integrations/${integration.id}/`;
}

function assetUrl(path) {
  return `${marketplaceUrl}${path}`;
}

function Logo({integration, size = 28}) {
  if (integration.logo) {
    return <img className={styles.logo} src={assetUrl(integration.logo)} alt="" width={size} height={size} loading="lazy" />;
  }
  return <span className={styles.logoFallback} style={{width: size, height: size}}>{integration.name.charAt(0)}</span>;
}

function ofType(type) {
  return integrations.filter((i) => i.type === type);
}

// The Marketplace on the homepage: app and provider logos, a few themes and links to the catalog.
export function MarketplaceSection() {
  const chips = [...ofType("app"), ...ofType("provider")];
  const themes = featuredThemes.map((id) => integrations.find((i) => i.id === id)).filter(Boolean);
  return (
    <section className={styles.section}>
      <div className="container text--center">
        <h2 className={styles.title}><Translate>Casdoor Marketplace</Translate></h2>
        <p className={styles.lead}>
          <Translate values={{count: integrations.length}}>
            {"{count} ready-made integrations that you install from the Casdoor console in one click: single sign-on for Grafana, GitLab, Nextcloud and other apps you run, identity provider templates, payment and SMS actions, and sign-in themes. Casdoor creates the application, provider or theme, and removes it again when you uninstall."}
          </Translate>
        </p>
        <div className={styles.chips}>
          {chips.map((integration) => (
            <a key={integration.id} className={styles.chip} href={pageUrl(integration)} target="_blank" rel="noreferrer">
              <Logo integration={integration} size={22} />
              {integration.name}
            </a>
          ))}
        </div>
        <div className={styles.themes}>
          {themes.map((theme) => (
            <a key={theme.id} className={styles.themeCard} href={pageUrl(theme)} target="_blank" rel="noreferrer">
              <img src={assetUrl(theme.screenshot)} alt={`${theme.name} sign-in theme`} loading="lazy" />
              <span>{theme.name}</span>
            </a>
          ))}
        </div>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" href={marketplaceUrl}>
            <Translate>Browse the Marketplace</Translate>
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/marketplace/overview">
            <Translate>How to install an integration</Translate>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Every integration in the catalog, grouped by type, for the docs.
export function MarketplaceCatalog({type}) {
  const items = ofType(type);
  if (type === "theme") {
    return (
      <div className={styles.themeGrid}>
        {items.map((theme) => (
          <a key={theme.id} className={styles.themeCard} href={pageUrl(theme)} target="_blank" rel="noreferrer">
            <img src={assetUrl(theme.screenshot)} alt={`${theme.name} sign-in theme`} loading="lazy" />
            <span>{theme.name}</span>
          </a>
        ))}
      </div>
    );
  }
  return (
    <div className={styles.grid}>
      {items.map((integration) => (
        <a key={integration.id} className={styles.card} href={pageUrl(integration)} target="_blank" rel="noreferrer">
          <span className={styles.cardHead}>
            <Logo integration={integration} />
            <strong>{integration.name}</strong>
            {integration.edition ? <span className={styles.badge}>{integration.edition}</span> : null}
          </span>
          <span className={styles.cardText}>{integration.description}</span>
        </a>
      ))}
    </div>
  );
}

export function MarketplaceCount({type}) {
  return <>{type ? ofType(type).length : integrations.length}</>;
}
