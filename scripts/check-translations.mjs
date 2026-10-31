// Compiles every translated page in i18n/ the way Docusaurus does and deletes the ones that do not compile, so that
// one bad translation shows that page in English instead of failing the whole build.
import { compile } from "@mdx-js/mdx";
import fs from "node:fs";
import path from "node:path";

const root = path.join(import.meta.dirname, "..", "i18n");
const failed = [];
let count = 0;

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (/\.mdx?$/.test(entry.name)) yield p;
  }
}

// Docusaurus parses bare URLs as links, so a URL glued to CJK punctuation ("http://localhost:8000。...") becomes one
// unparsable URL and fails the build. URLs in code spans and fences are not links.
function findUnparsableUrl(source) {
  const text = source.replace(/```[\s\S]*?```/g, "").replace(/~~~[\s\S]*?~~~/g, "").replace(/`[^`]*`/g, "");
  const match = text.match(/https?:\/\/[A-Za-z0-9._~:/?#@!$&+,;=%-]+[　-〿＀-￯]/);
  return match ? match[0] : null;
}

for (const locale of fs.existsSync(root) ? fs.readdirSync(root) : []) {
  if (locale === "en" || !fs.statSync(path.join(root, locale)).isDirectory()) continue;
  for (const file of walk(path.join(root, locale))) {
    count++;
    // what Docusaurus does before MDX sees the page: front matter out, HTML comments as MDX comments, heading ids out
    const source = fs
      .readFileSync(file, "utf8")
      .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "")
      .replace(/<!--([\s\S]*?)-->/g, "{/*$1*/}")
      .replace(/[ \t]*\{#[^}]*\}[ \t]*$/gm, "");
    try {
      await compile(source, { format: file.endsWith(".mdx") ? "mdx" : "md" });
      const badUrl = findUnparsableUrl(source);
      if (badUrl) throw new Error(`unparsable URL ${badUrl}`);
    } catch (e) {
      failed.push(`${path.relative(root, file)}: ${String(e.message).split("\n")[0]}`);
      fs.rmSync(file);
    }
  }
}

console.log(`${count} translated pages, ${failed.length} do not compile and are shown in English:`);
for (const line of failed) console.log(`  ${line}`);
