import type { Builder } from "../../construct/builder.ts";
import { carve, disc, onCircle, shortArc, thickArc, thickSeg } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { pointedPetal } from "./kiku.ts";
import { fillPart, layerParts } from "./ran-no-maru-parts/layers.ts";
import { orchidLeaf } from "./ran-no-maru-parts/orchid-leaf.ts";

type Arc = Extract<Piece, { t: "A" }>;

const paper = 1.15;
const motif = "orchid";
const px = ([x, y]: V): V =>[(x-70)*1.35,(69-y)*1.35];
function through(a: V, m: V, b: V): Arc {
 const dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy);
 const n=[-dy/l,dx/l],p=[(a[0]+b[0])/2,(a[1]+b[1])/2];
 const v=[m[0]-p[0],m[1]-p[1]],k=(v[0]**2+v[1]**2-l*l/4)/(2*(v[0]*n[0]+v[1]*n[1]));
 const c: V = [p[0]+k*n[0],p[1]+k*n[1]];
 return shortArc({c,r:Math.hypot(a[0]-c[0],a[1]-c[1])},a,b) as Arc;
}
const line = (a: Arc, w: number): Region =>thickArc(a.c,a.r,w,Math.min(a.a0,a.a1),Math.max(a.a0,a.a1));
function run(a: V, m: V, b: V, w: number): Region {
 return line(through(px(a),px(m),px(b)),w);
}
function petals(c: Builder, at: V, items: readonly (readonly [number, number])[], k = 1, gap = 0): void {
 for(const [turn,len] of items)fillPart(c,motif,[pointedPetal(0,len,len*.145)],{at:px(at),turn,k},gap);
}
const twig=through(px([80,33]),px([47,29]),px([26,59]));
const leaves = ([
 [[41,124],[120,47],[88,107]],
 [[41,124],[28,78]],
 [[41,124],[54,82],[43,98]],
 [[65,134],[123.3,108.8],[99,124]],
 [[37,111],[11,99],[23,110]],
] satisfies [V, V, V?][]).map(([root,tip,bow])=>orchidLeaf(px(root),px(tip),paper,bow&&px(bow)));
const rim=thickArc(px([70,70]),89.0,4.2,0,2*Math.PI);
const stalk=through(px([82,86]),px([85,58]),px([77,31]));
const join=onCircle(stalk.c,stalk.r,stalk.a0+(stalk.a1-stalk.a0)*.31);
const vines=[
 line(stalk,3.80),run([84,85],[94,61],[91,29],3.45),
 line(through(px([46,68]),px([62,56]),join),3.15),
 run([41,124],[72,111],[81,86],3.95),
 disc(px([41,124]),1.45),
];
const curlB=through(px([86,85]),px([96,84]),px([99,91]));
const curlA=through(px([79,90]),px([72,104]),px([60,102]));
const curl=[
 line(curlB,2.5),run([99,91],[95,94],[94.4,88.5],2.45),
 line(curlA,2.65),run([60,102],[60,97],[64,96],2.45),
];
const bud=pointedPetal(0,15,2.70);
export function ranNoMaruBuild(c: Builder): void {
 c.precision(5);
 c.group(()=>{
  fillPart(c,"frame",[rim],{k:1});
  layerParts(c,()=>{
   fillPart(c,motif,carve([...vines,line(twig,2.85), ...leaves.map(({outline})=>outline)],leaves.map(({midrib})=>midrib)),{k:1});
   for(const [t,turn,k] of [[.44,-48,.66],[.62,-52,.62],[.76,-54,.68],[.88,-144,.59]]){
    const a=twig.a0+(twig.a1-twig.a0)*t;
    fillPart(c,motif,[bud],{at:onCircle(twig.c,twig.r,a),turn,k});
   }
   fillPart(c,motif,carve(curl,[]),{k:1},paper);
   petals(c,[79,32],[[-104,29],[-54,25],[-20,34],[13,38],[34,28],[80,33]],1,paper);
   petals(c,[46,68],[[-55,25],[0,25],[58,23],[129,23],[200,20],[246,23]],.83,paper);
   petals(c,[83,87],[[-97,28],[-47,26],[32,31],[116,15],[159,30],[-139,14]],1,paper);
   const central=carve([pointedPetal(0,24,6.90)],[thickSeg([0,6],[0,20],paper)]);
   fillPart(c,motif,central,{at:px([81,94]),k:1,turn:22},paper);
  });
 });
}
