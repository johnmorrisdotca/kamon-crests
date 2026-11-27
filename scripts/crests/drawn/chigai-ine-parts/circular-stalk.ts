import { shortArc, thickArc, thickSeg } from "../../../construct/compass.ts";
import type { Piece, Region, V } from "../../../construct/compass.ts";

type Arc = Extract<Piece, { t: "A" }>;

export function span(a: V, m: V, b: V): Arc {
 const x=b[0]-a[0],y=b[1]-a[1],d=Math.hypot(x,y),n=[-y/d,x/d];
 const q=[(a[0]+b[0])/2,(a[1]+b[1])/2],v=[m[0]-q[0],m[1]-q[1]];
 const h=(v[0]**2+v[1]**2-d*d/4)/(2*(v[0]*n[0]+v[1]*n[1]));
 const c: V=[q[0]+h*n[0],q[1]+h*n[1]];
 return shortArc({c,r:Math.hypot(a[0]-c[0],a[1]-c[1])},a,b) as Arc;
}
export function stalk(a: V, m: V, b: V, width: number): Region {
 const cross=(b[0]-a[0])*(m[1]-a[1])-(b[1]-a[1])*(m[0]-a[0]);
 if(Math.abs(cross)<1e-8)return thickSeg(a,b,width);
 const p=span(a,m,b);
 return thickArc(p.c,p.r,width,Math.min(p.a0,p.a1),Math.max(p.a0,p.a1));
}
