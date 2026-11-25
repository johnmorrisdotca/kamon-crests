import { describe, expect, it } from "vitest";
import { animatedSvg } from "./render";
import ring from "./steps/maru-ni-sumitate-yotsume";

/** The percentages at which a named animation's keyframes stand. */
const stops = (svg: string, name: string): number[] =>
  [...(new RegExp(`@keyframes t-${name}\\{(.*?)\\}\\}`).exec(svg)?.[1] ?? "").matchAll(/(?:^|\})([\d.]+)%(?:,[\d.]+%)?\{/g)].map((match) => Number(match[1]));

describe("the pen on a shape of several subpaths (a ring, a square with a hole)", () => {
  const svg = animatedSvg({ ...ring, inkDraw: true }, { id: "t", widthsKey: false });
  const frame = ring.shapes.findIndex((shape) => shape.part === "frame");

  it("draws each subpath as its own outline, one after the other, never both at once", () => {
    expect(svg).toContain(`class="t-o${frame}-0 t-o"`);
    expect(svg).toContain(`class="t-o${frame}-1 t-o"`);
    const [outer, inner] = [stops(svg, `o${frame}-0`), stops(svg, `o${frame}-1`)];
    // 0%, start, end, the trace's end, gone: the inner ring starts where the outer one ends.
    expect(inner[1]).toBeCloseTo(outer[2], 2);
    expect(outer[2]).toBeLessThan(outer[3]);
  });

  it("keeps the arm on the pen: the arm round the inner circle starts when the outer circle's ink is done", () => {
    const outer = stops(svg, `o${frame}-0`);
    const arms = [...svg.matchAll(/@keyframes t-(a\d+)\{0%,([\d.]+)%/g)].map((match) => Number(match[2]));
    // Each arm shows from a hair after the stop it is listed at; one of them begins just as the outer circle is finished.
    expect(arms.some((at) => Math.abs(at - outer[2]) < 0.01)).toBe(true);
  });

  it("holds the shape's own outline unseen until the pen has drawn every subpath", () => {
    const own = new RegExp(`@keyframes t-s${frame}\\{.*?\\}\\}`).exec(svg)?.[0] ?? "";
    const [, beforeEnd] = own.split("}").filter((part) => part.includes("stroke-dashoffset:1")).map((part) => part);
    expect(beforeEnd).toContain("stroke-opacity:0");
  });
});
