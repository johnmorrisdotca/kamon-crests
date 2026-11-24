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
