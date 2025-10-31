import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Translate, {translate} from "@docusaurus/Translate";

function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]" />
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              <Translate>Open-source Identity and Access Management</Translate>
            </h1>
            <p className="mt-6 text-lg leading-8 text-purple-100 sm:text-xl">
              <Translate>
                A modern UI-first IAM / SSO platform supporting OAuth 2.0, OIDC, SAML, CAS, LDAP, SCIM, WebAuthn, TOTP, MFA, and more
              </Translate>
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/docs/overview"
                className="rounded-lg bg-white px-6 py-3.5 text-base font-semibold text-purple-900 shadow-sm hover:bg-purple-50 hover:no-underline hover:text-purple-900 transition-all"
              >
                <Translate>Get Started</Translate>
              </Link>
              <Link
                to="https://door.casdoor.com/"
                className="rounded-lg border-2 border-white/30 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 hover:no-underline hover:text-white transition-all"
              >
                <Translate>Live Demo</Translate> →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({title, description, icon}) {
  return (
    <div className="group relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-3xl">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: translate({message: "OAuth 2.0 & OIDC"}),
      description: translate({message: "Full support for OAuth 2.0 and OpenID Connect protocols with easy integration"}),
      icon: "🔐",
    },
    {
      title: translate({message: "Multiple Providers"}),
      description: translate({message: "Connect with Google, GitHub, Facebook, and 100+ identity providers"}),
      icon: "🌐",
    },
    {
      title: translate({message: "Multi-Factor Auth"}),
      description: translate({message: "Enhanced security with TOTP, WebAuthn, SMS, and email verification"}),
      icon: "🛡️",
    },
    {
      title: translate({message: "LDAP & SAML"}),
      description: translate({message: "Enterprise-ready with LDAP, SAML, and Active Directory support"}),
      icon: "🏢",
    },
    {
      title: translate({message: "Easy Integration"}),
      description: translate({message: "SDKs for all major languages and frameworks with comprehensive docs"}),
      icon: "⚡",
    },
    {
      title: translate({message: "Modern UI"}),
      description: translate({message: "Beautiful, responsive admin panel built with React for easy management"}),
      icon: "✨",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            <Translate>Everything you need for authentication</Translate>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            <Translate>Powerful features to secure your applications and manage users</Translate>
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CTASection() {
  return (
    <div className="bg-purple-900 dark:bg-purple-950">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <Translate>Ready to get started?</Translate>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-purple-100">
            <Translate>
              Join thousands of developers using Casdoor for authentication and access management
            </Translate>
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/docs/basic/server-installation"
              className="rounded-lg bg-white px-6 py-3.5 text-base font-semibold text-purple-900 shadow-sm hover:bg-purple-50 hover:no-underline hover:text-purple-900 transition-all"
            >
              <Translate>Install Now</Translate>
            </Link>
            <Link
              to="https://github.com/casdoor/casdoor"
              className="rounded-lg border-2 border-white/30 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 hover:no-underline hover:text-white transition-all"
            >
              <Translate>View on GitHub</Translate> →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Layout
      title={translate({message: "Casdoor · Open-source Identity and Access Management Platform"})}
      description={translate({message: "An open-source UI-first IAM / SSO platform with web UI supporting OAuth 2.0, OIDC, SAML, and more"})}
    >
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </Layout>
  );
}
