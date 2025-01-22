const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Casdoor · An open-source UI-first Identity and Access Management (IAM) / Single-Sign-On (SSO) platform with web UI supporting OAuth 2.0, OIDC, SAML, CAS, LDAP, SCIM, WebAuthn, TOTP, MFA, RADIUS, Google Workspace, Active Directory and Kerberos",
  url: "https://casdoor.github.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",
  organizationName: "casdoor", // Usually your GitHub org/user name.
  projectName: "casdoor-website", // Usually your repo name.
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh", "ko", "ru", "fr", "de", "ja", "es", "pt", "uk", "th", "ar"],
  },
  themeConfig: {
    metadata: [{name: "Casdoor", content: "An open-source UI-first Identity and Access Management (IAM) / Single-Sign-On (SSO) platform with web UI supporting OAuth 2.0, OIDC, SAML, CAS, LDAP, SCIM, WebAuthn, TOTP, MFA, RADIUS, Google Workspace, Active Directory and Kerberos"}],
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
          href: "https://door.casdoor.com/swagger/",
          label: "RESTful API",
          position: "left",
        },
        {
          label: "Authenticator App",
          to: "/docs/how-to-connect/totp-authenticator-app",
          position: "left",
        },
        {
          href: "/ecosystem",
          label: "Ecosystem",
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
          src: "https://casdoor.com",
          position: "right",
          className: "casdoor-signup casdoor-link",
        },
        {
          type: "custom-casdoor",
          label: "Login",
          src: "https://casdoor.com",
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
        alt: "Casdoor Logo",
        src: "img/casdoor.png",
        href: "https://casdoor.org/",
        width: 72,
        height: 72,
      },
      copyright: `Copyright © ${new Date().getFullYear()} Casdoor contributors.`,
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
          document.write(Math.random() < 0.5 ? 
            '<a target="_blank" rel="noreferrer" href="https://casbin.org/">💖 Looking for an open-source and cross-platform authorization solution that supports ACL, RBAC, ABAC? Learn more about: Casbin</a>' :
            '<a target="_blank" rel="noreferrer" href="https://app.casdoor.org/">🔐 Looking for an open-source and cross-platform multi-factor authentication solution? Learn more about: Casdoor-App</a>'
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
    {
      src: "/js/tawk.js",
      async: true,
    },
  ],
};
