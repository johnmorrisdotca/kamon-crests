// What a crest's construction is written with: the guides of its layout (割付, the compass circles and ruler lines it is
// set out with) and the shapes it is drawn from, each shape belonging to one named part. The build keeps the order the
// calls are made in: guides first, then shape by shape, which is the order the construction animation plays them.

import { C0, Path, R, circle, polar } from "./geo.ts";
import type { Pt } from "./geo.ts";

export interface Guide {
  /** What it is: a compass `circle`, a ruler `line`, or a pricked `point`'s tiny `mark`. */
  type: "circle" | "line" | "arc";
  d: string;
}

export interface Shape {
  /** The part it belongs to: "frame", or a motif's id. */
  part: string;
  /** `fill` shapes are solid; `stroke` shapes are lines of one weight. */
  kind: "fill" | "stroke";
  d: string;
  /** For a stroke: its weight, in the page's 200 units. */
  width?: number;
  cap?: "butt";
  /** For a fill with holes: the even-odd rule. */
  rule?: "evenodd";
  /** Shapes of one group are traced together. */
  group: number;
}

/** The weights of a crest's lines, in the page's 200 units: one scale for every crest, so that they sit together. */
export const WEIGHT = { thread: 2.4, thin: 4.8, medium: 9.6, thick: 14.4, hair: 1.6 } as const;

export type RingKind = "ring-thread" | "ring-thin" | "ring-medium" | "ring-thick";
const RING_WEIGHT: Record<RingKind, number> = { "ring-thread": WEIGHT.thread, "ring-thin": WEIGHT.thin, "ring-medium": WEIGHT.medium, "ring-thick": WEIGHT.thick };

export class Builder {
  guides: Guide[] = [];
  shapes: Shape[] = [];
  private groupId = 0;
  private k = 1;

  /** Everything drawn from now on is drawn `k` times the size about the centre: for a crest set inside a ring. */
  zoom(k: number): void {
    this.k = k;
  }

  private z(path: Path): Path {
    return this.k === 1 ? path : path.scale(this.k);
  }
  private open = false;

  /** Shapes drawn inside `body` are one step of the animation. */
  group(body: () => void): void {
    this.groupId += 1;
    this.open = true;
    body();
    this.open = false;
  }

  private nextGroup(): number {
    if (!this.open) this.groupId += 1;

    return this.groupId;
  }

  guideCircle(c: Pt, r: number): void {
    this.guides.push({ type: "circle", d: this.z(circle(c, r)).d() });
  }

  guideLine(a: Pt, b: Pt): void {
    this.guides.push({ type: "line", d: this.z(new Path().M(a).L(b)).d() });
  }

  /** A guide that is a path of the construction's own (an arc, or a square's edge). */
  guidePath(path: Path, type: Guide["type"] = "arc"): void {
    this.guides.push({ type, d: this.z(path).d() });
  }

  /** The spokes of a layout: `n` lines from the centre, the first at `a0`. */
  guideSpokes(n: number, a0 = 0, r = R, c: Pt = C0): void {
    for (let i = 0; i < n; i += 1) this.guideLine(c, polar(r, a0 + (360 * i) / n, c));
  }

  fill(part: string, path: Path, rule?: "evenodd"): void {
    this.shapes.push({ part, kind: "fill", d: this.z(path).d(), ...(rule === undefined ? {} : { rule }), group: this.nextGroup() });
  }

  stroke(part: string, path: Path, width: number, cap?: "butt"): void {
    this.shapes.push({ part, kind: "stroke", d: this.z(path).d(), width: Math.round(width * this.k * 100) / 100, ...(cap === undefined ? {} : { cap }), group: this.nextGroup() });
  }

  /**
   * The frame of a ringed crest: a circle of the stated weight whose outer edge is the layout circle, drawn as one stroke.
   * Returns the radius of the room inside it.
   */
  ring(kind: RingKind, radius = R): number {
    const w = RING_WEIGHT[kind];
    this.guideCircle(C0, radius);
    this.stroke("frame", circle(C0, radius - w / 2), w);

    return radius - w;
  }
}

/** The layout circles every ringed crest is set out with, from the outside in. */
export const layoutRadii = (inner: number): number[] => [R, inner];
