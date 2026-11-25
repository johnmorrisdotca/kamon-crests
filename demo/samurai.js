// The Samurai page's script: famous samurai and the crests their houses bore, each crest a <kamon-crest> that draws itself once when
// it comes into view and opens its card in the catalogue; a crest still to draw is a dashed circle that links to its issue. The
// list is the page's own JSON, written by scripts/site.mjs from scripts/samurai.mjs. The page's words are set as text, never as HTML.
import "./dist/element-define.js";
import { WORDS } from "./words.js";

const $ = (id) => document.getElementById(id);
const language = familyLanguage({ id: "kamon-crests", words: WORDS, onChange: () => render() });
const say = (key, values) => {
  const word = WORDS[language.lang][key] ?? WORDS.en[key] ?? "";
  if (!(key in WORDS.en)) console.error(`The demo has no word for "${key}"`);
  return values === undefined ? word : word.replace(/\{(\w+)\}/g, (whole, name) => String(values[name] ?? ""));
};
const ja = () => language.lang === "ja";
const SAMURAI = JSON.parse($("samurai-data").textContent);

const make = (tag, props = {}, ...kids) => {
  const node = Object.assign(document.createElement(tag), props);
  for (const kid of kids) node.append(kid);
  return node;
};

// One crest: drawn here, a link to its card that draws itself when seen; still to draw, a link to the issue where it can be taken.
const crestTile = (id) => {
  const pic = document.createElement("kamon-crest");
  for (const [name, value] of [["crest", id], ["size", "112"], ["animate", ""], ["speed", "2"], ["guides", "off"], ["replay", "off"]]) pic.setAttribute(name, value);
  const link = make("a", { className: "sam-crest", href: `../?open=${encodeURIComponent(id)}`, title: say("sam_open") });
  link.dataset.testid = `sam-crest-${id}`;
  link.append(pic);

  return link;
};
const wantedTile = (want) => {
  const link = make("a", { className: "sam-crest sam-wanted", href: want.link, title: say("sam_take") });
  link.dataset.testid = "sam-wanted";
  link.append(make("span", { className: "ghost" }), make("small", { textContent: ja() ? want.ja : `${want.en} · ${want.ja}` }), make("small", { className: "sam-take", textContent: say("sam_take") }));

  return link;
};

const card = (one) => {
  const name = make("h3", {}, make("span", { textContent: ja() ? one.ja : one.en }), make("small", { textContent: ja() ? `${one.reading} · ${one.en}` : `${one.ja} · ${one.reading}` }));
  const facts = make("p", { className: "sam-facts", textContent: `${one.years} · ${say("sam_house", { house: ja() ? one.house.ja : one.house.en })}` });
  const line = make("p", { className: "sam-line", textContent: ja() ? one.line.ja : one.line.en });
  const crests = make("div", { className: "sam-crests" }, ...one.crests.map(crestTile), ...one.wanted.map(wantedTile));
  const source = make("a", { className: "sam-source", href: one.source, textContent: say("sam_source"), rel: "noopener" });
  const node = make("li", { className: "sam-card" }, name, facts, crests, line, source);
  node.dataset.testid = `sam-${one.id}`;

  return node;
};

const render = () => $("samurai").replaceChildren(...SAMURAI.map(card));
render();
