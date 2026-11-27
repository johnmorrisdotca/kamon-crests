import { arcA, shortArc, thickArc } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface SwellOptions extends PartOptions {
  /** Height of the upper swell divided by the distance between its two ends. */
  rise?: number;
  /** Depth of the lower bank divided by the same distance. */
  dip?: number;
  /** Paper arcs running just inside the upper swell. */
  bands?: 0 | 1 | 2;
}

/** The circle standing a signed height above or below a unit chord. */
function bank(height: number): Circle {
  const r = (.25 + height * height) / (2 * Math.abs(height));
  return { c: [0, height - Math.sign(height) * r], r };
}

/** Size is the distance between the two ends; the centre is the middle of their chord. */
export const waveSwell = definePart<SwellOptions>({
  id: "wave-swell",
  name: { en: "Wave swell", ja: "波のうねり" },
  description: {
    en: "A rounded bank of water with a shallower foot and paper lines concentric with the crest of the swell.",
    ja: "丸く盛り上がる波に浅い下縁を付け、上縁と同心の白い波筋を入れます。",
  },
  families: ["nami"],
  sources: [
    { frame: 23, page: "L", row: 2, col: 1, label: "おひかけなみ" },
    { frame: 23, page: "L", row: 2, col: 2, label: "三ッワリなみ" },
    { frame: 23, page: "L", row: 1, col: 1, label: "立ち波兎" },
  ],
  stock: true,
  sampleSize: 150,
  sampleOptions: { motif: "wave", bands: 2 },
  // The lower bank and rise of the swelling arm in おひかけなみ together cover about half its span.
  build(c, centre, turn, size, { motif, keyline, paper = PAPER, rise = .40, dip = .12, bands = 2 }) {
    if (!Number.isFinite(rise) || !Number.isFinite(dip) || rise <= 0 || rise >= .5 || dip <= 0 || dip >= .5) {
      throw new Error("wave-swell: the rise and dip must be between zero and half the span");
    }
    const right: V = [.5, 0];
    const left: V = [-.5, 0];
    const crown = bank(rise);
    const start = Math.atan2(-crown.c[1], .5);
    const end = Math.PI - start;
    const outline = [arcA(crown.c, crown.r, start, end), shortArc(bank(-dip), left, right)];
    const cuts: Region[] = [];
    const localPaper = paper / size;
    if (bands > 0 && localPaper >= rise * .22) throw new Error("wave-swell: the paper lines are too wide for this rise");
    for (let i = 0; i < bands; i += 1) {
      const radius = crown.r - rise * (.23 + i * .22);
      const margin = (end - start) * (.14 + i * .06);
      cuts.push(thickArc(crown.c, radius, localPaper, start + margin, end - margin));
    }

    fillPart(c, motif, [outline, ...cuts], { k: size, at: centre, turn }, keyline);
  },
});

export default waveSwell;
