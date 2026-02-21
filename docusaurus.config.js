const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Casdoor · AI-Native Identity and Access Management (IAM) / SSO Platform with MCP Server",
  url: "https://casdoor.github.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "https://casdoor.org/img/casdoor.png",
  organizationName: "casdoor", // Usually your GitHub org/user name.
  projectName: "casdoor-website", // Usually your repo name.
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "fr", "de", "ja", "zh", "vi", "pt", "tr", "pl", "uk"],
  },
  themeConfig: {
    metadata: [{name: "Casdoor", content: "Identity & Access Management for the AI Agent era. The first open-source IAM platform with native MCP server, Model Context Protocol support, OAuth 2.1 for AI agent authentication, and full support for OAuth 2.0, OIDC, SAML, CAS, LDAP, WebAuthn, MFA, and 100+ identity providers."}],
    algolia: {
      appId: "U9MEH3VSV1",
      apiKey: "9ef7ab8761a6480738185ecd6d1ecde7",
      indexName: "casdoor",
      contextualSearch: true,
    },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    hotjar: {
      applicationId: "1689986",
    },
    navbar: {
      title: "Casdoor",
      logo: {
        alt: "My Site Logo",
        src: "img/casdoor.png",
      },
      // hideOnScroll: true,
      items: [
        {
          type: "doc",
          docId: "overview",
          position: "left",
          label: "Docs",
        },
        {
          to: "/docs/how-to-connect/mcp/overview",
          label: "LLM & MCP",
          position: "left",
          className: "navbar__link--llm-mcp",
        },
        {
          href: "/ecosystem",
          label: "Integrations",
          position: "left",
        },
        {
          label: "Password App",
          to: "/docs/how-to-connect/totp-authenticator-app",
          position: "left",
        },
        // {
        //   label: "Blog",
        //   to: "/blog",
        //   position: "left",
        // },
        {
          label: "Help",
          to: "/help",
          position: "left",
        },
        {
          href: "https://casdoor.com",
          label: "Enterprise Version",
          position: "left",
        },
        {
          href: "https://casdoor.com",
          label: "SaaS",
          position: "left",
        },
        {
          type: "localeDropdown",
          position: "right",
          dropdownItemsAfter: [
            {
              type: "html",
              value: "<hr style=\"margin: 0.3rem 0;\">",
            },
            {
              to: "https://crowdin.com/project/casdoor-website",
              label: "Help translate",
            },
          ],
        },
        {
          href: "https://github.com/casdoor/casdoor",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
        {
          type: "custom-community",
          position: "right",
        },
        {
          type: "search",
          position: "right",
        },
        {
          type: "custom-casdoor",
          label: "Sign Up",
          src: "https://door.casdoor.com/signup",
          position: "right",
          className: "casdoor-signup casdoor-link",
        },
        {
          type: "custom-casdoor",
          label: "Login",
          src: "https://door.casdoor.com/login",
          position: "right",
          className: "casdoor-login casdoor-link",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "/docs/basic/server-installation",
            },
            {
              label: "Overview",
              to: "/docs/overview",
            },
            {
              label: "Casdoor API",
              href: "https://door.casdoor.com/swagger/",
            },
            {
              label: "SDK",
              to: "/docs/how-to-connect/sdk",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              html: `
                <a href="https://discord.gg/5rPsrAzK7S" target="_blank" rel="noopener noreferrer" class="footer__link-item footer-community-link">
                  <svg class="footer-community-icon" viewBox="0 0 127.14 96.36" xmlns="http://www.w3.org/2000/svg">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                  </svg>
                  <span>Discord</span>
                </a>
              `,
            },
            {
              html: `
                <a href="https://stackoverflow.com/search?q=casdoor" target="_blank" rel="noopener noreferrer" class="footer__link-item footer-community-link">
                  <svg class="footer-community-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012zM6.111 19.731H16.85v-2.137H6.111v2.137zm.259-4.852l10.48 2.189.451-2.07-10.478-2.187-.453 2.068zm1.359-5.056l9.705 4.53.903-1.95-9.706-4.53-.902 1.936v.014zm2.715-4.785l8.217 6.855 1.359-1.62-8.216-6.853-1.35 1.617-.01.001zM15.751 0l-1.746 1.294 6.405 8.604 1.746-1.294L15.749 0h.002z"/>
                  </svg>
                  <span>Stack Overflow</span>
                </a>
              `,
            },
            {
              html: `
                <a href="https://groups.google.com/g/casdoor" target="_blank" rel="noopener noreferrer" class="footer__link-item footer-community-link">
                  <svg class="footer-community-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                  <span>Google Groups</span>
                </a>
              `,
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              html: `
                <a href="https://github.com/casdoor/casdoor" target="_blank" rel="noopener noreferrer">
                  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/casdoor/casdoor?label=Casdoor&style=social">
                </a>
              `,
            },
            {
              html: `
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?2da024e456a28e98936a8ea6a049b295";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
</script>
`,
            },
          ],
        },
      ],
      logo: {
        alt: "CNCF Landscape",
        src: "https://landscape.cncf.io/images/logo_header.svg",
        href: "https://landscape.cncf.io/",
        width: 160,
        height: 36,
      },
      copyright: `Copyright © ${new Date().getFullYear()} Casdoor contributors. Casdoor is part of <a href="https://landscape.cncf.io/" target="_blank" rel="noopener noreferrer">CNCF Landscape</a>.`,
    },
    prism: {
      additionalLanguages: ["nginx", "java", "properties", "groovy", "ruby"],
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    docs: {
      sidebar: {hideable: true},
    },
  },
  // https://docusaurus.io/docs/markdown-features/diagrams#configuration
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        gtag: {
          trackingID: "G-ZQ8VRBLGS9",
        },
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          sidebarCollapsed: false,
          editUrl: ({docPath}) => {
            return `https://github.com/casdoor/casdoor-website/edit/master/docs/${docPath}`;
          },
        },
        blog: {
          showReadingTime: true,
          editUrl: ({blogDirPath, blogPath}) => {
            return `https://github.com/casdoor/casdoor-website/edit/master/${blogDirPath}/${blogPath}`;
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
        },
      },
    ],
  ],
  plugins: ["docusaurus-plugin-sass", "docusaurus-plugin-hotjar"],
  scripts: [
    {
      src: "/js/isMainland.js",
      async: true,
    },
  ],
};
