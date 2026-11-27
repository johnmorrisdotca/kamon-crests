// Packs the package the way it is published (`npm pack`, npm and not pnpm), installs the tarball into an empty
// project, and uses it as somebody who installed it would: every entry in `exports` imported, one flag by its own
// subpath, /load's dynamic import, an SVG file and manifest.json by their addresses, `require()` of the ESM build as
// Node 24 allows, and the types checked by TypeScript under Node's own resolution. A package whose `exports` name
// a file that is not in the tarball fails here, before it can be published. `pnpm test:package` builds first.
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const windows = process.platform === "win32";
const scratch = mkdtempSync(join(tmpdir(), "kamon-crests-package-"));

// Run a command and hand back what it printed. On Windows, npm is a .cmd file, which only a shell runs.
function run(command, args, cwd, viaShell = false) {
  const shell = viaShell && windows;
  const ran = spawnSync(shell && /[\\/]/.test(command) ? `"${command}"` : command, args, { cwd, encoding: "utf8", shell, maxBuffer: 64 * 1024 * 1024 });
  if (ran.status !== 0) {
    console.error(`FAIL ${command} ${args.join(" ")}\n${ran.stdout}\n${ran.stderr}`);
    process.exit(1);
  }

  return ran.stdout;
}

function fail(message) {
  console.error(`FAIL ${message}`);
  process.exit(1);
}

const { CREST_IDS } = await import(new URL("../dist/index.js", import.meta.url).href);

// 1. Pack, with npm.
const packed = JSON.parse(run("npm", ["pack", "--json", "--ignore-scripts", "--pack-destination", scratch], root, true));
const tarball = join(scratch, packed[0].filename);
const inTarball = new Set(packed[0].files.map((file) => file.path));
console.log(`ok   npm pack: ${packed[0].filename}, ${packed[0].files.length} files, ${(packed[0].size / 1024 / 1024).toFixed(2)} MB packed, ${(packed[0].unpackedSize / 1024 / 1024).toFixed(2)} MB unpacked`);
const shipped = [...inTarball].filter((file) => file.startsWith("docs/") || file.startsWith("src/") || file.startsWith("scripts/") || /\.(webp|png|jpe?g|gif)$/.test(file));
if (shipped.length > 0) fail(`the tarball holds pictures, sources or docs: ${shipped.slice(0, 5).join(", ")}`);
console.log("ok   nothing from src/, docs/ or scripts/ and no raster picture is in the tarball");

// 2. Everything package.json points at is in the tarball; a wildcard is checked through every crest.
const targets = (entry) => (typeof entry === "string" ? [entry] : Object.values(entry).flatMap(targets));
const pointed = [pkg.main, pkg.module, pkg.types, ...Object.values(pkg.exports).flatMap(targets)].flatMap((file) => (file.includes("*") ? CREST_IDS.map((id) => file.replace("*", file.includes("/svg/") ? `${id}.svg` : id)) : [file]));
for (const file of new Set(pointed)) if (!inTarball.has(file.replace(/^\.\//, ""))) fail(`package.json points at ${file}, which is not in the tarball`);
console.log(`ok   every file package.json points at is in the tarball (${new Set(pointed).size}, every crest's module, construction, types and SVG among them)`);
for (const named of pkg.files) {
  if (![...inTarball].some((file) => file === named || file.startsWith(`${named}/`))) fail(`package.json's files names ${named}, which is not in the tarball`);
}

// 3. Install it into an empty project.
const project = join(scratch, "project");
mkdirSync(project);
writeFileSync(join(project, "package.json"), JSON.stringify({ name: "scratch", private: true, version: "0.0.0", type: "module" }));
run("npm", ["install", "--no-audit", "--no-fund", "--silent", tarball], project, true);
console.log("ok   npm install of the tarball");

// 4. Every entry, one crest, the lookup, the files; and require() of the ESM build.
const janome = readFileSync(join(root, "dist", "svg", "janome.svg"), "utf8").trim();
writeFileSync(
  join(project, "esm.mjs"),
  `import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { CREST_IDS, crestId, crestUrl, paint, toDataUri, VERSION } from "${pkg.name}";
import janome, { svg } from "${pkg.name}/crests/janome";
import construction from "${pkg.name}/steps/janome";
import { crest, crestSteps, crestConstruction, animatedCrest } from "${pkg.name}/load";
import { manifest, MANIFEST } from "${pkg.name}/manifest";
import json from "${pkg.name}/manifest.json" with { type: "json" };
import { FRAMES, MOTIFS, term } from "${pkg.name}/parts";
import { findCrests, facets } from "${pkg.name}/search";
import { animatedSvg, durationOf, staticSvg } from "${pkg.name}/animate";
import { crestName } from "${pkg.name}/names";
import { defineCrest, CREST_ELEMENT_NAME } from "${pkg.name}/element";
import "${pkg.name}/element/define";
const wanted = ${JSON.stringify(janome)};
if (VERSION !== ${JSON.stringify(pkg.version)}) throw new Error("VERSION is " + VERSION);
if (janome !== wanted || svg !== wanted) throw new Error("crests/janome is not the built SVG");
if (CREST_IDS.length !== ${CREST_IDS.length} || crestId(" Janome ") !== "janome" || crestUrl("janome") === null) throw new Error("the ids are wrong");
if ((await crest("janome")) !== wanted || (await crest("nope")) !== null) throw new Error("/load answered wrongly");
if (staticSvg(construction) !== wanted || durationOf(construction) < 2 || !animatedSvg(construction).includes("@keyframes")) throw new Error("/animate answered wrongly");
if ((await crestSteps("janome")).steps.length !== construction.steps.length || !(await animatedCrest("janome"))?.includes("<style>")) throw new Error("/load's construction is wrong");
if ((await crestConstruction("janome"))?.ja.endsWith("。") !== true || json.crests.some((one) => one.construction !== undefined)) throw new Error("/load's construction text is wrong");
if (!paint(janome, { color: "red" }).includes("red") || !toDataUri(janome).startsWith("data:image/svg+xml,")) throw new Error("the helpers answered wrongly");
if (crestName("mitsuba-aoi", "ja") !== "三つ葉葵" || term("tomoe")?.ja !== "巴" || FRAMES.length < 4 || MOTIFS.length < 30) throw new Error("/names or /parts answered wrongly");
if (findCrests({ motif: "paulownia" }).length !== 5 || facets().frames.none < 10) throw new Error("/search answered wrongly");
if (CREST_ELEMENT_NAME !== "kamon-crest" || typeof defineCrest !== "function") throw new Error("/element is wrong");
// The element loads its controls when first wanted: the file it asks for is beside it in the installed package, and loads.
const elementFile = import.meta.resolve("${pkg.name}/element");
if (!readFileSync(new URL(elementFile), "utf8").includes('import("./element-controls.js")')) throw new Error("/element no longer loads ./element-controls.js when it is wanted");
const more = await import(new URL("./element-controls.js", elementFile).href);
if (typeof more.bar !== "function" || typeof more.step !== "function" || typeof more.press !== "function") throw new Error("the element's controls did not load from the installed package");
if (manifest("janome")?.id !== "janome" || MANIFEST.length !== CREST_IDS.length || json.crests.length !== MANIFEST.length) throw new Error("the manifest is wrong");
const file = readFileSync(createRequire(import.meta.url).resolve("${pkg.name}/svg/janome.svg"), "utf8").trim();
if (file !== wanted) throw new Error("svg/janome.svg is not the module's SVG");
const required = createRequire(import.meta.url)("${pkg.name}/crests/janome");
if (required.default !== wanted) throw new Error("require() of crests/janome gave " + typeof required.default);
console.log("every entry, crests/janome, steps/janome, /load, /animate, /parts, /search, /names, /element and the controls it loads, svg/janome.svg, manifest.json and require()");
`,
);
console.log(`ok   ${run(process.execPath, ["esm.mjs"], project).trim()}`);

// 5. The types, as TypeScript finds them through `exports` under Node's resolution.
writeFileSync(
  join(project, "types.mts"),
  `import { CREST_IDS, crestId, crestUrl, paint, type CrestId, type PaintOptions } from "${pkg.name}";
import janome from "${pkg.name}/crests/janome";
import construction from "${pkg.name}/steps/janome";
import { crest, crestSteps, animatedCrest, type AnimatedOptions } from "${pkg.name}/load";
import { manifest, type CrestRecord } from "${pkg.name}/manifest";
import { term, type Term } from "${pkg.name}/parts";
import { findCrests, type CrestQuery } from "${pkg.name}/search";
import { animatedSvg, stepCaption, type AnimateOptions, type Construction } from "${pkg.name}/animate";
import { crestName } from "${pkg.name}/names";
import { defineCrest, type KamonCrestElement } from "${pkg.name}/element";

const id: CrestId | null = crestId("janome");
const first: CrestId = CREST_IDS[0];
const options: PaintOptions = { color: "red", title: "Janome" };
const painted: string = paint(janome, options);
const url: string | null = crestUrl("janome");
const later: Promise<string | null> = crest("janome");
const steps: Promise<Construction | null> = crestSteps("janome");
const animated: Promise<string | null> = animatedCrest("janome", { speed: 2 } satisfies AnimatedOptions);
const record: CrestRecord | null = manifest("janome");
const word: Term | null = term("tomoe");
const query: CrestQuery = { ring: true, count: 3 };
const found: CrestRecord[] = findCrests(query);
const play: AnimateOptions = { loop: true };
const svg: string = animatedSvg(construction, play);
const caption: string = stepCaption(construction.steps[0], construction, "ja");
const name: string | null = crestName("janome", "ja");
const define: (name?: string) => void = defineCrest;
type Element = KamonCrestElement;
export { caption, define, first, found, id, later, name, painted, record, steps, animated, svg, url, word };
export type { Element };
`,
);
writeFileSync(join(project, "tsconfig.json"), JSON.stringify({ compilerOptions: { module: "nodenext", moduleResolution: "nodenext", target: "es2022", lib: ["es2022", "dom"], strict: true, noEmit: true, types: [], skipLibCheck: false }, files: ["types.mts"] }));
run(process.execPath, [join(root, "node_modules", "typescript", "bin", "tsc"), "-p", project], project);
console.log("ok   types: every entry resolves and checks under nodenext");

rmSync(scratch, { recursive: true, force: true });
console.log("the package installs and runs as published, on", process.platform, process.version);
