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
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
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
          href: "/ecosystem",
          label: "Ecosystem",
          position: "left",
        },
        {
          label: "Authenticator App",
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
          label: "For Enterprise",
          position: "left",
        },
        {
          href: "https://casdoor.com",
          label: "Hosting Plan (SaaS)",
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
              label: "Overview",
              to: "/docs/overview",
            },
            {
              label: "Get Started",
              to: "/docs/basic/server-installation",
            },
            {
              label: "Casdoor API",
              href: "https://door.casdoor.com/swagger/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/casdoor",
            },
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/search?q=casdoor",
            },
            {
              label: "Discord",
              href: "https://discord.gg/5rPsrAzK7S",
            },
            {
              label: "QQ Group",
              href: "https://cdn.casdoor.com/casdoor/resource/built-in/admin/qq_casdoor.png",
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
              label: "GitHub",
              href: "https://github.com/casdoor/casdoor",
            },
            {
              html: `
              <iframe src="https://ghbtns.com/github-btn.html?user=casdoor&repo=casdoor&type=star&count=true&size=large" frameborder="0" scrolling="0" width="170" height="30" title="GitHub">Casdoor</iframe>
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
            {
              html: "<div class=\"placeholderads\"></div>",
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
    announcementBar: {
      id: "announcement", // ID of the announcement bar
      content: `
        <script>
          document.write(Math.random() < 0.8 ? 
            '<a target="_blank" href="https://github.com/casibase/casibase/">💖 Looking for an open-source, LangChain-like AI knowledge database & chatbot with admin UI and multi-model support (ChatGPT, Claude, Llama 3, DeepSeek R1, HuggingFace, etc.)? Learn more about: Casibase</a>' :
            '<a target="_blank" href="https://github.com/casdoor/casdoor-authenticator/">🔐 Looking for an open-source, cross-platform multi-factor authentication solution? Learn more about: Casdoor-Authenticator</a>'
          );
        </script>
      `,
      isCloseable: true,
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
