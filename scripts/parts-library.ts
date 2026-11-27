import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";

import { staticSvg } from "../src/render.ts";
import { Builder } from "./construct/builder.ts";
import { PAPER } from "./crests/library/part.ts";
import type { PartPreview } from "./crests/library/part.ts";

const library = new URL("./crests/library/", import.meta.url);
const picturesFolder = "docs/parts-library";

export interface CrestPartUsage {
  id: string;
  name: { en: string; ja: string };
  parts: ReadonlySet<string>;
}

/** One module per part means adding a shape never edits a registry. */
export async function loadPartsLibrary(): Promise<PartPreview[]> {
  const files = readdirSync(library).filter((file) => file.endsWith(".ts") && !["part.ts", "layers.ts"].includes(file)).sort();

  return Promise.all(files.map(async (file) => {
    const { default: part } = await import(new URL(file, library).href) as { default?: PartPreview };
    if (part?.id !== file.slice(0, -3) || typeof part.sample !== "function") {
      throw new Error(`${file}: export a library part with the same name as the file`);
    }
    return part;
  }));
}

export function describePartsLibrary(parts: readonly PartPreview[], usedBy: readonly CrestPartUsage[]): {
  markdown: string;
  pictures: Map<string, string>;
} {
  const rows: string[] = [];
  const pictures = new Map<string, string>();
  for (const part of parts) {
    const c = new Builder();
    c.precision(3);
    part.sample(c);
    pictures.set(`${part.id}.svg`, `${staticSvg(c)}\n`);

    const sources = part.sources.map(({ frame, page, row, col, label }) =>
      `[${frame} ${page}${row} C${col} ${label}](https://dl.ndl.go.jp/pid/780550)`).join(", ");
    const crests = usedBy.filter((crest) => crest.parts.has(part.id)).map((crest) => `${crest.name.ja} (\`${crest.id}\`)`);
    const uses = crests.length > 0 ? `${crests.length} · ${crests.join(", ")}` : part.stock ? "Stock" : "—";
    rows.push(`| <img src="parts-library/${part.id}.svg" alt="${part.name.en}" width="88" height="88"> | \`${part.id}\` · ${part.name.en} · ${part.name.ja} | ${part.description.en} ${part.description.ja} | ${part.families.join(", ")} | ${sources} | ${uses} |`);
  }
  const usedCrests = usedBy.filter(({ parts: ids }) => ids.size > 0).length;

  return {
    pictures,
    markdown: `# Parts library

Small compass-and-ruler constructions for assembling book crests. Written by \`pnpm data\`. Make changes in \`scripts/crests/library/\`.

The library has ${parts.length} geometric parts. ${usedCrests} crests use them.

Call a part's \`build(c, centre, turn, size, options)\` method with the centre measured from the middle of the crest, x right and y up. The turn is clockwise from upright. Set \`options.motif\` to the crest's existing motif. Size is the radius for a berry, the tip-to-tip length for a leaf and the base-to-tip length for a branch. See each part's source file for its remaining options.

Use one \`options.paper\` width for every cut line in a crest. The default hairline is ${PAPER} units on the 200-unit page, independent of the part's size. A leaf midrib stops short of the tips by default. Set \`midrib: "full"\` to carry it to both tips.

Build overlapping parts from back to front inside \`layerParts(c, draw)\`. Each part in that scope inks through \`fillPart\`. Set a foreground part's \`options.keyline\` to the width of paper its outline should leave, in crest units.

| Drawing | Part | Construction | Crest families | 1892 book cell | Crests using it |
| --- | --- | --- | --- | --- | --- |
${rows.join("\n")}
`,
  };
}

export async function writePartsLibrary(usedBy: readonly CrestPartUsage[]): Promise<void> {
  const { markdown, pictures } = describePartsLibrary(await loadPartsLibrary(), usedBy);
  mkdirSync(picturesFolder, { recursive: true });
  for (const file of readdirSync(picturesFolder)) {
    if (file.endsWith(".svg") && !pictures.has(file)) rmSync(`${picturesFolder}/${file}`);
  }
  for (const [file, svg] of pictures) writeFileSync(`${picturesFolder}/${file}`, svg);
  writeFileSync("docs/parts-library.md", markdown);
}
