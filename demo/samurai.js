// The Samurai tab uses its own cards and the same crest dialog as the catalogue.
import { manifest } from "./dist/manifest.js";

export function mountSamurai({ say, ja, onOpen }) {
  const people = JSON.parse(document.getElementById("samurai-data").textContent);
  const make = (tag, props, ...children) => {
    const node = Object.assign(document.createElement(tag), props);
    node.append(...children);
    return node;
  };

  const crestTile = (id) => {
    const record = manifest(id);
    const name = ja() ? record.name.ja : record.name.en;
    const picture = document.createElement("kamon-crest");
    for (const [key, value] of [["crest", id], ["size", "88"], ["animate", ""], ["speed", "2"], ["guides", "off"], ["replay", "off"]]) {
      picture.setAttribute(key, value);
    }
    const label = make("span", { className: "label" }, make("span", { className: "name", textContent: name }));
    const address = new URLSearchParams({ tab: "samurai", open: id, lang: ja() ? "ja" : "en" });
    const link = make("a", { className: "tile sam-crest", href: `?${address}`, title: say("sam_open") },
      make("span", { className: "pic" }, picture), label);
    link.dataset.testid = `sam-crest-${id}`;
    link.addEventListener("click", (event) => onOpen(event, id));
    return link;
  };

  const wantedTile = (want) => {
    const picture = make("span", { className: "pic" }, make("span", { className: "ghost" }));
    const label = make("span", { className: "label" },
      make("span", { className: "name", textContent: ja() ? want.ja : `${want.en} · ${want.ja}` }),
      make("small", { className: "sam-take", textContent: say("sam_take") }));
    const link = make("a", { className: "tile sam-crest sam-wanted", href: want.link, title: say("sam_take") }, picture, label);
    link.dataset.testid = "sam-wanted";
    return link;
  };

  const card = (one) => {
    const name = make("h3", {},
      make("span", { textContent: ja() ? one.ja : one.en }),
      make("small", { textContent: ja() ? `${one.reading} · ${one.en}` : `${one.ja} · ${one.reading}` }));
    const facts = make("p", { className: "sam-facts", textContent: `${one.years} · ${say("sam_house", { house: ja() ? one.house.ja : one.house.en })}` });
    const line = make("p", { className: "sam-line", textContent: ja() ? one.line.ja : one.line.en });
    const crests = make("div", { className: "sam-crests" }, ...one.crests.map(crestTile), ...one.wanted.map(wantedTile));
    const source = make("a", { className: "sam-source", href: one.source, textContent: say("sam_source"), rel: "noopener" });
    const node = make("li", { className: "sam-card" }, name, facts, crests, line, source);
    node.dataset.testid = `sam-${one.id}`;
    return node;
  };

  let renderedLanguage = null;
  return () => {
    const japanese = ja();
    if (renderedLanguage === japanese) return;
    renderedLanguage = japanese;
    document.getElementById("samurai").replaceChildren(...people.map(card));
  };
}
