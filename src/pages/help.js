import React from "react";
import Layout from "@theme/Layout";
import Translate from "@docusaurus/Translate";

function Help() {
  return (
    <Layout title="Help" description="Help Page" styles={{padding: "19px"}}>
      <div className="container text--center">
        <br />
        <br />
        <h1><Translate>Need help?</Translate></h1>
        <Translate>If you need help with Casdoor, try one of these options.</Translate>
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col">
            <h2>Discord</h2>
            <Translate
              values={{
                discordLink: (
                  <a href="https://discord.gg/5rPsrAzK7S" target="_blank" rel="noopener noreferrer">
                    <Translate>Discord</Translate>
                  </a>
                ),
              }}
            >
              {"Join the conversation on {discordLink} to get help from contributors."}
            </Translate>
          </div>
          <div className="col">
            <h2>Github</h2>
            <Translate
              values={{
                repoLink: (
                  <a href="https://github.com/casdoor/casdoor" target="_blank" rel="noopener noreferrer">
                    <Translate>GitHub repo</Translate>
                  </a>
                ),
                issueLink: (
                  <a href="https://github.com/casdoor/casdoor/issues" target="_blank" rel="noopener noreferrer">
                    <Translate>issues</Translate>
                  </a>
                ),
                prLink: (
                  <a href="https://github.com/casdoor/casdoor/pulls" target="_blank" rel="noopener noreferrer">
                    <Translate>pull requests</Translate>
                  </a>
                ),
              }}
            >
              {"Browse our {repoLink} and submit {issueLink} or {prLink} for bugs or feature requests."}
            </Translate>
          </div>
          <div className="col">
            <h2><Translate>Google Groups</Translate></h2>
            <Translate
              values={{
                googleGroupsLink: (
                  <a href="https://groups.google.com/g/casdoor" target="_blank" rel="noopener noreferrer">
                    <Translate>Google Groups</Translate>
                  </a>
                ),
              }}
            >
              {"Discuss with maintainers or share your experience with Casdoor on {googleGroupsLink}."}
            </Translate>
          </div>
          <div className="col">
            <h2><Translate>Stack Overflow</Translate></h2>
            <Translate
              values={{
                stackOverflowLink: (
                  <a href="https://stackoverflow.com/search?q=casdoor" target="_blank" rel="noopener noreferrer">
                    <Translate>Stack Overflow</Translate>
                  </a>
                ),
              }}
            >
              {"Ask questions about Casdoor on {stackOverflowLink}."}
            </Translate>
          </div>
        </div>
      </div>
      <br />
      <br />
    </Layout>
  );
}

export default Help;
