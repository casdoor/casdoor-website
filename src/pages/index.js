import React, {useState} from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.scss";
import HomepageFeatures from "../components/HomepageFeatures";
// eslint-disable-next-line unused-imports/no-unused-imports
import Translate, {translate} from "@docusaurus/Translate";
import CasdoorCard from "../components/CasdoorCard";
import HeroLoginCarousel from "../components/HeroLoginCarousel";
import TabList from "../components/TabList";
import TabItem from "@theme/TabItem";
import CodeCard from "../components/CodeCard";
import {UserList} from "@site/src/components/UserList";
import {useWindowSize} from "@docusaurus/theme-common";

function FrameMask(props) {
  const [mouseState, setMouseState] = useState({state: false});
  const windowSize = useWindowSize();
  const isMobile = windowSize === "mobile";

  const maskStyle = {
    position: "absolute",
    top: "0px",
    left: "0px",
    zIndex: 10,
    height: "100%",
    width: "100%",
    background: "rgba(0,0,0,0.4)",
    cursor: "pointer",
    borderRadius: "20px",
  };
  const handleMouseEnter = () => {
    setMouseState({
      ...mouseState,
      state: true,
    });

  };
  const handleMouseLeave = () => {
    setMouseState({
      ...mouseState,
      state: false,
    });
  };

  return (
    <div className={props.className} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <CasdoorCard src={props.src} width={props.width} height={props.height} />
      <div style={maskStyle} hidden={!mouseState.state} onClick={() => {window.open(props.src);}}>
        <Link
          className="button button--secondary button--lg"
          style={{marginTop: "50%", marginRight: isMobile ? "1rem" : "3rem", marginLeft: isMobile ? "1rem" : "3rem"}}>
          <Translate>Online Demo</Translate>
        </Link>
      </div>
    </div >
  );
}

function HomepageHeader() {
  const windowSize = useWindowSize();
  const isMobile = windowSize === "mobile";

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title"><Translate>Casdoor</Translate></h1>
        <br />
        <p className="hero__subtitle" style={{margin: "0 auto", maxWidth: 700}}><Translate>Identity & Access Management for the AI Agent era. The first open-source IAM platform with native MCP server, OAuth 2.1 for AI agents, and full support for OAuth 2.0, OIDC, SAML, CAS, LDAP, WebAuthn, MFA, and 100+ identity providers.</Translate></p>
        <br />
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            style={{marginTop: "2rem", marginRight: isMobile ? "1rem" : "3rem", marginLeft: isMobile ? "1rem" : "3rem"}}
            to="/docs/overview">
            <Translate>Get Started</Translate>
          </Link>
          <Link
            className="button button--secondary button--lg"
            style={{marginTop: "2rem", marginRight: isMobile ? "1rem" : "3rem", marginLeft: isMobile ? "1rem" : "3rem"}}
            to="https://door.casdoor.com/">
            <Translate>Online Demo</Translate>
          </Link>
        </div>
        <a
          href="https://landscape.cncf.io/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cncfBadge}
          aria-label="CNCF Landscape">
          <img
            src="https://landscape.cncf.io/images/logo_header.svg"
            alt="CNCF Landscape"
            className={styles.cncfBadgeIcon}
            width={200}
            height={44}
          />
          <span><Translate>Casdoor is part of CNCF Landscape</Translate></span>
        </a>
      </div>
      <HeroLoginCarousel className={styles.headerborder} />
    </header>
  );
}

function LearnHowTo() {
  return (
    <section className={styles.explain}>
      <div className="container text--center">
        <div className={clsx("row", styles.rowAlignCenter)}>
          <div className={styles.explaingif}>
            <img src="/img/principles.gif" alt="Casdoor work principle" height="90%" width="90%"></img>
          </div>
          <div className="col">
            <p className={styles.explaintext}>
              <Translate>As a comprehensive authentication and authorization platform, Casdoor delivers enterprise-grade identity management through seamless integration with leading identity providers and sophisticated user authentication workflows.</Translate>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MCPSection() {
  return (
    <section className={styles.contentinterface}>
      <div className="container text--center">
        <h2 className={styles.sectionTitle}><Translate>MCP & AI Agent Authentication</Translate></h2>
        <div className={clsx("row", styles.rowAlignCenter)}>
          <div className="col" style={{margin: "auto", maxWidth: "42rem"}}>
            <p className={styles.sectionLead}>
              <Translate>Casdoor provides a built-in MCP server that lets AI agents manage users, applications, and permissions through natural language. Every MCP tool call is authenticated and authorized with fine-grained, scope-based permissions.</Translate>
            </p>
            <p className={styles.sectionLead}>
              <Translate description="MCP documentation" values={{
                docLink: (
                  <Link href="/docs/how-to-connect/mcp/integration">
                    <Translate>MCP documentation</Translate>
                  </Link>
                ),
              }}>
                {"Configure AI tools like Claude Desktop, Cursor, or any MCP-compatible client to connect to Casdoor's MCP endpoint. See our {docLink} for setup instructions and secure token management."}
              </Translate>
            </p>
          </div>
          <TabList>
            <TabItem value="claude_desktop_config.json">
              <CodeCard language="json">
                {`{
  "mcpServers": {
    "casdoor": {
      "url": "https://your-casdoor.com/api/mcp",
      "headers": {
        "Authorization": "Bearer <access_token>"
      }
    }
  }
}`}
              </CodeCard>
            </TabItem>
          </TabList>
        </div>
        <div className="row" style={{marginTop: "2rem"}}>
          <div className="col text--center">
            <h3 className={styles.sectionTitle} style={{fontSize: "1.25rem", marginBottom: "0.75rem"}}><Translate>Works with AI Tools</Translate></h3>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", padding: "10px 0", alignItems: "center"}}>
              <div style={{padding: "10px 20px", border: "1px solid var(--ifm-color-emphasis-300)", borderRadius: "8px", fontSize: "1rem", fontWeight: "500"}}>
                Claude Desktop
              </div>
              <div style={{padding: "10px 20px", border: "1px solid var(--ifm-color-emphasis-300)", borderRadius: "8px", fontSize: "1rem", fontWeight: "500"}}>
                Cursor
              </div>
              <div style={{padding: "10px 20px", border: "1px solid var(--ifm-color-emphasis-300)", borderRadius: "8px", fontSize: "1rem", fontWeight: "500"}}>
                Windsurf
              </div>
              <div style={{padding: "10px 20px", border: "1px solid var(--ifm-color-emphasis-300)", borderRadius: "8px", fontSize: "1rem", fontWeight: "500"}}>
                VS Code + GitHub Copilot
              </div>
              <div style={{padding: "10px 20px", border: "1px solid var(--ifm-color-emphasis-300)", borderRadius: "8px", fontSize: "1rem", fontWeight: "500"}}>
                Any MCP Client
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContentInterface() {
  return (
    <section className={styles.contentinterface}>
      <div className="container text--center">
        <h2 className={styles.sectionTitle}><Translate>SDK and Integration</Translate></h2>
        <div className={clsx("row", styles.rowAlignCenter)}>
          <div className="col" style={{margin: "auto"}}>
            <p className={styles.sectionLead}>
              <Translate description="Help page forum" values={{
                docLink: (
                  <Link href="/docs/category/how-to-connect-to-casdoor">
                    <Translate>How to Connect to Casdoor</Translate>
                  </Link>
                ),
              }}>
                {"The Casdoor SDK offers a complete suite of features including identity authentication, user management, and resource uploads. Integration is straightforward and well-documented—visit {docLink} to get started quickly."}
              </Translate>
            </p>
          </div>
          <TabList>
            <TabItem value="login.js">
              <CodeCard language="javascript">
                {`login() {
  Setting.signin().then((res) => {
    if (res.status === "ok") {
      Setting.showMessage("success", "Logged in successfully");
      Setting.goToLink("/");
    } else {
      this.setState({
        msg: res.msg,
      });
    }
  });
}`}
              </CodeCard>
            </TabItem>
          </TabList>
        </div>
      </div>
    </section>
  );
}

function ContentLogin() {
  return (
    <section className={styles.contentlogin}>
      <div className="container text--center">
        <h2 className={styles.sectionTitle}><Translate>Login & Identity Providers</Translate></h2>
        <div className={clsx("row", styles.rowAlignCenter)}>
          <FrameMask className={styles.gradientborder} src="https://door.casdoor.com/login" width="600" height="730" />
          <div className="col">
            <p className={styles.sectionLead}>
              <Translate>Casdoor is an enterprise-grade authentication platform that supports over 100 identity providers, enabling users to sign in with their preferred social networks and enterprise identity systems.</Translate>
            </p>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", padding: "1rem 0"}}>
              <img src="https://cdn.casbin.org/img/social_google.png" width="30" alt="Google"></img>
              <img src="https://cdn.casbin.org/img/social_github.png" width="30" alt="GitHub"></img>
              <img src="https://cdn.casbin.org/img/social_facebook.png" width="30" alt="Facebook"></img>
              <img src="https://cdn.casbin.org/img/social_twitter.png" width="30" alt="Twitter"></img>
              <img src="https://cdn.casbin.org/img/social_linkedin.png" width="30" alt="LinkedIn"></img>
              <img src="https://cdn.casbin.org/img/social_weibo.png" width="30" alt="Weibo"></img>
              <img src="https://cdn.casbin.org/img/social_wechat.png" width="30" alt="WeChat"></img>
              <img src="https://cdn.casbin.org/img/social_qq.png" width="30" alt="QQ"></img>
              <img src="https://cdn.casbin.org/img/social_dingtalk.png" width="30" alt="DingTalk"></img>
              <img src="https://cdn.casbin.org/img/social_gitee.png" width="30" alt="Gitee"></img>
              <img src="https://cdn.casbin.org/img/social_wecom.png" width="30" alt="WeCom"></img>
              <img src="https://cdn.casbin.org/img/social_mail.png" width="30" alt="Email"></img>
              <img src="https://cdn.casbin.org/img/social_msg.png" width="30" alt="SMS"></img>
            </div>
            <p className={styles.sectionLead}>
              <Translate>Enable third-party authentication to provide users with flexible sign-in options across social networks and enterprise identity providers. Casdoor&apos;s extensible architecture supports custom authentication plugins for specialized requirements.</Translate>
            </p>
            <p className={styles.sectionLead}>
              <Translate>For more information about identity providers, visit our</Translate>{" "}
              <Link to="/docs/provider/overview"><Translate>provider documentation</Translate></Link>.{" "}
              <Translate>If you require additional providers, please submit a request to</Translate>{" "}
              <Link href="https://github.com/casdoor/casdoor"><Translate>our community</Translate></Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContentSignup() {
  return (
    <section className={styles.contentsignup}>
      <div className="container text--center">
        <h2 className={styles.sectionTitle}><Translate>User Registration</Translate></h2>
        <div className={clsx("row", styles.rowAlignCenter)}>
          <div className="col">
            <p className={styles.sectionLead}>
              <Translate>Casdoor provides streamlined direct user registration. New users can sign up by providing their</Translate>{" "}
              <strong><Translate>Username</Translate></strong>, <strong><Translate>Display Name</Translate></strong>, <strong><Translate>Password</Translate></strong>, <Translate>and</Translate>{" "}
              <strong><Translate>Email</Translate></strong>. <Translate>After receiving and entering the verification</Translate>{" "}
              <strong><Translate>Email Code</Translate></strong>, <Translate>registration is complete.</Translate>
            </p>
          </div>
          <FrameMask className={styles.gradientborder} src="https://door.casdoor.com/signup" width="600" height="850" />
        </div>
      </div>
    </section>
  );
}

function ContentForget() {
  return (
    <section className={styles.contentforget}>
      <div className="container text--center">
        <h2 className={styles.sectionTitle}><Translate>Password Recovery</Translate></h2>
        <div className={clsx("row", styles.rowAlignCenter)}>
          <FrameMask className={styles.gradientborder} src="https://door.casdoor.com/forget" width="700" height="620" />
          <div className="col">
            <p className={styles.sectionLead}>
              <Translate>Casdoor provides secure password recovery functionality.</Translate>{" "}
              <Translate>To reset your password, enter the username, email, or phone number associated with your account. You&apos;ll receive a verification code via email or SMS. Simply enter the code along with your new password to complete the reset process.</Translate>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  const windowSize = useWindowSize();
  const isMobile = windowSize === "mobile";

  return (
    <section className="hero text--center showcase">
      <div className="container">
        <h2 className={styles.sectionTitle} style={{fontSize: "1.75rem"}}><Translate>Who&apos;s using Casdoor?</Translate></h2>
        <p
          className={styles.sectionLead}
          style={{maxWidth: isMobile ? "90%" : "42rem", marginBottom: "2rem"}}
        >
          <Translate values={{
            UsersPage: (
              <Link to="/users">
                <Translate>check out these apps</Translate>
              </Link>
            ),
          }}>
            {"Casdoor powers authentication for hundreds of projects worldwide, from Fortune 500 companies to innovative startups. To see what's possible with Casdoor, {UsersPage}!"}
          </Translate>
        </p>
        <UserList />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title={"Casdoor · AI-Native Identity and Access Management (IAM) / SSO Platform with MCP Server"}
      description="Identity & Access Management for the AI Agent era. The first open-source IAM platform with native MCP server, OAuth 2.1 for AI agents, and full support for OAuth 2.0, OIDC, SAML, CAS, LDAP, WebAuthn, MFA, and 100+ identity providers.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <LearnHowTo />
        <MCPSection />
        <ContentInterface />
        <ContentLogin />
        <ContentSignup />
        <ContentForget />
        <Showcase />
      </main>
    </Layout>
  );
}
