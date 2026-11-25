import React, {useEffect, useState} from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";
import ThemedImage from "@theme/ThemedImage";
import Translate, {translate} from "@docusaurus/Translate";
import Icon from "../components/Home/Icon";
import styles from "./index.module.scss";

const DEMO_URL = "https://door.casdoor.com";
const GITHUB_URL = "https://github.com/casdoor/casdoor";
const CLOUD_URL = "https://www.casdoor.com/pricing?utm_source=casdoor.ai&utm_medium=homepage";
const SELF_HOSTED_URL = "https://www.casdoor.com/pricing/self-hosted?utm_source=casdoor.ai&utm_medium=homepage";
const DOCKER_COMMAND = "docker run -p 8000:8000 casbin/casdoor-all-in-one";

// Illustrations and icons drawn with Gemini 3 Pro Image, light and dark versions, in static/img/home/art.
// Console screenshots are of a local Casdoor with made-up data (the Acme Corp organization), in static/img/home/console.
function art(name) {
  return {light: `/img/home/art/${name}-light.webp`, dark: `/img/home/art/${name}-dark.webp`};
}

function consoleShot(name) {
  return {light: `/img/home/console/${name}-light.webp`, dark: `/img/home/console/${name}-dark.webp`};
}

// Sign-in themes from the Casdoor Marketplace; the screenshots are in static/img/home/themes
const THEMES = [
  {id: "aurora", name: "Aurora"},
  {id: "split", name: "Split"},
  {id: "midnight", name: "Midnight"},
  {id: "prism", name: "Prism"},
  {id: "backdrop", name: "Backdrop"},
  {id: "halves", name: "Halves"},
];

// Casdoor users, the same evidence as the customer wall of www.casdoor.com (cloudwork casdoor/users.md).
// These are Casdoor users, not Casbin users: static/data/users.json is the Casbin list.
const CUSTOMERS = [
  {name: "Daimler Truck", logo: "gh-daimlertruck.png"},
  {name: "Tencent", logo: "gh-tencent.png"},
  {name: "Bosch", logo: "si-bosch.svg"},
  {name: "Volkswagen", logo: "si-volkswagen.svg"},
  {name: "LOTTE", logo: "lotte.png"},
  {name: "NAVER", logo: "si-naver.svg"},
  {name: "CNPC", logo: "cnpc.svg"},
  {name: "iFLYTEK", logo: "gh-iflytek.png"},
  {name: "Percona", logo: "gh-percona.png"},
  {name: "Apache APISIX", logo: "apisix-mark.png"},
  {name: "Apache DolphinScheduler", logo: "si-apachedolphinscheduler.svg"},
  {name: "Apache Pulsar", logo: "si-apachepulsar.svg"},
];

const NEWS = [
  {date: "Nov 25", text: "Migration tools for Auth0, Keycloak and Okta", to: "/docs/migration/overview"},
  {date: "Nov 23", text: "No-code Flows for sign-in and tokens", to: "/docs/flows/overview"},
  {date: "Feb 22", text: "Casdoor joins the CNCF Landscape", to: "/blog/casdoor-joins-cncf-landscape"},
];

const SDKS = ["Go", "Java", "Spring Boot", "Node.js", "Python", "PHP", ".NET", "Rust", "Ruby", "React", "Vue", "Angular", "Flutter", "iOS", "Android", "Unity"];

const CODE_SAMPLES = [
  {
    id: "docker",
    label: "Docker",
    language: "bash",
    code: `# Start Casdoor with an embedded database
docker run -p 8000:8000 casbin/casdoor-all-in-one

# Open http://localhost:8000, set the admin password
# and sign in to the admin console as built-in/admin`,
  },
  {
    id: "oidc",
    label: "OpenID Connect",
    language: "bash",
    code: `# Point any OpenID Connect library at the issuer
ISSUER=https://door.casdoor.com
curl $ISSUER/.well-known/openid-configuration

# authorization_endpoint  $ISSUER/login/oauth/authorize
# token_endpoint          $ISSUER/api/login/oauth/access_token
# userinfo_endpoint       $ISSUER/api/userinfo
# jwks_uri                $ISSUER/.well-known/jwks`,
  },
  {
    id: "go",
    label: "Go",
    language: "go",
    code: `import "github.com/casdoor/casdoor-go-sdk/casdoorsdk"

casdoorsdk.InitConfig(endpoint, clientId, clientSecret,
    certificate, "my-organization", "my-application")

// In the OAuth callback of your app
token, err := casdoorsdk.GetOAuthToken(code, state)
claims, err := casdoorsdk.ParseJwtToken(token.AccessToken)
fmt.Println(claims.Name, claims.Email)`,
  },
  {
    id: "node",
    label: "Node.js",
    language: "typescript",
    code: `import { SDK } from "casdoor-nodejs-sdk";

const sdk = new SDK({
  endpoint: "https://auth.example.com",
  clientId, clientSecret, certificate,
  orgName: "my-organization",
  appName: "my-application",
});

// In the OAuth callback of your app
const token = await sdk.getAuthToken(code);
const user = sdk.parseJwtToken(token.access_token);`,
  },
  {
    id: "python",
    label: "Python",
    language: "python",
    code: `from casdoor import CasdoorSDK

sdk = CasdoorSDK(
    endpoint="https://auth.example.com",
    client_id=client_id,
    client_secret=client_secret,
    certificate=certificate,
    org_name="my-organization",
    application_name="my-application",
)

# In the OAuth callback of your app
token = sdk.get_oauth_token(code=code)
user = sdk.parse_jwt_token(token["access_token"])`,
  },
];

function Browser({url, children}) {
  return (
    <div className={styles.browser}>
      <div className={styles.browserBar}>
        <span className={styles.browserDots} aria-hidden="true"><i /><i /><i /></span>
        <span className={styles.browserUrl}>{url}</span>
      </div>
      <div className={styles.browserBody}>{children}</div>
    </div>
  );
}

function ConsoleShot({name, url, alt}) {
  return (
    <Browser url={url}>
      <ThemedImage className={styles.shot} sources={consoleShot(name)} alt={alt} width={1600} height={944} />
    </Browser>
  );
}

function ThemeShot() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const id = setInterval(() => setActive((i) => (i + 1) % THEMES.length), 3500);
    return () => clearInterval(id);
  }, []);
  return (
    <Browser url="door.casdoor.com/login">
      <a className={styles.themeLink} href={`${DEMO_URL}/login?theme=${THEMES[active].id}`} target="_blank" rel="noopener noreferrer">
        {THEMES.map((theme, index) => (
          <img
            key={theme.id}
            src={`/img/home/themes/${theme.id}.webp`}
            alt={translate({message: "Casdoor sign-in page with the {theme} theme"}, {theme: theme.name})}
            width={1280}
            height={800}
            className={clsx(styles.themeImg, index === active && styles.themeImgActive)}
          />
        ))}
      </a>
    </Browser>
  );
}

function CopyCommand({command}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };
  return (
    <button type="button" className={styles.command} onClick={copy} title={translate({message: "Copy the command"})}>
      <code>$ {command}</code>
      <Icon name={copied ? "check" : "copy"} size={15} />
    </button>
  );
}

function Hero() {
  return (
    <header className={styles.hero}>
      <div className={clsx("container", styles.heroInner)}>
        <div className={styles.heroCopy}>
          <h1 className={styles.heroTitle}>
            <Translate>Open-source identity and access management</Translate>
          </h1>
          <p className={styles.heroLead}>
            <Translate>Single sign-on, MFA and user management for your applications, your customers and your AI agents. Run Casdoor on your own servers for free, or let us host it for you.</Translate>
          </p>
          <div className={styles.actions}>
            <Link className={clsx(styles.btn, styles.btnPrimary)} to="/docs/basic/try-with-docker">
              <Translate>Get started</Translate>
            </Link>
            <a className={clsx(styles.btn, styles.btnOutline)} href={DEMO_URL} target="_blank" rel="noopener noreferrer">
              <Translate>Live demo</Translate>
            </a>
          </div>
          <CopyCommand command={DOCKER_COMMAND} />
        </div>
        <div className={styles.heroArt}>
          <ThemedImage sources={art("hero")} alt="" width={1400} height={1045} />
        </div>
      </div>
    </header>
  );
}

function News() {
  return (
    <div className={styles.news}>
      <div className={clsx("container", styles.newsInner)}>
        <span className={styles.newsLabel}><Translate>News</Translate></span>
        {NEWS.map((item) => (
          <Link key={item.to} to={item.to} className={styles.newsItem}>
            <span className={styles.newsDate}>{item.date}</span>
            <span className={styles.newsText}>{item.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Customers() {
  return (
    <section className={styles.customers}>
      <div className="container">
        <p className={styles.customersTitle}>
          <Translate>Used in production by teams at</Translate>
        </p>
        <ul className={styles.customerGrid}>
          {CUSTOMERS.map((customer) => (
            <li key={customer.name} className={styles.customer}>
              <img className={styles.customerLogo} src={`/img/home/logos/${customer.logo}`} alt="" width={26} height={26} loading="lazy" />
              <span className={styles.customerName}>{customer.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    {value: "14.9k", label: <Translate>GitHub stars</Translate>},
    {value: "2.5M+", label: <Translate>Docker pulls</Translate>},
    {value: "300+", label: <Translate>contributors</Translate>},
    {value: "70+", label: <Translate>built-in identity providers</Translate>},
  ];
  return (
    <section className={styles.stats}>
      <div className={clsx("container", styles.statsInner)}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.stat}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const USE_CASES = [
  {
    id: "workforce",
    icon: "sso",
    tab: <Translate>Employees and internal apps</Translate>,
    title: <Translate>One login for every internal app</Translate>,
    text: <Translate>Connect Grafana, GitLab, Nextcloud and your own applications to Casdoor over OIDC, SAML or CAS. Employees sign in once with their company account and a second factor, and reach every app from there.</Translate>,
    capabilities: [
      <Translate key="1">OAuth 2.0 and OpenID Connect provider</Translate>,
      <Translate key="2">SAML 2.0 identity provider and CAS server</Translate>,
      <Translate key="3">LDAP and RADIUS for legacy systems and VPNs</Translate>,
      <Translate key="4">Sync from Active Directory, Okta and Google Workspace</Translate>,
      <Translate key="5">TOTP, passkeys and step-up MFA</Translate>,
      <Translate key="6">Session management and single sign-out</Translate>,
    ],
    link: {label: <Translate>Connect an application</Translate>, to: "/docs/how-to-connect/overview"},
    visual: <ConsoleShot name="applications" url="auth.acme.example.com/applications" alt="Applications in the Casdoor admin console" />,
  },
  {
    id: "customers",
    icon: "customers",
    tab: <Translate>Customer sign-up and sign-in</Translate>,
    title: <Translate>Sign-up and sign-in pages that match your brand</Translate>,
    text: <Translate>Let customers sign in with Google, Apple, GitHub, WeChat or a one-time code, and design the pages in the admin console: logo, colors, fields and the methods each application offers.</Translate>,
    capabilities: [
      <Translate key="1">70+ social and enterprise identity providers</Translate>,
      <Translate key="2">Passwordless sign-in with email, SMS and passkeys</Translate>,
      <Translate key="3">Configurable sign-up fields and invitation codes</Translate>,
      <Translate key="4">Captcha and IP allow lists</Translate>,
      <Translate key="5">Sign-in themes from the Marketplace</Translate>,
      <Translate key="6">Products, payments and subscriptions</Translate>,
    ],
    link: {label: <Translate>Customize the sign-in page</Translate>, to: "/docs/application/ui-customization"},
    visual: <ThemeShot />,
  },
  {
    id: "b2b",
    icon: "organizations",
    tab: <Translate>B2B and multi-tenant SaaS</Translate>,
    title: <Translate>Give every customer its own organization</Translate>,
    text: <Translate>One Casdoor serves many tenants. Each organization has its own users, groups, roles, applications and sign-in providers, and its own administrators who manage them without seeing anyone else.</Translate>,
    capabilities: [
      <Translate key="1">Organizations with their own admins</Translate>,
      <Translate key="2">Enterprise SSO per organization over SAML or OIDC</Translate>,
      <Translate key="3">SCIM 2.0 provisioning</Translate>,
      <Translate key="4">Groups, roles and Casbin permissions</Translate>,
      <Translate key="5">Webhooks and a REST API</Translate>,
      <Translate key="6">Records of every sign-in and change</Translate>,
    ],
    link: {label: <Translate>Organizations</Translate>, to: "/docs/organization/overview"},
    visual: <ConsoleShot name="users" url="auth.acme.example.com/users" alt="Users of an organization in the Casdoor admin console" />,
  },
  {
    id: "agents",
    icon: "agents",
    tab: <Translate>AI agents and MCP</Translate>,
    title: <Translate>Put AI agents and MCP servers behind your login</Translate>,
    text: <Translate>Publish MCP servers through the Casdoor gateway so that Claude, ChatGPT, Cursor and VS Code users sign in with their company account, and choose which tools each server exposes. Casdoor is also an MCP server itself and an OAuth 2.1 authorization server for your own.</Translate>,
    capabilities: [
      <Translate key="1">MCP gateway with per-user access</Translate>,
      <Translate key="2">Tool allow lists and token revocation</Translate>,
      <Translate key="3">OAuth 2.1 with dynamic client registration and PKCE</Translate>,
      <Translate key="4">Agent identities in each organization</Translate>,
      <Translate key="5">Manage Casdoor from any MCP client</Translate>,
      <Translate key="6">Agent traces with OpenClaw</Translate>,
    ],
    link: {label: <Translate>MCP gateway guide</Translate>, to: "/docs/how-to-connect/mcp/gateway"},
    visual: <ConsoleShot name="mcp-server" url="auth.acme.example.com/servers/acme/tickets" alt="An MCP server in the Casdoor admin console" />,
  },
];

function UseCases() {
  const [active, setActive] = useState(USE_CASES[0].id);
  const current = USE_CASES.find((c) => c.id === active);
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}><Translate>Built for every kind of login</Translate></h2>
        <div className={styles.useCases}>
          <div className={styles.useCaseTabs} role="tablist" aria-label={translate({message: "Use cases"})}>
            {USE_CASES.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={c.id === active}
                className={clsx(styles.useCaseTab, c.id === active && styles.useCaseTabActive)}
                onClick={() => setActive(c.id)}>
                <ThemedImage sources={art(c.icon)} alt="" width={44} height={44} />
                <span>{c.tab}</span>
              </button>
            ))}
          </div>
          <div className={styles.useCasePanel} role="tabpanel">
            <div className={styles.useCaseText}>
              <h3>{current.title}</h3>
              <p>{current.text}</p>
              <p className={styles.capTitle}><Translate>Key capabilities</Translate></p>
              <ul className={styles.caps}>
                {current.capabilities.map((cap, index) => <li key={index}>{cap}</li>)}
              </ul>
              <Link className={styles.more} to={current.link.to}>{current.link.label} <Icon name="arrow-right" size={14} /></Link>
            </div>
            <div className={styles.useCaseVisual}>{current.visual}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Developers() {
  const [active, setActive] = useState(CODE_SAMPLES[0].id);
  const sample = CODE_SAMPLES.find((s) => s.id === active);
  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className={clsx("container", styles.devGrid)}>
        <div>
          <h2 className={styles.sectionTitle}><Translate>Works with the stack you already have</Translate></h2>
          <p className={styles.sectionText}>
            <Translate>Casdoor speaks OpenID Connect, OAuth 2.0, SAML and CAS, so most frameworks and off-the-shelf apps connect with their existing login settings. For everything else there are SDKs and a REST API.</Translate>
          </p>
          <p className={styles.sdkList}>
            <strong><Translate>SDKs:</Translate></strong> {SDKS.join(", ")}
          </p>
          <div className={styles.links}>
            <Link to="/docs/how-to-connect/sdk"><Translate>SDK documentation</Translate> <Icon name="arrow-right" size={14} /></Link>
            <a href={`${DEMO_URL}/swagger/`} target="_blank" rel="noopener noreferrer"><Translate>REST API reference</Translate> <Icon name="arrow-right" size={14} /></a>
            <Link to="/ecosystem"><Translate>Integrations</Translate> <Icon name="arrow-right" size={14} /></Link>
          </div>
        </div>
        <div className={styles.codePanel}>
          <div className={styles.codeTabs} role="tablist" aria-label={translate({message: "Code samples"})}>
            {CODE_SAMPLES.map((s) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={s.id === active}
                className={clsx(styles.codeTab, s.id === active && styles.codeTabActive)}
                onClick={() => setActive(s.id)}>
                {s.label}
              </button>
            ))}
          </div>
          <div className={styles.codeBody}>
            <CodeBlock language={sample.language}>{sample.code}</CodeBlock>
          </div>
        </div>
      </div>
    </section>
  );
}

function Deploy() {
  const options = [
    {
      icon: "selfhosted",
      name: <Translate>Self-hosted</Translate>,
      note: <Translate>Free, Apache-2.0</Translate>,
      text: <Translate>One Go binary and a SQL database: MySQL, PostgreSQL, SQL Server, Oracle or SQLite. Deploy it with Docker, Helm, the Kubernetes operator or Terraform. No limit on users or applications.</Translate>,
      cta: <Translate>Installation guide</Translate>,
      href: "/docs/basic/server-installation",
    },
    {
      icon: "cloud",
      name: <Translate>Casdoor Cloud</Translate>,
      note: <Translate>From $9 per month</Translate>,
      text: <Translate>A dedicated Casdoor instance that we host and keep upgraded, with no per-user fees. New accounts get $4 in credit to try it.</Translate>,
      cta: <Translate>See Cloud pricing</Translate>,
      href: CLOUD_URL,
    },
    {
      icon: "enterprise",
      name: <Translate>Commercial and Enterprise</Translate>,
      note: <Translate>Annual license</Translate>,
      text: <Translate>Self-hosted editions with adaptive risk, provisioning, audit and compliance features, and support from the team that builds Casdoor.</Translate>,
      cta: <Translate>Compare editions</Translate>,
      href: SELF_HOSTED_URL,
    },
  ];
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}><Translate>Run it your way</Translate></h2>
        <div className={styles.deployGrid}>
          {options.map((o, index) => (
            <Link key={index} to={o.href} className={styles.deployCard}>
              <ThemedImage sources={art(o.icon)} alt="" width={96} height={96} />
              <h3>{o.name}</h3>
              <p className={styles.deployNote}>{o.note}</p>
              <p>{o.text}</p>
              <span className={styles.more}>{o.cta} <Icon name="arrow-right" size={14} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function OpenSource() {
  const comparisons = [
    {name: "Keycloak", to: "/docs/comparison/casdoor-vs-keycloak"},
    {name: "Auth0", to: "/docs/comparison/casdoor-vs-auth0"},
    {name: "Authentik", to: "/docs/comparison/casdoor-vs-authentik"},
    {name: "Logto", to: "/docs/comparison/casdoor-vs-logto"},
  ];
  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className={clsx("container", styles.osGrid)}>
        <ThemedImage className={styles.osArt} sources={art("opensource")} alt="" width={220} height={220} />
        <div>
          <h2 className={styles.sectionTitle}><Translate>Open source, Apache-2.0</Translate></h2>
          <p className={styles.sectionText}>
            <Translate values={{
              github: <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>,
            }}>
              {"The whole open-source edition is on {github} under the Apache-2.0 license, with no limit on users. Casdoor holds the OpenSSF Best Practices badge and is listed in the CNCF Cloud Native Landscape."}
            </Translate>
          </p>
          <div className={styles.badges}>
            <a href="https://www.bestpractices.dev/projects/15254" target="_blank" rel="noopener noreferrer">
              <img src="https://www.bestpractices.dev/projects/15254/badge" alt="OpenSSF Best Practices" height={20} loading="lazy" />
            </a>
            <a href="https://github.com/casdoor/casdoor/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/github/license/casdoor/casdoor?style=flat" alt="License" height={20} loading="lazy" />
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/github/stars/casdoor/casdoor?style=flat" alt="GitHub stars" height={20} loading="lazy" />
            </a>
          </div>
          <p className={styles.compare}>
            <Translate>Compare Casdoor with</Translate>{" "}
            {comparisons.map((c, index) => (
              <React.Fragment key={c.name}>
                {index > 0 && ", "}
                <Link to={c.to}>{c.name}</Link>
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className={styles.final}>
      <div className={clsx("container", styles.finalInner)}>
        <div>
          <h2 className={styles.sectionTitle}><Translate>Try Casdoor</Translate></h2>
          <p className={styles.sectionText}>
            <Translate values={{
              discord: <a href="https://discord.gg/5rPsrAzK7S" target="_blank" rel="noopener noreferrer">Discord</a>,
            }}>
              {"Look around the live demo, or start your own instance with Docker. Questions are welcome on {discord}."}
            </Translate>
          </p>
        </div>
        <div className={styles.actions}>
          <Link className={clsx(styles.btn, styles.btnPrimary)} to="/docs/basic/try-with-docker">
            <Translate>Get started</Translate>
          </Link>
          <a className={clsx(styles.btn, styles.btnOutline)} href={DEMO_URL} target="_blank" rel="noopener noreferrer">
            <Translate>Live demo</Translate>
          </a>
        </div>
      </div>
    </section>
  );
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://casdoor.ai/#organization",
      "name": "Casdoor",
      "url": "https://casdoor.ai/",
      "logo": "https://casdoor.ai/img/casdoor.png",
      "sameAs": [
        "https://github.com/casdoor/casdoor",
        "https://www.casdoor.com/",
        "https://hub.docker.com/r/casbin/casdoor",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://casdoor.ai/#website",
      "name": "Casdoor",
      "url": "https://casdoor.ai/",
      "publisher": {"@id": "https://casdoor.ai/#organization"},
    },
    {
      "@type": "SoftwareApplication",
      "name": "Casdoor",
      "url": "https://casdoor.ai/",
      "description": "Open-source identity and access management (IAM) and single sign-on (SSO) platform for users and AI agents, with OAuth 2.0, OIDC, SAML, CAS, LDAP, SCIM, WebAuthn, MFA and a built-in MCP server.",
      "applicationCategory": "SecurityApplication",
      "operatingSystem": "Linux, Windows, macOS, Docker, Kubernetes",
      "downloadUrl": "https://github.com/casdoor/casdoor/releases",
      "license": "https://www.apache.org/licenses/LICENSE-2.0",
      "isAccessibleForFree": true,
      "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"},
      "publisher": {"@id": "https://casdoor.ai/#organization"},
    },
  ],
};

export default function Home() {
  return (
    <Layout
      title="Open-Source Identity and Access Management (IAM) and SSO"
      description="Casdoor is an open-source identity and access management (IAM) and single sign-on (SSO) platform: OAuth 2.0, OIDC, SAML, CAS, LDAP, SCIM, passkeys and MFA, 70+ identity providers, and an MCP gateway for AI agents.">
      <Head>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Head>
      <div className={styles.page}>
        <Hero />
        <News />
        <main>
          <Customers />
          <Stats />
          <UseCases />
          <Developers />
          <Deploy />
          <OpenSource />
          <FinalCta />
        </main>
      </div>
    </Layout>
  );
}
