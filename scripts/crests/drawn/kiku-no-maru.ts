import type { Builder } from "../../construct/builder.ts";
import { carve, disc, moved, onCircle, rotated, shortArc, thickArc, thickSeg } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { pointedPetal } from "./kiku.ts";
import { branchTaper } from "./kiku-no-maru-parts/branch-taper.ts";
import { broadLobedChrysanthemumLeaf } from "./kiku-no-maru-parts/broad-lobed-leaf.ts";
import { fillPart } from "./kiku-no-maru-parts/layers.ts";

type Arc = Extract<Piece, { t: "A" }>;

const motif='chrysanthemum',paper=1.15;
const px = ([x,y]: V): V =>[(x-69)*1.38,(70-y)*1.38];
const radians=Math.PI/180;
function collar(): Region {
 const c=px([69,73]),r=88.0;
 return thickArc(c,r,2.40,0,2*Math.PI);
}
function leaf(c: Builder, from: V, to: V, gap = 0): void {
 const a=px(from),b=px(to),dx=b[0]-a[0],dy=b[1]-a[1];
 const k=Math.hypot(dx,dy)/75;
 fillPart(c,motif,broadLobedChrysanthemumLeaf(paper/k),{at:a,turn:Math.atan2(dx,dy)/radians,k},gap);
}
function petals(c: Builder): void {
 const centre=px([62,33]),n=24;
 const layers=Array.from({length:n},(_,i)=>{
  const phi=i*2*Math.PI/n;
  const x=68*Math.sin(phi),y=39*Math.cos(phi);
  const ray=Math.hypot(x,y)*(i%2?.91:1);
  const width=ray*(i%2?.078:.087);
  const turn=Math.atan2(x,y);
  const place=(inner: number, outer: number, half: number): Region =>pointedPetal(inner,outer,half).map(edge=>moved(rotated(edge,-turn),centre));
  return {ink:place(3,ray,width),paper:place(2,ray+paper,width+paper)};
 });
 const inks=layers.flatMap(({ink},index)=>carve([ink],layers.slice(index+1).map(({paper})=>paper)));
 fillPart(c,motif,carve([...inks,disc(centre,4.8)],[]),{k:1});
}
const ringAt = (angle: number): V => onCircle(px([69,73]),88,angle*radians);
function stalkAlong(a: V, m: V, b: V, width: number): Region {
 const chord=[b[0]-a[0],b[1]-a[1]];
 const span=Math.hypot(...chord), n=[-chord[1]/span,chord[0]/span];
 const mid=[(a[0]+b[0])/2,(a[1]+b[1])/2], offset=[m[0]-mid[0],m[1]-mid[1]];
 const height=(offset[0]**2+offset[1]**2-span*span/4)/(2*(offset[0]*n[0]+offset[1]*n[1]));
 const c: V = [mid[0]+height*n[0],mid[1]+height*n[1]];
 const arc=shortArc({c,r:Math.hypot(a[0]-c[0],a[1]-c[1])},a,b) as Arc;
 return thickArc(c,arc.r,width,Math.min(arc.a0,arc.a1),Math.max(arc.a0,arc.a1));
}
const stalk=stalkAlong(ringAt(306),px([115,102]),px([103,34]),2.65);
const leafJoin=thickSeg(ringAt(229),px([29,119]),2.25);
export function kikuNoMaruBuild(c: Builder): void {
 c.precision(3);
 c.group(()=>{
  fillPart(c,"frame",[collar()],{k:1});
  fillPart(c,motif,[stalk,leafJoin],{k:1});
  const a=px([55,134]),b=px([62,33]),dx=b[0]-a[0],dy=b[1]-a[1],span=Math.hypot(dx,dy);
  branchTaper.build(c,[(a[0]+b[0])/2,(a[1]+b[1])/2],Math.atan2(dx,dy)/radians,span,{motif,width:4.3/span,bend:9.6/span});
  leaf(c,[29,119],[39,58]);
  leaf(c,[115,102],[80,63]);
  leaf(c,[107,124],[78,100]);
  petals(c);
 });

}
