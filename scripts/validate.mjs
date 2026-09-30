import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = await readFile(resolve(root, "index.html"), "utf8");
const css = await readFile(resolve(root, "style.css"), "utf8");
const js = await readFile(resolve(root, "script.js"), "utf8");
const files = new Set(["404.html", "robots.txt", ".nojekyll"]);
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) if (!/^(?:https?:|data:|mailto:)/.test(match[1])) files.add(match[1].split(/[?#]/)[0]);
for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) if (!/^(?:https?:|data:)/.test(match[1])) files.add(match[1]);
for (const match of js.matchAll(/"(assets\/[^"\s]+)"/g)) files.add(match[1]);
await Promise.all([...files].map(file => access(resolve(root, file))));
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
for (const match of html.matchAll(/href="#([^"]+)"/g)) if (!ids.has(match[1])) throw new Error(`Missing anchor: ${match[1]}`);
for (const match of js.matchAll(/getElementById\("([^"]+)"\)/g)) if (!ids.has(match[1])) throw new Error(`Missing DOM element: ${match[1]}`);
console.log(`Validated ${files.size} local assets, navigation anchors and script targets.`);
