import type { Builder } from "../../construct/builder.ts";
import { carve, onCircle, seg, shortArc, thickArc, thickSeg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { span, stalk } from "./chigai-ine-parts/circular-stalk.ts";
import { fillPart, layerParts } from "./chigai-ine-parts/layers.ts";
import { grainOutline } from "./chigai-ine-parts/rice-grain.ts";

const paper=1.15,motif='rice',radians=Math.PI/180,px=([x,y]: V): V =>[(x-72)*1.37,(66-y)*1.37];
function sides(from: V, mid: V, tip: V, w: number): Region {
 const a=px(from),p=px(mid),b=px(tip);
 const dx=b[0]-a[0],dy=b[1]-a[1],d=Math.hypot(dx,dy),n=[-dy/d,dx/d];
 const q=[(a[0]+b[0])/2,(a[1]+b[1])/2];
 const h=(p[0]-q[0])*n[0]+(p[1]-q[1])*n[1];
 const edge=[h+w/2,h-w/2].map(v=>{
  const r=d*d/(8*v)+v/2;
  return {c:[q[0]+(v-r)*n[0],q[1]+(v-r)*n[1]] as V,r:Math.abs(r)};
 });
 return [shortArc(edge[0],a,b),shortArc(edge[1],b,a)];
}
type Ear = [from: V, mid: V, tip: V, scale: number, grains: number];
const earPlan: Ear[]=[
 [[43,64],[37,36],[37,12],1.05,6],
 [[62,85],[63,58],[67,37],.87,5],
 [[42,79],[27,76],[11,82],.83,4],
];
const cutTop: V=[112,109.3],cutLow: V=[92.5,122.7];
const measuredCut=(t: number): V =>[cutTop[0]+(cutLow[0]-cutTop[0])*t,cutTop[1]+(cutLow[1]-cutTop[1])*t];
const straws= ([
 [[43,64],[65,99],measuredCut(.24),2.75],
 [[62,85],[69,100],measuredCut(.48),2.75],
 [[42,79],[66,99],measuredCut(.63),2.75],
 [[46,69],[66,102],measuredCut(.89),2.6],
 [[54,82],[72,101],measuredCut(.10),2.55],
] satisfies [V, V, V, number][]).map(([a,m,b,w])=>stalk(px(a),px(m),px(b),w));
const bladePlan: [V, V, V, number][]=[
 [[69,100],[48,66],[10,35],3.95],
 [[68,99],[42,72],[8,53],3.95],
 [[66,98],[50,57],[66,7.5],3.95],
 [[63,96],[33,84],[19,96],3.95],
];
const knotTop: V=[70,98],knotLow: V=[64.5,102.5];
const tail=[
 span(px(knotTop),px([89.5,107.6]),px(cutTop)),
 seg(px(cutTop),px(cutLow)),
 span(px(cutLow),px([78.5,115.8]),px(knotLow)),
 seg(px(knotLow),px(knotTop)),
];
const tailPaper=Array.from({length:4},(_,i)=>{
 const t=(i+1)/5;
 const a: V=[knotTop[0]+(knotLow[0]-knotTop[0])*t,knotTop[1]+(knotLow[1]-knotTop[1])*t];
 return stalk(px(a),px([89.5-11*t,107.6+8.2*t]),px(measuredCut(t)),paper);
});
const cutA=px(cutTop),cutB=px(cutLow);
const cutVector: V=[cutB[0]-cutA[0],cutB[1]-cutA[1]];
const outside: V=[-cutVector[1],cutVector[0]];
const edgeStart: V=[cutA[0]-5*cutVector[0],cutA[1]-5*cutVector[1]];
const edgeEnd: V=[cutB[0]+5*cutVector[0],cutB[1]+5*cutVector[1]];
const outsideEnd: V=[edgeEnd[0]+8*outside[0],edgeEnd[1]+8*outside[1]];
const outsideStart: V=[edgeStart[0]+8*outside[0],edgeStart[1]+8*outside[1]];
const cutMask=[seg(edgeStart,edgeEnd),seg(edgeEnd,outsideEnd),seg(outsideEnd,outsideStart),seg(outsideStart,edgeStart)];
function ear([from,mid,tip,scale,count]: Ear): Region[] {
 const p=span(px(from),px(mid),px(tip));
 const a0=p.a0,sweep=p.a1-p.a0;
 const axis=thickArc(p.c,p.r,2.15,Math.min(a0,p.a1),Math.max(a0,p.a1));
 const grains: Region[] = [axis];
 function fill(t: number, slant: number, k: number): void {
  const alpha=a0+sweep*t,point=onCircle(p.c,p.r,alpha);
  const angle=Math.atan2(-Math.sin(alpha)*Math.sign(sweep),Math.cos(alpha)*Math.sign(sweep))/radians;
  grains.push(grainOutline(point, angle + slant, 11.75 * k));
 }
 for(let i=0;i<count;i++){
  const t=.19+i*(.64/(count-1)),k=scale*(1-.17*i/count);
  fill(t,-41,k);fill(t,41,k);
 }
 fill(.94,0,scale*.84);
 return carve(grains, []);
}
const tie = (c: Builder): void => {
 const a=px([64.8,97.3]),b=px([68.6,94.8]),d=px([74.65,106.4]),e=px([78.45,103.9]);
 const midpoint = (p: V, q: V): V =>[(p[0]+q[0])/2,(p[1]+q[1])/2];
 const ribbon=[seg(a,b),seg(b,e),seg(e,d),seg(d,a)];
 const stripe=thickSeg(midpoint(a,b),midpoint(d,e),paper);
 fillPart(c,motif,carve([ribbon],[stripe]),{k:1},paper);
};
export function chigaiIneBuild(c: Builder): void {
 c.precision(3);
 layerParts(c,()=>{
  const branches=carve([...straws,...bladePlan.map(args=>sides(...args)),tail],[...tailPaper,cutMask]);
  const panicles = earPlan.map(ear);
  for(const mirror of [false,true]){
   fillPart(c,motif,branches,{k:1,mirror},mirror?paper:0);
   for(const panicle of panicles)fillPart(c, motif, panicle, { k: 1, mirror });
  }
  tie(c);
 }, 2);
}
