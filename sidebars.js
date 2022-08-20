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
      items: [
        'overview',
        'basic/core-concepts',
        'basic/server-installation',
        'basic/try-with-docker',
        'basic/deployment',
        'basic/public-api',
      ],
    },
    {
      type: 'category',
      label: 'How to Connect to Casdoor',
      collapsed: false,
      items: [
        'how-to-connect/overview',
        'how-to-connect/oidc-client',
        'how-to-connect/sdk',
        'how-to-connect/vue-sdk',
        {
          "Desktop SDKs": [
            'how-to-connect/desktop-sdks/electron-app',
            'how-to-connect/desktop-sdks/dotnet-app'
          ]
        },
        'how-to-connect/plugin',
        'how-to-connect/oauth',
        'how-to-connect/cas',
        'how-to-connect/saml',
      ],
    },
    {
      type: 'category',
      label: 'Developer Guide',
      collapsed: false,
      items: [
        'developer-guide/frontend',
        'developer-guide/swagger',
      ],
    },
    {
      type: 'category',
      label: 'Organizations',
      collapsed: false,
      items: [
        'organization/overview',
        'organization/accountCustomization',
      ],
    },
    {
      type: 'category',
      label: 'Applications',
      collapsed: false,
      items: [
        'application/overview',
        'application/config',
        'application/signup-items-tabel',
        'application/terminology',
      ],
    },
    {
      type: 'category',
      label: "Permissions",
      collapsed: false,
      items: [
        'permission/overview',
      ],
    },
    {
      type: 'category',
      label: 'Providers',
      collapsed: false,
      items: [
        'provider/overview',
        {
          OAuth: [
            'provider/oauth/overview',
            'provider/oauth/CustomProvider',
            'provider/oauth/Twitter',
            'provider/oauth/Weibo',
            'provider/oauth/Wechat',
            'provider/oauth/weCom',
            'provider/oauth/Tencent',
            'provider/oauth/DingTalk',
            'provider/oauth/Steam',
            'provider/oauth/github',
            'provider/oauth/gitee',
            'provider/oauth/linkedin',
            'provider/oauth/facebook',
            'provider/oauth/google',
            'provider/oauth/baidu',
            'provider/oauth/adfs',
            'provider/oauth/azureAD',
            'provider/oauth/infoflow',
            'provider/oauth/okta',
          ]
        },
        'provider/email',
        'provider/sms',
        {
          Storage: [
            'provider/storage/storage',
            'provider/storage/azure',
          ]
        },
        {
          SAML: [
            'provider/saml/overview',
            'provider/saml/aliyun',
            'provider/saml/keycloak',
          ]
        },
        {
          Payment: [
            'provider/payment/Alipay',
          ]
        },
        {
          Captcha: [
            'provider/captcha/overview',
            'provider/captcha/default',
            'provider/captcha/recaptcha',
            'provider/captcha/hcaptcha',
            'provider/captcha/aliyunCaptcha',
          ]
        }
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      collapsed: false,
      items: [
        'resources/overview',
      ],
    },
    {
      type: 'category',
      label: 'Products',
      collapsed: false,
      items: [
        'products/product',
        'products/payment',
      ],
    },
    {
      type: 'category',
      label: 'Users',
      collapsed: false,
      items: [
        'user/overview',
        'user/roles',
        'user/permissions',
      ],
    },
    {
      type: 'category',
      label: 'Syncer',
      collapsed: false,
      items: [
        'syncer/overview',
        'syncer/Database',
        'syncer/Keycloak',
      ],
    },
    {
      type: 'category',
      label: 'Tokens',
      collapsed: false,
      items: [
        'token/overview',
      ],
    },
    {
      type: 'category',
      label: 'Webhooks',
      collapsed: false,
      items: [
        'webhooks/overview',
      ],
    },
    {
      type: 'category',
      label: 'Deploy',
      collapsed: false,
      items: [
        'deploy/nginx',
        'deploy/k8s',
      ],
    },
    {
      type: 'category',
      label: 'LDAP',
      collapsed: false,
      items: [
        'ldap/overview',
        'ldap/config',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      collapsed: false,
      items: [
        'integration/apisix',
        'integration/gitlab',
        'integration/jenkins plugin',
        'integration/jenkins oidc',
        'integration/minio',
        'integration/spring-boot',
        'integration/spring-cloud',
        'integration/spring-cloud-gateway',
        'integration/spring-security',
        'integration/RuoYi',
        'integration/wechat_miniprogram',
        'integration/elk',
        'integration/zentao',
        'integration/grafana',
        'integration/gitea',
        'integration/bookstack',
        'integration/showdoc',
      ],
    },
    {
      type: 'category',
      label: 'WebAuthn',
      collapsed: false,
      items: ['webauthn/overview'],
    },
    'internationalization',
    'contributing',
  ],
  
};
