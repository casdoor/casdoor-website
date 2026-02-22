/**
 * Detect an available port first, then start Docusaurus, so we skip the
 * "Would you like to run on another port?" prompt when the default port is in use.
 */
const {detectPort} = require("detect-port");
const {spawn} = require("child_process");
const path = require("path");

const DEFAULT_PORT = 3000;

async function main() {
  const port = await detectPort(DEFAULT_PORT);
  const docusaurusBin = path.join(
    __dirname,
    "..",
    "node_modules",
    "@docusaurus",
    "core",
    "bin",
    "docusaurus.mjs"
  );
  const child = spawn(
    process.execPath,
    [docusaurusBin, "start", "--port", String(port), ...process.argv.slice(2)],
    {
      stdio: "inherit",
      cwd: path.join(__dirname, ".."),
    }
  );
  child.on("exit", (code) => process.exit(code ?? 0));
}

main().catch((err) => {
  process.stderr.write(`${err}\n`);
  process.exit(1);
});
