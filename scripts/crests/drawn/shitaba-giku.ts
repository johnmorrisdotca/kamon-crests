import type { Builder } from "../../construct/builder.ts";
import { carve, disc, thickSeg } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { pointedPetal } from "./kiku.ts";
import { fillPart, layerParts } from "./shitaba-giku-parts/layers.ts";
import { band, lowerChrysanthemumLeaf, point } from "./shitaba-giku-parts/lower-chrysanthemum-leaf.ts";

const paper = 1.15;
const motif = "chrysanthemum";
const radians = Math.PI / 180;

const under=[band(point([80,129]),point([59,110]),34,point([47,132]),3.15)];
const stem=point([71,131]),fork=point([71,65]);
function flower(c: Builder): void {
 const tips: {foot: V; tip: V; width: number}[] = [
  {foot:[61,51],tip:[22,25],width:8.8},{foot:[65,50],tip:[34,14],width:8.8},
  {foot:[68,50],tip:[54,7],width:8.2},{foot:[71,51],tip:[71,7],width:9.8},
 ];
 const rear: typeof tips = [
  {foot:[62,49],tip:[28,17],width:6.2},{foot:[66,48],tip:[44,9],width:6.2},
  {foot:[68,47],tip:[62,4],width:5.9},
 ];
 for(const [tier,parts] of [[0,rear],[1,tips]] as const){
  for(const {foot,tip,width} of parts){
   for(const mirror of tip[0]===71?[false]:[false,true]){
    const a=point(foot),b=point(tip),dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy);
    const p=pointedPetal(0,l,width);
    fillPart(c,motif,[p],{at:mirror?[-a[0],a[1]]:a,turn:(mirror?-1:1)*Math.atan2(dx,dy)/radians,k:1},tier?paper:0);
   }
  }
 }
}
export function shitabaGikuBuild(c: Builder): void {
 c.precision(3);
 c.group(()=>layerParts(c,()=>{
  fillPart(c,motif,under,{k:1});fillPart(c,motif,under,{k:1,mirror:true});
  lowerChrysanthemumLeaf.build(c, [0, 0], 0, 100, { motif, paper });
  lowerChrysanthemumLeaf.build(c, [0, 0], 0, 100, { motif, paper, mirror: true });
  fillPart(c,motif,carve([
   thickSeg(stem,fork,5.5),disc(fork,2.75),
   band(fork,point([57,50]),48,point([23,72]),3.3),
   band(fork,point([85,50]),48,point([119,72]),3.3),
   thickSeg(point([57,50]),point([85,50]),3.2),
   disc(point([57,50]),1.55),disc(point([85,50]),1.55),
  ],[]),{k:1},paper);
  flower(c);
 }, 5));
}
