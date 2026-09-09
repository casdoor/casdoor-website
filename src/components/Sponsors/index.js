import React from "react";
import styles from "./styles.module.css";
import Translate, {translate} from "@docusaurus/Translate";

const SponsorList = [
  {
    name: "APIMart",
    url: "https://go.apimart.ai/gh-casdoor",
    logo: "https://cdn.openagentai.org/img/sponsor_apimart.png",
    description: translate({
      message: "APIMart is a low-cost API platform for AI image & video generation — GPT-Image-2 from $0.006/image, 160+ images per dollar. One async API covers both image and video: submit a task, get an ID, fetch results via polling or callback. Batch tens of thousands of images without timeouts, switch models without changing code. Pay-as-you-go with no monthly fee.",
    }),
  },
];

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
          <Translate>Casdoor is free and open source. These companies help keep it that way.</Translate>
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
