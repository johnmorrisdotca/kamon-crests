// After tsup: the one-line type files of each crest's module, each crest as an .svg file (for an <img> and a CDN), and
// manifest.json. Run by `pnpm build`.
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";

mkdirSync("dist/svg", { recursive: true });
const ids = readdirSync("src/crests").filter((file) => file.endsWith(".ts")).map((file) => file.replace(/\.ts$/, ""));
for (const id of ids) {
  // Each type file carries its module's own doc comment, so that an editor shows what the crest is.
  const doc = (file: string, at = 0): string => readFileSync(file, "utf8").match(/\/\*\*[\s\S]*?\*\/\n/g)?.[at] ?? "";
  writeFileSync(`dist/crests/${id}.d.ts`, `${doc(`src/crests/${id}.ts`)}declare const svg: string;\nexport default svg;\nexport { svg };\n`);
  writeFileSync(`dist/steps/${id}.d.ts`, `import type { Construction } from "../animate.js";\n\n${doc(`src/steps/${id}.ts`)}declare const construction: Construction;\n\n${doc(`src/steps/${id}.ts`, 1)}declare const description: { en: string; ja: string };\nexport default construction;\nexport { construction, description };\n`);
  const module = (await import(new URL(`../dist/crests/${id}.js`, import.meta.url).href)) as { default: string };
  writeFileSync(`dist/svg/${id}.svg`, `${module.default}\n`);
}
const { RECORDS } = (await import(new URL("../dist/manifest.js", import.meta.url).href).then((m: { MANIFEST: unknown }) => ({ RECORDS: m.MANIFEST }))) as { RECORDS: unknown[] };
const version = (JSON.parse(readFileSync("package.json", "utf8")) as { version: string }).version;
writeFileSync("dist/manifest.json", `${JSON.stringify({ version, count: RECORDS.length, crests: RECORDS })}\n`);
console.log(`${ids.length} crests: types, svg files and manifest.json written`);
