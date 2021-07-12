/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  tutorialSidebar: [
    'overview',
    {
      type: 'category',
      label: 'Get Started',
      collapsed: false,
      items: ['basic/installation', 'basic/basic-concept-introduction'],
    },
    {
      type: 'category',
      label: 'Applications',
      collapsed: false,
      items: ['application/overview'],
    },
    {
      type: 'category',
      label: 'Providers',
      collapsed: false,
      items: ['provider/overview', 'provider/OAuth', 'provider/email', 'provider/sms'],
    },
    {
      type: 'category',
      label: 'Organizations',
      collapsed: false,
      items: ['organization/overview'],
    },
    {
      type: 'category',
      label: 'Users',
      collapsed: false,
      items: ['user/overview'],
    },
    {
      type: 'category',
      label: 'Tokens',
      collapsed: false,
      items: ['token/overview'],
    },
    {
      type: 'category',
      label: 'Deploy',
      collapsed: false,
      items: ['deploy/nginx'],
    },
    'internationalization'
  ],
};
