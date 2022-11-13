import React from "react";
import Layout from "@theme/Layout";
import Translate from "@docusaurus/Translate";

function PDF() {
  return (
    <Layout title="PDF" description="PDF download page">
      <div className="hero hero--primary" style={{height: "25rem", color: "#E3E3E3"}}>
        <div className="container">
          <h1 className="hero__title">
            <Translate>
              PDF download
            </Translate>
          </h1>
          <p className="hero__subtitle">
            <Translate>
              We provide you with pdf for offline reading
            </Translate>
          </p>
          <div>
            <a
              className="button button--secondary button--lg"
              style={{marginRight: "2rem"}}
              target="_blank"
              href="Casdoor_Docs.pdf"
            >
              <Translate>
                English
              </Translate>
            </a>
            <a
              className="button button--secondary button--lg"
              target="_blank"
              href="Casdoor_Docs_zh.pdf"
            >
              <Translate>
                Chinese
              </Translate>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PDF;
