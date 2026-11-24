// Shapes that more than one crest is made of: petals, hearts, scalloped leaves, lobed flowers.
import { CX, CY, Path, curveThrough, flipX, lens, polar, turn } from "./geo.ts";
import type { Pt } from "./geo.ts";

/** `n` paths, one for each place round the circle: `make` is given the clock angle of its place and its number. */
export const around = (n: number, make: (angle: number, i: number) => Path, a0 = 0): Path[] => Array.from({ length: n }, (_, i) => make(a0 + (360 * i) / n, i));

/**
 * A heart with its point at the origin of `tip` and its notch `length` away along clock angle `deg`: two round lobes
 * `width` across the widest, the notch `dent` deep. Katabami's leaflets, a hollyhock's base, a ginkgo's fan are all one of these.
 */
export const heart = (tip: Pt, deg: number, length: number, width: number, dent = 0.14): Path => {
  const L = length;
  const w = width / 2;
  const at = (x: number, y: number): Pt => turn([tip[0] + x, tip[1] - y], deg, tip);
  const notch = L * (1 - dent);
  const p = new Path().M(at(0, 0));
  p.C(at(-w * 0.35, L * 0.12), at(-w * 1.18, L * 0.5), at(-w * 0.82, L * 0.86));
  p.C(at(-w * 0.55, L * 1.04), at(-w * 0.12, L * 1.02), at(0, notch));
  p.C(at(w * 0.12, L * 1.02), at(w * 0.55, L * 1.04), at(w * 0.82, L * 0.86));
  p.C(at(w * 1.18, L * 0.5), at(w * 0.35, L * 0.12), at(0, 0));
  p.Z();

  return p;
};

/**
 * A leaf drawn from its outline in polar form about the point `origin`: `profile` lists the radius (as a fraction of
 * `length`) at angles from the tip (0) round to the back (180), and `bumps` scallops are cut along each side. The result
 * is the left and right sides, smoothed through many points, as one closed shape.
 */
export const scallopedLeaf = (origin: Pt, deg: number, length: number, profile: [number, number][], bumps: number, depth: number): Path => {
  const radiusAt = (a: number): number => {
    // piecewise cubic (smoothstep) between the listed angles
    for (let i = 0; i < profile.length - 1; i += 1) {
      const [a0, r0] = profile[i];
      const [a1, r1] = profile[i + 1];
      if (a >= a0 && a <= a1) {
        const t = (a - a0) / (a1 - a0);
        const s = t * t * (3 - 2 * t);

        return r0 + (r1 - r0) * s;
      }
    }

    return profile[profile.length - 1][1];
  };
  const per = 8;
  const steps = bumps * per;
  const side = (sign: number): Pt[] =>
    Array.from({ length: steps + 1 }, (_, i) => {
      const a = (180 * i) / steps;
      const u = (i % per) / per;
      const edge = a < 3 || a > 177 ? 0 : 1;

      return polar(length * radiusAt(a) * (1 + edge * depth * (Math.sin(Math.PI * u) - 0.6)), deg + sign * a, origin);
    });
  const left = side(-1);
  const right = side(1);
  // Down the left side from the tip to the notch, and back up the right: a point at each end, a curve between.
  const path = new Path().M(left[0]);
  curveThrough(path, left);
  curveThrough(path, right.slice().reverse());
  path.Z();

  return path;
};

/** A round-ended petal pointing along clock angle `deg` from `from` to `to`, `width` across. */
export const petal = (from: Pt, to: Pt, width: number): Path => lens(from, to, width / Math.hypot(to[0] - from[0], to[1] - from[1]) / 2);

export { CX, CY, flipX };

/** The radius, as a fraction of a leaf's length, at an angle from its tip, given the listed (angle, radius) points joined smoothly. */
export const profileRadius =
  (profile: [number, number][]) =>
  (a: number): number => {
    for (let i = 0; i < profile.length - 1; i += 1) {
      const [a0, r0] = profile[i];
      const [a1, r1] = profile[i + 1];
      if (a >= a0 && a <= a1) {
        const t = (a - a0) / (a1 - a0);

        return r0 + (r1 - r0) * t * t * (3 - 2 * t);
      }
    }

    return profile[profile.length - 1][1];
  };

/**
 * The veins of a leaf as slits: a midrib from the stem toward the tip, and on each side `n` veins that leave it at stations along its length
 * heading outward and curve forward to near the edge. `reach(a)` is the leaf's edge, as a fraction of `length`, at angle `a` from the tip;
 * the veins stop at `inset` of the way to it. The veins nearest the stem end at `fromAngle` from the axis, those nearest the tip at `toAngle`.
 */
export const herringbone = (origin: Pt, deg: number, length: number, reach: (a: number) => number, n: number, fromAngle: number, toAngle: number, w: number, inset = 0.86, ribEnd = 0.9, ribStart = 0.12): Path[] => {
  const rad = (deg * Math.PI) / 180;
  const unit: Pt = [Math.sin(rad), -Math.cos(rad)];
  const perp: Pt = [Math.cos(rad), Math.sin(rad)];
  const at = (a: number, b: number, sign: number): Pt => [origin[0] + unit[0] * a + perp[0] * b * sign, origin[1] + unit[1] * a + perp[1] * b * sign];
  const cuts: Path[] = [slit([at(length * ribStart, 0, 1), at(length * (ribStart + ribEnd) * 0.5, 0, 1), at(length * ribEnd, 0, 1)], w)];
  for (let k = 0; k < n; k += 1) {
    const u = n === 1 ? 0.5 : k / (n - 1);
    const d = length * (0.2 + 0.46 * u);
    // Where the vein ends: a way on along the leaf, at the edge there (found by scanning the outline).
    const target = Math.min(length * 0.86, d + length * (fromAngle / 100) * (1 - 0.35 * u));
    let best = 0;
    let bestGap = Infinity;
    for (let a = 0; a <= 120; a += 1) {
      const along = length * reach(a) * Math.cos((a * Math.PI) / 180);
      if (Math.abs(along - target) < bestGap) {
        bestGap = Math.abs(along - target);
        best = a;
      }
    }
    const ea = target;
    const eb = length * reach(best) * Math.sin((best * Math.PI) / 180) * inset;
    void toAngle;
    for (const sign of [-1, 1]) cuts.push(slit([at(d, 0, sign), at(d + 0.3 * (ea - d), 0.8 * eb, sign), at(ea, eb, sign)], w));
  }

  // Veins into the lobes beside the stem: out from the midrib's foot and round, backward.
  for (const a of [92, 124]) {
    const r = length * reach(a) * 0.8;
    const ea = r * Math.cos((a * Math.PI) / 180);
    const eb = r * Math.sin((a * Math.PI) / 180);
    for (const sign of [-1, 1]) cuts.push(slit([at(length * 0.14, 0, sign), at(length * 0.14 + 0.5 * (ea - length * 0.14), 0.55 * eb, sign), at(ea, eb, sign)], w));
  }

  return cuts;
};

/**
 * A thin white line cut into a shape: a closed sliver that follows the curve through `points`, `w` wide at its widest and
 * tapering to nothing at both ends, so that it is a hole wholly inside the shape (even-odd).
 */
export const slit = (points: Pt[], w: number, taper = 0.2): Path => {
  const n = points.length;
  const left: Pt[] = [];
  const right: Pt[] = [];
  for (let i = 0; i < n; i += 1) {
    const a = points[Math.max(0, i - 1)];
    const b = points[Math.min(n - 1, i + 1)];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const nx = -(b[1] - a[1]) / len;
    const ny = (b[0] - a[0]) / len;
    const t = i / (n - 1);
    const half = (w / 2) * Math.pow(Math.min(1, t / taper, (1 - t) / taper), 0.6);
    left.push([points[i][0] + nx * half, points[i][1] + ny * half]);
    right.push([points[i][0] - nx * half, points[i][1] - ny * half]);
  }
  const path = new Path().M(left[0]);
  curveThrough(path, left);
  curveThrough(path, right.slice().reverse());

  return path.Z();
};

/** A smooth closed outline through the right half's points, mirrored about the vertical line through `x`: the closed path and all its points. */
export const symmetricOutline = (right: Pt[], x: number): { outline: Path; points: Pt[] } => {
  const left: Pt[] = right.slice(1, -1).reverse().map((p): Pt => [2 * x - p[0], p[1]]);
  const points = [...right, ...left];
  const path = new Path().M(points[0]);
  curveThrough(path, [...points, points[0]]);
  path.Z();

  return { outline: path, points };
};
