// The Build page's crest, played the way the crest card plays one: a host with the same hands as <kamon-crest> (play, pause, step,
// at, paused, speed and the kamon-play, kamon-pause, kamon-step and kamon-end events), made for a construction the reader composed
// instead of a crest of the catalogue. It draws with the package's own animate tools, so it looks and keeps time as the card does.
// It draws again only when it is given a construction or asked to play: the ink and the paper are the page's CSS, and the speed takes the
// drawing on from where it is.
import { animatedSvg, durationOf, stepAt, stepSvg, stepTimes } from "./dist/animate.js";

export class ComposedHost extends EventTarget {
  #node;
  #construction = null;
  #began = 0;
  #pace = 1;
  #held = null;
  #stepped = null;
  #timer = null;
  #counter = 0;
  #base = 1;
  #speed = 1;

  /** @param {HTMLElement} node The box the drawing is put in. */
  constructor(node) {
    super();
    this.#node = node;
  }

  /** How many times a drawing has been put in, for a test or a reader to see that browsing does not draw again. */
  get drawn() {
    return this.#counter;
  }

  get construction() {
    return this.#construction;
  }

  /** The speed the reader chose (0.5, 1 or 2), on top of the pace that has any crest drawn in about twenty seconds. */
  get speed() {
    return this.#speed;
  }

  set speed(value) {
    this.#speed = value > 0 ? value : 1;
    if (this.#construction === null) return;
    // Held, a new speed changes nothing on screen: the next play goes on at it. Playing, it takes the drawing on from where it is.
    if (this.#held === null) this.#draw(Math.min(this.#second, durationOf(this.#construction)));
  }

  get #second() {
    if (this.#held !== null) return this.#held;
    return ((performance.now() - this.#began) / 1000) * this.#pace;
  }

  /** The index of the step the drawing is at: -1 before the first. */
  get at() {
    if (this.#construction === null) return -1;
    if (this.#stepped !== null) return this.#stepped;
    return stepAt(this.#construction, this.#second);
  }

  get paused() {
    return this.#held !== null;
  }

  /** Whether the drawing is moving: not held, and not yet at its end. */
  get playing() {
    return this.#construction !== null && this.#held === null && this.#second < durationOf(this.#construction);
  }

  get steps() {
    return this.#construction?.steps.length ?? 0;
  }

  #emit(name) {
    this.dispatchEvent(new CustomEvent(name, { detail: { step: this.at, steps: this.steps } }));
  }

  #show(svg) {
    this.#counter += 1;
    this.#node.innerHTML = svg;
    this.#node.dataset.drawn = String(this.#counter);
  }

  // Draws the animation from `from` seconds in (at speed 1), at the pace of the crest and the speed asked for.
  #draw(from = 0) {
    const construction = this.#construction;
    clearTimeout(this.#timer);
    this.#held = null;
    this.#stepped = null;
    // Every crest is drawn in about twenty seconds, however many parts it has.
    this.#base = Math.max(1, durationOf(construction) / 22);
    this.#pace = this.#base * this.#speed;
    const svg = animatedSvg(construction, { speed: this.#pace, id: `kcb${this.#counter + 1}` });
    this.#began = performance.now() - (from / this.#pace) * 1000;
    this.#show(from > 0 ? svg.replace("<svg ", `<svg style="--kamon-at:${-from / this.#pace}s" `) : svg);
    this.#timer = setTimeout(() => this.#emit("kamon-end"), ((durationOf(construction) - from) / this.#pace) * 1000);
  }

  /** Puts a new construction in: drawn from the start, or at once as the finished crest. */
  set(construction, { animate }) {
    this.#construction = construction;
    if (animate) {
      this.#draw(0);
      this.#emit("kamon-play");
    } else {
      void this.finish();
    }
  }

  /** Draws it from the start. */
  restart() {
    if (this.#construction === null) return Promise.resolve();
    this.#draw(0);
    this.#emit("kamon-play");
    return Promise.resolve();
  }

  /** Goes on from where it is held, or from the start when it is not held, or held at the last step. */
  play() {
    const construction = this.#construction;
    if (construction === null) return Promise.resolve();
    const times = stepTimes(construction);
    const last = construction.steps.length - 1;
    const from = this.#held === null ? 0 : this.#stepped === null ? this.#held : this.#stepped === last ? 0 : (times[this.#stepped + 1] ?? 0);
    this.#draw(from);
    this.#emit("kamon-play");
    return Promise.resolve();
  }

  pause() {
    if (this.#construction === null || this.#held !== null) return;
    this.#held = Math.min(this.#second, durationOf(this.#construction));
    clearTimeout(this.#timer);
    this.#node.querySelector(":scope > svg")?.style.setProperty("--kamon-play", "paused");
    this.#emit("kamon-pause");
  }

  /** Holds the drawing with steps 0 to `n` done (-1 is the empty page); the last step is the finished crest. */
  step(n) {
    const construction = this.#construction;
    if (construction === null) return Promise.resolve(-1);
    clearTimeout(this.#timer);
    const last = construction.steps.length - 1;
    this.#stepped = Math.max(-1, Math.min(last, Math.round(n)));
    this.#held = this.#stepped < 0 ? 0 : stepTimes(construction)[this.#stepped];
    this.#show(stepSvg(construction, this.#stepped, {}));
    this.#emit("kamon-step");
    return Promise.resolve(this.#stepped);
  }

  /** Shows the finished crest at once. */
  finish() {
    return this.step(this.steps - 1);
  }
}
