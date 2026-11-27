import { carve, disc } from "../../../construct/compass.ts";
import type { V } from "../../../construct/compass.ts";
import { measuredBoundary } from "./measured-boundary.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

const point = ([x, y]: V): V => [x - 77, 132 - y];
const runs: readonly (readonly [V, V])[] = [
  [[32, 154], [41, 149]], [[63, 148], [77, 144]],
  [[87, 137], [88, 128]], [[82, 121], [74, 114]],
  [[85, 109], [93, 110]], [[97, 104], [102, 103]],
  [[110, 109], [114, 114]], [[122, 114], [129, 119]],
  [[119, 124], [112, 132]], [[105, 143], [91, 151]],
  [[76, 156], [61, 155]], [[43, 155], [26, 161]],
];
const profile = measuredBoundary(point([26, 161]), runs.map(([middle, end]) => [point(middle), point(end)]));
const ink = carve([profile], [disc(point([38, 152.5]), 1.1)]);

/** Size is the horizontal span from beak to shoulder before the part is turned. */
export const craneNeck = definePart<PartOptions>({
  id: "crane-neck",
  name: { en: "Curved crane neck and head", ja: "曲がった鶴の首と頭" },
  description: {
    en: "Two sweeping sides join a low shoulder to a small head with a paper eye and pointed beak.",
    ja: "曲線を二本伸ばして低い肩と小さな頭をつなぎ、白い目ととがったくちばしを添えます。",
  },
  families: ["tsuru", "kiku", "icho"],
  sources: [{ frame: 40, page: "R", row: 4, col: 2, label: "きく鶴" }],
  sampleSize: 150,
  sampleOptions: { motif: "crane" },
  build(c, centre, turn, size, { motif, keyline }) {
    fillPart(c, motif, ink, { k: size / 103, at: centre, turn }, keyline);
  },
});

export default craneNeck;
