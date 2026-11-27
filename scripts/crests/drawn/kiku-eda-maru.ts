import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, disc, mirrored, moved, onCircle, rotated, shortArc, thickArc, thickSeg } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { pointedPetal } from "./kiku.ts";
import { branchTaper } from "./kiku-eda-maru-parts/branch-taper.ts";
import { budRound } from "./kiku-eda-maru-parts/bud-round.ts";
import { fillPart, layerParts } from "./kiku-eda-maru-parts/layers.ts";

type Arc = Extract<Piece, { t: "A" }>;

const paper=1.15,motif='chrysanthemum',radians=Math.PI/180,px=([x,y]: V): V =>[(x-72)*1.40,(67-y)*1.40];
const rim=thickArc([0,0],89.05,3.55,0,2*Math.PI);
function shoot(from: V, tip: V, through: V, width: number) {
 const to=px(tip),hint=px(through);
 const x=to[0]-from[0], y=to[1]-from[1], length=Math.hypot(x,y);
 const centre: V = [(from[0]+to[0])/2,(from[1]+to[1])/2],n=[y/length,-x/length];
 const rise=(hint[0]-centre[0])*n[0]+(hint[1]-centre[1])*n[1];
 const off=length*length/(8*rise)+rise/2;
 const c: V = [centre[0]+(rise-off)*n[0],centre[1]+(rise-off)*n[1]];
 const axis = shortArc({c,r:Math.abs(off)},from,to) as Arc;
 return {
   draw(c: Builder): void { branchTaper.build(c,centre,Math.atan2(x,y)/radians,length,{motif,width:width/length,bend:rise/length}); },
   at(t: number): V { return onCircle(c,axis.r,axis.a0+t*(axis.a1-axis.a0)); },
 };
}
const ringAt = (turn: number): V =>onCircle([0,0],89.05,turn*radians);
const main=shoot(ringAt(270),[73,17],[71,73],4.6);
const right=shoot(main.at(.49),[104,56],[93,70],3.7);
const left=shoot(main.at(.69),[59,41],[65,48],3.2);
const side=shoot(main.at(.64),[83,38],[80,47],2.6);
const atPrint = ([x,y]: V): V =>[72+x/1.4,67-y/1.4];
const leftward=shoot(main.at(.48),atPrint(ringAt(164)),[43,64],3.0);
function makeLeaf(k: number): Region[] {
 const half: V[] = [[0,0],[16,10],[18,23],[12,26],[23,37],[15,51],[17,59],[0,90]];
 const profile=[...half,...half.slice(1,-1).reverse().map(([x,y]): V =>[-x,y])];
 const outline=profile.map((a,i)=>{
  const b=profile[(i+1)%profile.length],len=Math.hypot(a[0]-b[0],a[1]-b[1]);
  return shortArc(circleThrough(a,b,1.55*len,[0,39]),a,b);
 });
 const width=paper/k;
 const vein=[thickSeg([0,8],[0,82],width)];
 for(const [y,x,tip] of [[21,13,43],[43,13,66]]){
  const q=thickSeg([0,y],[x,tip],width);
  vein.push(q,q.map(mirrored));
 }
 return carve([outline],vein);
}
function leaf(c: Builder, p: V, b: V): void {
 const q=px(b),dx=q[0]-p[0],dy=q[1]-p[1],k=Math.hypot(dx,dy)/90;
 fillPart(c,motif,makeLeaf(k),{at:p,turn:Math.atan2(dx,dy)/radians,k});
}
function flower(c: Builder): void {
 const p=px([73,79]),n=20;
 const layers=Array.from({length:n},(_,i)=>{
  const a=i*2*Math.PI/n,x=59*Math.sin(a),y=37*Math.cos(a);
  const length=Math.hypot(x,y)*(i%2?.89:1),width=length*.081;
  const place = (base: number, reach: number, half: number): Region =>pointedPetal(base,reach,half).map(e=>moved(rotated(e,-Math.atan2(x,y)),p));
  return {ink:place(4,length,width),paper:place(3,length+paper,width+paper)};
 });
 const ink=layers.flatMap(({ink},i)=>carve([ink],layers.slice(i+1).map(({paper})=>paper)));
 fillPart(c,motif,carve([...ink,disc(p,6.4)],[]),{k:1},paper);
}
function bud(c: Builder): void {
 const at=px([104,56]);
 const parts=[-31,-5,21,47,73].map(turn=>{
  const place = (base: number, reach: number, width: number): Region =>pointedPetal(base,reach,width).map(e=>moved(rotated(e,-turn*radians),at));
  return {ink:place(-.4,18.8,2.5),paper:place(-.4,18.8+paper,2.5+paper)};
 });
 const ink=parts.flatMap(({ink},i)=>carve([ink],parts.slice(i+1).map(({paper})=>paper)));
 fillPart(c,motif,carve([...ink,disc(at,2.2)],[]),{k:1});
}
export function kikuEdaMaruBuild(c: Builder): void {
 c.precision(2);
 c.group(()=>{
  fillPart(c,"frame",[rim],{k:1});
  layerParts(c,()=>{
   for (const branch of [main,right,left,side,leftward]) branch.draw(c);
  },motif);
  layerParts(c,()=>{
   for (const [root,tip] of ([
    [main.at(.11),[26,97]],
    [main.at(.10),[112,108]],
    [main.at(.40),[126,83]],
    [leftward.at(.56),[17,56.015]],
    [left.at(.79),[42,29]],
   ] satisfies [V,V][])) leaf(c,root,tip);
   flower(c);
  });
  bud(c);
  budRound.build(c,px([73,9]),0,7.6,{motif,paper,stalkLength:4.5});
 });
}
