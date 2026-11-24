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
import type { Construction } from "./render.js";

/**
 * The attributes `<kamon-crest>` reads. Changing any draws it afresh.
 *
 * - `crest`: the crest's id, loosely written ("mitsuba-aoi", "Mitsuba Aoi"). (Not `id`, which a page may use once only.)
 * - `size`: small, medium or large (32, 96 or 192 pixels), or a number of pixels. Left out, it is `1em`, the size of the text around it; the page's CSS may set any size.
 * - `animate`: draw the crest as it is constructed: the layout guides, each shape traced and filled in, the guides rubbed out. Left out, the finished crest. Where the reader asks for less motion, the finished crest is shown at once.
 * - `speed`: how fast the animation plays; 1 is the usual pace, 2 twice as fast.
 * - `loop`: play again, after a pause, until the page is closed.
 * - `guides`: `off` leaves the layout guides out of the animation.
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
export const CREST_ELEMENT_ATTRIBUTES = ["crest", "size", "animate", "speed", "loop", "guides", "replay", "controls", "color", "background", "label", "lang", "loading"] as const;

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
const BASE_CSS = `${CREST_ELEMENT_NAME}{display:inline-block;width:1em;height:1em;vertical-align:-0.125em;line-height:0;box-sizing:border-box}${CREST_ELEMENT_NAME}>svg{display:block;width:100%;height:100%}${CREST_ELEMENT_NAME}[data-animate]:not([replay=off]){cursor:pointer}${CREST_ELEMENT_NAME}[controls]{height:auto!important;line-height:1.3}${CREST_ELEMENT_NAME}[controls]>svg{height:auto;aspect-ratio:1}.kamon-controls{display:flex;flex-wrap:wrap;align-items:center;gap:.25em;font:12px/1.3 system-ui,sans-serif;cursor:auto}.kamon-controls button{font:inherit;min-width:2.2em;min-height:2.2em}.kamon-controls input{flex:1;min-width:3em}.kamon-controls span{flex-basis:100%;min-height:1.3em}`;
const WORDS = {
  en: { back: "Step back", play: "Play", pause: "Pause", forward: "Step forward", step: "Step" },
  ja: { back: "前の手順", play: "再生", pause: "一時停止", forward: "次の手順", step: "手順" },
};
const warned = new Set<string>();
let made: CustomElementConstructor | null = null;
let counter = 0;

const languageOf = (element: HTMLElement): "en" | "ja" => {
  const tag = element.getAttribute("lang") || element.closest("[lang]")?.getAttribute("lang") || document.documentElement.lang || "en";

  return /^ja\b/i.test(tag) ? "ja" : "en";
};

const build = (): CustomElementConstructor => {
  const element = class KamonCrest extends HTMLElement {
    static observedAttributes = [...CREST_ELEMENT_ATTRIBUTES];
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
    ready: Promise<boolean> = new Promise((resolve) => (this.settle = resolve));
    finished: Promise<void> = Promise.resolve();

    connectedCallback(): void {
      const root = this.getRootNode();
      const into = root.nodeType === 11 && "host" in root ? (root as ShadowRoot) : this.ownerDocument.head;
      const id = `${this.localName}-style`;
      if (into.querySelector(`#${CSS.escape(id)}`) === null) {
        const selector = CSS.escape(this.localName);
        const css = BASE_CSS.replaceAll(`${CREST_ELEMENT_NAME}{`, `${selector}{`).replaceAll(`${CREST_ELEMENT_NAME}>`, `${selector}>`).replaceAll(`${CREST_ELEMENT_NAME}[`, `${selector}[`);
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

    attributeChangedCallback(): void {
      if (this.isConnected) this.draw();
    }

    private onReplay = (event: Event): void => {
      const control = (event.target as Element).closest(".kamon-controls button");
      if (control !== null) {
        const act = control.getAttribute("data-do");
        if (act === "toggle") this.toggle();
        else void this.step(this.at + (act === "back" ? -1 : 1));
      } else if ((event.target as Element).closest(".kamon-controls") === null && this.hasAttribute("animate") && this.getAttribute("replay") !== "off") {
        this.held = null;
        void this.play();
      }
    };

    // Space holds it or lets it go on, the arrows step, and Enter draws it again. The controls' own keys are theirs.
    private onKey = (event: KeyboardEvent): void => {
      if (!this.hasAttribute("animate") || (event.target as Element).closest(".kamon-controls") !== null) return;
      if (event.key === " ") this.toggle();
      else if (event.key === "ArrowRight" || event.key === "ArrowLeft") void this.step(this.at + (event.key === "ArrowLeft" ? -1 : 1));
      else if (event.key === "Enter" && this.getAttribute("replay") !== "off") {
        this.held = null;
        void this.play();
      } else return;
      event.preventDefault();
    };

    private get pace(): number {
      const speed = Number(this.getAttribute("speed"));

      return speed > 0 ? speed : 1;
    }

    /** The seconds into the animation, at speed 1. */
    private get second(): number {
      if (this.held !== null) return this.held;
      if (this.construction === null || this.tools === null) return Infinity;
      const t = ((performance.now() - this.began) / 1000) * this.pace;

      return this.hasAttribute("loop") ? t % (this.tools.durationOf(this.construction) + 1.4) : t;
    }

    get at(): number {
      if (this.stepped !== null) return this.stepped;
      if (this.construction === null || this.tools === null) return -1;

      return this.tools.stepAt(this.construction, this.second);
    }

    get paused(): boolean {
      return this.held !== null;
    }

    private say(name: "kamon-play" | "kamon-pause" | "kamon-step"): void {
      const detail: CrestElementEventDetail = { crest: (this.getAttribute("crest") ?? "").trim(), ...(name === "kamon-play" ? {} : { step: this.at, steps: this.construction?.steps.length ?? 0 }) };
      this.dispatchEvent(new CustomEvent<CrestElementEventDetail>(name, { detail, bubbles: true, composed: true }));
    }

    private toggle(): void {
      if (this.paused || this.construction === null || this.tools === null || (!this.hasAttribute("loop") && this.second >= this.tools.durationOf(this.construction))) void this.play();
      else this.pause();
    }

    play(): Promise<void> {
      // From where it is held; a drawing held on its last step, like one not held at all, starts again.
      const construction = this.construction;
      const from = this.held === null || construction === null || this.stepped === construction.steps.length - 1 ? 0 : this.stepped === null ? this.held : (this.tools?.stepTimes(construction)[this.stepped + 1] ?? 0);
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

    async step(n: number): Promise<number> {
      const crestId = (this.getAttribute("crest") ?? "").trim();
      const turn = ++this.drawing;
      const [construction, tools] = await Promise.all([crestSteps(crestId), import("./animate.js")]);
      if (construction === null) return -1;
      if (turn !== this.drawing) return this.at;
      this.watcher?.disconnect();
      if (this.timer !== null) clearTimeout(this.timer);
      this.construction = construction;
      this.tools = tools;
      this.stepped = Math.max(-1, Math.min(construction.steps.length - 1, Math.round(n)));
      this.held = this.stepped < 0 ? 0 : tools.stepTimes(construction)[this.stepped];
      this.show(tools.stepSvg(construction, this.stepped, { guides: this.getAttribute("guides") !== "off" }));
      this.finish(true);
      this.say("kamon-step");

      return this.stepped;
    }

    /** Puts the drawing in, leaving the controls where they are. */
    private show(svg: string): void {
      const background = this.getAttribute("background");
      this.querySelector(":scope > svg")?.remove();
      // The SVG is the package's own: its crests and animation are written by the build, never from the page.
      this.insertAdjacentHTML("afterbegin", background !== null && /^[#A-Za-z0-9.%,() -]{1,64}$/.test(background) ? svg.replace(/>/, `><rect width="200" height="200" fill="${background}"/>`) : svg);
      this.removeAttribute("data-missing");
      this.bar();
    }

    /** The controls under the crest, when `controls` is set: made once, then kept in step with the drawing. */
    private bar(): void {
      let bar = this.querySelector<HTMLElement>(":scope > .kamon-controls");
      if (this.ticker !== null) clearInterval(this.ticker);
      this.ticker = null;
      const construction = this.construction;
      const tools = this.tools;
      if (!this.hasAttribute("controls") || construction === null || tools === null) {
        bar?.remove();
        this.setAttribute("role", "img");

        return;
      }
      const words = WORDS[languageOf(this)];
      if (bar === null) {
        bar = this.ownerDocument.createElement("span");
        bar.className = "kamon-controls";
        bar.innerHTML = `<button type="button" data-do="back">‹</button><button type="button" data-do="toggle"></button><button type="button" data-do="forward">›</button><input type="range" min="0" step="1"><span aria-live="polite"></span>`;
        bar.querySelector("input")?.addEventListener("input", (event) => void this.step(Number((event.target as HTMLInputElement).value) - 1));
        this.append(bar);
      }
      // With buttons inside it the element is a group, not a picture.
      this.setAttribute("role", "group");
      const [back, toggle, forward] = Array.from(bar.querySelectorAll("button"));
      const range = bar.querySelector("input") as HTMLInputElement;
      const caption = bar.querySelector("span") as HTMLElement;
      back.setAttribute("aria-label", words.back);
      forward.setAttribute("aria-label", words.forward);
      range.setAttribute("aria-label", words.step);
      range.max = String(construction.steps.length);
      const sync = (): void => {
        const at = this.at;
        const playing = !this.paused && (this.hasAttribute("loop") || this.second < tools.durationOf(construction));
        toggle.textContent = playing ? "Ⅱ" : "▶";
        toggle.setAttribute("aria-label", playing ? words.pause : words.play);
        range.value = String(playing || this.paused ? at + 1 : construction.steps.length);
        // The caption is for a drawing held still: while it plays, a live region would speak every step.
        caption.textContent = this.paused && at >= 0 ? `${at + 1}/${construction.steps.length} · ${tools.stepCaption(construction.steps[at], construction, languageOf(this))}` : "";
        if (!playing && this.ticker !== null) {
          clearInterval(this.ticker);
          this.ticker = null;
        }
      };
      sync();
      if (!this.paused) this.ticker = setInterval(sync, 150);
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
      this.dispatchEvent(new CustomEvent<CrestElementEventDetail>("kamon-error", { detail: { crest, reason }, bubbles: true, composed: true }));
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
      this.style.width = Number.isFinite(size) && size > 0 ? `${size}px` : "";
      this.style.height = Number.isFinite(size) && size > 0 ? `${size}px` : "";
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
      const speed = Number(this.getAttribute("speed"));

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
          const [construction, animate] = await Promise.all([crestSteps(crestId), import("./animate.js")]);
          if (turn !== this.drawing) return;
          svg = construction === null ? null : animate.animatedSvg(construction, { speed: speed > 0 ? speed : 1, loop: this.hasAttribute("loop") && !["false", "0", "off", "no"].includes((this.getAttribute("loop") ?? "").toLowerCase()), guides: this.getAttribute("guides") !== "off", id: `kc${(counter += 1)}` });
          if (construction !== null) duration = (animate.durationOf(construction) - from) / (speed > 0 ? speed : 1);
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
        this.dispatchEvent(new CustomEvent<CrestElementEventDetail>("kamon-load", { detail: { crest: crestId }, bubbles: true, composed: true }));
        this.finish(true);
        if (duration > 0 && !this.hasAttribute("loop")) {
          this.finished = new Promise((resolve) => (this.done = resolve));
          this.timer = setTimeout(() => {
            this.dispatchEvent(new CustomEvent<CrestElementEventDetail>("kamon-end", { detail: { crest: crestId }, bubbles: true, composed: true }));
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
