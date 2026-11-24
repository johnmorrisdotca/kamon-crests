// The helpers on a crest's SVG string: colour, background, title and data: URIs.
import { describe, expect, it } from "vitest";

import { paint, toDataUri } from "./svg";

const crest = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="currentColor"><path d="M10 10h20v20z"/></svg>';

describe("paint", () => {
  it("hands the crest back as it was, with nothing asked", () => {
    expect(paint(crest)).toBe(crest);
    expect(paint(crest, {})).toBe(crest);
  });

  it("replaces currentColor with the colour, everywhere", () => {
    const painted = paint('<svg viewBox="0 0 200 200" fill="currentColor"><path stroke="currentColor" d="M0 0"/></svg>', { color: "#b8860b" });
    expect(painted).not.toContain("currentColor");
    expect(painted.match(/#b8860b/g)).toHaveLength(2);
  });

  it("puts a background square behind the crest, and a title with a role", () => {
    const out = paint(crest, { background: "rgb(0 0 0)", title: 'Tokugawa & "friends" <3' });
    expect(out).toContain('<rect width="200" height="200" fill="rgb(0 0 0)"/>');
    expect(out).toContain("<title>Tokugawa &amp; &quot;friends&quot; &lt;3</title>");
    expect(out.startsWith('<svg role="img" ')).toBe(true);
    expect(out.indexOf("<title>")).toBeLessThan(out.indexOf("<rect"));
    expect(out.indexOf("<rect")).toBeLessThan(out.indexOf("<path"));
  });

  it("refuses anything but a plain CSS colour, and anything but a string", () => {
    for (const bad of ['red" onload="x', "url(javascript:x)", "<b>", "", "a".repeat(80)]) expect(() => paint(crest, { color: bad })).toThrow(TypeError);
    expect(() => paint(crest, { background: '"><script>' })).toThrow(TypeError);
    expect(() => paint(42 as unknown as string)).toThrow(TypeError);
    expect(() => paint(crest, { title: 5 as unknown as string })).toThrow(TypeError);
  });
});

describe("toDataUri", () => {
  it("makes a data: URI that decodes to the SVG", () => {
    const uri = toDataUri(crest);
    expect(uri.startsWith("data:image/svg+xml,")).toBe(true);
    expect(uri).not.toMatch(/[<>"#]/);
    expect(decodeURIComponent(uri.slice("data:image/svg+xml,".length)).replace(/'/g, '"')).toBe(crest);
  });

  it("paints first, so an <img> shows the colour", () => {
    expect(decodeURIComponent(toDataUri(crest, { color: "#123456" }))).toContain("#123456");
  });
});
