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
        Set up a Casdoor application in just a few steps and manage your authentication and authorization with ease.
        </Translate>
      </>
    ),
  },
  {
    title: translate({
      message: "Frontend-Backend Separation",
    }),
    path: "/img/storage",
    description: (
      <>
        <Translate>
        Built with a modern frontend-backend separation architecture, Casdoor provides an intuitive web UI while supporting high concurrency.
        </Translate>
      </>
    ),
  },
  {
    title: translate({
      message: "Multi-Language Support",
    }),
    path: "/img/language",
    description: (
      <>
        <Translate>Casdoor supports multiple languages through i18n, providing a localized UI experience. To request support for additional languages, please visit</Translate> <a href="https://github.com/casdoor/"><Translate>our community</Translate></a>.
      </>
    ),
  },
];

function Feature({title, path, description}) {
  const {colorMode} = useColorMode();
  return (
    <div className={clsx("col col--4")}>
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
