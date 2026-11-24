// A tiny static server for ./site, on the port it is told: this project's ports are 8850 to 8874, and every server names one.
//   node scripts/serve.mjs 8850
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import process from "node:process";

const port = Number(process.argv[2]);
if (!Number.isInteger(port) || port < 8850 || port > 8874) {
  console.error("Give a port from 8850 to 8874: node scripts/serve.mjs 8850");
  process.exit(1);
}
const root = join(process.cwd(), "site");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml", ".json": "application/json", ".png": "image/png", ".webp": "image/webp" };
createServer((request, response) => {
  const path = normalize(decodeURIComponent(new URL(request.url ?? "/", "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
  let file = join(root, path);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!file.startsWith(root) || !existsSync(file)) {
    response.writeHead(404).end("not found");
    return;
  }
  response.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream", "cache-control": "no-store" });
  createReadStream(file).pipe(response);
}).listen(port, "127.0.0.1", () => console.log(`http://127.0.0.1:${port}/`));
