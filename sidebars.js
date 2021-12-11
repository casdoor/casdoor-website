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
      items: ['basic/installation', 'basic/basic-concept-introduction', 'basic/SDKs'],
    },
    {
      type: 'category',
      label: 'Organizations',
      collapsed: false,
      items: ['organization/overview'],
    },
    {
      type: 'category',
      label: 'Applications',
      collapsed: false,
      items: ['application/overview', 'application/config', 'application/terminology'],
     },
    {
    type: 'category',
    label: 'Providers',
    collapsed: false,
      items: ['provider/overview',
      {
        OAuth: [
          'provider/oauth/overview',
          'provider/oauth/github',
          'provider/oauth/gitee',
          'provider/oauth/linkedin',
          'provider/oauth/facebook',
          'provider/oauth/google'
        ]
      },
      'provider/email', 'provider/sms', 'provider/storage',
      {
        SAML: [
          'provider/saml/overview',
          'provider/saml/aliyun',
          'provider/saml/keycloak'
        ]
      },
    ],

    },
    {
      type: 'category',
      label: 'Users',
      collapsed: false,
      items: ['user/overview', 'user/manipulation'],
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
    {
      type: 'category',
      label: 'LDAP',
      collapsed: false,
      items: ['ldap/overview', 'ldap/config'],
    },
    {
      type: 'category',
      label: 'Integrations',
      collapsed: false,
      items: ['integration/spring-boot']
    },
    'internationalization'  
  ],
};
