import React, {useEffect, useState} from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";
import ThemedImage from "@theme/ThemedImage";
import Translate, {translate} from "@docusaurus/Translate";
import Icon from "../components/Home/Icon";
import catalog from "@site/src/data/marketplaceCatalog.json";
import styles from "./index.module.scss";

const DEMO_URL = "https://door.casdoor.com";
const GITHUB_URL = "https://github.com/casdoor/casdoor";
const MARKETPLACE_URL = catalog.url;
const CLOUD_URL = "https://www.casdoor.com/pricing?utm_source=casdoor.ai&utm_medium=homepage";
const CLOUD_TRIAL_URL = "https://admin.casdoor.com/signup?from=%2Finstances%2Fnew%3Ftier%3Dbasic%26period%3DPostPaid";
const SELF_HOSTED_URL = "https://www.casdoor.com/pricing/self-hosted?utm_source=casdoor.ai&utm_medium=homepage";
const DOCKER_COMMAND = "docker run -p 8000:8000 casbin/casdoor-all-in-one";

// Sign-in themes from the Casdoor Marketplace; the screenshots are in static/img/home/themes
const HERO_THEMES = [
  {id: "aurora", name: "Aurora"},
  {id: "split", name: "Split"},
  {id: "midnight", name: "Midnight"},
  {id: "prism", name: "Prism"},
  {id: "backdrop", name: "Backdrop"},
  {id: "halves", name: "Halves"},
];

// Casdoor users, the same list and evidence as the customer wall of www.casdoor.com (cloudwork casdoor/users.md).
// These are Casdoor users, not Casbin users: static/data/users.json is the Casbin list.
const CUSTOMERS = [
  {name: "Daimler Truck", logo: "gh-daimlertruck.png"},
  {name: "Tencent", logo: "gh-tencent.png"},
  {name: "Bosch", logo: "si-bosch.svg"},
  {name: "Volkswagen", logo: "si-volkswagen.svg"},
  {name: "LOTTE", logo: "lotte.png"},
  {name: "NAVER", logo: "si-naver.svg"},
  {name: "CNPC", logo: "cnpc.svg"},
  {name: "CIMB Niaga", logo: "cimb-niaga.png"},
  {name: "KOSTAL", logo: "kostal.png"},
  {name: "iFLYTEK", logo: "gh-iflytek.png"},
  {name: "Sangfor", logo: "gh-sangfor.png"},
  {name: "Percona", logo: "gh-percona.png"},
  {name: "Apache APISIX", logo: "apisix-mark.png"},
  {name: "Apache DolphinScheduler", logo: "si-apachedolphinscheduler.svg"},
  {name: "Apache Pulsar", logo: "si-apachepulsar.svg"},
  {name: "Apache ShenYu", logo: "shenyu-mark.svg"},
  {name: "LobeHub", logo: "gh-lobehub.png"},
  {name: "Qiniu", logo: "gh-qiniu.png"},
  {name: "OpenCSG", logo: "gh-opencsgs.png"},
  {name: "AI71", logo: "ai71.png"},
  {name: "Marlink", logo: "marlink.png"},
  {name: "Korea NDMI", logo: "ndmi.svg"},
  {name: "IIM Bangalore", logo: "iimb.svg"},
  {name: "NFDI4Culture", logo: "gh-nfdi4culture.png"},
  {name: "ForteBank", logo: "fortebank.png"},
  {name: "RE/MAX Brasil", logo: "remax.png"},
  {name: "Cake", logo: "cake.png"},
  {name: "HSC Securities", logo: "hsc.png"},
  {name: "Tsinghua FIB Lab", logo: "gh-tsinghua-fib-lab.png"},
  {name: "OpenList", logo: "gh-openlistteam.png"},
  {name: "Deepchecks", logo: "gh-deepchecks.png"},
];

const SDKS = [
  {name: "Go", logo: "si-go.svg"},
  {name: "Java", logo: "si-openjdk.svg", mono: true},
  {name: "Node.js", logo: "si-nodedotjs.svg"},
  {name: "Python", logo: "si-python.svg"},
  {name: "PHP", logo: "si-php.svg"},
  {name: ".NET", logo: "si-dotnet.svg"},
  {name: "Rust", logo: "si-rust.svg", mono: true},
  {name: "React", logo: "si-react.svg"},
  {name: "Vue", logo: "si-vuedotjs.svg"},
  {name: "Angular", logo: "si-angular.svg", mono: true},
  {name: "Next.js", logo: "si-nextdotjs.svg", mono: true},
  {name: "Flutter", logo: "si-flutter.svg"},
  {name: "iOS", logo: "si-apple.svg", mono: true},
  {name: "Android", logo: "si-android.svg"},
];

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

function logoUrl(file) {
  return `/img/home/logos/${file}`;
}

function SectionHeader({eyebrow, title, lead, align = "center", invert}) {
  return (
    <div className={clsx(styles.sectionHeader, align === "left" && styles.sectionHeaderLeft, invert && styles.invert)}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 className={styles.sectionTitle}>{title}</h2>
      {lead && <p className={styles.sectionLead}>{lead}</p>}
    </div>
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
    <div className={styles.command}>
      <span className={styles.commandPrompt} aria-hidden="true">$</span>
      <code className={styles.commandText}>{command}</code>
      <button
        type="button"
        className={styles.commandCopy}
        onClick={copy}
        aria-label={translate({message: "Copy the command"})}>
        <Icon name={copied ? "check" : "copy"} size={16} />
      </button>
    </div>
  );
}

function ThemeShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
      return undefined;
    }
    const id = setInterval(() => setActive((i) => (i + 1) % HERO_THEMES.length), 4500);
    return () => clearInterval(id);
  }, [paused]);

  const current = HERO_THEMES[active];
  return (
    <div className={styles.showcase} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className={styles.browser}>
        <div className={styles.browserBar}>
          <span className={styles.browserDots} aria-hidden="true"><i /><i /><i /></span>
          <span className={styles.browserUrl}>
            <Icon name="lock" size={12} />
            door.casdoor.com/login
          </span>
        </div>
        <a
          className={styles.browserBody}
          href={`${DEMO_URL}/login?theme=${current.id}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={translate({message: "Open the sign-in page of the live demo"})}>
          {HERO_THEMES.map((theme, index) => (
            <img
              key={theme.id}
              src={`/img/home/themes/${theme.id}.webp`}
              alt={translate({message: "Casdoor sign-in page with the {theme} theme"}, {theme: theme.name})}
              width={1280}
              height={800}
              loading={index === 0 ? "eager" : "lazy"}
              className={clsx(styles.browserShot, index === active && styles.browserShotActive)}
            />
          ))}
        </a>
      </div>
      <div className={styles.themeTabs} role="tablist" aria-label={translate({message: "Sign-in themes"})}>
        {HERO_THEMES.map((theme, index) => (
          <button
            key={theme.id}
            type="button"
            role="tab"
            aria-selected={index === active}
            className={clsx(styles.themeTab, index === active && styles.themeTabActive)}
            onClick={() => setActive(index)}>
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className={clsx("container", styles.heroInner)}>
        <div className={styles.heroCopy}>
          <Link to="/docs/migration/overview" className={styles.announce}>
            <span className={styles.announceTag}><Translate>New</Translate></span>
            <span><Translate>Migrate from Auth0, Keycloak and Okta</Translate></span>
            <Icon name="arrow-right" size={14} />
          </Link>
          <h1 className={styles.heroTitle}>
            <Translate>The open-source identity platform for apps and AI agents</Translate>
          </h1>
          <p className={styles.heroLead}>
            <Translate>Casdoor is a single sign-on and IAM platform that you run anywhere. Sign users in with OAuth 2.0, OpenID Connect, SAML, CAS, LDAP and passkeys, connect 70+ identity providers, and secure MCP servers and AI agents, all from one admin console.</Translate>
          </p>
          <div className={styles.heroActions}>
            <Link className={clsx(styles.btn, styles.btnPrimary)} to="/docs/basic/try-with-docker">
              <Translate>Get started</Translate>
              <Icon name="arrow-right" size={16} />
            </Link>
            <a className={clsx(styles.btn, styles.btnSecondary)} href={DEMO_URL} target="_blank" rel="noopener noreferrer">
              <Translate>Try the live demo</Translate>
              <Icon name="external" size={15} />
            </a>
          </div>
          <CopyCommand command={DOCKER_COMMAND} />
          <ul className={styles.heroFacts}>
            <li><Icon name="scale" size={16} /><Translate>Apache-2.0 license</Translate></li>
            <li><Icon name="star" size={16} /><Translate>14k+ GitHub stars</Translate></li>
            <li><Icon name="download" size={16} /><Translate>2.5M+ Docker pulls</Translate></li>
          </ul>
        </div>
        <ThemeShowcase />
      </div>
    </header>
  );
}

function Customers() {
  const items = [...CUSTOMERS, ...CUSTOMERS];
  return (
    <section className={styles.customers} aria-label={translate({message: "Organizations using Casdoor"})}>
      <div className="container">
        <p className={styles.customersTitle}><Translate>Trusted by engineering teams at</Translate></p>
      </div>
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {items.map((customer, index) => (
            <span key={index} className={styles.customer} aria-hidden={index >= CUSTOMERS.length}>
              <img src={logoUrl(customer.logo)} alt="" width={28} height={28} loading="lazy" />
              {customer.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: "log-in",
    title: <Translate>Single sign-on</Translate>,
    text: <Translate>One login for all your apps. Casdoor is an OAuth 2.0 and OpenID Connect provider, a SAML identity provider and a CAS server, with sign-in and sign-up pages that you configure without code.</Translate>,
    link: "/docs/how-to-connect/overview",
  },
  {
    icon: "globe",
    title: <Translate>Social and enterprise login</Translate>,
    text: <Translate>70+ built-in providers, from Google, GitHub, Apple and Microsoft Entra ID to WeCom, DingTalk and Lark, plus any SAML or OIDC identity provider.</Translate>,
    link: "/docs/provider/oauth/overview",
  },
  {
    icon: "key",
    title: <Translate>MFA and passkeys</Translate>,
    text: <Translate>Passwords, email and SMS codes, TOTP, WebAuthn and passkeys, with multi-factor authentication that each organization makes optional or required.</Translate>,
    link: "/docs/user/multi-factor-authentication",
  },
  {
    icon: "building",
    title: <Translate>Multi-tenant organizations</Translate>,
    text: <Translate>Serve many customers or business units from one instance. Each organization has its own users, groups, roles, applications and branding.</Translate>,
    link: "/docs/organization/overview",
  },
  {
    icon: "refresh",
    title: <Translate>Directory sync and provisioning</Translate>,
    text: <Translate>Sync users from LDAP, Active Directory, Okta, Google Workspace and databases, provision them over SCIM 2.0, and serve LDAP and RADIUS to legacy systems.</Translate>,
    link: "/docs/syncer/overview",
  },
  {
    icon: "shield-check",
    title: <Translate>Fine-grained authorization</Translate>,
    text: <Translate>Permissions built on Apache Casbin, with ACL, RBAC and ABAC models and an API that your services call to enforce them.</Translate>,
    link: "/docs/permission/overview",
  },
  {
    icon: "workflow",
    title: <Translate>No-code flows</Translate>,
    text: <Translate>Run checks and actions before and after sign-up, sign-in and token issuance: require MFA, add token claims or call your own service.</Translate>,
    link: "/docs/flows/overview",
  },
  {
    icon: "activity",
    title: <Translate>Sessions, tokens and audit</Translate>,
    text: <Translate>JWT access and ID tokens with refresh and revocation, session management with single sign-out, and a record of every sign-in and admin action.</Translate>,
    link: "/docs/session/overview",
  },
  {
    icon: "import",
    title: <Translate>Migration from other providers</Translate>,
    text: <Translate>Import users, password hashes and applications from Auth0, Keycloak and Okta, and keep client IDs so your apps keep working.</Translate>,
    link: "/docs/migration/overview",
  },
];

function Features() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          eyebrow={<Translate>Platform</Translate>}
          title={<Translate>Authentication, authorization and user management in one platform</Translate>}
          lead={<Translate>Everything you need to sign users in and control what they can do, from the first login page to enterprise directories.</Translate>}
        />
        <div className={styles.featureGrid}>
          {FEATURES.map((feature) => (
            <Link key={feature.link} to={feature.link} className={styles.featureCard}>
              <span className={styles.featureIcon}><Icon name={feature.icon} size={22} /></span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
              <span className={styles.cardLink}><Translate>Learn more</Translate><Icon name="arrow-right" size={14} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureColumn({title, items}) {
  return (
    <div className={styles.archColumn}>
      <p className={styles.archLabel}>{title}</p>
      <ul>
        {items.map((item) => (
          <li key={item.key} className={styles.archItem}>
            <span className={styles.archItemIcon}>
              {item.icon ? <Icon name={item.icon} size={18} /> : <img src={item.logo} alt="" width={18} height={18} />}
            </span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Architecture() {
  const apps = [
    {key: "web", icon: "monitor", label: <Translate>Web applications</Translate>},
    {key: "mobile", icon: "smartphone", label: <Translate>Mobile and desktop apps</Translate>},
    {key: "api", icon: "code", label: <Translate>APIs and microservices</Translate>},
    {key: "selfhosted", icon: "box", label: <Translate>Grafana, GitLab, Nextcloud and more</Translate>},
    {key: "agents", icon: "bot", label: <Translate>AI agents and MCP clients</Translate>},
  ];
  const sources = [
    {key: "social", icon: "globe", label: <Translate>Google, GitHub, Apple, Microsoft</Translate>},
    {key: "enterprise", icon: "building", label: <Translate>Entra ID, Okta and any SAML or OIDC IdP</Translate>},
    {key: "ldap", icon: "network", label: <Translate>LDAP and Active Directory</Translate>},
    {key: "im", icon: "users", label: <Translate>WeCom, DingTalk and Lark</Translate>},
    {key: "db", icon: "database", label: <Translate>Your own user database</Translate>},
  ];
  const core = [
    <Translate key="sso">Single sign-on</Translate>,
    <Translate key="mfa">MFA and passkeys</Translate>,
    <Translate key="users">Users and organizations</Translate>,
    <Translate key="perm">Permissions</Translate>,
    <Translate key="audit">Sessions and audit</Translate>,
  ];
  return (
    <section className={clsx(styles.section, styles.sectionMuted)}>
      <div className="container">
        <SectionHeader
          eyebrow={<Translate>How it works</Translate>}
          title={<Translate>One identity layer between your apps and your users</Translate>}
          lead={<Translate>Your applications hand sign-in to Casdoor over standard protocols. Casdoor checks the user against the identity sources you connect and returns a verified identity.</Translate>}
        />
        <div className={styles.arch}>
          <ArchitectureColumn title={<Translate>Your applications</Translate>} items={apps} />
          <div className={styles.archLink} aria-hidden="true">
            <span>OIDC</span><span>SAML</span><span>CAS</span><span>LDAP</span>
          </div>
          <div className={styles.archCore}>
            <ThemedImage
              className={styles.archLogo}
              alt="Casdoor"
              width={157}
              height={34}
              sources={{
                light: "https://cdn.casbin.org/img/casdoor-logo_1185x256.png",
                dark: "https://cdn.casbin.org/img/casdoor-logo_1185x256_dark.png",
              }}
            />
            <ul>
              {core.map((item, index) => (
                <li key={index}><Icon name="check" size={15} />{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.archLink} aria-hidden="true">
            <span>OAuth</span><span>SAML</span><span>LDAP</span><span>SCIM</span>
          </div>
          <ArchitectureColumn title={<Translate>Identity sources</Translate>} items={sources} />
        </div>
        <div className={styles.protocols}>
          {["OAuth 2.0 / 2.1", "OpenID Connect", "SAML 2.0", "CAS 3.0", "LDAP", "SCIM 2.0", "RADIUS", "WebAuthn", "TOTP", "JWT", "MCP"].map((protocol) => (
            <span key={protocol} className={styles.protocol}>{protocol}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Developers() {
  const [active, setActive] = useState(CODE_SAMPLES[0].id);
  const sample = CODE_SAMPLES.find((s) => s.id === active);
  const steps = [
    {
      title: <Translate>Run Casdoor</Translate>,
      text: <Translate>Start it with Docker, Kubernetes or a single binary, on MySQL, PostgreSQL, SQL Server, Oracle or SQLite.</Translate>,
    },
    {
      title: <Translate>Create an application</Translate>,
      text: <Translate>Pick its sign-in methods and providers in the admin console and copy the client ID and secret.</Translate>,
    },
    {
      title: <Translate>Connect your app</Translate>,
      text: <Translate>Use any OpenID Connect or SAML library, or a Casdoor SDK, to send users to Casdoor and read the token.</Translate>,
    },
  ];
  return (
    <section className={styles.section}>
      <div className={clsx("container", styles.devGrid)}>
        <div>
          <SectionHeader
            align="left"
            eyebrow={<Translate>Developers</Translate>}
            title={<Translate>Add sign-in to your app in minutes</Translate>}
            lead={<Translate>Casdoor speaks the standards your stack already supports, and ships SDKs for the languages and frameworks you use.</Translate>}
          />
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li key={index}>
                <span className={styles.stepNumber}>{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className={styles.inlineLinks}>
            <Link to="/docs/how-to-connect/sdk"><Translate>Browse all SDKs</Translate><Icon name="arrow-right" size={14} /></Link>
            <a href={`${DEMO_URL}/swagger/`} target="_blank" rel="noopener noreferrer"><Translate>REST API reference</Translate><Icon name="arrow-right" size={14} /></a>
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
      <div className="container">
        <div className={styles.sdkRow}>
          {SDKS.map((sdk) => (
            <Link key={sdk.name} to="/docs/how-to-connect/sdk" className={styles.sdk}>
              <img src={logoUrl(sdk.logo)} alt="" width={22} height={22} className={clsx(sdk.mono && styles.mono)} loading="lazy" />
              {sdk.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const AGENT_FEATURES = [
  {
    icon: "bot",
    title: <Translate>Built-in MCP server</Translate>,
    text: <Translate>Manage applications, users and permissions from Claude, ChatGPT, Cursor or VS Code. Every tool call is authorized with scopes.</Translate>,
    link: "/docs/how-to-connect/mcp/overview",
  },
  {
    icon: "key",
    title: <Translate>OAuth 2.1 for your MCP servers</Translate>,
    text: <Translate>Use Casdoor as the authorization server of your own MCP servers, with dynamic client registration, PKCE and resource indicators.</Translate>,
    link: "/docs/mcp-auth/overview",
  },
  {
    icon: "shield-check",
    title: <Translate>MCP gateway</Translate>,
    text: <Translate>Publish MCP servers behind single sign-on, with per-user access, a tool allowlist, tokens bound to each server and instant revocation.</Translate>,
    link: "/docs/how-to-connect/mcp/gateway",
  },
  {
    icon: "eye",
    title: <Translate>Agent observability</Translate>,
    text: <Translate>Collect the traces, metrics and logs of OpenClaw agents over OpenTelemetry and see what each agent did next to the user it acted for.</Translate>,
    link: "/docs/llm/openclaw",
  },
];

function Agents() {
  return (
    <section className={clsx(styles.section, styles.sectionDark)}>
      <div className={clsx("container", styles.agentGrid)}>
        <div>
          <SectionHeader
            align="left"
            invert
            eyebrow={<Translate>AI agents and MCP</Translate>}
            title={<Translate>Identity for AI agents, built in</Translate>}
            lead={<Translate>Agents need the same controls as people: who they are, who they act for and what they may call. Casdoor brings single sign-on, scopes and audit to the Model Context Protocol.</Translate>}
          />
          <div className={styles.agentCards}>
            {AGENT_FEATURES.map((feature) => (
              <Link key={feature.link} to={feature.link} className={styles.agentCard}>
                <span className={styles.agentIcon}><Icon name={feature.icon} size={20} /></span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.agentCode}>
          <p className={styles.agentCodeTitle}>
            <Translate>Connect an MCP client to Casdoor</Translate>
          </p>
          <div className={styles.darkCode}>
            <div className={styles.darkCodeTitle}>mcp.json</div>
            <pre><code>{"{\n  "}<span className={styles.tokKey}>&quot;mcpServers&quot;</span>{": {\n    "}<span className={styles.tokKey}>&quot;casdoor&quot;</span>{": {\n      "}<span className={styles.tokKey}>&quot;url&quot;</span>{": "}<span className={styles.tokStr}>&quot;https://auth.example.com/api/mcp&quot;</span>{"\n    }\n  }\n}"}</code></pre>
          </div>
          <p className={styles.agentCodeNote}>
            <Translate>The client registers itself, the user signs in with Casdoor and approves the scopes, and the client receives a token bound to the server.</Translate>
          </p>
          <div className={styles.agentClients}>
            {["Claude", "ChatGPT", "Cursor", "VS Code", "DeepSeek Harness"].map((client) => (
              <span key={client}>{client}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Customize() {
  const integrations = catalog.integrations;
  const apps = integrations.filter((i) => i.type === "app" || i.type === "provider");
  const themeCount = integrations.filter((i) => i.type === "theme").length;
  const themes = ["midnight", "split", "aurora", "prism"].map((id) => HERO_THEMES.find((t) => t.id === id));
  return (
    <section className={clsx(styles.section, styles.sectionMuted)}>
      <div className="container">
        <SectionHeader
          eyebrow={<Translate>Customization and Marketplace</Translate>}
          title={<Translate>Your brand on every sign-in page</Translate>}
          lead={
            <Translate values={{count: integrations.length, themes: themeCount}}>
              {"Set the logo, colors, fields and sign-in methods of each application without code, or install any of {count} integrations from the Casdoor Marketplace in one click, including {themes} sign-in themes."}
            </Translate>
          }
        />
        <div className={styles.themeGrid}>
          {themes.map((theme) => (
            <a
              key={theme.id}
              className={styles.themeCard}
              href={`${MARKETPLACE_URL}/integrations/${theme.id}/`}
              target="_blank"
              rel="noopener noreferrer">
              <img src={`/img/home/themes/${theme.id}.webp`} alt="" width={1280} height={800} loading="lazy" />
              <span>{theme.name}</span>
            </a>
          ))}
        </div>
        <div className={styles.integrations}>
          {apps.map((integration) => (
            <a
              key={integration.id}
              className={styles.integration}
              href={`${MARKETPLACE_URL}/integrations/${integration.id}/`}
              target="_blank"
              rel="noopener noreferrer">
              {integration.logo && <img src={`${MARKETPLACE_URL}${integration.logo}`} alt="" width={20} height={20} loading="lazy" />}
              {integration.name}
            </a>
          ))}
        </div>
        <div className={styles.centerActions}>
          <a className={clsx(styles.btn, styles.btnSecondary)} href={MARKETPLACE_URL} target="_blank" rel="noopener noreferrer">
            <Translate>Browse the Marketplace</Translate>
            <Icon name="external" size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

function OpenSource() {
  const points = [
    {
      icon: "scale",
      title: <Translate>Apache-2.0, no per-user fees</Translate>,
      text: <Translate>Self-host Casdoor for free, for any number of users and applications, with the full source code on GitHub.</Translate>,
    },
    {
      icon: "database",
      title: <Translate>Your data, your database</Translate>,
      text: <Translate>Users and settings stay in a database you control: MySQL, PostgreSQL, SQL Server, Oracle, SQLite and more.</Translate>,
    },
    {
      icon: "server",
      title: <Translate>Runs anywhere</Translate>,
      text: <Translate>One Go binary with a React console. Deploy with Docker, Helm, the Kubernetes operator or Terraform, on any cloud or on premises.</Translate>,
    },
    {
      icon: "shield-check",
      title: <Translate>Built in the open</Translate>,
      text: <Translate>300+ contributors, public code review and an OpenSSF Best Practices badge, with a published security policy.</Translate>,
    },
  ];
  const comparisons = [
    {name: "Keycloak", to: "/docs/comparison/casdoor-vs-keycloak"},
    {name: "Auth0", to: "/docs/comparison/casdoor-vs-auth0"},
    {name: "Authentik", to: "/docs/comparison/casdoor-vs-authentik"},
    {name: "Logto", to: "/docs/comparison/casdoor-vs-logto"},
  ];
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          eyebrow={<Translate>Open source</Translate>}
          title={<Translate>Own your identity stack, with no lock-in</Translate>}
        />
        <div className={styles.pointGrid}>
          {points.map((point, index) => (
            <div key={index} className={styles.point}>
              <span className={styles.pointIcon}><Icon name={point.icon} size={20} /></span>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </div>
          ))}
        </div>
        <div className={styles.trustRow}>
          <a className={styles.trustBadge} href="https://www.bestpractices.dev/projects/15254" target="_blank" rel="noopener noreferrer">
            <Icon name="shield-check" size={16} />
            <span>OpenSSF Best Practices</span>
            <strong>Passing</strong>
          </a>
          <Link className={styles.trustBadge} to="/blog/casdoor-joins-cncf-landscape">
            <img src="https://landscape.cncf.io/images/logo_header.svg" alt="" height={18} />
            <span><Translate>CNCF Cloud Native Landscape</Translate></span>
          </Link>
          <div className={styles.compare}>
            <span><Translate>Compare Casdoor with</Translate></span>
            {comparisons.map((c) => (
              <Link key={c.name} to={c.to}>{c.name}</Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Deploy() {
  const plans = [
    {
      icon: "server",
      name: <Translate>Self-hosted</Translate>,
      price: <Translate>Free and open source</Translate>,
      text: <Translate>Run the open-source edition on your own servers, with every protocol, provider and the MCP server included.</Translate>,
      items: [
        <Translate key="1">Unlimited users and applications</Translate>,
        <Translate key="2">Docker, Kubernetes and binaries</Translate>,
        <Translate key="3">Community support on GitHub and Discord</Translate>,
      ],
      cta: <Translate>Install Casdoor</Translate>,
      href: "/docs/basic/server-installation",
    },
    {
      icon: "cloud",
      name: <Translate>Casdoor Cloud</Translate>,
      price: <Translate>From $9 per month</Translate>,
      text: <Translate>A dedicated Casdoor instance that we host and keep upgraded, with no per-user fees.</Translate>,
      items: [
        <Translate key="1">A dedicated instance, not a shared tenant</Translate>,
        <Translate key="2">Pay as you go, monthly or yearly</Translate>,
        <Translate key="3">$4 in free credit to start</Translate>,
      ],
      cta: <Translate>Start a free trial</Translate>,
      href: CLOUD_TRIAL_URL,
      secondary: {label: <Translate>See pricing</Translate>, href: CLOUD_URL},
      featured: true,
    },
    {
      icon: "briefcase",
      name: <Translate>Commercial and Enterprise</Translate>,
      price: <Translate>Annual license</Translate>,
      text: <Translate>Self-hosted editions with advanced security and compliance features, priority support and upgrades from the Casdoor team.</Translate>,
      items: [
        <Translate key="1">Adaptive risk and advanced MFA policies</Translate>,
        <Translate key="2">Provisioning, audit and compliance tools</Translate>,
        <Translate key="3">Priority support from the maintainers</Translate>,
      ],
      cta: <Translate>Compare editions</Translate>,
      href: SELF_HOSTED_URL,
    },
  ];
  return (
    <section className={clsx(styles.section, styles.sectionMuted)}>
      <div className="container">
        <SectionHeader
          eyebrow={<Translate>Deployment</Translate>}
          title={<Translate>Run it yourself, or let us run it for you</Translate>}
        />
        <div className={styles.planGrid}>
          {plans.map((plan, index) => (
            <div key={index} className={clsx(styles.plan, plan.featured && styles.planFeatured)}>
              <span className={styles.planIcon}><Icon name={plan.icon} size={20} /></span>
              <h3>{plan.name}</h3>
              <p className={styles.planPrice}>{plan.price}</p>
              <p className={styles.planText}>{plan.text}</p>
              <ul>
                {plan.items.map((item, i) => (
                  <li key={i}><Icon name="check" size={16} />{item}</li>
                ))}
              </ul>
              <div className={styles.planActions}>
                <Link className={clsx(styles.btn, plan.featured ? styles.btnPrimary : styles.btnSecondary)} to={plan.href}>
                  {plan.cta}
                </Link>
                {plan.secondary && (
                  <Link className={styles.textLink} to={plan.secondary.href}>{plan.secondary.label}</Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className={styles.finalCta}>
      <div className={clsx("container", styles.finalInner)}>
        <h2><Translate>Start building with Casdoor</Translate></h2>
        <p><Translate>Run Casdoor locally in one command and connect your first app in minutes.</Translate></p>
        <div className={styles.heroActions}>
          <Link className={clsx(styles.btn, styles.btnLight)} to="/docs/basic/try-with-docker">
            <Translate>Get started</Translate>
            <Icon name="arrow-right" size={16} />
          </Link>
          <a className={clsx(styles.btn, styles.btnGhost)} href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="star" size={16} />
            <Translate>Star on GitHub</Translate>
          </a>
        </div>
        <p className={styles.finalNote}>
          <Translate values={{
            discord: <a href="https://discord.gg/5rPsrAzK7S" target="_blank" rel="noopener noreferrer">Discord</a>,
            sponsor: <a href="mailto:admin@casdoor.org"><Translate>sponsor the project</Translate></a>,
          }}>
            {"Questions? Join the community on {discord}, or {sponsor}."}
          </Translate>
        </p>
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
      title="Open-Source IAM and SSO Platform for Apps and AI Agents"
      description="Casdoor is an open-source identity and access management (IAM) and single sign-on (SSO) platform: OAuth 2.0, OIDC, SAML, CAS, LDAP, SCIM, passkeys and MFA, 70+ identity providers, and a built-in MCP server for AI agents.">
      <Head>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Head>
      <div className={styles.page}>
        <Hero />
        <main>
          <Customers />
          <Features />
          <Architecture />
          <Developers />
          <Agents />
          <Customize />
          <OpenSource />
          <Deploy />
          <FinalCta />
        </main>
      </div>
    </Layout>
  );
}
