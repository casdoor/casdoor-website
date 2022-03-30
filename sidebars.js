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
    {
      type: 'category',
      label: 'The Basics',
      collapsed: false,
      items: ['overview', 'basic/core-concepts', 'basic/server-installation', 'basic/try-with-docker', 'basic/public-api'],
    },
    {
      type: 'category',
      label: 'How to Connect to Casdoor',
      collapsed: false,
      items: ['how-to-connect/overview', 'how-to-connect/oidc-client', 'how-to-connect/sdk','how-to-connect/vue-sdk', 'how-to-connect/plugin', 'how-to-connect/access_token','how-to-connect/cas'],
    },
    {
      type: 'category',
      label: 'Developer Guide',
      collapsed: false,
      items: ['developer-guide/frontend', 'developer-guide/swagger'],
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
            'provider/oauth/google',
            'provider/oauth/baidu',
            'provider/oauth/infoflow'
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
      items: ['deploy/nginx', 'deploy/k8s'],
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
      items: ['integration/apisix', 'integration/gitlab', 'integration/jenkins plugin', 'integration/jenkins oidc', 'integration/minio', 'integration/spring-boot', 'integration/spring-security', 'integration/elk']
    },
    'internationalization'
  ],
};
