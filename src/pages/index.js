import React from 'react';
import { gsap } from 'gsap';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.scss';
import HomepageFeatures from '../components/HomepageFeatures';

import Translate, {translate} from '@docusaurus/Translate';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  const onEnter = ({ currentTarget }) => {
    gsap.to(currentTarget, {
      duration: 0.5,
      scale: 1,
    });
  };

  const onLeave = ({ currentTarget }) => {
    gsap.to(currentTarget, {
      duration: 0.5,
      scale: 0.85,
    });
  };

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title"><Translate>Casdoor</Translate></h1>
        <br />
        <p className="hero__subtitle" style={{margin: "0 auto", maxWidth: 700}}><Translate>A UI-first centralized authentication / Single-Sign-On (SSO) platform based on OAuth 2.0 / OIDC</Translate></p>
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
            to="https://door.casbin.com/">
            <Translate>Online Demo</Translate>
          </Link>
        </div>
      </div>
      <div className={styles.headerborder} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <iframe src="https://door.casbin.com/login" width="550" height= "620" frameborder="0" scrolling="no"></iframe>
      </div>
    </header>
  );
}

function ContentLogin() {
  return (
    <div className={styles.contentlogin}>
      <div className="container text--center">
        <div className="row">
          <div className="col">
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
          <Translate>And if your want more providers, please propose it in</Translate> <Link href="https://github.com/casbin/casdoor"><Translate>our Casdoor community</Translate></Link>
          </div>
          <div className={styles.signingradientborder}>
            <iframe src="https://door.casbin.com/login/oauth/authorize?client_id=014ae4bd048734ca2dea&response_type=code&redirect_uri=https://forum.casbin.com/callback&scope=read&state=app-casbin-forum" width="600" height= "680" frameborder="0" scrolling="no"></iframe>
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
        <div className={styles.gradientborder}>
            <iframe src="https://door.casbin.com/signup" width="600" height= "620" frameborder="0" scrolling="no"></iframe>
          </div>
          <div className="col">
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
            <p className="padding-horiz--md">
            <Translate>Casdoor support forget and retrieve password feature.</Translate>
            <br />
            <Translate>To retrieve your password, you can enter your username, email or phone linked to your account and enter the verification code sent to your email or your phone, enter your new password and confirm to reset your new password.</Translate>
            </p>
          </div>
          <div className={styles.gradientborder}>
            <iframe src="https://door.casbin.com/forget" width="600" height= "620" frameborder="0" scrolling="no"></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`A UI-first centralized authentication / Single-Sign-On (SSO) platform based on OAuth 2.0 / OIDC`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <ContentLogin />
        <ContentSignup />
        <ContentForget />
      </main>
    </Layout>
  );
}
