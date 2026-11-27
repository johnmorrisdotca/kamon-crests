import { relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildSync } from "esbuild";

import type { Construction } from "../src/render.ts";
import type { CrestDef } from "./crests/types.ts";

// Match the built steps-module size limit. The bound includes the drawing code,
// the placement data and the text, all bundled into the same module.
const LIMIT = 50 * 1024;

function bundle(source: string): string {
  return buildSync({
    stdin: { contents: source, loader: "ts", resolveDir: resolve("src/steps") },
    write: false,
    bundle: true,
    format: "esm",
    platform: "neutral",
    target: "es2022",
    charset: "utf8",
    minifyWhitespace: true,
  }).outputFiles[0].text;
}

/** Keep the usual literal steps unless a library placement drawing needs more room. */
export async function stepsModuleSource(header: string, def: CrestDef, construction: Construction, usesLibrary: boolean): Promise<string> {
  const render = (expression: string, imports = ""): string => `${header}import type { Construction } from "../render";
${imports}
/**
 * How ${def.name.en} (\`${def.id}\`) is constructed: its ${construction.guides.length} layout guides, its ${construction.shapes.length} shapes and the ${construction.steps.length} steps that draw them in order.
 *
 * @example
 * \`\`\`ts no-run
 * import construction from "@johnmorrisdotca/kamon-crests/steps/${def.id}";
 *
 * console.log(construction.steps.length); // ${construction.steps.length}
 * \`\`\`
 */
const construction: Construction = ${expression};

/**
 * How ${def.name.en} (\`${def.id}\`) is constructed, in a line in each language: the text a crest's card shows beside its steps.
 * It is here, not on the crest's record, so that the manifest stays small; \`crestConstruction()\` loads it.
 *
 * @example
 * \`\`\`ts no-run
 * import { description } from "@johnmorrisdotca/kamon-crests/steps/${def.id}";
 *
 * console.log(description.en.length > 30, description.ja.endsWith("。")); // true true
 * \`\`\`
 */
const description: { en: string; ja: string } = ${JSON.stringify(def.construction)};

export default construction;
export { construction, description };
`;

  const serialized = JSON.stringify(construction);
  const literal = render(serialized);
  const placement = def.placementBuild;
  if (!placement || !usesLibrary || construction.redrawing || Buffer.byteLength(bundle(literal)) < LIMIT) return literal;

  const source = relative("src/steps", fileURLToPath(placement.module)).replaceAll("\\", "/");
  const module = source.startsWith(".") ? source : `./${source}`;
  const imports = `import { make } from "../../scripts/construct/make.ts";\nimport * as placement from ${JSON.stringify(module)};\n`;
  const compact = render(`make({ build: placement[${JSON.stringify(placement.export)}] })`, imports);
  const built = bundle(compact);
  if (Buffer.byteLength(built) >= LIMIT) throw new Error(`${def.id}: its bundled placement construction is over 50 KB`);

  // Verify the source that a consumer actually loads, including bundling and the order of all records.
  const replayed = await import(`data:text/javascript;base64,${Buffer.from(built).toString("base64")}`);
  if (JSON.stringify(replayed.default) !== serialized) throw new Error(`${def.id}: its placement replay changed the construction`);

  return compact;
}
