/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Casdoor',
  tagline: 'A UI-first centralized authentication / Single-Sign-On (SSO) platform based on OAuth 2.0 / OIDC',
  url: 'https://casdoor.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'casdoor', // Usually your GitHub org/user name.
  projectName: 'casdoor-website', // Usually your repo name.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'fr', 'de', 'ko', 'ru', 'jp']
  },
  themeConfig: {
    navbar: {
      title: 'Casdoor',
      logo: {
        alt: 'My Site Logo',
        src: 'img/casbin.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'overview',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://door.casbin.com/swagger/',
          label: 'API',
          position: 'left',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://oa.casbin.com/',
          label: 'OA',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/casbin/casdoor',
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
              to: '/docs/basic/installation'
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
              label: 'Casbin',
              href: 'https://casbin.org/'
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/search?q=casbin',
            },
            {
              label: 'Gitter',
              href: 'https://gitter.im/casbin/Lobby'
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/casbinHQ',
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
              href: 'https://github.com/casbin/casdoor',
            },
            {
              html: `
              <iframe src="https://ghbtns.com/github-btn.html?user=casbin&repo=casdoor&type=star&count=true&size=large" frameborder="0" scrolling="0" width="170" height="30" title="GitHub">Casdoor</iframe>
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
        src: 'img/casbin.png',
        href: 'https://casbin.org/',
      },
      copyright: `Copyright © ${new Date().getFullYear()} Casbin contributors.`,
    },
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
      },
    ],
  ],
};
