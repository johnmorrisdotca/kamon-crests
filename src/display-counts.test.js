import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { countDocuments, dependencyLabel } from "../scripts/display-counts.mjs";
import { MANIFEST } from "./manifest.ts";
import { MOTIFS } from "./parts.ts";

describe("published counts", () => {
  it("keeps each maintained document and package description in sync with the current data", () => {
    for (const [path, current] of Object.entries(countDocuments(MANIFEST, MOTIFS))) {
      expect(readFileSync(path, "utf8"), path).toBe(current);
    }
    expect(readFileSync("docs/catalogue.md", "utf8")).toContain(MANIFEST.length + " crests, in the order of the crest books");
    expect(dependencyLabel({ dependencies: { match: "*" } })).toBe("1 dependency");
    expect(dependencyLabel({ dependencies: { match: "*" }, optionalDependencies: { match: "*", measure: "*" } })).toBe("2 dependencies");
  });
});
