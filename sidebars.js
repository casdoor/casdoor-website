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
      type: "category",
      label: "The Basics",
      link: {type: "generated-index"},
      items: [
        "overview",
        "basic/core-concepts",
        "basic/server-installation",
        "basic/try-with-docker",
        "basic/public-api",
        "basic/tutorials",
        {
          type: "link",
          label: "PDF Download",
          href: "/pdf",
        },
      ],
    },
    {
      type: "category",
      label: "Deployment",
      link: {type: "generated-index"},
      items: [
        "deployment/data-initialization",
        "deployment/deploy-cdn",
        "deployment/deploy-intranet",
        "deployment/db-migration",
      ],
    },
    {
      type: "category",
      label: "How to Connect to Casdoor",
      link: {type: "generated-index"},
      items: [
        "how-to-connect/overview",
        "how-to-connect/oidc-client",
        "how-to-connect/sdk",
        "how-to-connect/single-sign-on",
        "how-to-connect/vue-sdk",
        {
          type: "category",
          label: "Desktop SDKs",
          link: {type: "generated-index"},
          items: [
            "how-to-connect/desktop-sdks/electron-app",
            "how-to-connect/desktop-sdks/dotnet-app",
            "how-to-connect/desktop-sdks/qt-app",
          ],
        },
        "how-to-connect/plugin",
        "how-to-connect/oauth",
        "how-to-connect/cas",
        {
          type: "category",
          label: "SAML",
          link: {type: "generated-index"},
          items: [
            "how-to-connect/saml/overview",
            "how-to-connect/saml/keycloak",
            "how-to-connect/saml/appgate",
          ],
        },
        "how-to-connect/webauthn",
      ],
    },
    {
      type: "category",
      label: "Developer Guide",
      link: {type: "generated-index"},
      items: [
        "developer-guide/frontend",
        "developer-guide/swagger",
      ],
    },
    {
      type: "category",
      label: "Organizations",
      link: {type: "generated-index"},
      items: [
        "organization/overview",
        "organization/accountCustomization",
        "organization/customize-theme",
      ],
    },
    {
      type: "category",
      label: "Applications",
      link: {type: "generated-index"},
      items: [
        "application/overview",
        "application/terminology",
        "application/config",
        "application/signup-items-tabel",
        "application/ui-customization",
      ],
    },
    {
      type: "category",
      label: "Permissions",
      link: {type: "generated-index"},
      items: [
        "permission/overview",
        "permission/permission-configuration",
        "permission/exposed-casbin-apis",
        "permission/adapter",
      ],
    },
    {
      type: "category",
      label: "Providers",
      link: {type: "generated-index"},
      items: [
        "provider/overview",
        {
          type: "category",
          label: "OAuth",
          link: {type: "generated-index"},
          items: [
            "provider/oauth/overview",
            "provider/oauth/CustomProvider",
            "provider/oauth/Twitter",
            "provider/oauth/Weibo",
            "provider/oauth/Wechat",
            "provider/oauth/weCom",
            "provider/oauth/Tencent",
            "provider/oauth/DingTalk",
            "provider/oauth/Steam",
            "provider/oauth/github",
            "provider/oauth/gitee",
            "provider/oauth/linkedin",
            "provider/oauth/facebook",
            "provider/oauth/google",
            "provider/oauth/baidu",
            "provider/oauth/adfs",
            "provider/oauth/azureAD",
            "provider/oauth/infoflow",
            "provider/oauth/okta",
          ],
        },
        "provider/email",
        "provider/sms",
        {
          type: "category",
          label: "Storage",
          link: {type: "generated-index"},
          items: [
            "provider/storage/overview",
            "provider/storage/azure",
            "provider/storage/aliyun-oss",
          ],
        },
        {
          type: "category",
          label: "SAML",
          link: {type: "generated-index"},
          items: [
            "provider/saml/overview",
            "provider/saml/aliyun",
            "provider/saml/keycloak",
          ],
        },
        {
          type: "category",
          label: "Payment",
          link: {type: "generated-index"},
          items: [
            "provider/payment/Alipay",
            "provider/payment/WeChatPay",
          ],
        },
        {
          type: "category",
          label: "Captcha",
          link: {type: "generated-index"},
          items: [
            "provider/captcha/overview",
            "provider/captcha/default",
            "provider/captcha/recaptcha",
            "provider/captcha/hcaptcha",
            "provider/captcha/aliyunCaptcha",
            "provider/captcha/cloudflareTurnstile",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Resources",
      link: {type: "generated-index"},
      items: [
        "resources/overview",
      ],
    },
    {
      type: "category",
      label: "Products",
      link: {type: "generated-index"},
      items: [
        "products/product",
        "products/payment",
      ],
    },
    {
      type: "category",
      label: "Users",
      link: {type: "generated-index"},
      items: [
        "user/overview",
        "user/multi-factor-authentication",
        "user/roles",
        "user/permissions",
      ],
    },
    {
      type: "category",
      label: "Syncer",
      link: {type: "generated-index"},
      items: [
        "syncer/overview",
        "syncer/Database",
        "syncer/Keycloak",
      ],
    },
    {
      type: "category",
      label: "Tokens",
      link: {type: "generated-index"},
      items: [
        "token/overview",
      ],
    },
    {
      type: "category",
      label: "Webhooks",
      link: {type: "generated-index"},
      items: [
        "webhooks/overview",
      ],
    },
    {
      type: "category",
      label: "Deploy",
      link: {type: "generated-index"},
      items: [
        "deploy/nginx",
        "deploy/k8s",
      ],
    },
    {
      type: "category",
      label: "LDAP",
      link: {type: "generated-index"},
      items: [
        "ldap/overview",
        "ldap/config",
        "ldap/ldapserver",
      ],
    },
    {
      type: "category",
      label: "Integrations",
      link: {type: "generated-index"},
      items: [
        {
          type: "category",
          label: "Go",
          link: {type: "generated-index"},
          items: [
            "integration/go/kubernetes",
            "integration/go/bookstack",
            "integration/go/Bytebase",
            "integration/go/elk",
            "integration/go/gitea",
            "integration/go/grafana",
            "integration/go/minio",
          ],
        },
        {
          type: "category",
          label: "Java",
          link: {type: "generated-index"},
          items: [
            "integration/java/spring-boot",
            "integration/java/spring-cloud",
            "integration/java/spring-cloud-gateway",
            {
              type: "category",
              label: "Spring Security",
              link: {type: "generated-index"},
              items: [
                "integration/java/spring-security/spring-security-oauth",
                "integration/java/spring-security/spring-security-filter",
              ],
            },
            "integration/java/jenkins plugin",
            "integration/java/jenkins oidc",
            {
              type: "category",
              label: "Jira",
              link: {type: "generated-index"},
              items: [
                "integration/java/jira2",
                "integration/java/jira",
              ],
            },
            "integration/java/Confluence",
            "integration/java/RuoYi",
            "integration/java/Pulsar-manager",
            "integration/java/shenyu",
            "integration/java/ShardingSphere",
            "integration/java/iotdb",
            "integration/java/firezone",
          ],
        },
        {
          type: "category",
          label: "JavaScript",
          link: {type: "generated-index"},
          items: [
            "integration/javascript/wechat_miniprogram",
          ],
        },
        {
          type: "category",
          label: "Lua",
          link: {type: "generated-index"},
          items: [
            "integration/lua/apisix",
          ],
        },
        {
          type: "category",
          label: "PHP",
          link: {type: "generated-index"},
          items: [
            "integration/php/zentao",
            "integration/php/showdoc",
            "integration/php/Flarum",
          ],
        },
        {
          type: "category",
          label: "Ruby",
          link: {type: "generated-index"},
          items: [
            "integration/ruby/gitlab",
          ],
        },
        {
          type: "category",
          label: "Haskell",
          link: {type: "generated-index"},
          items: [
            "integration/Haskell/Hasura",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Monitoring",
      link: {type: "generated-index"},
      items: [
        "monitoring/Web UI",
        "monitoring/Prometheus",
      ],
    },
    "internationalization",
    "contributing",
  ],
};
