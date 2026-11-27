import { carveWhere, circleThrough, inside, onCircle, shortArc, thickArc, thickSeg } from "../../../construct/compass.ts";
import type { Piece, Region, V } from "../../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

type Arc = Extract<Piece, { t: "A" }>;
interface LeafOptions extends PartOptions {
  paper: number;
  mirror?: boolean;
}

const point = ([x, y]: V): V =>[(x-70)*1.32,(65-y)*1.32];
const span = (a: V, m: V, b: V): Arc =>{
 const dx=b[0]-a[0],dy=b[1]-a[1],d=Math.hypot(dx,dy),n: V=[-dy/d,dx/d];
 const p: V=[(a[0]+b[0])/2,(a[1]+b[1])/2],v: V=[m[0]-p[0],m[1]-p[1]];
 const k=(v[0]**2+v[1]**2-d*d/4)/(2*(v[0]*n[0]+v[1]*n[1]));
 const c: V=[p[0]+k*n[0],p[1]+k*n[1]];
 return shortArc({c,r:Math.hypot(a[0]-c[0],a[1]-c[1])},a,b) as Arc;
};
const paperArc = (arc: Arc, w: number): Region =>thickArc(arc.c,arc.r,w,Math.min(arc.a0,arc.a1),Math.max(arc.a0,arc.a1));
const silhouette = ([
 [62,121],[48,123],[33,118],[21,110],[14,97],[13,90],[20,88],[24,91],
 [12,83],[6,73],[7,62],[11,49],[20,32],[24,45],
 [30,25],[38,15],[49,8],[60,6],[64,12],[63,28],[56,40],[50,48],
 [57,48],[63,44],[68,52],[64,66],[55,76],[50,83],
 [55,85],[62,79],[66,86],[67,97],[63,110],
] satisfies V[]).map(point);
const outline=silhouette.map((a,i)=>{
 const b=silhouette[(i+1)%silhouette.length];
 const hint=point([42,67]);
 return shortArc(circleThrough(a,b,Math.hypot(a[0]-b[0],a[1]-b[1])*1.9,hint),a,b);
});
const axis=span(point([60,119]),point([34,81]),point([54,12]));
const at = (t: number): V =>onCircle(axis.c,axis.r,axis.a0+(axis.a1-axis.a0)*t);
function blade(paper: number): Region[] {
  const ribs=[paperArc(axis, paper)];
  for(const [t,tip,hint] of ([[.14,[23,102],[23,75]],[.18,[60,94],[48,83]],[.36,[14,49],[16,37]],[.39,[60,54],[46,40]]] satisfies [number, V, V][])){
   const p=at(t),q=point(tip),len=Math.hypot(p[0]-q[0],p[1]-q[1]);
   const arc=shortArc(circleThrough(p,q,Math.max(20,1.3*len),point(hint)),p,q) as Arc;
   ribs.push(paperArc(arc, paper));
   for(const s of [.26,.43,.60,.77]){
    const knot=onCircle(arc.c,arc.r,arc.a0+(arc.a1-arc.a0)*s);
    const u=(q[0]-p[0])/len,v=(q[1]-p[1])/len;
    for(const sign of [-1,1])ribs.push(thickSeg(knot,[knot[0]+u*7-sign*v*6,knot[1]+v*7+sign*u*6],paper));
   }
  }
  for(const t of [.51,.60,.69,.78,.86]){
   const mid=at(t),len=12*Math.sin(t*Math.PI)+4;
   ribs.push(thickSeg(mid,[mid[0]-len,mid[1]+len*.74],paper),thickSeg(mid,[mid[0]+len,mid[1]+len*.74],paper));
  }
  return carveWhere([...outline,...ribs.flat()],p=>inside(outline,p)&&!ribs.some(rib=>inside(rib,p)));
}
export const mulberryStalk = paperArc(span(point([75,128]),point([65,122]),point([55,111])),3.5);

/** Size 100 places the measured blade at its natural scale. */
export const curvedMulberryLeaf = definePart<LeafOptions>({
  id: "curved-mulberry-leaf",
  name: { en: "Curved mulberry leaf", ja: "曲がる梶の葉" },
  description: {
    en: "A five-lobed blade with ruled veins attached to a curved midrib.",
    ja: "五つに分かれた葉に、曲がる主脈とそこから伸びる直線の葉脈を入れます。",
  },
  families: ["kaji"],
  sources: [{ frame: 17, page: "L", row: 3, col: 3, label: "抱きかぢのは" }],
  sampleSize: 100,
  sampleOptions: { motif: "paper-mulberry", paper: 1.15 },
  build(c, centre, turn, size, { motif, paper, mirror, keyline }) {
    const k = size / 100;
    fillPart(c, motif, blade(paper / k), { k, at: centre, turn, mirror }, keyline);
  },
});
