// The main entry and the lookups: ids, URLs, loading, names, the manifest.
import { describe, expect, it } from "vitest";

import { CREST_IDS, VERSION, crestId, crestUrl, isCrestId, paint } from "./index";
import { animatedCrest, crest, crestDataUri, crestSteps } from "./load";
import { MANIFEST, manifest } from "./manifest";
import { crestName } from "./names";

describe("the ids", () => {
  it("are kebab-case, unique, and recognised exactly", () => {
    for (const id of CREST_IDS) expect(id).toMatch(/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/);
    expect(isCrestId("mitsuba-aoi")).toBe(true);
    for (const bad of ["Mitsuba-Aoi", "mitsuba aoi", "", 3, null, undefined, "tokugawa"]) expect(isCrestId(bad)).toBe(false);
  });

  it("are found by crestId however loosely written, and null for what is not one", () => {
    expect(crestId(" Mitsuba Aoi ")).toBe("mitsuba-aoi");
    expect(crestId("maru_ni_juji")).toBe("maru-ni-juji");
    expect(crestId("tokugawa")).toBeNull();
    expect(() => crestId(3 as unknown as string)).toThrow(TypeError);
  });

  it("have a URL on the CDN at this major version, or in a folder of your own", () => {
    expect(crestUrl("janome")).toBe("https://cdn.jsdelivr.net/npm/@johnmorrisdotca/kamon-crests@0/dist/svg/janome.svg");
    expect(crestUrl("Janome", { base: "/c/" })).toBe("/c/janome.svg");
    expect(crestUrl("nope")).toBeNull();
    expect(VERSION).toMatch(/^\d+\.\d+\.\d+$/); // a plain release: this package never publishes a pre-release
  });
});

describe("load", () => {
  it("fetches a crest by its id, painted when asked, null for none", async () => {
    const svg = await crest("Mitsuba Aoi");
    expect(svg?.startsWith("<svg ")).toBe(true);
    expect(await crest("kikyo", { color: "#123456", title: "Bellflower" })).toContain("#123456");
    expect(await crest("nope")).toBeNull();
    expect(() => crest(3 as unknown as string)).toThrow(TypeError);
    expect(() => crest("janome", { color: "x;y" })).toThrow(TypeError);
  });

  it("gives a data: URI and the construction", async () => {
    expect((await crestDataUri("janome"))?.startsWith("data:image/svg+xml,")).toBe(true);
    expect(await crestDataUri("nope")).toBeNull();
    const steps = await crestSteps("mitsu-uroko");
    expect(steps?.steps.at(-1)?.op).toBe("fade");
    expect(await crestSteps("nope")).toBeNull();
  });

  it("draws an animated crest, painted, with styles named for the crest", async () => {
    const svg = await animatedCrest("janome", { color: "#222", loop: true });
    expect(svg).toContain("@keyframes kc-janome-s0");
    expect(svg).toContain("#222");
    expect(svg).toContain("infinite");
    expect(await animatedCrest("nope")).toBeNull();
  });
});

describe("names and the manifest", () => {
  it("name every crest in both languages, null for none", () => {
    expect(crestName("mitsuba-aoi", "ja")).toBe("三つ葉葵");
    expect(crestName("Mitsuba Aoi")).toBe("Three hollyhock leaves");
    expect(crestName("nope")).toBeNull();
  });

  it("give every crest's record, found loosely", () => {
    expect(manifest("Mitsuba Aoi")?.name.reading).toBe("みつばあおい");
    expect(manifest("nope")).toBeNull();
    expect(MANIFEST).toHaveLength(CREST_IDS.length);
    expect(() => manifest(1 as unknown as string)).toThrow(TypeError);
  });

  it("paint is the same function from the main entry", () => {
    expect(paint('<svg a="1">x</svg>', { title: "t" })).toContain("<title>t</title>");
  });
});
