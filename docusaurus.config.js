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
  trailingSlash: false,
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
    hotjar: {
      applicationId: "1689986",
    },
    navbar: {
      title: "Casdoor",
      logo: {
        alt: "My Site Logo",
        src: "img/casbin.svg",
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
          label: "API Reference",
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
          label: "Pricing",
          to: "https://casdoor.com/#pricing",
          position: "left",
        },
        {
          label: "Contact Sales",
          to: "https://tawk.to/chat/623352fea34c2456412b8c51/1fuc7od6e",
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
          int: "https://door.casdoor.org/signup",
          cn: "https://door.casdoor.com/signup",
          position: "right",
          className: "casdoor-signup casdoor-link",
        },
        {
          type: "custom-casdoor",
          label: "Login",
          int: "https://door.casdoor.org/login",
          cn: "https://door.casdoor.com/login",
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
              label: "Gitter",
              href: "https://gitter.im/casbin/casdoor",
            },
            {
              label: "QQ Group",
              href: "https://qm.qq.com/cgi-bin/qm/qr?k=SCBnKNj_1ljeXFT2dk8cwoGQwc5lFy8l&jump_from=webapi",
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
        alt: "Casbin Logo",
        src: "img/casbin_min.svg",
        href: "https://casbin.org/",
      },
      copyright: `Copyright © ${new Date().getFullYear()} Casbin contributors.`,
    },
    prism: {
      additionalLanguages: ["nginx", "java", "properties", "groovy", "ruby"],
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    announcementBar: {
      id: "announcement", // ID of the announcement bar
      content:
        "<a target=\"_blank\" rel=\"noreferrer\" href=\"https://casbin.io/\">💖 Looking for an open-source and cross-platform authorization solution that supports ACL, RBAC, ABAC? Learn more about: Casbin</a>",
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
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          sidebarCollapsed: false,
          editUrl: ({locale, docPath}) => {
            if (locale === "en") {
              return `https://github.com/casdoor/casdoor-website/edit/master/docs/${docPath}`;
            }
            if (locale === "zh") {
              return "https://crowdin.com/project/casdoor-website/zh-CN";
            }
            return `https://crowdin.com/project/casdoor-website/${locale}`;
          },
        },
        blog: {
          showReadingTime: true,
          editUrl: ({locale, blogDirPath, blogPath}) => {
            if (locale === "en") {
              return `https://github.com/casdoor/casdoor-website/edit/master/${blogDirPath}/${blogPath}`;
            }
            if (locale === "zh") {
              return "https://crowdin.com/project/casdoor-website/zh-CN";
            }
            return `https://crowdin.com/project/casdoor-website/${locale}`;
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
      async: false,
    },
    {
      src: "/js/gitter.js",
      async: true,
    },
    {
      src: "/js/tawk.js",
      async: true,
    },
  ],
};
