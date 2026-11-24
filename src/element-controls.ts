// The part of <kamon-crest> that few pages need, loaded when it is first wanted: the controls under the crest (when `controls`
// is set) and the still drawing of one step (when `step()`, `isolate()` or `clear()` is first called). The element imports this
// file as dist/element-controls.js; it is not an entry of the package.

import { crestSteps } from "./load.js";
import type { Construction } from "./render.js";

type Tools = typeof import("./animate.js");

/** What these functions read and set on the element. */
export interface Host extends HTMLElement {
  drawing: number;
  watcher: IntersectionObserver | null;
  timer: ReturnType<typeof setTimeout> | null;
  ticker: ReturnType<typeof setInterval> | null;
  construction: Construction | null;
  tools: Tools | null;
  held: number | null;
  stepped: number | null;
  from: (() => number) | null;
  readonly at: number;
  readonly paused: boolean;
  readonly second: number;
  step(n: number): Promise<number>;
  play(): Promise<void>;
  pause(): void;
  seen(whole: Construction | null, tools: Tools): Construction | null;
  show(svg: string): void;
  finish(drawn: boolean): void;
  say(name: "kamon-step"): void;
}

const CSS_ID = "kamon-controls-style";
const CSS_TEXT = `[controls]:has(>.kamon-controls){height:auto!important;line-height:1.3}[controls]:has(>.kamon-controls)>svg{height:auto;aspect-ratio:1}.kamon-controls{display:flex;flex-wrap:wrap;align-items:center;gap:.25em;font:12px/1.3 system-ui,sans-serif;cursor:auto}.kamon-controls button{font:inherit;min-width:2.2em;min-height:2.2em}.kamon-controls input{flex:1;min-width:3em}.kamon-controls span{flex-basis:100%;min-height:1.3em}`;
const WORDS = {
  en: { back: "Step back", play: "Play", pause: "Pause", forward: "Step forward", step: "Step" },
  ja: { back: "前の手順", play: "再生", pause: "一時停止", forward: "次の手順", step: "手順" },
};

/** The controls under the crest: made once, then kept in step with the drawing. */
export const bar = (host: Host, lang: "en" | "ja"): void => {
  const construction = host.construction;
  const tools = host.tools;
  if (host.ticker !== null) clearInterval(host.ticker);
  host.ticker = null;
  if (!host.hasAttribute("controls") || construction === null || tools === null) return;
  const root = host.getRootNode();
  const into = root.nodeType === 11 && "host" in root ? (root as ShadowRoot) : host.ownerDocument.head;
  if (into.querySelector(`#${CSS_ID}`) === null) into.prepend(Object.assign(host.ownerDocument.createElement("style"), { id: CSS_ID, textContent: CSS_TEXT }));
  let controls = host.querySelector<HTMLElement>(":scope > .kamon-controls");
  const words = WORDS[lang];
  if (controls === null) {
    controls = host.ownerDocument.createElement("span");
    controls.className = "kamon-controls";
    controls.innerHTML = `<button type="button" data-do="back">‹</button><button type="button" data-do="toggle"></button><button type="button" data-do="forward">›</button><input type="range" min="0" step="1"><span aria-live="polite"></span>`;
    controls.querySelector("input")?.addEventListener("input", (event) => void host.step(Number((event.target as HTMLInputElement).value) - 1));
    host.append(controls);
  }
  // With buttons inside it the element is a group, not a picture.
  host.setAttribute("role", "group");
  const [back, toggle, forward] = Array.from(controls.querySelectorAll("button"));
  const range = controls.querySelector("input") as HTMLInputElement;
  const caption = controls.querySelector("span") as HTMLElement;
  back.setAttribute("aria-label", words.back);
  forward.setAttribute("aria-label", words.forward);
  range.setAttribute("aria-label", words.step);
  range.max = String(construction.steps.length);
  const sync = (): void => {
    const at = host.at;
    const playing = !host.paused && (host.hasAttribute("loop") || host.second < tools.durationOf(construction));
    toggle.textContent = playing ? "Ⅱ" : "▶";
    toggle.setAttribute("aria-label", playing ? words.pause : words.play);
    range.value = String(playing || host.paused ? at + 1 : construction.steps.length);
    // The caption is for a drawing held still: while it plays, a live region would speak every step.
    caption.textContent = host.paused && at >= 0 && at < construction.steps.length ? `${at + 1}/${construction.steps.length} · ${tools.stepCaption(construction.steps[at], construction, lang)}` : "";
    if (!playing && host.ticker !== null) {
      clearInterval(host.ticker);
      host.ticker = null;
    }
  };
  sync();
  if (!host.paused) host.ticker = setInterval(sync, 150);
};

/** Holds the drawing with steps 0 to `n` done; `n` as NaN is the step a part shown alone rests at. `turn` is this call's place among the element's drawings. */
export const step = async (host: Host, n: number, turn: number): Promise<number> => {
  const crestId = (host.getAttribute("crest") ?? "").trim();
  const [whole, tools] = await Promise.all([crestSteps(crestId), import("./animate.js")]);
  const construction = host.seen(whole, tools);
  if (construction === null) return -1;
  if (turn !== host.drawing) return host.at;
  host.watcher?.disconnect();
  if (host.timer !== null) clearTimeout(host.timer);
  host.construction = construction;
  host.tools = tools;
  // A drawing held on its last step, when played, starts again; on any other, it goes on with the next.
  host.from = () => (host.stepped === null ? (host.held ?? 0) : host.stepped === construction.steps.length - 1 ? 0 : (tools.stepTimes(construction)[host.stepped + 1] ?? 0));
  host.stepped = n === n ? Math.max(-1, Math.min(construction.steps.length - 1, Math.round(n))) : (construction.rest ?? construction.steps.length - 1);
  host.held = host.stepped < 0 ? 0 : tools.stepTimes(construction)[host.stepped];
  // The switches: the guides, the centre dots, the width numbers, the fill and the compass arm, each left out when its attribute is `off`.
  const on = (name: string): boolean => host.getAttribute(name) !== "off";
  host.show(tools.stepSvg(construction, host.stepped, { guides: on("guides"), centres: on("centres"), widths: on("widths"), fill: on("fill"), compassArm: on("compass-arm") }));
  host.finish(true);
  host.say("kamon-step");

  return host.stepped;
};

/** A control or a key: hold the drawing or let it go on, step back or forward, or draw it again from the start. */
export const press = (host: Host, act: string): void => {
  if (act === "back" || act === "forward") void host.step(host.at + (act === "back" ? -1 : 1));
  else if (act === "again") {
    host.held = null;
    void host.play();
  } else if (host.paused || host.construction === null || host.tools === null || (!host.hasAttribute("loop") && host.second >= host.tools.durationOf(host.construction))) void host.play();
  else host.pause();
};
