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

export const point = ([x, y]: V): V =>[(x-71)*1.31,(66-y)*1.31];
const arc = (a: V, b: V, r: number, hint: V): Arc => shortArc(circleThrough(a,b,r,hint),a,b) as Arc;
export const band = (a: V, b: V, r: number, hint: V, w: number): Region =>{
 const p=arc(a,b,r,hint);
 return thickArc(p.c,p.r,w,Math.min(p.a0,p.a1),Math.max(p.a0,p.a1));
};
function through(a: V, m: V, b: V): Arc {
 const dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy),n: V=[-dy/length,dx/length];
 const p: V=[(a[0]+b[0])/2,(a[1]+b[1])/2],v: V=[m[0]-p[0],m[1]-p[1]];
 const k=(v[0]**2+v[1]**2-length**2/4)/(2*(v[0]*n[0]+v[1]*n[1]));
 const c: V=[p[0]+k*n[0],p[1]+k*n[1]];
 return shortArc({c,r:Math.hypot(a[0]-c[0],a[1]-c[1])},a,b) as Arc;
}
const left = ([
 [65,116],[53,120],[39,120],[27,115],[20,109],[15,100],[20,100],
 [14,94],[10,87],[8,77],[6,68],[8,64],[14,64],[23,70],
 [11,59],[9,47],[12,37],[15,32],[21,32],[28,40],[33,49],
 [39,55],[35,65],[45,54],[51,52],[57,59],[58,68],[55,77],
 [57,81],[62,76],[66,78],[67,90],[64,105],
] satisfies V[]).map(point);
const outline=left.map((a,i)=>{
 const b=left[(i+1)%left.length];
 return arc(a,b,Math.hypot(a[0]-b[0],a[1]-b[1])*1.9,point([36,81]));
});
function along(arc: Arc, t: number): V {
 return onCircle(arc.c,arc.r,arc.a0+(arc.a1-arc.a0)*t);
}
function leafCuts(paper: number): Region[] {
 const cuts: Region[]=[];
 const put = (arc: Arc) =>cuts.push(thickArc(arc.c,arc.r,paper,Math.min(arc.a0,arc.a1),Math.max(arc.a0,arc.a1)));
 const main=through(point([64,115]),point([36,87]),point([19,38]));
 put(main);
 for(const [station,control,tip,branchSide] of ([
  [.12,[60,91],[62,82], 1],[.26,[50,78],[51,58],1],
  [.39,[25,82],[13,68],-1],[.24,[29,99],[18,94],-1],
  [.13,[40,115],[27,109],-1],[.56,[35,66],[32,50],1],
 ] satisfies [number, V, V, number][]) ){
  const root=along(main,station);
  const stem=through(root,point(control),point(tip));
  put(stem);
  const a=along(stem,.25),b=along(stem,.68);
  const dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy);
  const alongX=dx/l,alongY=dy/l;
  for(const [t,side] of [[.34,branchSide],[.55,-branchSide],[.72,branchSide]]){
   const from=along(stem,t);
   const length=6.8;
   const to: V=[from[0]+alongX*length-alongY*side*length*.67,from[1]+alongY*length+alongX*side*length*.67];
   if(inside(outline,to))cuts.push(thickSeg(from,to,paper));
  }
 }
 for(const [station,x,y] of [
  [.47,22,76],[.59,16,64],[.62,36,66],[.69,18,57],[.74,27,48],[.80,18,48],[.88,23,41],
 ]){
  const tip=point([x,y]);
  if(inside(outline,tip))cuts.push(thickSeg(along(main,station),tip,paper));
 }
 return cuts;
}
function blade(paper: number): Region[] {
  const cuts = leafCuts(paper);
  return carveWhere([...outline, ...cuts.flat()], (p) => inside(outline, p) && !cuts.some((rib) => inside(rib, p)));
}

/** Size 100 preserves the natural scale of the printed half of the crest. */
export const lowerChrysanthemumLeaf = definePart<LeafOptions>({
  id: "lower-chrysanthemum-leaf",
  name: { en: "Lower chrysanthemum leaf", ja: "下葉の菊の葉" },
  description: {
    en: "Seven lobes and curved ribs share one spreading stem.",
    ja: "広がる主脈に、七つの切れ込みと曲がる葉脈を添えます。",
  },
  families: ["kiku"],
  sources: [{ frame: 39, page: "L", row: 1, col: 2, label: "下葉きく" }],
  sampleSize: 100,
  sampleOptions: { motif: "chrysanthemum", paper: 1.15 },
  build(c, centre, turn, size, { motif, paper, mirror, keyline }) {
    const k = size / 100;
    fillPart(c, motif, blade(paper / k), { k, at: centre, turn, mirror }, keyline);
  },
});
