import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Translate, {translate} from "@docusaurus/Translate";
import {useColorMode} from "@docusaurus/theme-common";

const FeatureList = [
  {
    title: translate({
      message: "Easy to Use",
    }),
    path: "/img/model",
    description: (
      <>
        <Translate>
        Within a few steps, we can setup a Casdoor app and realize our authorization management.
        </Translate>
      </>
    ),
  },
  {
    title: translate({
      message: "Frontend Backend Separation",
    }),
    path: "/img/storage",
    description: (
      <>
        <Translate>
        Casdoor has a front-end back-end separation architecture, with maneuverable web UI and supporting high concurrency.
        </Translate>
      </>
    ),
  },
  {
    title: translate({
      message: "Supporting Multi-Language",
    }),
    path: "/img/language",
    description: (
      <>
        <Translate>Casdoor is supporting multi-languages, using i18n to support multi-languages UI. For more languages support, welcome to propose in</Translate> <a href="https://github.com/casdoor/"><Translate>our community</Translate></a>.
      </>
    ),
  },
];

function Feature({title, path, description}) {
  const {colorMode} = useColorMode();
  return (
    <div className={clsx("col col--4")}>
      <div className={clsx("text--center", styles.featureCard)}>
        <img src={colorMode === "light" ? path + ".png" : path + "-dark.png"} className={styles.featureSvg} alt={title} />
        <h3 style={{fontSize: "1.5rem", fontWeight: "700", marginTop: "1.5rem", marginBottom: "1rem"}}>{title}</h3>
        <p style={{fontSize: "1.1rem", lineHeight: "1.6"}}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className="text--center" style={{fontSize: "2.5rem", fontWeight: "700", marginBottom: "4rem"}}><Translate>Why Choose Casdoor?</Translate></h2>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
