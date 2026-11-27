import { carve, circleThrough, disc, mirrored, shortArc, thickArc, thickSeg } from "../../../construct/compass.ts";
import type { Piece, Region, V } from "../../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface OakOptions extends PartOptions {
  paper?: number;
}
const bottom: V = [0,-50];
const top: V = [0,50];
const width = 42;
const radius = (100 * 100 + width * width) / (4 * width);
const edge = circleThrough(bottom,top,radius,[-radius,0]);
const side = shortArc(edge,bottom,top) as Extract<Piece,{t:"A"}>;
const leaf: Region = [side,shortArc({ c: [-edge.c[0],0],r: radius },top,bottom)];
const mirror = (pieces: Region[]): Region[] => pieces.map((loop) => loop.map(mirrored));
const notches = [[-22,2.35],[-4,2.5],[14,2.35],[30,1.7]].map(([y,r]) => {
  const x = edge.c[0] + Math.sqrt(radius**2-y**2);
  return disc([x+r*.52,y],r);
});
const silhouette = carve([leaf], [...notches,...mirror(notches)]);
const veins: readonly (readonly [V,V])[] = [
  [[0,-30],[12,-13]], [[0,-13],[16,5]], [[0,5],[15,23]], [[0,22],[9,35]],
];

/** Size is the length of one oak blade. */
export const leafOak = definePart<OakOptions>({
  id: "leaf-oak",
  name: { en:"Pointed oak leaf", ja:"先のとがった柏の葉" },
  description: { en:"A pointed blade with shallow notches and four white veins on each side.", ja:"浅い切れ込みのある葉に、白い葉脈を左右四本ずつ通します。" },
  families: ["kashiwa"],
  sources: [{ frame:16,page:"L",row:4,col:4,label:"三ッ葉かしは" }],
  sampleSize: 155,
  sampleOptions: { motif:"oak" },
  build(c,centre,turn,size,{motif,keyline,paper=1.15}) {
    const k=size/100;
    const line=paper/k;
    const sideVeins = veins.map(([a,b]) => {
      const run = shortArc(circleThrough(a,b,28,[24,a[1]-9]),a,b) as Extract<Piece,{t:"A"}>;
      return thickArc(run.c,run.r,line,Math.min(run.a0,run.a1),Math.max(run.a0,run.a1));
    });
    const ribs = [thickSeg([0,-47],[0,46],line),...sideVeins,...mirror(sideVeins)];
    fillPart(c,motif,carve(silhouette,ribs),{k,at:centre,turn},keyline);
  },
});
