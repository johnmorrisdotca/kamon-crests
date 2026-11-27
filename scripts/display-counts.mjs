// The counts the README, guides, coverage and package description show.
import { readFileSync, writeFileSync } from "node:fs";

import { coverageFrom } from "./coverage-data.mjs";
import { coverageMarkdown } from "./coverage.mjs";

const file = (name) => new URL("../" + name, import.meta.url);
const read = (name) => readFileSync(file(name), "utf8");
const number = (value) => value.toLocaleString("en-US");
const countMarker = /<!-- count:([a-z-]+) -->[^]*?<!-- \/count -->/gu;

const markers = (text, values) => text.replace(countMarker, (original, key) =>
  key in values ? "<!-- count:" + key + " -->" + values[key] + "<!-- /count -->" : original,
);

export function dependencyLabel(pkg) {
  const count = Object.keys({ ...pkg.dependencies, ...pkg.optionalDependencies, ...pkg.peerDependencies }).length;
  return count === 0 ? "Zero dependencies" : count === 1 ? "1 dependency" : number(count) + " dependencies";
}

export function countDocuments(records, motifs) {
  const coverage = coverageFrom(records, motifs);
  const pkg = JSON.parse(read("package.json"));
  const labels = new Map(motifs.map((motif) => [motif.id, motif.kind]));
  const kindCount = (kind) => records.filter((record) => record.motifs.some((use) => labels.get(use.motif) === kind)).length;
  const table = {
    Crests: records.length,
    "Crests in a ring": records.filter((record) => record.frame.startsWith("ring-")).length,
    "Crests of a plant": kindCount("plant"),
    "Crests of an animal": kindCount("animal"),
    "Crests of a made thing": kindCount("object"),
    "Crests of a plain shape": kindCount("shape"),
    "Motifs in the vocabulary": motifs.length,
    "Crests with a present-day user, with its source": records.filter((record) => record.usedBy.length > 0).length,
  };
  const corner = coverage.chapters.flatMap((chapter) => chapter.families).find((family) => family.family === "隅切り角");
  const values = {
    catalogue: records.length + " crests",
    "coverage-missing": number(coverage.total.missing),
    "book-names": number(coverage.entries.filter((entry) => !entry.extra).length),
    "corner-squares": number(corner.have) + " of " + number(corner.total) + " are drawn.",
    "corner-squares-ja": number(corner.total) + "の家紋のうち、" + number(corner.have) + "が描かれています。",
    dependencies: dependencyLabel(pkg),
  };
  const aoi = records.find((record) => record.id === "mitsuba-aoi");
  const aoiSize = (aoi.bytes / 1024).toLocaleString("en-US", { maximumFractionDigits: 1 });
  const readme = markers(read("README.md"), values)
    .replace(/^\| ([^|\n]+) \| \d+ \|$/gmu, (row, label) => label in table ? "| " + label + " | " + table[label] + " |" : row)
    .replace(/(innerHTML = aoi; \/\/ about )[\d.]+ KB(?= of paths)/u, (_, lead) => lead + aoiSize + " KB");
  pkg.description = pkg.description.replace(/(?:Zero|\d[\d,]*) dependenc(?:y|ies)(?=\.$)/u, values.dependencies);

  return {
    "README.md": readme,
    "docs/coverage.md": coverageMarkdown(coverage),
    "docs/guides/draw-a-crest.md": markers(read("docs/guides/draw-a-crest.md"), values),
    "docs/guides/ja/draw-a-crest.md": markers(read("docs/guides/ja/draw-a-crest.md"), values),
    "package.json": JSON.stringify(pkg, null, 2) + "\n",
  };
}

export function writeCountDocuments(records, motifs) {
  for (const [name, text] of Object.entries(countDocuments(records, motifs))) {
    if (read(name) !== text) writeFileSync(file(name), text);
  }
}
