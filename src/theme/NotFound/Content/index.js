import React, {useEffect, useState} from "react";
import Content from "@theme-original/NotFound/Content";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import {useAllDocsData} from "@docusaurus/plugin-content-docs/client";

const SUPPORTED_LOCALES = ["zh", "es", "fr", "de", "ja", "pt", "uk"];
const DROPPED_LOCALES = ["en", "en-us", "vi", "tr", "pl", "ko", "ru", "ar", "th", "it", "id", "nl", "he", "fa", "hi", "cs", "sv", "zh-cn", "zh-tw", "zh-hans", "zh-hant"];

const ALIASES = {
  "/docs": "/docs/overview",
  "/docs/getting_started": "/docs/overview",
  "/docs/basic": "/docs/overview",
  "/docs/overview/whatis": "/docs/overview",
  "/docs/basic/overview": "/docs/overview",
  "/docs/basic/basic-concept-introduction": "/docs/basic/core-concepts",
  "/docs/basic/installation": "/docs/basic/server-installation",
  "/docs/basic/try-with-casdoor": "/docs/basic/try-with-docker",
  "/docs/config": "/docs/basic/configuration",
  "/docs/basic/server-config": "/docs/basic/configuration",
  "/docs/basic/server-configuration": "/docs/basic/configuration",
  "/docs/api": "/docs/basic/public-api",
  "/docs/api/overview": "/docs/basic/public-api",
  "/docs/basic/api": "/docs/basic/public-api",
  "/docs/how-to-connect/api": "/docs/basic/public-api",
  "/docs/how-to-connect/oidc": "/docs/how-to-connect/oauth",
  "/docs/how-to-connect/oidc/overview": "/docs/how-to-connect/oauth",
  "/docs/how-to-connect/oauth/overview": "/docs/how-to-connect/oauth",
  "/docs/basic/oidc": "/docs/how-to-connect/oauth",
  "/docs/basic/oauth": "/docs/how-to-connect/oauth",
  "/docs/oidc/oidc": "/docs/how-to-connect/oauth",
  "/docs/how-to-connect/saml": "/docs/how-to-connect/saml/overview",
  "/docs/how-to-connect/single-sign-on": "/docs/session/single-sign-on",
  "/docs/how-to-connect/sso": "/docs/session/single-sign-on",
  "/docs/how-to-connect/single-sign-out": "/docs/session/single-sign-out",
  "/docs/how-to-connect/oauth-consent": "/docs/application/scopes",
  "/docs/category/how-to-connect-to-casdoor": "/docs/how-to-connect/overview",
  "/docs/basic/how-to-connect": "/docs/how-to-connect/overview",
  "/docs/integration/sdks": "/docs/how-to-connect/sdk",
  "/docs/basic/sdks": "/docs/how-to-connect/sdk",
  "/docs/provider": "/docs/provider/overview",
  "/docs/provider/oauth": "/docs/provider/oauth/overview",
  "/docs/provider/cas/overview": "/docs/how-to-connect/cas",
  "/docs/provider/google/overview": "/docs/provider/oauth/google",
  "/docs/provider/web3": "/docs/provider/overview",
  "/docs/provider/web3/metamask": "/docs/provider/overview",
  "/docs/provider/web3/web3onboard": "/docs/provider/overview",
  "/docs/category/web3": "/docs/provider/overview",
  "/docs/webhook": "/docs/webhooks/overview",
  "/docs/webhook/overview": "/docs/webhooks/overview",
  "/docs/basic/mcp": "/docs/how-to-connect/mcp/overview",
  "/docs/mcp": "/docs/how-to-connect/mcp/overview",
  "/docs/mcp/overview": "/docs/how-to-connect/mcp/overview",
  "/docs/group": "/docs/organization/organization-tree",
  "/docs/group/overview": "/docs/organization/organization-tree",
  "/docs/organization/group": "/docs/organization/organization-tree",
  "/blog/rss": "/blog/rss.xml",
  "/pricing": "https://www.casdoor.com/pricing",
};

function normalize(pathname) {
  let p = pathname;
  try {
    p = decodeURIComponent(p);
  } catch (e) {
    // keep the raw path
  }
  p = p.replace(/^\/+https?:\/+casdoor\.(ai|org)/i, "");
  p = p.replace(/\/+$/, "");
  p = p.replace(/[。.,，)]+$/u, "");
  p = p.replace(/\.(md|mdx|html)$/i, "");
  p = p.replace(/\/+$/, "");
  if (!p.startsWith("/")) {
    p = "/" + p;
  }

  let locale = "";
  const first = p.split("/")[1] || "";
  const lower = first.toLowerCase();
  if (SUPPORTED_LOCALES.includes(lower)) {
    locale = "/" + lower;
    p = p.slice(first.length + 1) || "/";
  } else if (DROPPED_LOCALES.includes(lower)) {
    p = p.slice(first.length + 1) || "/";
  }
  return {locale, path: p};
}

function splitWords(path) {
  return path.toLowerCase().split(/[/_\-.]+/).filter((w) => w && w !== "docs").map((w) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w));
}

function findTarget(path, docPaths) {
  const lower = path.toLowerCase();
  if (ALIASES[lower]) {
    return ALIASES[lower];
  }
  const byLower = new Map(docPaths.map((d) => [d.replace(/\/+$/, "").toLowerCase(), d]));
  if (byLower.has(lower)) {
    return byLower.get(lower);
  }
  if (byLower.has(lower + "/overview")) {
    return byLower.get(lower + "/overview");
  }
  const segs = lower.split("/").filter(Boolean);
  const last = segs[segs.length - 1];
  if (segs.length >= 3 && last !== "overview") {
    const lastMatches = docPaths.filter((d) => d.replace(/\/+$/, "").split("/").pop().toLowerCase() === last);
    const sameSection = lastMatches.filter((d) => d.toLowerCase().startsWith("/" + segs[0] + "/" + segs[1] + "/"));
    if (sameSection.length === 1) {
      return sameSection[0];
    }
    if (lastMatches.length === 1) {
      return lastMatches[0];
    }
  }
  return null;
}

function suggest(path, docPaths) {
  const words = new Set(splitWords(path));
  if (words.size === 0) {
    return [];
  }
  const docWords = docPaths.map((d) => [d, new Set(splitWords(d))]);
  const df = new Map();
  docWords.forEach(([, ws]) => ws.forEach((w) => df.set(w, (df.get(w) || 0) + 1)));
  return docWords
    .map(([d, ws]) => {
      let score = 0;
      ws.forEach((w) => {
        if (words.has(w)) {
          score += Math.log(docPaths.length / df.get(w));
        }
      });
      return {d, score: score / Math.sqrt(ws.size)};
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((x) => x.d);
}

export default function ContentWrapper(props) {
  const allDocs = useAllDocsData();
  const [suggestions, setSuggestions] = useState([]);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const docPaths = [];
    Object.values(allDocs).forEach((plugin) => {
      const version = plugin.versions.find((v) => v.isLast) || plugin.versions[0];
      version.docs.forEach((doc) => docPaths.push(doc.path));
    });

    const {locale, path} = normalize(window.location.pathname);
    let current = window.location.pathname;
    try {
      current = decodeURIComponent(current);
    } catch (e) {
      // keep the raw path
    }
    current = current.replace(/\/+$/, "");

    const target = findTarget(path, docPaths);
    if (target) {
      if (target.startsWith("http")) {
        setRedirecting(true);
        window.location.replace(target);
        return;
      }
      if ((locale + target).replace(/\/+$/, "") !== current) {
        setRedirecting(true);
        window.location.replace(locale + target + window.location.search + window.location.hash);
        return;
      }
    }
    if (locale + path !== current && path.length > 1 && !path.startsWith("/docs")) {
      setRedirecting(true);
      window.location.replace(locale + path + window.location.search + window.location.hash);
      return;
    }
    setSuggestions(suggest(path, docPaths).map((d) => locale + d));
  }, [allDocs]);

  if (redirecting) {
    return null;
  }

  return (
    <>
      <Content {...props} />
      {suggestions.length > 0 && (
        <div className="container margin-bottom--xl">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <p>
                <Translate id="theme.NotFound.suggestions">Maybe you were looking for one of these pages:</Translate>
              </p>
              <ul>
                {suggestions.map((s) => (
                  <li key={s}><Link to={s}>{s}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
