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
        <p className="hero__subtitle" style={{margin: "0 auto", maxWidth: 700}}><Translate>A modern UI-first Identity and Access Management (IAM) / Single Sign-On (SSO) platform supporting OAuth 2.0, OIDC, SAML, CAS, LDAP, SCIM, WebAuthn, TOTP, MFA, RADIUS, Google Workspace, Active Directory, and Kerberos</Translate></p>
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
              <Translate>As an authentication platform, Casdoor provides authentication services by seamlessly integrating with identity providers and managing user authentication flows.</Translate>
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
              {"The Casdoor SDK provides comprehensive features including identity authentication, user management, and resource uploads. Integrating with Casdoor is straightforward—visit {docLink} for detailed instructions."}
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
            <Translate>Casdoor is a powerful authentication platform with support for multiple identity providers.</Translate>
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
            <Translate>Enable third-party authentication and let users sign in with their preferred social network or identity provider. Casdoor also supports extending authentication options through custom plugins.</Translate>
            <br />
            <Translate>For more information about identity providers, visit our</Translate> <Link
              to="/docs/provider/overview"><Translate>provider documentation</Translate></Link>.{" "}
            <Translate>If you need additional providers, please submit a request to</Translate> <Link
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
            <Translate>Casdoor also supports direct user registration. Users can sign up by providing their</Translate> <b><Translate>Username</Translate></b>, <b><Translate>Display Name</Translate></b>, <b><Translate>Password</Translate></b>, <Translate>and</Translate> <b><Translate>Email</Translate></b>. <Translate>After receiving the verification</Translate> <b><Translate>Email Code</Translate></b>, <Translate>they can complete the registration process.</Translate>
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
              <Translate>Casdoor provides password recovery functionality.</Translate>
              {" "}
              <Translate>To reset your password, enter your username, email, or phone number associated with your account. You&apos;ll receive a verification code via email or SMS. Enter the code along with your new password to complete the reset process.</Translate>
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
            {"Hundreds of projects use Casdoor, from Fortune 500 companies to innovative startups. To see what's possible with Casdoor, {UsersPage}!"}
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
      title={"Casdoor · An open-source UI-first Identity and Access Management (IAM) / Single-Sign-On (SSO) platform with web UI supporting OAuth 2.0, OIDC, SAML, CAS, LDAP, SCIM, WebAuthn, TOTP, MFA, RADIUS, Google Workspace, Active Directory and Kerberos"}
      description="Casdoor is an open-source UI-first Identity and Access Management (IAM) / Single-Sign-On (SSO) platform with web UI supporting OAuth 2.0, OIDC, SAML, CAS, LDAP, SCIM, WebAuthn, TOTP, MFA, RADIUS, Google Workspace, Active Directory and Kerberos">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <LearnHowTo />
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
