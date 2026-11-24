// Importing the element where there is no browser does nothing and throws nothing; the element itself is played in a real browser by e2e/.
import { describe, expect, it } from "vitest";

import { CREST_ELEMENT_ATTRIBUTES, CREST_ELEMENT_NAME, defineCrest } from "./element";

describe("the element's module", () => {
  it("names the tag and its attributes, and registers nothing without a browser", () => {
    expect(CREST_ELEMENT_NAME).toBe("kamon-crest");
    expect(CREST_ELEMENT_ATTRIBUTES).toEqual(expect.arrayContaining(["crest", "size", "animate", "speed", "loop", "color"]));
    expect(() => defineCrest()).not.toThrow();
  });
});
