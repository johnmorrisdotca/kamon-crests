// The Samurai tab uses its own cards and the same crest dialog as the catalogue.
import { manifest } from "./dist/manifest.js";

export function mountSamurai({ say, ja, onOpen, preview }) {
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
    picture.setAttribute("crest", id);
    picture.setAttribute("size", "88");
    picture.setAttribute("loading", "eager");
    const label = make("span", { className: "label" }, make("span", { className: "name", textContent: name }));
    const address = new URLSearchParams({ tab: "samurai", open: id, lang: ja() ? "ja" : "en" });
    const link = make("a", { className: "tile sam-crest", href: `?${address}`, title: say("sam_open") },
      make("span", { className: "pic" }, picture), label);
    link.dataset.testid = `sam-crest-${id}`;
    link.addEventListener("click", (event) => onOpen(event, id));
    if (record.redrawing !== true) preview(link, picture);
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

  const card = (one, crests, wanted) => {
    const name = make("h3", {},
      make("span", { textContent: ja() ? one.ja : one.en }),
      make("small", { textContent: ja() ? `${one.reading} · ${one.en}` : `${one.ja} · ${one.reading}` }));
    const facts = make("p", { className: "sam-facts", textContent: `${one.years} · ${say("sam_house", { house: ja() ? one.house.ja : one.house.en })}` });
    const line = make("p", { className: "sam-line", textContent: ja() ? one.line.ja : one.line.en });
    const tiles = make("div", { className: "sam-crests" }, ...crests.map(crestTile), ...wanted.map(wantedTile));
    const source = make("a", { className: "sam-source", href: one.source, textContent: say("sam_source"), rel: "noopener" });
    const node = make("li", { className: "sam-card" }, name, facts, tiles, line, source);
    node.dataset.testid = `sam-${one.id}`;
    return node;
  };

  const foldName = (text) => text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  return {
    ids: new Set(people.flatMap(({ crests }) => crests)),
    named(text) {
      const words = foldName(text.trim()).split(/[\s-]+/).filter(Boolean);
      if (words.length === 0) return [];
      return people.filter(({ id, ja, en, reading, house }) => {
        const names = foldName(`${id} ${ja} ${en} ${reading} ${house.ja} ${house.en}`);
        return words.every((word) => names.includes(word));
      });
    },
    render(found, named, showWanted) {
      const cards = (named.length > 0 ? named : people).flatMap((one) => {
        const crests = one.crests.filter((id) => found.has(id));
        const wanted = showWanted ? one.wanted : [];
        return crests.length > 0 || wanted.length > 0 ? [card(one, crests, wanted)] : [];
      });
      document.getElementById("samurai").replaceChildren(...cards);
      return cards.length > 0;
    },
  };
}
