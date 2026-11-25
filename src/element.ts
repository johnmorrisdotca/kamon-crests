// The entry @johnmorrisdotca/kamon-crests/element: <kamon-crest>, a crest as a custom element, for a page with no
// framework and for one with any:
//
//     <kamon-crest crest="mitsuba-aoi" size="96"></kamon-crest>
//     <kamon-crest crest="maru-ni-juji" size="160" animate loop color="#8a1c1c"></kamon-crest>
//
// `defineCrest()` registers it; importing @johnmorrisdotca/kamon-crests/element/define (dist/element-define.js on a CDN)
// does that by itself, which is all a script tag needs. The crest is drawn in the page's own document, with no shadow
// root, so the page's CSS sizes and colours it like any inline element: it is drawn in the text colour (`currentColor`),
// so `color: #8a1c1c` on it or on a parent paints the crest. Importing this file where there is no browser does nothing
// and throws nothing.

import { crestName } from "./names.js";
import { crest, crestSteps } from "./load.js";
import type { Host } from "./element-controls.js";
import type { Construction, Exit } from "./render.js";

/**
 * The exits a looping crest can take, for its `exit` attribute (the same as `EXITS` in /animate, kept here so the element does
 * not load it to know them).
 *
 * @example
 * ```ts
 * import { EXIT_NAMES } from "@johnmorrisdotca/kamon-crests/element";
 *
 * console.log(EXIT_NAMES.length); // 6
 * ```
 */
export const EXIT_NAMES: readonly Exit[] = ["fade", "scatter", "spin", "twirl", "fall", "close"];

/**
 * The attributes `<kamon-crest>` reads. Changing any draws it afresh.
 *
 * - `crest`: the crest's id, loosely written ("mitsuba-aoi", "Mitsuba Aoi"). (Not `id`, which a page may use once only.)
 * - `size`: small, medium or large (32, 96 or 192 pixels), or a number of pixels. Left out, it is `1em`, the size of the text around it; the page's CSS may set any size.
 * - `animate`: draw the crest as it is constructed: the layout guides, each shape traced and filled in, the guides rubbed out. Left out, the finished crest. Where the reader asks for less motion, the finished crest is shown at once.
 * - `speed`: how fast the animation plays; 1 is the usual pace, 2 twice as fast.
 * - `loop`: play again, after a pause, until the page is closed.
 * - `exit`: with `loop`, how the finished crest leaves before it is drawn again, after a two-second pause: `on` (or `random`) picks one of `fade`, `scatter`, `spin`, `twirl`, `fall` and `close` at random each time round, or name one of them. Left out or `off`, the finished crest is held a moment and drawn again.
 * - `invert`: `on` swaps the colours, as a crest is often shown on cloth: the crest in the page's colour (the `--kamon-paper` custom property, else the page's own background), cut out of a solid disc in the crest's colour. The widths key keeps the crest's colour.
 * - `guides`: `off` leaves the layout guides out of the animation.
 * - `widths-key`: `on` adds the widths key (a ruler standing upright in a narrow margin beside the crest, marking the width the compass is set to, so the element's box is a little wider); `below` puts it under the crest instead (the box is taller). Left out, there is none. Read on the element or on anything it is in; set on the element, a change draws the animation again from where it is, not from the start.
 * - `ink-draw`: `on` has the pen draw every outline along its length over a few seconds; left out, the ink fades in quickly (changing it draws again from where it is).
 * - `full-build`: `on` builds every place a motif is turned or mirrored to as the first was, one place after another, clockwise (the steps grow by them; see `fullBuilt`). Left out, a place is built in one quick step.
 * - `replay`: `off` stops a click or a press of Enter replaying the animation (it replays by default when `animate` is set).
 * - `controls`: shows play and pause, step back and step forward, a scrubber across the steps, and the step's caption, under the crest.
 * - `color`: a CSS colour for the crest; left out, the text colour.
 * - `background`: a CSS colour for a square behind the crest.
 * - `label`: what a screen reader says. Left out, the crest's name, in English or Japanese by `lang`.
 * - `lang`: `en` or `ja`, the language of the name read out. Left out, the page's language where the element is.
 * - `loading`: `lazy` (the default: loaded when it comes near the screen) or `eager`.
 *
 * @example
 * ```ts
 * import { CREST_ELEMENT_ATTRIBUTES } from "@johnmorrisdotca/kamon-crests/element";
 *
 * console.log(CREST_ELEMENT_ATTRIBUTES.includes("animate")); // true
 * ```
 */
export const CREST_ELEMENT_ATTRIBUTES = ["crest", "size", "animate", "speed", "loop", "exit", "invert", "guides", "replay", "controls", "color", "background", "label", "lang", "loading"] as const;

/**
 * The name the element is registered under.
 *
 * @example
 * ```ts no-run
 * import { CREST_ELEMENT_NAME } from "@johnmorrisdotca/kamon-crests/element";
 *
 * console.log(document.createElement(CREST_ELEMENT_NAME)); // <kamon-crest>
 * ```
 */
export const CREST_ELEMENT_NAME = "kamon-crest";

/**
 * What `<kamon-crest>` adds to an ordinary element. Every attribute is also a property that writes it, as React, Vue
 * and Svelte set them; `animate`, `loop` and `replay` read as booleans. `ready` settles when the crest is drawn, or
 * found to be none (it is then `false`). `play()` draws the construction again from the start, or goes on from where it was
 * paused; `finished` settles when it ends. `pause()` holds it, and `step(n)` holds it at the end of step `n`.
 * `isolate(part)` shows one part alone, the rest of the crest faint, and `clear()` shows the whole crest again.
 *
 * @example
 * ```ts no-run
 * import "@johnmorrisdotca/kamon-crests/element/define";
 * import type { KamonCrestElement } from "@johnmorrisdotca/kamon-crests/element";
 *
 * const aoi = document.createElement("kamon-crest") as KamonCrestElement;
 * aoi.crest = "mitsuba-aoi";
 * aoi.size = 160;
 * document.body.append(aoi);
 * console.log(await aoi.ready); // true once drawn
 * await aoi.play();             // draw it again, step by step
 * await aoi.step(3);             // hold it with the first four steps done
 * console.log(aoi.at, aoi.paused); // 3 true
 * await aoi.isolate("hollyhock", "count"); // one leaf alone, with its guides
 * await aoi.clear();
 * ```
 */
export type KamonCrestElement = HTMLElement & {
  get crest(): string | null;
  set crest(value: string | null | undefined);
  get size(): string | null;
  set size(value: string | number | null | undefined);
  get animate(): boolean;
  set animate(value: boolean | string | null | undefined);
  get speed(): string | null;
  set speed(value: string | number | null | undefined);
  get loop(): boolean;
  set loop(value: boolean | string | null | undefined);
  get exit(): string | null;
  set exit(value: string | null | undefined);
  get invert(): string | null;
  set invert(value: string | null | undefined);
  get guides(): string | null;
  set guides(value: string | null | undefined);
  get replay(): string | null;
  set replay(value: string | null | undefined);
  get controls(): boolean;
  set controls(value: boolean | string | null | undefined);
  get color(): string | null;
  set color(value: string | null | undefined);
  get background(): string | null;
  set background(value: string | null | undefined);
  get label(): string | null;
  set label(value: string | null | undefined);
  get lang(): string;
  set lang(value: string | null | undefined);
  get loading(): string | null;
  set loading(value: string | null | undefined);
  /** Settles when the crest is drawn (`true`) or there is no crest for the id (`false`). */
  readonly ready: Promise<boolean>;
  /** Settles when the construction animation ends (at once if there is none). */
  readonly finished: Promise<void>;
  /** Draws the construction again from the start, or goes on from where it is paused; resolves when it ends. */
  play(): Promise<void>;
  /** Holds the animation where it is. */
  pause(): void;
  /** Holds the drawing with steps 0 to `n` done (-1 is the empty page); resolves to the step it landed on, or -1 with no crest. */
  step(n: number): Promise<number>;
  /**
   * Shows one part alone, held still: its shapes at full strength, the rest of the crest faint, and its own guides. `part` is "frame"
   * or a motif's id; `show` is `count` for one of the motif (its turn is the next step) or `arrangement` for the lines it is turned
   * about and mirrored in. Until `clear()`, `play()`, `step()` and the controls draw only that part's steps. Resolves to the step it is held at.
   */
  isolate(part: string, show?: "count" | "arrangement"): Promise<number>;
  /** Shows the whole crest again, finished; resolves to its last step. */
  clear(): Promise<number>;
  /** The index of the step the drawing is at: -1 before the first, or when nothing is animated. */
  readonly at: number;
  /** Whether the animation is held, by `pause()` or `step()`. */
  readonly paused: boolean;
};

/**
 * What `kamon-load`, `kamon-end`, `kamon-error`, `kamon-play`, `kamon-pause` and `kamon-step` carry in `detail`: the id as
 * asked; for an error why nothing was drawn; and for `kamon-pause` and `kamon-step` the step the drawing is held at.
 *
 * @example
 * ```ts no-run
 * import type { CrestElementEventDetail } from "@johnmorrisdotca/kamon-crests/element";
 *
 * document.addEventListener("kamon-error", (event) => {
 *   const { crest, reason } = (event as CustomEvent<CrestElementEventDetail>).detail;
 *   console.log(crest, reason);
 * });
 * ```
 */
export interface CrestElementEventDetail {
  /** The id, as the `crest` attribute has it. */
  crest: string;
  /** For `kamon-error`: why nothing was drawn. */
  reason?: string;
  /** For `kamon-pause` and `kamon-step`: the index of the step the drawing is held at (-1 before the first). */
  step?: number;
  /** For `kamon-pause` and `kamon-step`: how many steps the construction has. */
  steps?: number;
}

const SIZES: Record<string, number> = { small: 32, medium: 96, large: 192 };
const BASE_CSS = `${CREST_ELEMENT_NAME}{display:inline-block;width:1em;height:1em;vertical-align:-0.125em;line-height:0;box-sizing:border-box}${CREST_ELEMENT_NAME}[data-key]{width:calc(var(--kamon-w) * 1em);height:calc(var(--kamon-h) * 1em)}${CREST_ELEMENT_NAME}>svg{display:block;width:100%;height:100%}${CREST_ELEMENT_NAME}[data-animate]:not([replay=off]){cursor:pointer}`;
const warned = new Set<string>();
let made: CustomElementConstructor | null = null;
let counter = 0;

const languageOf = (element: HTMLElement): "en" | "ja" => {
  const tag = element.getAttribute("lang") || element.closest("[lang]")?.getAttribute("lang") || document.documentElement.lang || "en";

  return /^ja\b/i.test(tag) ? "ja" : "en";
};

const build = (): CustomElementConstructor => {
  const element = class KamonCrest extends HTMLElement {
    static observedAttributes = [...CREST_ELEMENT_ATTRIBUTES, "widths-key", "ink-draw", "full-build"];
    private drawing = 0;
    private watcher: IntersectionObserver | null = null;
    private timer: ReturnType<typeof setTimeout> | null = null;
    private settle: ((drawn: boolean) => void) | null = null;
    private done: (() => void) | null = null;
    private construction: Construction | null = null;
    private tools: typeof import("./animate.js") | null = null;
    private ticker: ReturnType<typeof setInterval> | null = null;
    // Where the animation is: the moment its second 0 was (or would have been), and, while held, the second it is held at.
    private began = 0;
    private held: number | null = null;
    private stepped: number | null = null;
    private from: (() => number) | null = null;
    private alone: [string, ("count" | "arrangement")?] | null = null;
    private px = 0;
    ready: Promise<boolean> = new Promise((resolve) => (this.settle = resolve));
    finished: Promise<void> = Promise.resolve();

    connectedCallback(): void {
      const root = this.getRootNode();
      const into = root.nodeType === 11 && "host" in root ? (root as ShadowRoot) : this.ownerDocument.head;
      const id = `${this.localName}-style`;
      if (into.querySelector(`#${CSS.escape(id)}`) === null) {
        const selector = CSS.escape(this.localName);
        const css = BASE_CSS.replaceAll(CREST_ELEMENT_NAME, selector);
        into.prepend(Object.assign(this.ownerDocument.createElement("style"), { id, textContent: css }));
      }
      this.addEventListener("click", this.onReplay);
      this.addEventListener("keydown", this.onKey);
      this.draw();
    }

    disconnectedCallback(): void {
      this.watcher?.disconnect();
      this.watcher = null;
      if (this.timer !== null) clearTimeout(this.timer);
      if (this.ticker !== null) clearInterval(this.ticker);
      this.removeEventListener("click", this.onReplay);
      this.removeEventListener("keydown", this.onKey);
    }

    attributeChangedCallback(name: string): void {
      if (name === "crest") this.alone = null;
      if (!this.isConnected) return;
      // The switches that change the drawing's size or pace take it on where it is; the build of the places, from the start.
      if (name === "invert") return void this.inverted();
      if (name === "widths-key" || name === "ink-draw" || name === "exit") {
        if (this.construction === null) return;
        if (this.stepped !== null) void this.step(this.stepped);
        else if (this.held !== null) void this.step(this.at);
        else this.draw(true, Math.min(this.second, this.tools!.durationOf(this.construction)));
      } else if (name !== "full-build" || this.construction !== null) this.draw();
    }

    /**
     * With `invert="on"`, the drawing on a disc of the crest's colour, the crest itself in the paper's: everything but the styles
     * and the widths key goes in a group coloured by `--kamon-paper` (else the page's background), over the disc. Off, as drawn.
     */
    private inverted(): void {
      const svg = this.querySelector<SVGSVGElement>(":scope > svg");
      if (svg === null) return;
      const on = this.getAttribute("invert") === "on";
      const group = svg.querySelector<SVGGElement>(":scope > g[data-paper]");
      if (on === (group !== null)) return;
      if (!on) {
        svg.querySelector(":scope > circle[data-disc]")?.remove();
        group!.replaceWith(...Array.from(group!.childNodes));
        return;
      }
      const make = (name: string): SVGElement => document.createElementNS("http://www.w3.org/2000/svg", name);
      const disc = make("circle");
      for (const [name, value] of [["data-disc", ""], ["cx", "100"], ["cy", "100"], ["r", "100"], ["fill", "currentColor"]]) disc.setAttribute(name, value);
      const paper = make("g");
      paper.setAttribute("data-paper", "");
      paper.style.color = "var(--kamon-paper, Canvas)";
      paper.append(...Array.from(svg.childNodes).filter((node) => !(node instanceof Element && (node.localName === "style" || node.matches("g[font-size]")))));
      svg.prepend(disc, paper);
      const style = svg.querySelector(":scope > style");
      if (style !== null) svg.prepend(style);
    }

    /** How a looping crest leaves: one exit by name, `true` for one at random each time round, or none. */
    private exiting(): Exit | true | undefined {
      const value = this.getAttribute("exit");
      if (!this.hasAttribute("loop") || value === null || value === "off") return undefined;

      return (EXIT_NAMES as readonly string[]).includes(value) ? (value as Exit) : true;
    }

    /** Each time round, a new exit at random, never the one just seen (the groups that move all start again together). */
    private shuffle(svg: SVGSVGElement): void {
      let last = 0;
      const pick = (): void => {
        const others = EXIT_NAMES.filter((name) => name !== svg.dataset.exit);
        svg.dataset.exit = others[Math.floor(Math.random() * others.length)];
      };
      pick();
      svg.addEventListener("animationiteration", () => {
        if (performance.now() - last > 500) pick();
        last = performance.now();
      });
    }

    /** What an option attribute says, on this element or on anything it is in. */
    private option(name: string): string | null {
      return this.closest(`[${name}]`)?.getAttribute(name) ?? null;
    }

    /** Where the widths key stands: to the right of the crest, below it, or nowhere. */
    private keyed(): false | "right" | "below" {
      const mode = this.option("widths-key");

      return mode === "below" ? "below" : mode === "on" || mode === "right" ? "right" : false;
    }

    private onReplay = (event: Event): void => {
      const control = (event.target as Element).closest(".kamon-controls button");
      if (control !== null) this.press(control.getAttribute("data-do") ?? "");
      else if ((event.target as Element).closest(".kamon-controls") === null && this.hasAttribute("animate") && this.getAttribute("replay") !== "off") {
        this.held = null;
        void this.play();
      }
    };

    // Space holds it or lets it go on, the arrows step, and Enter draws it again. The controls' own keys are theirs.
    private onKey = (event: KeyboardEvent): void => {
      const act = { " ": "toggle", ArrowLeft: "back", ArrowRight: "forward", Enter: "again" }[event.key];
      if (act === undefined || !this.hasAttribute("animate") || (event.target as Element).closest(".kamon-controls") !== null || (act === "again" && this.getAttribute("replay") === "off")) return;
      this.press(act);
      event.preventDefault();
    };

    private press(act: string): void {
      void import("./element-controls.js").then((more) => more.press(this as unknown as Host, act));
    }

    private get pace(): number {
      const speed = Number(this.getAttribute("speed"));

      return speed > 0 ? speed : 1;
    }

    /** The seconds into the animation, at speed 1. */
    private get second(): number {
      if (this.held !== null) return this.held;
      if (this.construction === null || this.tools === null) return Infinity;
      const t = ((performance.now() - this.began) / 1000) * this.pace;

      return this.hasAttribute("loop") ? t % this.tools.loopSeconds(this.construction, this.exiting() !== undefined) : t;
    }

    get at(): number {
      if (this.stepped !== null) return this.stepped;
      if (this.construction === null || this.tools === null) return -1;

      return this.tools.stepAt(this.construction, this.second);
    }

    get paused(): boolean {
      return this.held !== null;
    }

    private emit(name: string, detail: CrestElementEventDetail): void {
      this.dispatchEvent(new CustomEvent<CrestElementEventDetail>(name, { detail, bubbles: true, composed: true }));
    }

    private say(name: "kamon-play" | "kamon-pause" | "kamon-step"): void {
      this.emit(name, { crest: (this.getAttribute("crest") ?? "").trim(), ...(name === "kamon-play" ? {} : { step: this.at, steps: this.construction?.steps.length ?? 0 }) });
    }

    play(): Promise<void> {
      // From where it is held: the second it was paused at, or the start of the step after the one it was stepped to.
      const from = this.held === null ? 0 : (this.from?.() ?? this.held);
      this.draw(true, from);
      this.say("kamon-play");

      return this.finished;
    }

    pause(): void {
      if (this.paused || this.construction === null || this.tools === null) return;
      this.held = Math.min(this.second, this.tools.durationOf(this.construction));
      if (this.timer !== null) clearTimeout(this.timer);
      this.querySelector<SVGElement>(":scope > svg")?.style.setProperty("--kamon-play", "paused");
      this.bar();
      this.say("kamon-pause");
    }

    isolate(part: string, show?: "count" | "arrangement"): Promise<number> {
      this.alone = [part, show];

      return this.step(NaN);
    }

    clear(): Promise<number> {
      this.alone = null;

      return this.step(Infinity);
    }

    private seen(whole: Construction | null, tools: typeof import("./animate.js")): Construction | null {
      const one = whole === null || this.alone === null ? whole : tools.isolated(whole, ...this.alone);
      const built = one !== null && this.option("full-build") === "on" ? tools.fullBuilt(one) : one;

      return built !== null && this.option("ink-draw") === "on" ? { ...built, inkDraw: true } : built;
    }

    // NaN is the step a part shown alone rests at.
    async step(n: number): Promise<number> {
      const turn = ++this.drawing;
      // At once, so that a second key pressed before this one lands steps on from it.
      if (this.construction !== null && n === n) this.stepped = Math.max(-1, Math.min(this.construction.steps.length - 1, Math.round(n)));

      return (await import("./element-controls.js")).step(this as unknown as Host, n, turn);
    }

    /** Puts the drawing in, leaving the controls where they are. */
    private show(svg: string): void {
      const background = this.getAttribute("background");
      this.querySelector(":scope > svg")?.remove();
      // The SVG is the package's own: its crests and animation are written by the build, never from the page.
      this.insertAdjacentHTML("afterbegin", background !== null && /^[#A-Za-z0-9.%,() -]{1,64}$/.test(background) ? svg.replace(/>/, `><rect width="200" height="200" fill="${background}"/>`) : svg);
      this.removeAttribute("data-missing");
      const drawn = this.querySelector<SVGSVGElement>(":scope > svg");
      // The drawing is a picture: a drag or a long press across it selects none of its numbers.
      drawn?.style.setProperty("-webkit-user-select", "none");
      drawn?.style.setProperty("user-select", "none");
      if (drawn !== null && drawn.dataset.exit !== undefined && this.exiting() === true) this.shuffle(drawn);
      this.inverted();
      // The widths key widens the drawing's box to the right of the crest's square, or lengthens it below: the box grows with it, so the crest keeps its size.
      const box = /viewBox="0 0 (\d+) (\d+)"/.exec(svg);
      const [w, h] = box === null ? [200, 200] : [Number(box[1]) / 200, Number(box[2]) / 200];
      this.toggleAttribute("data-key", w !== 1 || h !== 1);
      this.style.setProperty("--kamon-w", String(w));
      this.style.setProperty("--kamon-h", String(h));
      if (this.px > 0) [this.style.width, this.style.height] = [`${this.px * w}px`, `${this.px * h}px`];
      this.bar();
    }

    // The controls' code is loaded when first wanted.
    private bar(): void {
      if (this.hasAttribute("controls") && this.construction !== null) return void import("./element-controls.js").then((more) => more.bar(this as unknown as Host, languageOf(this)));
      if (this.ticker !== null) clearInterval(this.ticker);
      this.ticker = null;
      this.querySelector(":scope > .kamon-controls")?.remove();
      this.setAttribute("role", "img");
    }

    private finish(drawn: boolean): void {
      this.settle?.(drawn);
      this.settle = null;
    }

    private missing(crest: string, reason: string, quiet = false): void {
      this.replaceChildren();
      this.setAttribute("data-missing", "");
      if (!quiet && !warned.has(`${crest}|${reason}`)) {
        warned.add(`${crest}|${reason}`);
        console.warn(`<kamon-crest>: ${reason}`);
      }
      this.emit("kamon-error", { crest, reason });
      this.finish(false);
    }

    private draw(force = false, from = 0): void {
      const turn = ++this.drawing;
      this.watcher?.disconnect();
      this.watcher = null;
      if (this.timer !== null) clearTimeout(this.timer);
      this.held = null;
      this.stepped = null;
      if (this.settle === null) this.ready = new Promise((resolve) => (this.settle = resolve));
      const crestId = (this.getAttribute("crest") ?? this.getAttribute("data-crest") ?? "").trim();
      const sizeText = this.getAttribute("size") ?? "";
      const size = Object.hasOwn(SIZES, sizeText) ? SIZES[sizeText] : Number(sizeText);
      this.px = size > 0 && size < Infinity ? size : 0;
      this.style.width = this.style.height = this.px > 0 ? `${size}px` : "";
      const color = this.getAttribute("color");
      // The colour attribute is the element's to set only when it is there (or was): a page's own `color` is left alone.
      if (color !== null || this.hasAttribute("data-own-color")) {
        this.style.color = color !== null && /^[#A-Za-z0-9.%,() -]{1,64}$/.test(color) ? color : "";
        this.toggleAttribute("data-own-color", color !== null);
      }
      if (!this.hasAttribute("controls")) this.setAttribute("role", "img");
      this.toggleAttribute("data-animate", this.hasAttribute("animate"));
      if (this.hasAttribute("animate") && this.getAttribute("replay") !== "off" && !this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");
      const wantsMotion = this.hasAttribute("animate") && !(typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches);
      const load = async (): Promise<void> => {
        const name = crestName(crestId, languageOf(this));
        if (name === null) {
          this.missing(crestId, `no crest for the id "${crestId}" in this version of @johnmorrisdotca/kamon-crests`);
          return;
        }
        this.setAttribute("aria-label", this.getAttribute("label") ?? name);
        let svg: string | null;
        let duration = 0;
        if (wantsMotion || force) {
          const [whole, animate] = await Promise.all([crestSteps(crestId), import("./animate.js")]);
          if (turn !== this.drawing) return;
          const construction = this.seen(whole, animate);
          svg = construction === null ? null : animate.animatedSvg(construction, { speed: this.pace, loop: (this as unknown as KamonCrestElement).loop, exit: this.exiting(), guides: this.getAttribute("guides") !== "off", widthsKey: this.keyed(), id: `kc${(counter += 1)}` });
          if (construction !== null) duration = (animate.durationOf(construction) - from) / this.pace;
          this.construction = construction;
          this.tools = animate;
        } else {
          svg = await crest(crestId);
          if (turn !== this.drawing) return;
          this.construction = null;
        }
        if (svg === null) {
          this.missing(crestId, `no crest for the id "${crestId}"`);
          return;
        }
        this.began = performance.now() - (from / this.pace) * 1000;
        this.show(from > 0 ? svg.replace("<svg ", `<svg style="--kamon-at:${-from / this.pace}s" `) : svg);
        this.emit("kamon-load", { crest: crestId });
        this.finish(true);
        if (duration > 0 && !this.hasAttribute("loop")) {
          this.finished = new Promise((resolve) => (this.done = resolve));
          this.timer = setTimeout(() => {
            this.emit("kamon-end", { crest: crestId });
            this.done?.();
            this.done = null;
            this.bar();
          }, duration * 1000);
        } else this.finished = Promise.resolve();
      };
      const start = (): void => {
        load().catch((error: unknown) => this.missing(crestId, String(error)));
      };
      if (crestId === "") {
        this.missing(crestId, "no crest", true);
        return;
      }
      if (!force && this.getAttribute("loading") !== "eager" && typeof IntersectionObserver === "function") {
        this.watcher = new IntersectionObserver(
          (entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;
            this.watcher?.disconnect();
            this.watcher = null;
            start();
          },
          { rootMargin: "200px" },
        );
        this.watcher.observe(this);
      } else start();
    }
  };
  // Each attribute is a property too, as the custom elements of this family do it.
  for (const name of CREST_ELEMENT_ATTRIBUTES) {
    const boolean = name === "animate" || name === "loop" || name === "controls";
    Object.defineProperty(element.prototype, name, {
      configurable: true,
      get(this: HTMLElement) {
        return boolean ? this.hasAttribute(name) && !["false", "0", "off", "no"].includes((this.getAttribute(name) ?? "").trim().toLowerCase()) : name === "lang" ? languageOf(this) : this.getAttribute(name);
      },
      set(this: HTMLElement, value: unknown) {
        if (value === null || value === undefined || value === false) this.removeAttribute(name);
        else this.setAttribute(name, value === true ? "" : String(value));
      },
    });
  }

  return element;
};

/**
 * Registers `<kamon-crest>`. Safe to call twice, and where there is no browser it does nothing.
 *
 * @param name - The tag to register it under; "kamon-crest" when left out.
 * @returns Nothing: the element is registered, or was already.
 *
 * @example
 * ```ts no-run
 * import { defineCrest } from "@johnmorrisdotca/kamon-crests/element";
 *
 * defineCrest();           // <kamon-crest>
 * defineCrest("my-crest"); // the same element, under a name of your own
 * ```
 */
export const defineCrest = (name: string = CREST_ELEMENT_NAME): void => {
  if (typeof customElements === "undefined" || typeof HTMLElement === "undefined") return;
  if (customElements.get(name) !== undefined) return;
  made ??= build();
  customElements.define(name, name === CREST_ELEMENT_NAME ? made : class extends (made as new () => HTMLElement) {});
};
