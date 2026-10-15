import React from "react";
import styles from "./styles.module.css";
import Translate from "@docusaurus/Translate";

const SponsorList = [];

function Sponsor({name, url, logo, description}) {
  return (
    <div className={styles.sponsorCard}>
      <a
        className={styles.sponsorLogoLink}
        href={url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label={name}>
        <img className={styles.sponsorLogo} src={logo} alt={name} loading="lazy" />
      </a>
      <div className={styles.sponsorBody}>
        <p className={styles.sponsorText}>
          <Translate values={{
            sponsorLink: (
              <a className={styles.sponsorName} href={url} target="_blank" rel="noopener noreferrer sponsored">{name}</a>
            ),
          }}>
            {"Thanks to {sponsorLink} for sponsoring this project!"}
          </Translate>{" "}
          {description}
        </p>
        <a
          className={styles.sponsorButton}
          href={url}
          target="_blank"
          rel="noopener noreferrer sponsored">
          <Translate>Sign up here</Translate>
        </a>
      </div>
    </div>
  );
}

export default function Sponsors() {
  return (
    <section className={styles.sponsors}>
      <div className="container text--center">
        <h2 className={styles.sponsorsTitle}><Translate>Sponsors</Translate></h2>
        <p className={styles.sponsorsLead}>
          <Translate>Casdoor is free and open source. Sponsor the project and reach our community.</Translate>{" "}
          <a href="mailto:admin@casdoor.org"><Translate>Want to appear here?</Translate></a>
        </p>
        <div className={styles.sponsorGrid}>
          {SponsorList.map((props, idx) => (
            <Sponsor key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
