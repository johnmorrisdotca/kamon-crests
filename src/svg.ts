// The helpers on a crest's SVG string: colour, a background, a title, and `data:` URIs. Pure functions on strings: no DOM,
// no network, the same answer on a server and in a browser.

/**
 * What `paint()` and `toDataUri()` take.
 *
 * @example
 * ```ts
 * import type { PaintOptions } from "@johnmorrisdotca/kamon-crests";
 *
 * const gold: PaintOptions = { color: "#b8860b", background: "#1b1b1b", title: "Tokugawa hollyhock" };
 * console.log(gold.color);
 * ```
 */
export interface PaintOptions {
  /** A CSS colour for the crest. Left out, the crest is drawn in the page's text colour (`currentColor`). Letters, digits, `#`, `.`, `%`, `,`, `(`, `)`, `-` and spaces only. */
  color?: string;
  /** A CSS colour for a square behind the crest; left out, there is none. */
  background?: string;
  /** Text for screen readers: the SVG gets `role="img"` and this as its title. */
  title?: string;
}

/** A thing was not a string. */
export const mustBeString = (value: unknown, name: string): string => {
  if (typeof value !== "string") throw new TypeError(`${name} must be a string`);

  return value;
};

const COLOR = /^[#A-Za-z0-9.%,() -]{1,64}$/;

const checked = (value: unknown, name: string): string => {
  const text = mustBeString(value, name);
  if (!COLOR.test(text)) throw new TypeError(`${name} must be a CSS colour such as "#b8860b", "rgb(0 0 0)" or "gold"`);

  return text;
};

const escapeText = (text: string): string => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * A crest's SVG in a colour, on a background, with a title.
 *
 * @param svg - A crest's SVG string (a module's default export).
 * @param options - `color`, `background` and `title`; the crest as it is when left out.
 * @returns The SVG with its `currentColor` replaced, a square of the background colour behind it, and a `<title>` with `role="img"`.
 * @throws TypeError when `svg` is not a string, or a colour is not a plain CSS colour.
 *
 * @example
 * ```ts
 * import crest from "@johnmorrisdotca/kamon-crests/crests/mitsuba-aoi";
 * import { paint } from "@johnmorrisdotca/kamon-crests";
 *
 * const gold = paint(crest, { color: "#b8860b", background: "#1b1b1b", title: "Three hollyhock leaves" });
 * console.log(gold.includes("#b8860b")); // true
 * ```
 */
export const paint = (svg: string, options: PaintOptions = {}): string => {
  let out = mustBeString(svg, "svg");
  if (options.color !== undefined) out = out.replace(/currentColor/g, checked(options.color, "color"));
  const open = out.indexOf(">") + 1;
  let inside = "";
  if (options.background !== undefined) inside += `<rect width="200" height="200" fill="${checked(options.background, "background")}"/>`;
  if (options.title !== undefined) inside = `<title>${escapeText(mustBeString(options.title, "title"))}</title>${inside}`;
  if (inside !== "") out = `${out.slice(0, open)}${inside}${out.slice(open)}`;
  if (options.title !== undefined) out = out.replace("<svg ", '<svg role="img" ');

  return out;
};

/**
 * A crest as a `data:` URI, ready for an `<img src>` or a CSS `url()`. An `<img>` cannot see the page's text colour, so a
 * crest drawn in `currentColor` is black there unless `color` says otherwise.
 *
 * @param svg - A crest's SVG string.
 * @param options - As for `paint()`.
 * @returns `data:image/svg+xml,…`.
 * @throws TypeError, as `paint()` does.
 *
 * @example
 * ```ts
 * import crest from "@johnmorrisdotca/kamon-crests/crests/janome";
 * import { toDataUri } from "@johnmorrisdotca/kamon-crests";
 *
 * console.log(toDataUri(crest, { color: "#222" }).startsWith("data:image/svg+xml,")); // true
 * ```
 */
export const toDataUri = (svg: string, options: PaintOptions = {}): string => `data:image/svg+xml,${encodeURIComponent(paint(svg, options)).replace(/%20/g, " ").replace(/%3D/g, "=").replace(/%3A/g, ":").replace(/%2F/g, "/").replace(/%22/g, "'")}`;
