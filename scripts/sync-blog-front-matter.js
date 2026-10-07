// Crowdin translates the slug and tags in blog front matter, so every locale gets
// its own blog and tag URLs, and the hreflang links between locales point to pages
// that don't exist. Copy slug and tags from the English post into each translation.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const frontMatterRe = /^---\r?\n([\s\S]*?)\r?\n---/;

function fields(frontMatter) {
  const lines = frontMatter.split(/\r?\n/);
  const result = {};
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(slug|tags):/);
    if (!m) {
      continue;
    }
    let j = i + 1;
    while (j < lines.length && /^\s+-|^\s*$/.test(lines[j])) {
      j++;
    }
    result[m[1]] = {start: i, end: j, text: lines.slice(i, j).join("\n")};
  }
  return result;
}

function sync(translatedPath, sourcePath) {
  const source = fs.readFileSync(sourcePath, "utf8").match(frontMatterRe);
  const content = fs.readFileSync(translatedPath, "utf8");
  const translated = content.match(frontMatterRe);
  if (!source || !translated) {
    return false;
  }
  const want = fields(source[1]);
  const lines = translated[1].split(/\r?\n/);
  const have = fields(translated[1]);
  const keys = Object.keys(have).sort((a, b) => have[b].start - have[a].start);
  for (const key of keys) {
    lines.splice(have[key].start, have[key].end - have[key].start, ...(want[key] ? [want[key].text] : []));
  }
  for (const key of Object.keys(want)) {
    if (!have[key]) {
      lines.push(want[key].text);
    }
  }
  const updated = content.replace(frontMatterRe, `---\n${lines.join("\n")}\n---`);
  if (updated === content) {
    return false;
  }
  fs.writeFileSync(translatedPath, updated);
  return true;
}

const i18nDir = path.join(root, "i18n");
for (const locale of fs.existsSync(i18nDir) ? fs.readdirSync(i18nDir) : []) {
  const blogDir = path.join(i18nDir, locale, "docusaurus-plugin-content-blog");
  if (!fs.existsSync(blogDir)) {
    continue;
  }
  for (const file of fs.readdirSync(blogDir)) {
    const sourcePath = path.join(root, "blog", file);
    if (/\.mdx?$/.test(file) && fs.existsSync(sourcePath) && sync(path.join(blogDir, file), sourcePath)) {
      // eslint-disable-next-line no-console
      console.log(`synced blog front matter: ${locale}/${file}`);
    }
  }
}
