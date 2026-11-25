import { describe, expect, it } from "vitest";
import { durationOf, stepTimes } from "./render";
import hiraYotsume from "./steps/hira-yotsume";
import omodaka from "./steps/omodaka";

const gaps = (times: number[]): number[] => times.slice(1).map((t, i) => t - times[i]);

describe("a step that repeats an earlier step's shape plays twice as fast", () => {
  it("outlines the first of the four eyes at full pace and the other three at half its time, with the pen drawing the ink", () => {
    const times = stepTimes({ ...hiraYotsume, inkDraw: true });
    const traces = hiraYotsume.steps.flatMap((step, i) => (step.op === "trace" ? [i] : []));
    expect(traces).toHaveLength(4);
    const [first, ...rest] = gaps([...traces.map((i) => times[i]), times[traces[3] + 1]]);
    for (const gap of rest.slice(0, 2)) expect(gap).toBeCloseTo(first / 2, 2);
  });

  it("fills the repeated eyes at half the gap of the first, with the ink quick too", () => {
    const times = stepTimes(hiraYotsume);
    const draws = hiraYotsume.steps.flatMap((step, i) => (step.op === "draw" ? [i] : []));
    const [first, ...rest] = gaps(draws.map((i) => times[i]));
    expect(rest.length).toBeGreaterThan(0);
    expect(first).toBeCloseTo(0.25, 3);
    for (const gap of rest) expect(gap).toBeCloseTo(0.125, 3);
  });

  it("keeps the usual pace for outlines that differ", () => {
    const times = stepTimes(omodaka);
    const traces = omodaka.steps.flatMap((step, i) => (step.op === "trace" ? [i] : []));
    expect(traces.length).toBeGreaterThan(1);
    for (const gap of gaps(traces.map((i) => times[i]))) expect(gap).toBeCloseTo(0.42, 3);
  });

  it("makes the four eyes' pen-drawn construction a quarter shorter", () => {
    expect(durationOf({ ...hiraYotsume, inkDraw: true })).toBeLessThan(18);
  });
});
