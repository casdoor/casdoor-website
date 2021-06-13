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
    announcementBar: {
      id: 'tryout',
      content:
        '🚪<a target="_blank" rel="noopener noreferrer" href="https://door.casbin.com/login">Try out the Casdoor online demo</a>🚪',
      backgroundColor: '#fcffff',
      textColor: '#000',
      isCloseable: false,
    },
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
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/casbin/casdoor',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://oa.casbin.com/',
          label: 'OA',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        }
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
            }
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
          ],
        },
      ],
      logo: {
        alt: 'Casbin Logo',
        src: 'img/favicon.png',
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
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
