import React, {useState} from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Translate, {translate} from "@docusaurus/Translate";
import { useWindowSize } from "@docusaurus/theme-common";
import { motion } from "framer-motion";

// Constants
const DOCKER_INSTALL_COMMAND = "docker run -p 8000:8000 casbin/casdoor:latest";

// Modern Hero Section inspired by Refine
function ModernHeroSection() {
  const windowSize = useWindowSize();
  const isMobile = windowSize === "mobile";
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(DOCKER_INSTALL_COMMAND);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={clsx(
      "relative overflow-hidden",
      "bg-gradient-to-br from-white via-blue-50 to-purple-50",
      "dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20",
      "pt-20 pb-32",
      "sm:pt-24 sm:pb-40",
      "lg:pt-32 lg:pb-48"
    )}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className={clsx(
        "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        "flex flex-col lg:flex-row items-center gap-12"
      )}>
        {/* Left content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center lg:text-left"
        >
          {/* GitHub stars badge */}
          <Link
            href="https://github.com/casdoor/casdoor"
            className={clsx(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full",
              "bg-white dark:bg-gray-800 shadow-md",
              "hover:shadow-lg transition-shadow duration-200",
              "mb-8 no-underline"
            )}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Star us on GitHub
            </span>
            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-semibold">
              10k+
            </span>
          </Link>

          <h1 className={clsx(
            "text-4xl sm:text-5xl lg:text-6xl",
            "font-extrabold tracking-tight",
            "text-gray-900 dark:text-white",
            "mb-6"
          )}>
            <Translate>Modern Identity & Access Management Platform</Translate>
          </h1>

          <p className={clsx(
            "text-lg sm:text-xl",
            "text-gray-600 dark:text-gray-300",
            "mb-8 max-w-2xl",
            isMobile ? "mx-auto" : "lg:mx-0"
          )}>
            <Translate>
              An open-source, UI-first IAM / SSO platform supporting OAuth 2.0, OIDC, SAML, and 100+ identity providers. 
              Build secure authentication in minutes, not months.
            </Translate>
          </p>

          <div className={clsx(
            "flex flex-col sm:flex-row gap-4",
            isMobile ? "items-center" : "lg:items-start"
          )}>
            <Link
              className={clsx(
                "inline-flex items-center justify-center",
                "px-8 py-4 rounded-lg",
                "bg-gradient-to-r from-blue-600 to-purple-600",
                "text-white font-semibold text-lg",
                "hover:from-blue-700 hover:to-purple-700",
                "transform hover:scale-105 transition-all duration-200",
                "shadow-lg hover:shadow-xl",
                "no-underline"
              )}
              to="/docs/overview"
            >
              <Translate>Get Started</Translate>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <Link
              className={clsx(
                "inline-flex items-center justify-center",
                "px-8 py-4 rounded-lg",
                "bg-white dark:bg-gray-800",
                "text-gray-900 dark:text-white font-semibold text-lg",
                "border-2 border-gray-300 dark:border-gray-600",
                "hover:border-blue-500 dark:hover:border-blue-500",
                "transform hover:scale-105 transition-all duration-200",
                "shadow-md hover:shadow-lg",
                "no-underline"
              )}
              to="https://door.casdoor.com/"
            >
              <Translate>Try Demo</Translate>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          </div>

          {/* Quick install command */}
          <div className="mt-8">
            <div className={clsx(
              "inline-flex items-center gap-2",
              "px-4 py-3 rounded-lg",
              "bg-gray-900 dark:bg-gray-800",
              "text-gray-100 font-mono text-sm",
              "border border-gray-700"
            )}>
              <span className="text-green-400">$</span>
              <code>{DOCKER_INSTALL_COMMAND}</code>
              <button
                onClick={handleCopyCommand}
                className={clsx(
                  "p-2 rounded hover:bg-gray-700 transition-colors",
                  copySuccess ? "text-green-400" : "text-gray-400 hover:text-white"
                )}
                title={copySuccess ? "Copied!" : "Copy to clipboard"}
              >
                {copySuccess ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right side - Demo preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 relative"
        >
          <div className={clsx(
            "relative rounded-2xl overflow-hidden shadow-2xl",
            "border-4 border-gray-200 dark:border-gray-700",
            "bg-white dark:bg-gray-800",
            "transform hover:scale-105 transition-transform duration-300"
          )}>
            <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-8">
              <div className="text-center">
                <img
                  src="https://cdn.casdoor.com/casdoor/resource/built-in/admin/casdoor-logo_1185x256.png"
                  alt="Casdoor Logo"
                  className="w-full max-w-md h-auto mx-auto mb-6"
                />
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        <Translate>Secure Authentication</Translate>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        <Translate>OAuth 2.0, OIDC, SAML</Translate>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            <Link
              to="https://door.casdoor.com/"
              className={clsx(
                "absolute inset-0 flex items-center justify-center",
                "opacity-0 hover:opacity-100 transition-opacity duration-200",
                "bg-black/60 backdrop-blur-sm"
              )}
            >
              <span className={clsx(
                "px-6 py-3 rounded-lg",
                "bg-white dark:bg-gray-900 text-gray-900 dark:text-white",
                "font-semibold text-lg shadow-lg",
                "no-underline flex items-center gap-2"
              )}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <Translate>View Live Demo</Translate>
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Feature Cards Section
function FeaturesSection() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: translate({message: "100+ Identity Providers"}),
      description: translate({message: "Integrate with Google, GitHub, Facebook, LDAP, SAML, OAuth, and 100+ more providers out of the box"}),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: translate({message: "Enterprise-Grade Security"}),
      description: translate({message: "MFA, WebAuthn, TOTP, RADIUS, session management, and comprehensive audit logging for complete security"}),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: translate({message: "Developer-Friendly SDKs"}),
      description: translate({message: "Native SDKs for Go, Java, Node.js, Python, PHP, .NET, and more with comprehensive documentation"}),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: translate({message: "Beautiful Admin UI"}),
      description: translate({message: "Modern, responsive admin dashboard for managing users, organizations, applications, and permissions"}),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: translate({message: "Multi-Protocol Support"}),
      description: translate({message: "OAuth 2.0, OIDC, SAML, CAS, LDAP, SCIM - all the protocols you need in one platform"}),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: translate({message: "High Performance"}),
      description: translate({message: "Built with Go for exceptional speed and scalability. Handle millions of users with ease"}),
    },
  ];

  return (
    <div className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={clsx(
            "text-3xl sm:text-4xl lg:text-5xl",
            "font-extrabold tracking-tight",
            "text-gray-900 dark:text-white mb-4"
          )}>
            <Translate>Everything You Need for Modern Authentication</Translate>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            <Translate>
              Casdoor provides all the features you need to build secure, scalable authentication for your applications
            </Translate>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={clsx(
                "p-6 rounded-xl",
                "bg-gradient-to-br from-gray-50 to-white",
                "dark:from-gray-800 dark:to-gray-900",
                "border border-gray-200 dark:border-gray-700",
                "hover:shadow-xl transition-shadow duration-300",
                "group cursor-pointer"
              )}
            >
              <div className={clsx(
                "inline-flex p-3 rounded-lg mb-4",
                "bg-gradient-to-br from-blue-500 to-purple-600",
                "text-white",
                "group-hover:scale-110 transition-transform duration-300"
              )}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Integration Logos Section
function IntegrationsSection() {
  return (
    <div className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={clsx(
            "text-3xl sm:text-4xl font-extrabold",
            "text-gray-900 dark:text-white mb-4"
          )}>
            <Translate>Integrate with Your Favorite Platforms</Translate>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            <Translate>Supports 100+ identity providers and authentication methods</Translate>
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8">
          {[
            { name: "Google", icon: "https://cdn.casbin.org/img/social_google.png" },
            { name: "GitHub", icon: "https://cdn.casbin.org/img/social_github.png" },
            { name: "Facebook", icon: "https://cdn.casbin.org/img/social_facebook.png" },
            { name: "Twitter", icon: "https://cdn.casbin.org/img/social_twitter.png" },
            { name: "LinkedIn", icon: "https://cdn.casbin.org/img/social_linkedin.png" },
            { name: "WeChat", icon: "https://cdn.casbin.org/img/social_wechat.png" },
            { name: "DingTalk", icon: "https://cdn.casbin.org/img/social_dingtalk.png" },
            { name: "Email", icon: "https://cdn.casbin.org/img/social_mail.png" },
          ].map((provider, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={clsx(
                "p-4 rounded-lg",
                "bg-white dark:bg-gray-700",
                "shadow-md hover:shadow-lg",
                "transition-all duration-300",
                "hover:scale-110"
              )}
            >
              <img
                src={provider.icon}
                alt={provider.name}
                className="w-12 h-12 object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// CTA Section
function CTASection() {
  return (
    <div className={clsx(
      "py-24",
      "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600",
      "text-white"
    )}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
          <Translate>Ready to Get Started?</Translate>
        </h2>
        <p className="text-xl mb-8 opacity-90">
          <Translate>
            Join thousands of developers building secure authentication with Casdoor
          </Translate>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/docs/overview"
            className={clsx(
              "px-8 py-4 rounded-lg",
              "bg-white text-blue-600 font-semibold text-lg",
              "hover:bg-gray-100 transform hover:scale-105",
              "transition-all duration-200 shadow-lg",
              "no-underline"
            )}
          >
            <Translate>Read Documentation</Translate>
          </Link>
          <Link
            to="https://github.com/casdoor/casdoor"
            className={clsx(
              "px-8 py-4 rounded-lg",
              "bg-gray-900 text-white font-semibold text-lg",
              "hover:bg-gray-800 transform hover:scale-105",
              "transition-all duration-200 shadow-lg",
              "no-underline"
            )}
          >
            <Translate>View on GitHub</Translate>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Stats Section
function StatsSection() {
  const stats = [
    { number: "100+", label: translate({message: "Identity Providers"}) },
    { number: "10k+", label: translate({message: "GitHub Stars"}) },
    { number: "1M+", label: translate({message: "Downloads"}) },
    { number: "50+", label: translate({message: "Contributors"}) },
  ];

  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={clsx(
                "text-4xl sm:text-5xl font-extrabold",
                "bg-gradient-to-r from-blue-600 to-purple-600",
                "bg-clip-text text-transparent mb-2"
              )}>
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Layout
      title={translate({message: "Modern Identity & Access Management Platform"})}
      description={translate({message: "Open-source IAM / SSO platform supporting OAuth 2.0, OIDC, SAML, and 100+ identity providers"})}
    >
      <main className="overflow-hidden">
        <ModernHeroSection />
        <StatsSection />
        <FeaturesSection />
        <IntegrationsSection />
        <CTASection />
      </main>
    </Layout>
  );
}
