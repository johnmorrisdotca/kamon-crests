// The player's buttons for a host that has <kamon-crest>'s hands (see composed.js): from the start, step back, play and pause,
// step forward, a scrubber with one stop for each step (the first is the empty page), the speed choice, and the step's caption while
// the drawing is held. The buttons are the card's own (scripts/player-markup.mjs) and say the card's own words.
import { stepCaption } from "./dist/animate.js";

/**
 * @param {object} options
 * @param {import("./composed.js").ComposedHost} options.host What the buttons drive.
 * @param {Record<string, string>} options.ids The id of each control: restart, back, toggle, forward, scrub, speed and caption.
 * @param {(key: string, values?: object) => string} options.say The page's words.
 * @param {() => "en" | "ja"} options.lang The page's language.
 */
export const wirePlayer = ({ host, ids, say, lang }) => {
  const $ = (name) => document.getElementById(ids[name]);
  let frame = 0;
  let shown = "";
  const sync = () => {
    const n = host.steps;
    const playing = host.playing;
    const at = host.at;
    const state = [n, playing, host.paused, at].join("|");
    if (state === shown) return playing ? (frame = requestAnimationFrame(sync)) : undefined;
    shown = state;
    $("scrub").max = String(n);
    $("scrub").value = String(playing || host.paused ? at + 1 : n);
    $("toggle").textContent = playing ? "Ⅱ" : "▶";
    $("toggle").setAttribute("aria-label", say(playing ? "player_pause" : "player_play"));
    // The caption is for a drawing held still: while it plays, a live region would speak every step.
    const construction = host.construction;
    $("caption").textContent = !playing && host.paused && construction !== null && at >= 0 && at < n ? `${say("step_of", { n: at + 1, total: n })} · ${stepCaption(construction.steps[at], construction, lang())}` : "";
    if (playing) frame = requestAnimationFrame(sync);
  };
  const again = () => {
    cancelAnimationFrame(frame);
    shown = "";
    sync();
  };
  for (const name of ["kamon-play", "kamon-pause", "kamon-step", "kamon-end"]) host.addEventListener(name, again);
  $("restart").addEventListener("click", () => void host.restart());
  $("toggle").addEventListener("click", () => void (host.playing ? host.pause() : host.play()));
  $("back").addEventListener("click", () => void host.step(host.at - 1));
  $("forward").addEventListener("click", () => void host.step(host.at + 1));
  $("scrub").addEventListener("input", (event) => void host.step(Number(event.target.value) - 1));
  for (const node of document.querySelectorAll(`#${ids.speed} button`)) {
    node.addEventListener("click", () => {
      host.speed = Number(node.dataset.value);
      for (const other of document.querySelectorAll(`#${ids.speed} button`)) other.setAttribute("aria-pressed", String(other === node));
    });
  }

  // The words in the page's language again, with the buttons where they are.
  return again;
};
