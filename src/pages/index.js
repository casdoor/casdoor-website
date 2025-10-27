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
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title" style={{fontSize: "3.5rem", fontWeight: "700", marginBottom: "1.5rem"}}><Translate>Casdoor</Translate></h1>
        <p className="hero__subtitle" style={{margin: "0 auto", maxWidth: 800, fontSize: "1.4rem", lineHeight: "1.8", fontWeight: "400"}}><Translate>A UI-first Identity Access Management (IAM) / Single-Sign-On (SSO) platform with web UI supporting OAuth 2.0, OIDC, SAML, CAS, LDAP, SCIM, WebAuthn, TOTP, MFA, RADIUS, Google Workspace, Active Directory and Kerberos</Translate></p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            style={{marginTop: "2.5rem", padding: "0.8rem 2rem", fontSize: "1.1rem", fontWeight: "600", borderRadius: "8px"}}
            to="/docs/overview">
            <Translate>Get Started</Translate>
          </Link>
          <Link
            className="button button--secondary button--lg"
            style={{marginTop: "2.5rem", padding: "0.8rem 2rem", fontSize: "1.1rem", fontWeight: "600", borderRadius: "8px"}}
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
        <h2 style={{fontSize: "2.5rem", fontWeight: "700", marginBottom: "3rem"}}><Translate>How Casdoor Works</Translate></h2>
        <div className="row">
          <div className={styles.explaingif}>
            <img src="/img/principles.gif" alt="Casdoor work principle" height="90%" width="90%" style={{borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)"}}></img>
          </div>
          <div className="col">
            <div className={styles.explaintext}>
              <p style={{fontSize: "1.25rem", lineHeight: "1.8"}}>
                <Translate>As an authentication platform, </Translate><Translate>Casdoor implements the
                authentication by communicating with providers and users.</Translate>
              </p>
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
        <h2 style={{fontSize: "2.5rem", fontWeight: "700", marginBottom: "2rem"}}><Translate>Easy Integration</Translate></h2>
        <div className="row">
          <div className="col" style={{margin: "auto"}}>
            <p style={{fontSize: "1.2rem", lineHeight: "1.8", marginBottom: "2rem"}}>
              <Translate description="Help page forum" values={{
                docLink: (
                  <Link href="/docs/category/how-to-connect-to-casdoor">
                    <Translate>How to Connect to Casdoor</Translate>
                  </Link>
                ),
              }}>
                {"Casdoor SDK provides many functions, such as identity authentication, user management, resource upload, etc. Access to Casdoor is very convenient, please visit {docLink} for details."}
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
    </div>
  );
}

function ContentLogin() {
  return (
    <div className={styles.contentlogin}>
      <div className="container text--center">
        <h2 style={{fontSize: "2.5rem", fontWeight: "700", marginBottom: "3rem"}}><Translate>Powerful Authentication</Translate></h2>
        <div className="row">
          <FrameMask className={styles.gradientborder} src="https://door.casdoor.com/login" width="600" height="730" />
          <div className="col" style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <p style={{fontSize: "1.2rem", lineHeight: "1.8", marginBottom: "1.5rem"}}>
              <Translate>Casdoor is a powerful authentication platform.</Translate>
              {" "}
              <Translate>With supporting for</Translate>
            </p>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px", padding: "20px 0", margin: "1rem 0"}}>
              <img src="https://cdn.casbin.org/img/social_google.png" width="35" alt="Google" style={{transition: "transform 0.2s"}}></img>
              <img src="https://cdn.casbin.org/img/social_github.png" width="35" alt="GitHub" style={{transition: "transform 0.2s"}}></img>
              <img src="https://cdn.casbin.org/img/social_facebook.png" width="35" alt="Facebook" style={{transition: "transform 0.2s"}}></img>
              <img src="https://cdn.casbin.org/img/social_twitter.png" width="35" alt="Twitter" style={{transition: "transform 0.2s"}}></img>
              <img src="https://cdn.casbin.org/img/social_linkedin.png" width="35" alt="LinkedIn" style={{transition: "transform 0.2s"}}></img>
              <img src="https://cdn.casbin.org/img/social_weibo.png" width="35" alt="Weibo" style={{transition: "transform 0.2s"}}></img>
              <img src="https://cdn.casbin.org/img/social_wechat.png" width="35" alt="WeChat" style={{transition: "transform 0.2s"}}></img>
              <img src="https://cdn.casbin.org/img/social_qq.png" width="35" alt="QQ" style={{transition: "transform 0.2s"}}></img>
              <img src="https://cdn.casbin.org/img/social_dingtalk.png" width="35" alt="DingTalk" style={{transition: "transform 0.2s"}}></img>
              <img src="https://cdn.casbin.org/img/social_gitee.png" width="35" alt="Gitee" style={{transition: "transform 0.2s"}}></img>
              <img src="https://cdn.casbin.org/img/social_wecom.png" width="35" alt="WeCom" style={{transition: "transform 0.2s"}}></img>
              <img src="https://cdn.casbin.org/img/social_mail.png" width="35" alt="Email" style={{transition: "transform 0.2s"}}></img>
              <img src="https://cdn.casbin.org/img/social_msg.png" width="35" alt="SMS" style={{transition: "transform 0.2s"}}></img>
            </div>
            <p style={{fontSize: "1.1rem", lineHeight: "1.8"}}>
              <Translate>third-party application login, You can choose your favorite social network to
              login.</Translate>
              {" "}
              <Translate>And Casdoor support the extension of third-party login with plugins.</Translate>
            </p>
            <p style={{fontSize: "1rem", marginTop: "1rem"}}>
              <Translate>For more details about third-party login, please visit</Translate> <Link
                to="/docs/provider/overview"><Translate>provider</Translate></Link>.{" "}
              <Translate>And if your want more providers, please propose it in</Translate> <Link
                href="https://github.com/casdoor/casdoor"><Translate>our Casdoor community</Translate></Link>.
            </p>
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
        <h2 style={{fontSize: "2.5rem", fontWeight: "700", marginBottom: "3rem"}}><Translate>Easy Registration</Translate></h2>
        <div className="row">
          <div className="col" style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <p style={{fontSize: "1.2rem", lineHeight: "1.8"}}>
              <Translate>Casdoor also support sign up directly. By filling your</Translate> <b><Translate>Username</Translate></b>, <b><Translate>Display name</Translate></b>, <b><Translate>Password</Translate></b> <Translate>and</Translate> <b><Translate>Email</Translate></b><Translate>, after your receive your</Translate> <b><Translate>Email code</Translate></b><Translate>, you can sign up in Casdoor.</Translate>
            </p>
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
        <h2 style={{fontSize: "2.5rem", fontWeight: "700", marginBottom: "3rem"}}><Translate>Password Recovery</Translate></h2>
        <div className="row">
          <FrameMask className={styles.gradientborder} src="https://door.casdoor.com/forget" width="700" height="620" />
          <div className="col" style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <p className="padding-horiz--md" style={{fontSize: "1.2rem", lineHeight: "1.8"}}>
              <Translate>Casdoor support forget and retrieve password feature.</Translate>
              {" "}
              <Translate>To retrieve your password, you can enter your username, email or phone linked to
                your account and enter the verification code sent to your email or your phone, enter
                your new password and confirm to reset your new password.</Translate>
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
    <div className="hero text--center showcase" style={{padding: "80px 0"}}>
      <div className="container">
        <h2 style={{fontSize: "2.5rem", fontWeight: "700", marginBottom: "2rem"}}><Translate>Who&apos;s using Casdoor?</Translate></h2>
        <p style={{
          width: isMobile ? "90%" : "50vw",
          margin: "auto",
          fontSize: "1.2rem",
          lineHeight: "1.8",
          marginBottom: "3rem",
        }}>
          <Translate values={{
            UsersPage: (
              <Link to="/users">
                <Translate>check out these apps</Translate>
              </Link>
            ),
          }}>
            {"Hundreds of projects are using Casdoor, from established Fortune 500 companies to hot new startups.If you're curious to see what can be accomplished Casdoor, {UsersPage}!"}
          </Translate>
        </p>
        <UserList />
      </div>
    </div>
  );
}

function OpenCollective() {
  if (useWindowSize() === "mobile") {
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
