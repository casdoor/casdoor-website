import React, { useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.scss';
import HomepageFeatures from '../components/HomepageFeatures';
import Translate, {translate} from '@docusaurus/Translate';

function FrameMask(props){
  const [mouseState, setMouseState] = useState({state:false});
  const maskStyle = {position: 'absolute', top: '0px', left: '0px', zIndex: 10, height: '100%', width: '100%', background: 'rgba(0,0,0,0.4)', cursor:'pointer'};
  const handleMouseEnter = () => {
    setMouseState({
      ...mouseState,
      state: true
    })

  }
  const handleMouseLeave = () => {
    setMouseState({
      ...mouseState,
      state: false
    })
  }
  return(
    <div className={props.className} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    <iframe src={props.src} width={props.width} height= {props.height} frameBorder="0" scrolling="no"></iframe>
    <div style={maskStyle} hidden={!mouseState.state} onClick={() => { window.open(props.src) }}>
        <Link
          className="button button--secondary button--lg"
          style={{marginTop: "50%", marginRight: "3rem", marginLeft: "3rem"}}>
          <Translate>Online Demo</Translate>
        </Link>
    </div>
    </div>
  )
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title"><Translate>Casdoor</Translate></h1>
        <br />
        <p className="hero__subtitle" style={{margin: "0 auto", maxWidth: 700}}><Translate>A UI-first Identity Access Management (IAM) / Single-Sign-On (SSO) platform supporting OAuth 2.0, OIDC, SAML and CAS, integrated with Casbin RBAC and ABAC permission management</Translate></p>
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
      <FrameMask className={styles.headerborder} src="https://door.casdoor.com/login" width="550" height= "700"></FrameMask>
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
            <Translate>As an authentication platform, </Translate><br /><Translate>Casdoor implements the authentication by communicating with providers and users.</Translate>
          </div>
          </div>
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
          <div className="col">
            <br />
            <br />
            <br />
            <br />
            <Translate>Casdoor is a powerful authentication platform.</Translate>
            <br />
            <Translate>With supporting for</Translate>
            <br />
            <img src="https://cdn.casbin.org/img/social_google.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_github.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_facebook.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_twitter.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_linkedin.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_weibo.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_wechat.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_qq.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_dingtalk.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_gitee.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_wecom.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_mail.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_msg.png" width="30"></img>
            <br />
            <Translate>third-party application login, You can choose your favorite social network to login.</Translate>
            <br />
            <Translate>And Casdoor support the extension of third-party login with plugins.</Translate>
            <br />
            <Translate>For more details about third-party login, please visit</Translate> <Link to="/docs/provider/overview"><Translate>provider</Translate></Link>
            <br />
            <Translate>And if your want more providers, please propose it in</Translate> <Link href="https://github.com/casdoor/casdoor"><Translate>our Casdoor community</Translate></Link>
          </div>
          <FrameMask className={styles.signingradientborder} src="https://door.casdoor.com/login" width="600" height= "700"></FrameMask>
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
          <FrameMask className={styles.gradientborder} src="https://door.casdoor.com/signup" width="600" height= "795"></FrameMask>
          <div className="col">
            <br />
            <br />
            <br />
            <br />
            <br />
            <Translate>Casdoor also support sign up directly. By filling your</Translate> <b><Translate>Username</Translate></b>, <b><Translate>Display name</Translate></b>, <b><Translate>Password</Translate></b> <Translate>and</Translate> <b><Translate>Email</Translate></b><Translate>, after your receive your</Translate> <b><Translate>Email code</Translate></b><Translate>, you can sign up in Casdoor.</Translate>
          </div>
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
          <div className="col">
            <br />
            <br />
            <br />
            <br />
            <p className="padding-horiz--md">
            <Translate>Casdoor support forget and retrieve password feature.</Translate>
            <br />
            <Translate>To retrieve your password, you can enter your username, email or phone linked to your account and enter the verification code sent to your email or your phone, enter your new password and confirm to reset your new password.</Translate>
            </p>
          </div>
          <FrameMask className={styles.gradientborder} src="https://door.casdoor.com/forget" width="600" height= "620"></FrameMask>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Casdoor · A UI-first Identity Access Management (IAM) / Single-Sign-On (SSO) platform supporting OAuth 2.0, OIDC, SAML and CAS`}
      description="Casdoor is a UI-first Identity Access Management (IAM) / Single-Sign-On (SSO) platform supporting OAuth 2.0, OIDC, SAML and CAS">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <LearnHowTo />
        <ContentLogin />
        <ContentSignup />
        <ContentForget />
      </main>
    </Layout>
  );
}
