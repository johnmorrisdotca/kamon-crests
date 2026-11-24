// What the tests use to look inside a crest's SVG: its paths' coordinates, with no DOM.

/** The tags and attributes of a crest's SVG, as plain data. */
export interface Tag {
  name: string;
  attributes: Record<string, string>;
}

/** Every tag of an SVG string. Throws when the text is not well formed enough to read (an unquoted attribute, an unclosed tag). */
export const tagsOf = (svg: string): Tag[] => {
  const tags: Tag[] = [];
  const re = /<(\/?)([A-Za-z][\w-]*)((?:\s+[\w:-]+="[^"]*")*)\s*(\/?)>/g;
  let last = 0;
  const stack: string[] = [];
  for (let m = re.exec(svg); m !== null; m = re.exec(svg)) {
    const between = svg.slice(last, m.index);
    if (/[<>]/.test(between)) throw new Error(`unreadable markup near "${between.slice(0, 40)}"`);
    last = m.index + m[0].length;
    if (m[1] === "/") {
      if (stack.pop() !== m[2]) throw new Error(`</${m[2]}> closes nothing`);
      continue;
    }
    const attributes: Record<string, string> = {};
    for (const a of m[3].matchAll(/([\w:-]+)="([^"]*)"/g)) attributes[a[1]] = a[2];
    tags.push({ name: m[2], attributes });
    if (m[4] !== "/") stack.push(m[2]);
  }
  if (svg.slice(last).trim() !== "") throw new Error("text after the last tag");
  if (stack.length > 0) throw new Error(`<${stack[stack.length - 1]}> is never closed`);

  return tags;
};

/** The bounding box of the points and control points of some path data (the package writes relative lines, curves and arcs). */
export const boundsOf = (d: string): { x0: number; y0: number; x1: number; y1: number; points: number } => {
  const tokens = d.match(/[MmLlHhVvCcAaZz]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? [];
  let i = 0;
  let x = 0;
  let y = 0;
  let sx = 0;
  let sy = 0;
  let command = "";
  const box = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity, points: 0 };
  const take = (): number => {
    const n = Number(tokens[i]);
    i += 1;
    if (!Number.isFinite(n)) throw new Error(`not a number in ${d.slice(0, 60)}`);

    return n;
  };
  const mark = (px: number, py: number): void => {
    box.x0 = Math.min(box.x0, px);
    box.y0 = Math.min(box.y0, py);
    box.x1 = Math.max(box.x1, px);
    box.y1 = Math.max(box.y1, py);
    box.points += 1;
  };
  while (i < tokens.length) {
    if (/^[A-Za-z]$/.test(tokens[i])) {
      command = tokens[i];
      i += 1;
      if (command === "z" || command === "Z") {
        x = sx;
        y = sy;
        continue;
      }
    }
    const rel = command === command.toLowerCase();
    const ox = rel ? x : 0;
    const oy = rel ? y : 0;
    const k = command.toLowerCase();
    if (k === "m" || k === "l") {
      x = ox + take();
      y = oy + take();
      if (k === "m") {
        sx = x;
        sy = y;
        command = rel ? "l" : "L";
      }
      mark(x, y);
    } else if (k === "h") {
      x = ox + take();
      mark(x, y);
    } else if (k === "v") {
      y = oy + take();
      mark(x, y);
    } else if (k === "c") {
      mark(ox + take(), oy + take());
      mark(ox + take(), oy + take());
      x = ox + take();
      y = oy + take();
      mark(x, y);
    } else if (k === "a") {
      take();
      take();
      take();
      take();
      take();
      x = ox + take();
      y = oy + take();
      mark(x, y);
    } else throw new Error(`unknown path command ${command}`);
  }

  return box;
};
