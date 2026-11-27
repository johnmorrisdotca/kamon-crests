// Builds the static demo for GitHub Pages into ./site: the page, written here from the family's shared header and footer,
// with the family's stylesheet, Kamon Crests' own, the page's script and its words, and the built package beside it.
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

import { WORDS } from "../demo/words.js";
import { API_CSS, API_WORDS, apiBody, apiPage } from "./api.mjs";
import { bookData } from "./book-data.mjs";
import { coverage } from "./coverage-data.mjs";
import { contributedBy } from "./contributors.mjs";
import { latestReleases } from "./latest-data.mjs";
import { SAMURAI, wantedLink } from "./samurai.mjs";
import { playerMarkup, speedMarkup } from "./player-markup.mjs";
import { MENU_SCRIPT, NAV_KEYS, menuHead, siteHeader } from "./site-header.mjs";
import { FAMILY_SCRIPT, familyFooter, familyHead, familyUnreviewed } from "./family-template.mjs";

const id = "kamon-crests";
const { MANIFEST, MOTIF_FAMILIES } = await import(new URL("../dist/manifest.js", import.meta.url).href);
const { crestConstruction } = await import(new URL("../dist/load.js", import.meta.url).href);

const bookIndex = JSON.parse(readFileSync(new URL("../docs/coverage/book-1892.json", import.meta.url), "utf8"));
const coverageList = await coverage();
const bookFamilies = [
  ...coverageList.chapters.flatMap(({ families }) => families.filter(({ en }) => en).map(({ family, en }) => ({ ja: family, en }))),
  ...MOTIF_FAMILIES,
];
const book = bookData(bookIndex, MANIFEST, bookFamilies);
const inlineJson = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

const latest = latestReleases(readFileSync(new URL("../CHANGELOG.md", import.meta.url), "utf8"), MANIFEST.map((record) => record.id));
const latestIds = new Set(latest.flatMap(({ entries }) => entries.map(({ id }) => id)));
// The changelog's original text is English. Give Japanese readers a short construction note beside it.
const latestJapanese = Object.fromEntries(await Promise.all([...latestIds].map(async (id) => {
  const construction = await crestConstruction(id);
  const note = construction?.ja.trim().match(/^.+?(?:。|$)/u)?.[0];
  return [id, note];
})));

// A hollyhock-like trefoil of rings in the family's green.
const ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%232f5d4a'/%3E%3Ccircle cx='50' cy='50' r='34' fill='none' stroke='%23f3efe4' stroke-width='6'/%3E%3Cg fill='%23f3efe4'%3E%3Ccircle cx='50' cy='34' r='9'/%3E%3Ccircle cx='36' cy='58' r='9'/%3E%3Ccircle cx='64' cy='58' r='9'/%3E%3C/g%3E%3C/svg%3E";

const escape = (text) => String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const row = (help, content, extra = "") => `<div class="fam-row"${extra} data-help-en="${escape(help[0])}" data-help-ja="${escape(help[1])}">${content}</div>`;
const choices = (name, say, help) => row(help, `<span class="fam-label" data-say="${say}"></span><div class="choices" id="${name}-row" data-testid="${name}-row" role="group" data-say-label="${say}"></div>`);

const catalogue = `<section class="fam-panels" id="catalogue-panel" role="tabpanel" aria-labelledby="tab-catalogue" data-testid="catalogue-panel">
        <div class="fam-panel">
          <p class="blurb" id="blurb" data-testid="blurb" data-say="blurb_catalogue"></p>
          <div class="browse">
          <div class="filters">
          ${choices("sort", "sort", ["What to rank the crests by. The score is the circles, the ruled lines and the arcs together, each with its weight; crests of one score are ordered by their steps.", "家紋を何の数で並べるかを選びます。点数は円・直線・弧を重みをつけて合わせた数で、同じ点数の家紋は手順の少ない順です。"])}
          ${choices("order", "order", ["Simplest first, or the most complex first.", "簡単なものから並べるか、複雑なものから並べるかを選びます。"])}
          ${row(["Type a name in English or Japanese, a clan, a reading or a part, such as Tokugawa, 桐 or tomoe.", "名前（英語でも日本語でも）、家、読み、部品を入力します。例：Tokugawa、桐、ともえ。"], `<label class="fam-label" for="search" data-say="search"></label><input id="search" class="fam-field" data-testid="search" type="search" spellcheck="false" autocomplete="off" autocapitalize="off" data-say-placeholder="search_hint" />`)}
          ${choices("frame", "frame", ["What is round the motif: nothing, a ring, a hexagon or a lobed frame.", "図柄のまわりに何があるかを選びます。なし、輪、亀甲、木瓜のいずれかです。"])}
          ${choices("kind", "kind", ["What sort of thing the motif is: a plant, an animal, a made thing, a plain shape or something in the sky.", "図柄の種類を選びます。植物、動物、器物、図形、天体のいずれかです。"])}
          ${choices("motif", "motif", ["The motif itself, once a kind is chosen. The number on each choice is how many crests would be left.", "図柄そのものを選びます（種類を選ぶと表示されます）。各選択肢の数字は、それを選んだときに残る家紋の数です。"])}
          ${choices("count", "count", ["How many of the motif there are: every crest with three of something, for example.", "図柄の数を選びます。たとえば、三つのものを持つ家紋をすべて探せます。"])}
          ${choices("arrangement", "arrangement", ["How the motif is set out: alone, turned about the centre, crossed, hanging and so on.", "図柄の並べ方を選びます。単独、巡り、違い、下がりなどです。"])}
          ${choices("used", "used", ["Only the crests with a present-day user that a public source states.", "公開された出典に現在の使用者が書かれている家紋だけを表示します。"])}
          ${choices("grouped", "parts_group", ["Off to begin with: every crest has its own tile. On, a crest that is only another crest in a frame (a circle, a hexagon) is counted on the tile of the crest without the frame, as +N in frames. A crest that differs in more than its frame, such as a different count or arrangement or another motif added, always keeps its own tile.", "初期状態では、どの家紋も自分のタイルで表示されます。オンにすると、枠だけが違う家紋（丸に…、亀甲に…）は、枠のない家紋のタイルに「枠付き+N」としてまとめられます。数や配置が違う家紋、ほかの図柄を加えた家紋など、枠以外にも違いがある家紋は、いつも自分のタイルのままです。"])}
          </div>
          <div class="results">
          <div class="tools">
            <p class="count" id="count" data-testid="count" aria-live="polite"></p>
            <div class="fam-actions"><button type="button" class="fam-button" id="clear" data-testid="clear" data-say="clear"></button></div>
          </div>
          <div id="grid" data-testid="grid"></div>
          <p class="fam-empty" id="empty" data-testid="empty" hidden></p>
          </div>
          </div>
        </div>
      </section>`;

const parts = `<section class="fam-panels" id="parts-panel" role="tabpanel" aria-labelledby="tab-parts" data-testid="parts-panel" hidden>
        <div class="fam-panel">
          <p class="blurb" data-say="blurb_parts"></p>
          ${row(["Choose a kind of part: the frames, a kind of motif, how they are arranged, or which way they turn.", "部品の種類を選びます。枠、図柄の種類、配置、向きのいずれかです。"], `<span class="fam-label" data-say="parts_group"></span><div class="choices" id="group-row" data-testid="group-row" role="group" data-say-label="parts_group"></div>`)}
          <ul class="parts-grid" id="parts-grid" data-testid="parts-grid"></ul>
        </div>
      </section>`;

const latestPanel = `<section class="latest" id="latest-panel" role="tabpanel" aria-labelledby="tab-latest" data-testid="latest-panel" hidden>
        <div id="latest-releases"></div>
        <p id="latest-empty" data-say="latest_empty" hidden></p>
        <button type="button" class="fam-button" id="latest-more" data-say="latest_more" aria-controls="latest-releases" hidden></button>
      </section>`;

const dialog = `<dialog id="detail" class="detail" data-testid="detail" aria-labelledby="detail-title">
      <form method="dialog" class="detail-close"><button type="submit" class="fam-button" data-testid="close" data-say="close"></button></form>
      <h2 id="detail-title" data-testid="detail-title"></h2>
      <p class="detail-other" id="detail-other" data-testid="detail-other"></p>
      <p class="stats" id="stats" data-testid="stats"></p>
      <p class="detail-family" id="detail-family" data-testid="detail-family"></p>
      <p id="detail-book" class="fam-fine" data-testid="detail-book" hidden></p>
      <p class="detail-by" id="detail-by" data-testid="detail-by" hidden></p>
      <div class="variants" id="variants-block" data-testid="variants-block" hidden>
        <h3 id="variants-title" data-say="variants"></h3>
        <div class="variants-row" id="variants" data-testid="variants" role="group" aria-labelledby="variants-title"></div>
      </div>
      <div class="stage">
        <div class="stage-view">
          <div class="stage-pic"><kamon-crest id="detail-crest" data-testid="detail-crest" animate replay="off" loading="eager"></kamon-crest></div>
          <div class="fam-actions">
            <div class="fam-seg" id="view" data-testid="view" role="group" data-say-label="view_size">${["s", "m", "l"].map((size) => `<button type="button" data-value="${size}" aria-pressed="false">${size.toUpperCase()}</button>`).join("")}</div>
            <button type="button" class="fam-button" id="full" data-testid="full" aria-pressed="false" data-say="full_screen"></button>
          </div>
        </div>
        <div class="controls">
          <p class="caption" id="caption" data-testid="caption" aria-live="polite"></p>
          ${playerMarkup()}
          ${speedMarkup()}
          <div class="card-folds" id="card-folds" data-testid="card-folds">
            <div class="fold-buttons">
              <button type="button" class="fam-button" id="options" data-testid="options" aria-expanded="false" aria-controls="options-panel"><span data-say="options"></span><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 6l4.5 4.5L12.5 6"/></svg></button>
              <button type="button" class="fam-button" id="card-parts" data-testid="card-parts" aria-expanded="false" aria-controls="card-parts-panel"><span data-say="parts"></span><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 6l4.5 4.5L12.5 6"/></svg></button>
            </div>
            <div class="fold-panel" id="options-panel" data-testid="options-panel" role="group" data-say-label="options" hidden>
              <div id="colours" data-testid="colours-host"></div>
              <div class="fam-actions" id="options-switches" data-testid="options-switches">
                <button type="button" class="fam-button" id="guides" data-testid="guides" aria-pressed="true" data-say="guides"></button>
                <button type="button" class="fam-button" id="centres" data-testid="centres" aria-pressed="true" data-say="centres"></button>
                <button type="button" class="fam-button" id="widths" data-testid="widths" aria-pressed="true" data-say="widths"></button>
                <button type="button" class="fam-button" id="fill" data-testid="fill" aria-pressed="true" data-say="fill"></button>
                <button type="button" class="fam-button" id="compass-arm" data-testid="compass-arm" aria-pressed="true" data-say="compass_arm"></button>
                <button type="button" class="fam-button" id="widths-key" data-testid="widths-key" aria-pressed="true" data-say="widths_key"></button>
                <button type="button" class="fam-button" id="ink-draw" data-testid="ink-draw" aria-pressed="true" data-say="ink_draw"></button>
                <button type="button" class="fam-button" id="full-build" data-testid="full-build" aria-pressed="false" data-say="full_build"></button>
                <button type="button" class="fam-button" id="exits" data-testid="exits" aria-pressed="true" data-say="exits"></button>
                <button type="button" class="fam-button" id="invert" data-testid="invert" aria-pressed="false" data-say="invert"></button>
              </div>
            </div>
            <div class="fold-panel" id="card-parts-panel" data-testid="card-parts-panel" hidden>
              <div id="parts-row" data-testid="parts-row" role="group" data-say-label="parts"></div>
              <p class="part-about" id="part-about" data-testid="part-about" aria-live="polite"></p>
              <div class="fam-actions" id="part-actions" hidden>
                <button type="button" class="fam-button" id="draw-part" data-testid="draw-part" data-say="draw_part"></button>
                <a id="more-part" data-testid="more-part" data-say="more_part"></a>
              </div>
            </div>
          </div>
          <h3 data-say="construction"></h3>
          <p id="construction-note" data-testid="construction-note"></p>
          <p id="crest-note" class="fam-fine" data-testid="crest-note" hidden></p>
        </div>
      </div>
      <h3 data-say="families"></h3>
      <ul class="plain" id="families" data-testid="families"></ul>
      <h3 data-say="used_by"></h3>
      <ul class="users" id="used-by" data-testid="used-by"></ul>
      <p class="fam-fine" data-say="used_note"></p>
      <h3 data-say="use_title"></h3>
      <div class="embed" id="embed" data-testid="embed"></div>
      <div class="fam-actions downloads">
        <button type="button" class="fam-button" id="embed-copy" data-testid="embed-copy" data-say="copy"></button>
        <button type="button" class="fam-button" id="download-svg" data-testid="download-svg" data-say="download_svg"></button>
        <span class="png"><label class="fam-sr" for="png-size" data-say="png_size"></label><select id="png-size" class="fam-field" data-testid="png-size">${[128, 256, 512, 1024].map((size) => `<option value="${size}"${size === 512 ? " selected" : ""}>${size} px</option>`).join("")}</select><button type="button" class="fam-button" id="download-png" data-testid="download-png" data-say="download_png"></button></span>
      </div>
      <p class="fam-fine" id="copied" data-testid="copied" aria-live="polite"></p>
    </dialog>`;

const uses = [
  `import crest from "@johnmorrisdotca/kamon-crests/crests/mitsuba-aoi";  // one crest, one module`,
  `import { crest } from "@johnmorrisdotca/kamon-crests/load";`,
  `await crest("maru-ni-juji", { color: "#8a1c1c" })  // loaded when asked`,
  `findCrests({ motif: "paulownia" })  // every crest with paulownia`,
  `findCrests({ ring: true, count: 3 })  // ringed crests with three of something`,
  `await crestSteps("kikyo")  // how it is constructed, step by step`,
  `<kamon-crest crest="sasa-rindo" size="96" animate loop></kamon-crest>`,
];

const page = `<!doctype html>
<html lang="en">
  <head>
    ${familyHead({
      id,
      title: "Kamon Crests 家紋 — Japanese family crests as SVG",
      description: "Japanese family crests as SVG, drawn from their compass-and-ruler construction and broken into parts you can search: frame, motif, count and arrangement. Every crest can draw itself step by step. One module per crest, an element to embed one anywhere. Free and open source.",
      ogTitle: "Kamon Crests 家紋 — Japanese family crests as SVG",
      ogDescription: `${MANIFEST.length} crests drawn from their construction, searchable by their parts, each able to draw itself step by step, in English and Japanese.`,
    })}
    <link rel="icon" href="${ICON}" />
    <link rel="stylesheet" href="family.css" />
    <link rel="stylesheet" href="kamon.css" />
    ${menuHead("")}
  </head>
  <body>
    <main>
      ${siteHeader({ id, page: "demo", base: "" })}
      <div class="fam-tabs" role="tablist" data-testid="tabs">
        <button type="button" role="tab" id="tab-catalogue" aria-controls="catalogue-panel" data-tab="catalogue" data-say="tab_catalogue"></button>
        <button type="button" role="tab" id="tab-complexity" aria-controls="catalogue-panel" data-tab="complexity" data-say="tab_complexity"></button>
        <button type="button" role="tab" id="tab-parts" aria-controls="parts-panel" data-tab="parts" data-say="tab_parts"></button>
        <button type="button" role="tab" id="tab-latest" aria-controls="latest-panel" data-tab="latest" data-say="tab_latest"></button>
      </div>
      ${catalogue}
      ${parts}
      ${latestPanel}
      ${familyUnreviewed({ id })}
      <section class="more" aria-labelledby="more-title">
        <h2 id="more-title" data-say="moreTitle"></h2>
        <p data-say="moreText"></p>
        <ul class="uses">
          ${uses.map((line) => `<li><code>${escape(line)}</code></li>`).join("\n          ")}
        </ul>
      </section>
      ${familyFooter({ id })}
    </main>
    ${dialog}
    <script type="application/json" id="contributors-data">${JSON.stringify(contributedBy()).replace(/</g, "\\u003c")}</script>
    <script>${FAMILY_SCRIPT}</script>
    <script>${MENU_SCRIPT}</script>
    <script type="application/json" id="book-links">${inlineJson(book.links)}</script>
    <script type="module" src="demo.js"></script>
  </body>
</html>
`;

// The Coverage page: every named crest of the crest books, each ours (a drawing, linked to the catalogue) or still to draw (a dashed
// placeholder). Its list is the page's own JSON, with short keys: j ja, r reading, o romaji, e en, c chapter, f family, fe family in
// English, t tier, h our id (0 when not drawn), x 1 when only we have it, fr the family's reading, b our crest's place in the books' order (-1 when not drawn).
const coveragePage = (list) => {
  const data = JSON.stringify(list.entries.map((one) => ({ j: one.ja, r: one.reading, o: one.romaji, e: one.en, c: one.chapter, f: one.family, fe: one.familyEn ?? "", t: one.tier, h: one.have ?? 0, x: one.extra === true ? 1 : 0, fr: one.familyReading ?? "", b: one.have === null ? -1 : MANIFEST.findIndex((record) => record.id === one.have) }))).replace(/</g, "\\u003c");
  const fields = [
    row(["The order of the families: as the crest books keep them (by chapter, then by the reading of the name), or the ones with the most still to draw first.", "紋の種類の並び順を選びます。家紋帳と同じ順（分類ごとに、名前の読みの五十音順）か、まだ描いていない数が多い順です。"], `<span class="fam-label" data-say="order"></span><div class="choices" id="order-row" data-testid="order-row" role="group" data-say-label="order"></div>`),
    row(["Show only the crests that are drawn, or only the ones still missing.", "描き終えた家紋だけ、またはまだ描いていない家紋だけを表示します。"], `<span class="fam-label" data-say="cov_status"></span><div class="choices" id="status-row" data-testid="status-row" role="group" data-say-label="cov_status"></div>`),
    row(["How common the crest is. Tier 1 is a family's base form and the famous crests, tier 2 the common named variants, tier 3 the rarer ones.", "家紋の知られ方を選びます。ランク1は各紋の基本形と有名なもの、ランク2はよくある変わり紋、ランク3はまれなものです。"], `<span class="fam-label" data-say="cov_tier"></span><div class="choices" id="tier-row" data-testid="tier-row" role="group" data-say-label="cov_tier"></div>`),
  ].join("\n          ");

  return `<!doctype html>
<html lang="en">
  <head>
    ${familyHead({
      id,
      title: "Kamon Crests 家紋 — Coverage",
      description: "Every named Japanese family crest the crest books list, by chapter and family, with the ones Kamon Crests has drawn and the ones still to draw.",
      ogTitle: "Kamon Crests 家紋 — Coverage",
      ogDescription: `${list.total.have} of ${list.total.total} named crests drawn, by chapter and family.`,
    })}
    <link rel="icon" href="${ICON}" />
    <link rel="stylesheet" href="../family.css" />
    <link rel="stylesheet" href="../kamon.css" />
    ${menuHead("../")}
    <link rel="stylesheet" href="../coverage.css" />
  </head>
  <body>
    <main>
      ${siteHeader({ id, page: "coverage", base: "../" })}
      <section class="fam-panels" aria-labelledby="cov-title">
        <div class="fam-panel">
          <h2 id="cov-title" data-say="cov_title"></h2>
          <p class="blurb" data-say="cov_blurb"></p>
          <div class="cov-total" data-testid="total">
            <p class="big"><span id="total-text" data-testid="total-text"></span><small id="total-percent"></small></p>
            <span id="total-bar"></span>
          </div>
          <h3 data-say="cov_chapters"></h3>
          <ul class="cov-list cov-bars" id="bars" data-testid="bars"></ul>
          <div class="cov-heading"><h3 id="families-title"></h3><span class="cov-hint" id="families-hint" data-testid="families-hint"></span></div>
          <ul class="cov-list cov-families" id="families" data-testid="families"></ul>
          <div class="fam-actions"><button type="button" class="fam-button" id="families-more" data-testid="families-more" aria-pressed="false" hidden></button></div>
          ${fields}
          <div class="tools">
            <p class="count" id="count" data-testid="count" aria-live="polite"></p>
            <div class="fam-actions"><button type="button" class="fam-button" id="clear" data-testid="clear" data-say="clear"></button></div>
          </div>
          <ul class="grid" id="grid" data-testid="grid"></ul>
          <p class="fam-empty" id="empty" data-testid="empty" hidden></p>
        </div>
      </section>
      ${familyUnreviewed({ id })}
      ${familyFooter({ id })}
    </main>
    <script type="application/json" id="coverage-data">${data}</script>
    <script>${FAMILY_SCRIPT}</script>
    <script>${MENU_SCRIPT}</script>
    <script type="module" src="../coverage.js"></script>
  </body>
</html>
`;
};

const bookPage = () => `<!doctype html>
<html lang="en">
  <head>
    ${familyHead({
      id,
      title: "Kamon Crests 家紋 — Book",
      description: "Browse the designs and printed labels in the 1892 Japanese crest book 伊呂波分新撰紋帳.",
      ogTitle: "Kamon Crests 家紋 — Book",
      ogDescription: "An index to the 1892 Japanese crest book, with links to the National Diet Library.",
    })}
    <link rel="icon" href="${ICON}" />
    <link rel="stylesheet" href="../family.css" />
    <link rel="stylesheet" href="../kamon.css" />
    ${menuHead("../")}
    <link rel="stylesheet" href="../book.css" />
  </head>
  <body>
    <main class="book-main">
      ${siteHeader({ id, page: "book", base: "../" })}
      <section class="fam-panels" aria-labelledby="book-title">
        <div class="fam-panel book-panel">
          <h2 id="book-title" data-say="pageBook"></h2>
          <div class="book-frame">
            <span class="fam-label" id="book-frame-label" data-say="book_frames"></span>
            <div id="book-frames" class="book-frames" role="group" aria-labelledby="book-frame-label"></div>
          </div>
          <div class="book-spread">
            <div class="fam-seg" id="book-pages" role="group" data-say-label="book_pages">
              <button type="button" data-book-page="R" data-say="book_page_R"></button>
              <button type="button" data-book-page="L" data-say="book_page_L"></button>
            </div>
            <a id="book-source" data-say="book_source" target="_blank" rel="noopener"></a>
          </div>
          <div class="book-filters">
            <label for="book-search"><span class="fam-label" data-say="search"></span>
              <input type="search" id="book-search" class="fam-field" autocomplete="off" maxlength="80" data-say-placeholder="book_search_hint" />
            </label>
            <label for="book-family"><span class="fam-label" data-say="cov_family"></span>
              <select id="book-family" class="fam-field"></select>
            </label>
            <label for="book-status"><span class="fam-label" data-say="cov_status"></span>
              <select id="book-status" class="fam-field"></select>
            </label>
          </div>
          <p class="book-totals" id="book-totals" role="status"></p>
          <ol class="book-grid" id="book-grid" data-testid="book-grid" data-say-label="book_cells" role="list"></ol>
          <p id="book-empty" class="fam-empty" data-say="book_empty" hidden></p>
          <p class="fam-fine book-credit" data-say="book_credit"></p>
        </div>
      </section>
      ${familyUnreviewed({ id })}
      ${familyFooter({ id })}
    </main>
    <script type="application/json" id="book-data">${inlineJson({ cells: book.cells, families: book.families })}</script>
    <script>${FAMILY_SCRIPT}</script>
    <script>${MENU_SCRIPT}</script>
    <script type="module" src="../book.js"></script>
  </body>
</html>
`;

// The Samurai page: famous samurai and the crests their houses bore, each drawing itself; a crest still to draw links to its issue.
// Its list is the page's own JSON from scripts/samurai.mjs: demo only, nothing of it is in the package.
const samuraiPage = () => {
  const data = JSON.stringify(SAMURAI.map((one) => ({ ...one, wanted: (one.wanted ?? []).map((want) => ({ ...want, link: wantedLink(want) })) }))).replace(/</g, "\\u003c");

  return `<!doctype html>
<html lang="en">
  <head>
    ${familyHead({
      id,
      title: "Kamon Crests 家紋 — Samurai",
      description: "The crests of Japan's famous samurai, from Oda Nobunaga and Tokugawa Ieyasu to Takeda Shingen and Sanada Yukimura, each drawing itself from its compass-and-ruler construction.",
      ogTitle: "Kamon Crests 家紋 — Samurai and their crests",
      ogDescription: `The crests of ${SAMURAI.length} famous samurai, each drawing itself step by step.`,
    })}
    <link rel="icon" href="${ICON}" />
    <link rel="stylesheet" href="../family.css" />
    <link rel="stylesheet" href="../kamon.css" />
    ${menuHead("../")}
    <link rel="stylesheet" href="../samurai.css" />
  </head>
  <body>
    <main>
      ${siteHeader({ id, page: "samurai", base: "../" })}
      <section class="fam-panels" aria-labelledby="sam-title">
        <div class="fam-panel">
          <h2 id="sam-title" data-say="sam_title"></h2>
          <p class="blurb" data-say="sam_blurb"></p>
          <ul class="sam-grid" id="samurai" data-testid="samurai"></ul>
        </div>
      </section>
      ${familyUnreviewed({ id })}
      ${familyFooter({ id })}
    </main>
    <script type="application/json" id="samurai-data">${data}</script>
    <script>${FAMILY_SCRIPT}</script>
    <script>${MENU_SCRIPT}</script>
    <script type="module" src="../samurai.js"></script>
  </body>
</html>
`;
};

// The Build page: a reader composes a crest from the package's own drawings (a frame, a motif, how many, how they are set out, which way
// it turns) and it draws itself the way every crest does. The logic is demo/compose.js and the page's script demo/build.js: demo only,
// nothing of it is in the package, and nothing runs on a server.
const BUILD_PLAYER = { player: "bld-player", restart: "bld-restart", back: "bld-back", toggle: "bld-toggle", forward: "bld-forward", scrub: "bld-scrub", speed: "bld-speed", caption: "bld-caption" };
const buildPage = () => {
  const tab = (name) => `<button type="button" role="tab" id="bld-tab-${name}" aria-controls="bld-chips" data-testid="bld-tab-${name}"><span data-say="${name === "turn" ? "bld_turn" : name}"></span><small id="bld-val-${name}" data-testid="bld-val-${name}"></small></button>`;

  return `<!doctype html>
<html lang="en">
  <head>
    ${familyHead({
      id,
      title: "Kamon Crests 家紋 — Build your own crest",
      description: "Compose a Japanese family crest from the package's own drawings: pick a frame, a motif, how many of it and how they are set out, and watch it draw itself from its compass-and-ruler construction. Download it as SVG.",
      ogTitle: "Kamon Crests 家紋 — Build your own crest",
      ogDescription: "Pick a frame, a motif, a count and an arrangement, and the crest draws itself step by step, named in English and Japanese.",
    })}
    <link rel="icon" href="${ICON}" />
    <link rel="stylesheet" href="../family.css" />
    <link rel="stylesheet" href="../kamon.css" />
    ${menuHead("../")}
    <link rel="stylesheet" href="../build.css" />
  </head>
  <body>
    <main>
      ${siteHeader({ id, page: "build", base: "../" })}
      <section class="fam-panels" aria-labelledby="bld-title">
        <div class="fam-panel">
          <h2 id="bld-title" data-say="bld_title"></h2>
          <p class="blurb" data-say="bld_blurb"></p>
          <div class="bld">
            <div class="bld-stage">
              <div class="bld-pic" id="bld-pic" data-testid="bld-pic" role="img" data-say-label="bld_picture"></div>
              <h3 class="bld-name"><span id="bld-name" data-testid="bld-name"></span><small id="bld-name-other" data-testid="bld-name-other" lang="ja"></small></h3>
              <div class="fam-actions">
                <button type="button" class="fam-button" id="bld-draw" data-testid="bld-draw" data-say="bld_draw"></button>
                <button type="button" class="fam-button" id="bld-finished" data-testid="bld-finished" aria-pressed="false" data-say="bld_finished"></button>
                <button type="button" class="fam-button" id="bld-download" data-testid="bld-download" data-say="download_svg"></button>
              </div>
              ${playerMarkup({ ids: BUILD_PLAYER, loop: false })}
              <div class="fam-actions">
                ${speedMarkup({ ids: BUILD_PLAYER })}
                <button type="button" class="fam-button" id="bld-animate" data-testid="bld-animate" aria-pressed="true" data-say="bld_animate"></button>
              </div>
              <p class="caption bld-caption" id="bld-caption" data-testid="bld-caption" aria-live="polite"></p>
            </div>
            <div class="bld-controls">
              <div class="bld-tabs" role="tablist" data-testid="bld-tabs">${["frame", "motif", "count", "arrangement", "turn"].map(tab).join("")}</div>
              <div class="choices bld-chips" id="bld-chips" data-testid="bld-chips" role="tabpanel"></div>
              <p class="bld-about" id="bld-about" data-testid="bld-about" aria-live="polite"></p>
              <p class="bld-how" id="bld-how" data-testid="bld-how"></p>
              <div id="bld-match" data-testid="bld-match" aria-live="polite"></div>
            </div>
            <div class="bld-colours card-folds" data-testid="bld-options-fold">
              <div class="fold-buttons">
                <button type="button" class="fam-button" id="bld-options" data-testid="bld-options" aria-expanded="false" aria-controls="bld-options-panel"><span data-say="options"></span><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 6l4.5 4.5L12.5 6"/></svg></button>
              </div>
              <div class="fold-panel" id="bld-options-panel" data-testid="bld-options-panel" role="group" data-say-label="options" hidden>
                <div id="bld-colours" data-testid="bld-colours-host"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      ${familyUnreviewed({ id })}
      ${familyFooter({ id })}
    </main>
    <script>${FAMILY_SCRIPT}</script>
    <script>${MENU_SCRIPT}</script>
    <script type="module" src="../build.js"></script>
  </body>
</html>
`;
};

rmSync("site", { recursive: true, force: true });
mkdirSync("site", { recursive: true });
cpSync("demo", "site", { recursive: true });
// The page imports the ESM build and shows the SVG files; the type declarations are left out.
cpSync("dist", "site/dist", { recursive: true, filter: (source) => !/\.d\.ts$/.test(source) });
writeFileSync("site/index.html", page);
writeFileSync("site/latest-data.js", `export const releases = ${JSON.stringify(latest)};\nexport const japanese = ${JSON.stringify(latestJapanese)};\n`);
// The Coverage page, from docs/coverage/kamon.json and the built package: demo only, nothing of it is in the package.
mkdirSync("site/coverage", { recursive: true });
writeFileSync("site/coverage/index.html", coveragePage(coverageList));
mkdirSync("site/book", { recursive: true });
writeFileSync("site/book/index.html", bookPage());
mkdirSync("site/build", { recursive: true });
writeFileSync("site/build/index.html", buildPage());
mkdirSync("site/samurai", { recursive: true });
writeFileSync("site/samurai/index.html", samuraiPage());
// The API reference, made from the source: every export of every entry point, and a word on the crests' own entries.
const api = apiBody();
api.html = `<section class="api-entry" id="crests-"><h2><code>@johnmorrisdotca/kamon-crests/crests/&lt;id&gt;</code></h2>
        <p>One module for each of the ${MANIFEST.length} crests, named by its id: <code>/crests/mitsuba-aoi</code>, <code>/crests/janome</code>. Each exports the crest's SVG string as its default export and as <code>svg</code>. The same SVG is a file at <code>@johnmorrisdotca/kamon-crests/svg/&lt;id&gt;.svg</code>, and every crest's record is in <code>@johnmorrisdotca/kamon-crests/manifest.json</code>. <code>/steps/&lt;id&gt;</code> is the crest's construction, loaded only when it is drawn step by step.</p>
        <pre>import aoi from "@johnmorrisdotca/kamon-crests/crests/mitsuba-aoi";
import construction from "@johnmorrisdotca/kamon-crests/steps/mitsuba-aoi";</pre>
      </section>\n${api.html}`;
writeFileSync("site/api.css", API_CSS);
// The reference page says the pages' names and the Menu's words as the demo does.
const apiWords = Object.fromEntries(["en", "ja"].map((lang) => [lang, { ...API_WORDS[lang], ...Object.fromEntries(NAV_KEYS.map((key) => [key, WORDS[lang][key]])) }]));
writeFileSync("site/api.html", apiPage({ id, name: "Kamon Crests", icon: ICON, api, header: siteHeader({ id, page: "api", base: "" }), head: menuHead(""), script: MENU_SCRIPT, words: apiWords }));
// GitHub Pages lets a browser keep a file for ten minutes, so the page of a new build could run the script of the last one. Every
// local script and stylesheet address says which build it is from, in the pages and in each module's own imports (every import
// of a module the same, or it would be loaded twice): the commit on Pages, the version in a build made by hand.
const stamp = process.env.GITHUB_SHA?.slice(0, 7) ?? JSON.parse(readFileSync("package.json", "utf8")).version;
for (const name of readdirSync("site", { recursive: true })) {
  const file = join("site", name);
  if (name.endsWith(".js")) writeFileSync(file, readFileSync(file, "utf8").replace(/(\bfrom\s*|\bimport\s*\(?\s*)(["'])(\.\.?\/[^"']+\.js)\2/g, `$1$2$3?v=${stamp}$2`));
  if (name.endsWith(".html")) writeFileSync(file, readFileSync(file, "utf8").replace(/(<script\b[^>]*\ssrc=|<link\b[^>]*\shref=)"(?![a-z]+:|\/\/)([^"?#]+)"/g, `$1"$2?v=${stamp}"`));
}
console.log("site/ is ready: serve it with `node scripts/serve.mjs 8850`, or let the Pages workflow publish it.");
