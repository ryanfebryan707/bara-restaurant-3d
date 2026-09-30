import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import "./validate.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "dist");
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const path of ["index.html", "style.css", "script.js", "404.html", "robots.txt", ".nojekyll", "assets"]) await cp(resolve(root, path), resolve(output, path), { recursive: true });
console.log("Production build complete: dist/ (static, GitHub Pages ready).");
