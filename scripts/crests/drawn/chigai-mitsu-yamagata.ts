// Three ruled chevrons measured from frame 28 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { carve, seg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

type Chevron = { x: number; direction: -1 | 1; peak: number; innerPeak: number; foot: number };

const slope = 0.48;
const diagonalWeight = Math.hypot(1, slope) / slope;

const band = ({ x, direction, peak, innerPeak, foot }: Chevron, gap = 0): Region => {
  const upper = peak + gap * diagonalWeight;
  const lower = foot - gap;
  const inner = innerPeak - gap * diagonalWeight;
  const span = slope * (upper - lower);
  const opening = slope * (inner - lower);
  const point = (localX: number, localY: number): V => [x + localX, localY * direction];
  const outline = [
    point(0, upper), point(span, lower), point(opening, lower),
    point(0, inner), point(-opening, lower), point(-span, lower),
  ];
  return outline.map((corner, index) => seg(corner, outline[(index + 1) % outline.length]));
};

export const chigaiMitsuYamagataBuild = (c: Builder): void => {
  c.precision(3);
  c.guideCircle(C0, R);

  const left: Chevron = { x: -15.5, direction: 1, peak: 75, innerPeak: 40, foot: -73 };
  const right: Chevron = { ...left, x: 15.5 };
  const inverted: Chevron = { x: 0, direction: -1, peak: 64, innerPeak: 30, foot: -71 };
  const seam = 1.55;
  for (const [piece, above] of [[left, inverted], [right, left], [inverted, right]]) {
    c.fill("mountain", toPath(carve([band(piece)], [band(above, seam)]), { k: 0.83 }));
  }
};
