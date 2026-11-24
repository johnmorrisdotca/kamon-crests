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
export const CREST_ELEMENT_ATTRIBUTES = ["crest", "size", "animate", "speed", "loop", "guides", "replay", "color", "background", "label", "lang", "loading"] as const;

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
 * found to be none (it is then `false`). `play()` draws the construction again from the start; `finished` settles when it ends.
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
  /** Draws the construction again from the start; resolves when it ends. */
  play(): Promise<void>;
};

/**
 * What `kamon-load`, `kamon-end` and `kamon-error` carry in `detail`: the id as asked, and for an error why nothing was drawn.
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
}

const SIZES: Record<string, number> = { small: 32, medium: 96, large: 192 };
const BASE_CSS = `${CREST_ELEMENT_NAME}{display:inline-block;width:1em;height:1em;vertical-align:-0.125em;line-height:0;box-sizing:border-box}${CREST_ELEMENT_NAME}>svg{display:block;width:100%;height:100%}${CREST_ELEMENT_NAME}[data-animate]:not([replay=off]){cursor:pointer}`;
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
      this.removeEventListener("click", this.onReplay);
      this.removeEventListener("keydown", this.onKey);
    }

    attributeChangedCallback(): void {
      if (this.isConnected) this.draw();
    }

    private onReplay = (): void => {
      if (this.hasAttribute("animate") && this.getAttribute("replay") !== "off") void this.play();
    };

    private onKey = (event: KeyboardEvent): void => {
      if ((event.key === "Enter" || event.key === " ") && this.hasAttribute("animate") && this.getAttribute("replay") !== "off") {
        event.preventDefault();
        void this.play();
      }
    };

    play(): Promise<void> {
      this.draw(true);

      return this.finished;
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

    private draw(force = false): void {
      const turn = ++this.drawing;
      this.watcher?.disconnect();
      this.watcher = null;
      if (this.timer !== null) clearTimeout(this.timer);
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
      this.setAttribute("role", "img");
      this.toggleAttribute("data-animate", this.hasAttribute("animate"));
      if (this.hasAttribute("animate") && this.getAttribute("replay") !== "off" && !this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");
      const wantsMotion = this.hasAttribute("animate") && !(typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches);
      const background = this.getAttribute("background");
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
          if (construction !== null) duration = animate.durationOf(construction) / (speed > 0 ? speed : 1);
        } else {
          svg = await crest(crestId);
          if (turn !== this.drawing) return;
        }
        if (svg === null) {
          this.missing(crestId, `no crest for the id "${crestId}"`);
          return;
        }
        // The SVG is the package's own: its crests and animation are written by the build, never from the page.
        this.innerHTML = background !== null && /^[#A-Za-z0-9.%,() -]{1,64}$/.test(background) ? svg.replace(/>/, `><rect width="200" height="200" fill="${background}"/>`) : svg;
        this.removeAttribute("data-missing");
        this.dispatchEvent(new CustomEvent<CrestElementEventDetail>("kamon-load", { detail: { crest: crestId }, bubbles: true, composed: true }));
        this.finish(true);
        if (duration > 0 && !this.hasAttribute("loop")) {
          this.finished = new Promise((resolve) => (this.done = resolve));
          this.timer = setTimeout(() => {
            this.dispatchEvent(new CustomEvent<CrestElementEventDetail>("kamon-end", { detail: { crest: crestId }, bubbles: true, composed: true }));
            this.done?.();
            this.done = null;
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
    const boolean = name === "animate" || name === "loop";
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
