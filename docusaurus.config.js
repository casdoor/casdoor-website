const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Casdoor',
  tagline: 'A UI-first centralized authentication / Single-Sign-On (SSO) platform supporting OAuth 2.0, OIDC and SAML',
  url: 'https://casdoor.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'casdoor', // Usually your GitHub org/user name.
  projectName: 'casdoor-website', // Usually your repo name.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'fr', 'de', 'ko', 'ru', 'ja']
  },
  themeConfig: {
    algolia: {
      apiKey: '41c481c691018c863b01f07f568163d0',
      indexName: 'casdoor',
    },
    hotjar: {
      applicationId: '1689986',
    },
    navbar: {
      title: 'Casdoor',
      logo: {
        alt: 'My Site Logo',
        src: 'img/casbin.svg',
      },
      hideOnScroll: true,
      items: [
        {
          type: 'doc',
          docId: 'overview',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          label: 'Help',
          to: '/help',
          position: 'left',
        },
        {
          href: 'https://door.casbin.com/swagger/',
          label: 'API',
          position: 'left',
        },
        {
          href: 'https://door.casbin.com/',
          label: 'Online Demo',
          position: 'left',
        },
        {
          href: 'https://gitter.im/casbin/casdoor',
          label: 'Gitter',
          position: 'left',
        },
        {
          href: 'https://qm.qq.com/cgi-bin/qm/qr?k=SCBnKNj_1ljeXFT2dk8cwoGQwc5lFy8l&jump_from=webapi',
          label: 'QQ Group',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
          dropdownItemsAfter: [
            {
              to: 'https://crowdin.com/project/casdoor-website',
              label: 'Help translate',
            },
          ],
        },
        {
          href: 'https://github.com/casdoor/casdoor',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Overview',
              to: '/docs/overview',
            },
            {
              label: 'Get Started',
              to: '/docs/basic/server-installation'
            },
            {
              label: 'Casdoor API',
              href: 'https://door.casbin.com/swagger/'
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/casdoor',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/search?q=casdoor',
            },
            {
              label: 'Gitter',
              href: 'https://gitter.im/casbin/casdoor',
            },
            {
              label: "QQ Group",
              href: "https://qm.qq.com/cgi-bin/qm/qr?k=SCBnKNj_1ljeXFT2dk8cwoGQwc5lFy8l&jump_from=webapi",
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/casdoor/casdoor',
            },
            {
              html: `
              <iframe src="https://ghbtns.com/github-btn.html?user=casdoor&repo=casdoor&type=star&count=true&size=large" frameborder="0" scrolling="0" width="170" height="30" title="GitHub">Casdoor</iframe>
              `
            },
            {
              html: `
              <head>
              <script>
              var _hmt = _hmt || [];
              </script>
              </head>
              <body>
              <script type="text/javascript">
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?2da024e456a28e98936a8ea6a049b295";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
                })();
                </script>
                </body>
              `
            }
          ],
        },
      ],
      logo: {
        alt: 'Casbin Logo',
        src: 'img/casbin_min.svg',
        href: 'https://casbin.org/',
      },
      copyright: `Copyright © ${new Date().getFullYear()} Casbin contributors.`,
    },
    prism: {
      additionalLanguages: ['nginx'],
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    hideableSidebar: true,
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/casdoor/casdoor-website/tree/master/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/casdoor/casdoor-website/tree/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          trailingSlash: false,
        },
      },
    ],
  ],
  plugins: ['docusaurus-plugin-sass', 'docusaurus-plugin-hotjar'],
  scripts: ['/js/gitter.js'],
};
