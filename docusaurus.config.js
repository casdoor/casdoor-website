const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "Casdoor · An Open Source UI-first Identity Access Management (IAM) / Single-Sign-On (SSO) platform supporting OAuth 2.0, OIDC, SAML and CAS",
  url: "https://casdoor.github.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",
  organizationName: "casdoor", // Usually your GitHub org/user name.
  projectName: "casdoor-website", // Usually your repo name.
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh", "fr", "de", "ko", "ru", "ja"],
  },
  themeConfig: {
    metadata: [{name: "Casdoor", content: "An Open Source UI-first Identity Access Management (IAM) / Single-Sign-On (SSO) platform supporting OAuth 2.0, OIDC, SAML and CAS"}],
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
          href: "/ecosystem",
          label: "Ecosystem",
          position: "left",
        },
        {
          label: "Blog",
          to: "/blog",
          position: "left",
        },
        {
          label: "Help",
          to: "/help",
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
