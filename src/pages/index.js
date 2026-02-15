import React, {useState} from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.scss";
import HomepageFeatures from "../components/HomepageFeatures";
// eslint-disable-next-line unused-imports/no-unused-imports
import Translate, {translate} from "@docusaurus/Translate";
import CasdoorCard from "../components/CasdoorCard";
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
      </div>
      <FrameMask className={styles.headerborder} src="https://door.casdoor.com/login" width="550" height="720" />
    </header>
  );
}

function LearnHowTo() {
  return (
    <div className={styles.explain}>
      <div className="container text--center">
        <div className="row">
          <div className={styles.explaingif}>
            <img src="/img/principles.gif" alt="Casdoor work principle" height="90%" width="90%"></img>
          </div>
          <div className="col">
            <div className={styles.explaintext}>
              <br />
              <Translate>As a comprehensive authentication and authorization platform, Casdoor delivers enterprise-grade identity management through seamless integration with leading identity providers and sophisticated user authentication workflows.</Translate>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MCPSection() {
  return (
    <div className={styles.contentinterface}>
      <div className="container text--center">
        <h2><Translate>MCP & AI Agent Authentication</Translate></h2>
        <br />
        <div className="row">
          <div className="col" style={{margin: "auto"}}>
            <p style={{fontSize: "1.1rem", lineHeight: "1.8"}}>
              <Translate>Casdoor provides a built-in MCP server that lets AI agents manage users, applications, and permissions through natural language. Every MCP tool call is authenticated and authorized with fine-grained, scope-based permissions.</Translate>
            </p>
            <br />
            <Translate description="MCP documentation" values={{
              docLink: (
                <Link href="/docs/how-to-connect/mcp/integration">
                  <Translate>MCP documentation</Translate>
                </Link>
              ),
            }}>
              {"Configure AI tools like Claude Desktop, Cursor, or any MCP-compatible client to connect to Casdoor's MCP endpoint. See our {docLink} for setup instructions and secure token management."}
            </Translate>
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
        <br />
        <div className="row" style={{marginTop: "2rem"}}>
          <div className="col text--center">
            <h3><Translate>Works with AI Tools</Translate></h3>
            <br />
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
    </div>
  );
}

function ContentInterface() {
  return (
    <div className={styles.contentinterface}>
      <div className="container text--center">
        <div className="row">
          <div className="col" style={{margin: "auto"}}>
            <Translate description="Help page forum" values={{
              docLink: (
                <Link href="/docs/category/how-to-connect-to-casdoor">
                  <Translate>How to Connect to Casdoor</Translate>
                </Link>
              ),
            }}>
              {"The Casdoor SDK offers a complete suite of features including identity authentication, user management, and resource uploads. Integration is straightforward and well-documented—visit {docLink} to get started quickly."}
            </Translate>
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
    </div>
  );
}

function ContentLogin() {
  return (
    <div className={styles.contentlogin}>
      <div className="container text--center">
        <div className="row">
          <FrameMask className={styles.gradientborder} src="https://door.casdoor.com/login" width="600" height="730" />
          <div className="col">
            <br /><br /><br /><br />
            <Translate>Casdoor is an enterprise-grade authentication platform that supports over 100 identity providers, enabling users to sign in with their preferred social networks and enterprise identity systems.</Translate>
            <br />
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", padding: "10px 0"}}>
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
            <br />
            <Translate>Enable third-party authentication to provide users with flexible sign-in options across social networks and enterprise identity providers. Casdoor&apos;s extensible architecture supports custom authentication plugins for specialized requirements.</Translate>
            <br />
            <Translate>For more information about identity providers, visit our</Translate> <Link
              to="/docs/provider/overview"><Translate>provider documentation</Translate></Link>.{" "}
            <Translate>If you require additional providers, please submit a request to</Translate> <Link
              href="https://github.com/casdoor/casdoor"><Translate>our community</Translate></Link>.
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentSignup() {
  return (
    <div className={styles.contentsignup}>
      <div className="container text--center">
        <div className="row">
          <div className="col">
            <br /><br /><br /><br /><br />
            <Translate>Casdoor provides streamlined direct user registration. New users can sign up by providing their</Translate> <b><Translate>Username</Translate></b>, <b><Translate>Display Name</Translate></b>, <b><Translate>Password</Translate></b>, <Translate>and</Translate> <b><Translate>Email</Translate></b>. <Translate>After receiving and entering the verification</Translate> <b><Translate>Email Code</Translate></b>, <Translate>registration is complete.</Translate>
          </div>
          <FrameMask className={styles.gradientborder} src="https://door.casdoor.com/signup" width="600" height="850" />
        </div>
      </div>
    </div>
  );
}

function ContentForget() {
  return (
    <div className={styles.contentforget}>
      <div className="container text--center">
        <div className="row">
          <FrameMask className={styles.gradientborder} src="https://door.casdoor.com/forget" width="700" height="620" />
          <div className="col">
            <br /><br /><br /><br />
            <p className="padding-horiz--md">
              <Translate>Casdoor provides secure password recovery functionality.</Translate>
              {" "}
              <Translate>To reset your password, enter the username, email, or phone number associated with your account. You&apos;ll receive a verification code via email or SMS. Simply enter the code along with your new password to complete the reset process.</Translate>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Showcase() {
  const windowSize = useWindowSize();
  const isMobile = windowSize === "mobile";

  return (
    <div className="hero text--center showcase">
      <div className="container">
        <h1><Translate>Who&apos;s using Casdoor?</Translate></h1>
        <p style={{
          width: isMobile ? "90%" : "50vw",
          margin: "auto",
        }}>
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
        <br /><br />
        <UserList />
      </div>
    </div>
  );
}

function OpenCollective() {
  const windowSize = useWindowSize();
  const isMobile = windowSize === "mobile";

  if (isMobile) {
    return (
      <iframe title="Sponsors" src="https://opencollective.com/casbin/banner.html" style={{width: "100%", height: "1100px", display: "block"}}></iframe>
    );
  } else {
    return (
      <iframe title="Sponsors" src="https://opencollective.com/casbin/banner.html" style={{width: "100%", height: "650px", display: "block"}}></iframe>
    );
  }
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
        <OpenCollective />
      </main>
    </Layout>
  );
}
