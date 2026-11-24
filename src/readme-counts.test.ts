// The numbers the README states are the numbers of the data.
import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { MANIFEST } from "./manifest";
import { MOTIFS, motifTerm } from "./parts";
import { findCrests } from "./search";

const readme = readFileSync("README.md", "utf8");
const row = (label: string): number => Number(new RegExp(`^\\| ${label} \\| (\\d+) \\|$`, "m").exec(readme)?.[1]);
const kindCount = (kind: string): number => MANIFEST.filter((record) => record.motifs.some((use) => motifTerm(use.motif)?.kind === kind)).length;

describe("the README's counts", () => {
  it("say how many crests there are", () => {
    expect(row("Crests")).toBe(MANIFEST.length);
    expect(readme).toContain(`${MANIFEST.length} crests`);
  });

  it("say how many are ringed, of each kind, and used today", () => {
    expect(row("Crests in a ring")).toBe(findCrests({ ring: true }).length);
    expect(row("Crests of a plant")).toBe(kindCount("plant"));
    expect(row("Crests of an animal")).toBe(kindCount("animal"));
    expect(row("Crests of a made thing")).toBe(kindCount("object"));
    expect(row("Crests of a plain shape")).toBe(kindCount("shape"));
    expect(row("Motifs in the vocabulary")).toBe(MOTIFS.length);
    expect(row("Crests with a present-day user, with its source")).toBe(findCrests({ usedBy: true }).length);
  });
});
