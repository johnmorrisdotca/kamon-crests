import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { latestReleases } from "../scripts/latest-data.mjs";
import { RECORDS } from "./data/records.data.ts";

describe("Latest changelog data", () => {
  it("groups known crest IDs in changelog order and maps the three change types", () => {
    const log = [
      "# Changelog",
      "## [Unreleased]",
      "### Added",
      "- **花菱 (`hana`).** Four petals sit around a square. The old book shows this form.",
      "- A route (`/latest`) and a family ID (`flowers`).",
      "### Removed",
      "- Removed an example with `hana`.",
      "## [1.3.0] - 2026-11-26",
      "Notes about this release.",
      "### Changed",
      "- Redrew `hana` and `kiku` from the book. `kiku` now has sixteen petals.",
      "### Fixed",
      "- Fixed the gap in",
      "  `hana` and kept the existing outline.",
      "- Adjusted `hana`, `hana` and `unknown` together.",
      "## [1.2.0] - 2026-11-26",
      "### Fixed",
      "- Fixed code in `example`.",
    ].join("\r\n");
    expect(latestReleases(log, ["hana", "kiku"])).toEqual([
      { version: "Unreleased", date: null, entries: [{ id: "hana", status: "new", note: "Four petals sit around a square." }] },
      { version: "1.3.0", date: "2026-11-26", entries: [
        { id: "hana", status: "redrawn", note: "Redrew hana and kiku from the book." },
        { id: "kiku", status: "redrawn", note: "Redrew hana and kiku from the book." },
        { id: "hana", status: "fixed", note: "Fixed the gap in hana and kept the existing outline." },
        { id: "hana", status: "fixed", note: "Adjusted hana, hana and unknown together." },
      ] },
    ]);
  });

  it("finds more than ten releases with crests in the project changelog", () => {
    const log = readFileSync(new URL("../CHANGELOG.md", import.meta.url), "utf8");
    const groups = latestReleases(log, RECORDS.map(({ id }) => id));
    expect(groups.filter(({ date }) => date !== null).length).toBeGreaterThan(10);
    expect(groups.find(({ version }) => version === "0.27.0")?.entries).toContainEqual({
      id: "kiku-guruma", status: "new", note: "Sixteen broad, slanted petals that share fine white seams near the hub, from frame 39.",
    });
  });
});
