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

  const handleClick = (src) => {
    if (localStorage.getItem("mainland") === "true") {
      window.open("https://dooc.casdoor.com/" + src);
    } else {
      window.open("https://door.casdoor.org/" + src);
    }
  };

  return (
    <div className={props.className} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <CasdoorCard src={props.src} width={props.width} height={props.height} />
      <div style={maskStyle} hidden={!mouseState.state} onClick={() => {handleClick(props.src);}}>
        <Link
          className="button button--secondary button--lg"
          style={{marginTop: "50%", marginRight: "3rem", marginLeft: "3rem"}}>
          <Translate>Online Demo</Translate>
        </Link>
      </div>
    </div>
  );
}

function HomepageHeader() {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title"><Translate>Casdoor</Translate></h1>
        <br />
        <p className="hero__subtitle" style={{margin: "0 auto", maxWidth: 700}}><Translate>A UI-first Identity
          Access Management (IAM) / Single-Sign-On (SSO) platform supporting OAuth 2.0, OIDC, SAML and CAS,
          integrated with Casbin RBAC and ABAC permission management</Translate></p>
        <br />
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            style={{marginTop: "2rem", marginRight: "3rem", marginLeft: "3rem"}}
            to="/docs/overview">
            <Translate>Get Started</Translate>
          </Link>
          <Link
            className="button button--secondary button--lg"
            style={{marginTop: "2rem", marginRight: "3rem", marginLeft: "3rem"}}
            to="https://door.casdoor.com/">
            <Translate>Online Demo</Translate>
          </Link>
        </div>
      </div>
      <FrameMask className={styles.headerborder} src="login" width="550" height="720" />
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
              <Translate>As an authentication platform, </Translate><br /><Translate>Casdoor implements the
                authentication by communicating with providers and users.</Translate>
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
              {"Casdoor SDK provides many functions, such as identity authentication, user management, resource upload, etc. Access to Casdoor is very convenient, please visit {docLink} for details."}
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
          <FrameMask className={styles.gradientborder} src="login" width="600" height="730" />
          <div className="col">
            <br /><br /><br /><br />
            <Translate>Casdoor is a powerful authentication platform.</Translate>
            <br />
            <Translate>With supporting for</Translate>
            <br />
            <img src="https://cdn.casbin.org/img/social_google.png" width="30"></img>
            <img src="https://cdn.casbin.org/img/social_github.png" width="30"></img>
            <img src="https://cdn.casbin.org/img/social_facebook.png" width="30"></img>
            <img src="https://cdn.casbin.org/img/social_twitter.png" width="30"></img>
            <img src="https://cdn.casbin.org/img/social_linkedin.png" width="30"></img>
            <img src="https://cdn.casbin.org/img/social_weibo.png" width="30"></img>
            <img src="https://cdn.casbin.org/img/social_wechat.png" width="30"></img>
            <img src="https://cdn.casbin.org/img/social_qq.png" width="30"></img>
            <img src="https://cdn.casbin.org/img/social_dingtalk.png" width="30"></img>
            <img src="https://cdn.casbin.org/img/social_gitee.png" width="30"></img>
            <img src="https://cdn.casbin.org/img/social_wecom.png" width="30"></img>
            <img src="https://cdn.casbin.org/img/social_mail.png" width="30"></img>
            <img src="https://cdn.casbin.org/img/social_msg.png" width="30"></img>
            <br />
            <Translate>third-party application login, You can choose your favorite social network to
              login.</Translate>
            <br />
            <Translate>And Casdoor support the extension of third-party login with plugins.</Translate>
            <br />
            <Translate>For more details about third-party login, please visit</Translate> <Link
              to="/docs/provider/overview"><Translate>provider</Translate></Link>
            <br />
            <Translate>And if your want more providers, please propose it in</Translate> <Link
              href="https://github.com/casdoor/casdoor"><Translate>our Casdoor community</Translate></Link>
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
            <Translate>Casdoor also support sign up directly. By filling your</Translate> <b><Translate>Username</Translate></b>, <b><Translate>Display name</Translate></b>, <b><Translate>Password</Translate></b> <Translate>and</Translate> <b><Translate>Email</Translate></b><Translate>, after your receive your</Translate> <b><Translate>Email code</Translate></b><Translate>, you can sign up in Casdoor.</Translate>
          </div>
          <FrameMask className={styles.gradientborder} src="signup" width="600" height="795" />
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
          <FrameMask className={styles.gradientborder} src="forget" width="600" height="620" />
          <div className="col">
            <br /><br /><br /><br />
            <p className="padding-horiz--md">
              <Translate>Casdoor support forget and retrieve password feature.</Translate>
              <br />
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
  return (
    <div className="hero text--center showcase">
      <div className="container">
        <div className="product-showcase-section">
          <h1><Translate>Who&apos;s using Casbin?</Translate></h1>
        </div>
        <p style={{
          width: "50vw",
          margin: "auto",
        }}>
          <Translate values={{
            UsersPage: (
              <Link to="/users">
                <Translate>check out these apps</Translate>
              </Link>
            ),
          }}>
            {"Hundreds of projects are using Casbin, from established Fortune 500 companies to hot new startups.If you're curious to see what can be accomplished Casbin, {UsersPage}!"}
          </Translate>
        </p>
        <br /><br />
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
      title={"Casdoor · An Open Source UI-first Identity Access Management (IAM) / Single-Sign-On (SSO) platform supporting OAuth 2.0, OIDC, SAML and CAS"}
      description="Casdoor is an Open Source UI-first Identity Access Management (IAM) / Single-Sign-On (SSO) platform supporting OAuth 2.0, OIDC, SAML and CAS">
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
