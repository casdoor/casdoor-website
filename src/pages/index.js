import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <br />
        <p className="hero__subtitle" style={{margin: "0 auto", maxWidth: 700}}>{siteConfig.tagline}</p>
        <br />
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            style={{marginTop: "2rem", marginRight: "3rem", marginLeft: "3rem"}}
            to="/docs/overview">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            style={{marginTop: "2rem", marginRight: "3rem", marginLeft: "3rem"}}
            to="https://door.casbin.com/">
            Online Demo
          </Link>
        </div>
      </div>
      <div className={styles.headerborder}>
      <iframe src="https://door.casbin.com/login" width="550" height= "620" frameborder="0" scrolling="no">Your browser</iframe>
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
            Casdoor is a powerful authentication platform.
          <br />
          With supporting for
          <br />
          <img src="https://cdn.casbin.org/img/social_google.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_github.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_facebook.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_twitter.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_linkedin.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_weibo.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_wechat.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_qq.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_dingtalk.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_gitee.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_wecom.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_mail.png" width="30"></img> <img src="https://cdn.casbin.org/img/social_msg.png" width="30"></img>
          <br />
          third-party application login, You can choose your favorite social network to login.
          <br />
          And Casdoor support the extension of third-party login with plugins.
          <br />
          For more details about third-party login, please visit <Link to="/docs/provider/overview">provider</Link>
          <br />
          And if your want more providers, please propose it in <Link href="https://github.com/casbin/casdoor">our Casdoor community</Link>
          </div>
          <div className={styles.gradientborder}>
            <iframe src="https://door.casbin.com/login" width="600" height= "620" frameborder="0" scrolling="no"></iframe>
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
          Casdoor also support sign up directly. By filling your <b>Username</b>, <b>Display name</b>, <b>Password</b> and <b>Email</b>, after your receive your <b>Email code</b>, you can sign up in Casdoor, 
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
            Casdoor support forget and retrieve password feature.
            <br />
            To retrieve your password, you can enter your username, email or phone linked to your account and enter the verification code sent to your email or your phone, enter your new password and confirm to reset your new password.
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
