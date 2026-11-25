// The README's pictures show the crests as they are drawn now: a crest redrawn without the pictures taken again fails here.
import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { STAMP, drawingsStamp } from "../scripts/drawings-stamp.mjs";

describe("the README's pictures", () => {
  it("were taken after the last change to any crest's drawing (if not: pnpm pictures, and commit docs/images)", () => {
    expect(readFileSync(STAMP, "utf8").trim(), "a crest's drawing changed after the README pictures were taken: run pnpm pictures").toBe(drawingsStamp());
  });
});
