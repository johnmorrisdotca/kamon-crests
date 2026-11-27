import type { Builder } from "../../construct/builder.ts";
import { arcA, carve, carveWhere, circleThrough, disc, inside, mirrored, moved, pieceEnd, reversedRun, rotated, seg, shortArc, thickArc, thickSeg } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { pointedPetal } from "./kiku.ts";
import { calyxCupOutline } from "./mitsuba-giku-parts/calyx-cup.ts";
import { fillPart } from "./mitsuba-giku-parts/layers.ts";

type Arc = Extract<Piece, { t: "A" }>;

const paper = 1.15;
const motif = "chrysanthemum";
const flip = ([x, y]: V): V =>[-x,y];
const turns=[0,120,240];
function band(a: V, b: V, r: number, hint: V, w: number): Region {
 const p=shortArc(circleThrough(a,b,r,hint),a,b) as Arc;
 return thickArc(p.c,p.r,w,Math.min(p.a0,p.a1),Math.max(p.a0,p.a1));
}
const petals: readonly [V, V, number][] = [
 [[0,57],[0,94],7.0],
 [[-9,54],[-20,92],7.4],
 [[-15,52],[-37,83],7.5],
 [[-23,51],[-52,73],7.8],
 [[-29,49],[-63,61],7.35],
 [[-33,49],[-69,49],6.60],
];
const side=band([-5.5,10.15],[-36,48],68,[-65,16],2.4);
const rim: V[] = [[0,57], [-9,54], [-15,52], [-23,51], [-29,49], [-36,48]];
const rimHalf = rim.slice(1).map((b,i) => thickSeg(rim[i],b,3.4));
const flowerSupport = carve([side,side.map(mirrored),...rimHalf,...rimHalf.map(edge=>edge.map(mirrored))],[]);
const shoulder: V[] = [
 [0,19],[8,25],[17,32],[22,40],[20,46],[10,44],
 [19,53],[21,62],[17,68],[11,69],[7,63],
 [9,73],[6,81],[0,86],
];
const slim = ([x, y]: V): V =>[x*.88,15+(y-15)*.925];
const profile=[...shoulder,...shoulder.slice(1,-1).reverse().map(flip)].map(slim);
const outline=profile.map((a,i)=>{
 const b=profile[(i+1)%profile.length];
 return shortArc(circleThrough(a,b,Math.hypot(a[0]-b[0],a[1]-b[1])*1.7,[0,47]),a,b);
});
const vein=[
 thickSeg(slim([0,20]),slim([0,80]),paper),
 ...([
  [[0,25],[15,38],[15,15],31],[[0,37],[18,56],[26,24],39],[[0,57],[6,73],[24,54],31],
  [[9,33],[10,40],[5,41],12],[[11,38],[16,40],[19,24],12],[[9,45],[12,55],[2,62],18],
  [[14,50],[16,60],[2,62],18],[[2.8,63],[4,70],[2,77],12],
 ] satisfies [V, V, V, number][]).flatMap(([a,b,hint,r])=>{
  const p=band(slim(a),slim(b),r,slim(hint),paper);
  return [p,p.map(mirrored)];
 }),
];
const blade=carveWhere([...outline,...vein.flat()],p=>inside(outline,p)&&!vein.some(region=>inside(region,p)));
const stalk=[thickSeg([0,10.95],[0,20.25],2.65),disc([0,20],1.3)];
function placedPetal(foot: V, tip: V, width: number, margin = 0): Region {
 const dx=tip[0]-foot[0], dy=tip[1]-foot[1], length=Math.hypot(dx,dy);
 const angle=Math.atan2(dx,dy);
 return pointedPetal(-margin,length+margin,width+margin).map(edge=>moved(rotated(edge,-angle),foot));
}
const fanPetals=petals.slice().reverse().flatMap(([foot,tip,width])=>
 (tip[0]===0?[[foot,tip]]:[[foot,tip],[flip(foot),flip(tip)]]).map(([a,b])=>({
  ink:placedPetal(a,b,width), paper:placedPetal(a,b,width,paper)
 })),
);
const drawnPetals=fanPetals.flatMap(({ink},index)=>carve([ink],fanPetals.slice(index+1).map(({paper})=>paper)));

const cupWidth=.40;
const cupAt=[0,51];
const cupPoint = ([x, y]: V): V =>[x*cupWidth+cupAt[0],y*cupWidth+cupAt[1]];
const cupHalf=calyxCupOutline.slice(0,3);
const mirroredCup=[...cupHalf,...reversedRun(cupHalf.map(mirrored))];
const calyx=mirroredCup.map(edge=>edge.t==="A"
 ? arcA(cupPoint(edge.c),edge.r*cupWidth,edge.a0,edge.a1)
 : seg(cupPoint(edge.a),cupPoint(edge.b)));
const calyxRim=calyx.flatMap(edge=>[
 edge.t==="A"?thickArc(edge.c,edge.r,2.25,Math.min(edge.a0,edge.a1),Math.max(edge.a0,edge.a1)):thickSeg(edge.a,edge.b,2.25),
 disc(pieceEnd(edge),1.125),
]);
const fan=carve([...drawnPetals,...flowerSupport],[calyx]);
const fanWithCalyx=carve([...fan,...calyxRim],[]);
export function mitsubaGikuBuild(c: Builder): void {
 c.precision(3);
 c.group(()=>{
  for(const turn of turns){
   fillPart(c,motif,fanWithCalyx,{k:1,turn});
   fillPart(c,motif,[...blade,...stalk],{k:1,turn:turn+60});
  }
  fillPart(c,motif,[disc([0,0],11.55),disc([0,0],9.7)],{k:1});
 });
}
