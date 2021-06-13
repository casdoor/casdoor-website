import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('../../static/img/model.svg').default,
    description: (
      <>
        Within a few steps, we can setup a Casdoor app and realize our authorization management.
      </>
    ),
  },
  {
    title: 'Frontend Backend Separation',
    Svg: require('../../static/img/storage.svg').default,
    description: (
      <>
        Casdoor has a front-end back-end separation architecture, with maneuverable web UI and supporting high concurrency.
      </>
    ),
  },
  {
    title: 'Supporting Multi-Language',
    Svg: require('../../static/img/language.svg').default,
    description: (
      <>
        Casdoor is supporting multi-languages, using i18n to support Endlish and Chinese UI. For more language support, welcome to propose in <a href="https://github.com/casbin/">our community</a>.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
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
