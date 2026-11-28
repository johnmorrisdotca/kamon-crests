// A wide ring about the centre, from frame 15 of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { C0, R, circle } from "../../construct/geo.ts";

export const janomeWaBuild = (c: Builder): void => {
  const inner = 43.2;
  c.guideCircle(C0, R);
  c.guideCircle(C0, inner);
  c.fill("plain-ring", circle(C0, R).join(circle(C0, inner)), "evenodd");
};
