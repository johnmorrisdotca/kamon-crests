import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, onCircle, shortArc, thickArc } from "../../construct/compass.ts";
import type { Piece, V } from "../../construct/compass.ts";
import { leafMaple } from "./kaede-eda-maru-parts/leaf-maple.ts";
import { fillPart, layerParts } from "./kaede-eda-maru-parts/layers.ts";

type Arc = Extract<Piece, { t: "A" }>;
const motif='maple',paper=1.15;
const point=([x,y]: V): V =>[(x-70)*1.36,(65-y)*1.36];
const frame = ([x, y]: V): V => {
  const k = 91.4 / Math.hypot(x, y);
  return [x * k, y * k];
};
const width=2.55, degrees=Math.PI/180;
const leaves = [
 [[52,19],196,62,{lobes:5,folded:'right',spread:.77},[58,9],-.05],
 [[117,52],-58,59,{lobes:5,folded:'right',spread:.76},[131,70],.06],
 [[17,65],153,47,{lobes:5,folded:'left',spread:.74},[5,62],-.08],
 [[72,96],0,61,{},[55,125],-.072],
 ] satisfies [V, number, number, {lobes?: 5 | 7; folded?: "left" | "right"; spread?: number}, V, number][];
function axis(from: V, to: V, bend: number): Arc {
 const dx=to[0]-from[0],dy=to[1]-from[1],length=Math.hypot(dx,dy);
 const rise=length*bend, r=Math.abs(length*length/(8*rise)+rise/2);
 const n=[-dy/length,dx/length];
 const c: V=[(from[0]+to[0])/2-n[0]*Math.sign(rise)*r,(from[1]+to[1])/2-n[1]*Math.sign(rise)*r];
 return shortArc(circleThrough(from,to,r,c),from,to) as Arc;
}
const station=(arc: Arc,t: number): V =>onCircle(arc.c,arc.r,arc.a0+(arc.a1-arc.a0)*t);
const fits=(arc: Arc)=> Array.from({length:61},(_,i)=>station(arc,i/60))
 .every(q=>Math.hypot(...q)+width/2<96);
function bandAxis(from: V, to: V, bend: number): Arc {
 const proposed=axis(from,to,bend);
 return fits(proposed)?proposed:axis(from,to,-bend);
}
const primary=leaves.map(([location,turn,k,,ring,bend])=>{
 const centre=point(location),a=turn*degrees;
 const tip: V=[centre[0]-.078*k*Math.sin(a),centre[1]-.078*k*Math.cos(a)];
 return bandAxis(frame(point(ring)),tip,bend);
});
const secondary= ([
 [[85,3],0,.69,.125],
 [[18,27],2,.48,-.15],
 [[16,108],3,.32,.145],
 [[102,119],1,.39,-.095],
] satisfies [V, number, number, number][]).map(([rim,i,f,bend])=>bandAxis(frame(point(rim)),station(primary[i],f),bend));
const stems=carve([...primary,...secondary].map(({c,r,a0,a1})=>
 thickArc(c,r,width,Math.min(a0,a1),Math.max(a0,a1))),[]);
if (![...primary, ...secondary].every(fits)) throw new Error("A maple twig extends outside the ring");
export function kaedeEdaMaruBuild(c: Builder): void {
 c.precision(3);
 c.ring('ring-thin');
 c.group(()=>layerParts(c,()=>{
  fillPart(c,motif,stems,{k:1});
  for(const [at,turn,k,options] of leaves)
   leafMaple.build(c,point(at),turn,k,{motif,paper,stalk:false,...options});
 }));
}
