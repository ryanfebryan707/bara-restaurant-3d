import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), process.argv.includes("--dist") ? "dist" : ".");
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".webp": "image/webp", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".ttf": "font/ttf", ".txt": "text/plain; charset=utf-8" };
const headers = { "X-Content-Type-Options": "nosniff", "Referrer-Policy": "strict-origin-when-cross-origin", "X-Frame-Options": "SAMEORIGIN" };
const publicFiles = new Set(["index.html", "style.css", "script.js", "404.html", "robots.txt", ".nojekyll"]);

const server = createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405, { ...headers, Allow: "GET, HEAD" }); response.end("Method not allowed"); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname); } catch { response.writeHead(400, headers); response.end("Bad request"); return; }
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const file = resolve(root, relative);
  const allowedAsset = relative.startsWith("assets/") && !relative.split("/").some(part => part === ".." || part.startsWith("."));
  if (!file.startsWith(root + sep) || !(publicFiles.has(relative) || allowedAsset)) { response.writeHead(404, { ...headers, "Content-Type": "text/plain; charset=utf-8" }); response.end("Not found"); return; }
  try {
    if (!(await stat(file)).isFile()) throw new Error("Not a file");
    const content = await readFile(file);
    response.writeHead(200, { ...headers, "Content-Type": types[extname(file)] || "application/octet-stream", "Content-Length": content.byteLength, "Cache-Control": "no-cache" });
    response.end(request.method === "HEAD" ? undefined : content);
  } catch { response.writeHead(404, { ...headers, "Content-Type": "text/plain; charset=utf-8" }); response.end("Not found"); }
});
server.listen(port, host, () => console.log(`BARA ready at http://localhost:${port}${process.argv.includes("--dist") ? " (production build)" : ""}`));
for (const signal of ["SIGTERM", "SIGINT"]) process.on(signal, () => server.close(() => process.exit(0)));
