// The 1892 book's indexed cells get their state from the catalogue's exact source coordinates and the editorial holds.
import { readFileSync, writeFileSync } from "node:fs";

const bookFile = (name) => new URL("../docs/coverage/" + name, import.meta.url);
const readBookFile = (name) => JSON.parse(readFileSync(bookFile(name), "utf8"));
const bookId = "https://dl.ndl.go.jp/pid/780550";
const ordinal = { first: 1, second: 2, third: 3, fourth: 4, top: 1, bottom: 4 };
const kanjiNumber = { 一: 1, 二: 2, 三: 3, 四: 4 };
const pagePosition = /^(?:the )?(left|right)(?:-hand)? page,?\s+(?:the )?(?:(first|second|third|fourth|top|bottom) row|row ([1-4])),?\s+(?:the )?(?:(first|second|third|fourth) (?:column|cell)\b|(leftmost|rightmost) (?:column|cell)\b|cell at the page's (left|right) edge)/iu;
const japanesePosition = /^([左右])頁[、の]([一二三四])段目[、の]?右から([一二三四])(?:列目|つめ)/u;

export const bookCellKey = ({ frame, page, row, col }) => [frame, page, row, col].join("-");
export const bookPageKey = ({ frame, page }) => frame + page;

export function bookSourceCell(source) {
  if (source?.url !== bookId) return null;
  const position = pagePosition.exec(source.place.en);
  if (position) {
    const [, side, row, rowNumber, column, edgeCell, edge] = position.map((word) => word?.toLowerCase());
    return {
      frame: source.frame,
      page: side === "right" ? "R" : "L",
      row: rowNumber === undefined ? ordinal[row] : Number(rowNumber),
      col: column === undefined ? edgeCell === "rightmost" || edge === "right" ? 1 : 4 : ordinal[column],
    };
  }
  const japanese = japanesePosition.exec(source.place.ja);
  if (japanese) {
    const [, side, row, col] = japanese;
    return { frame: source.frame, page: side === "右" ? "R" : "L", row: kanjiNumber[row], col: kanjiNumber[col] };
  }
  return null;
}

export const emptyBookCounts = () => ({ cells: 0, drawn: 0, missing: 0, held: 0 });
const addCell = (counts, status) => {
  counts.cells += 1;
  counts[status] += 1;
};

export function bookStates(index, catalogue, heldCells) {
  const held = new Set(heldCells);
  const indexed = new Set(index.map(bookCellKey));
  const sources = new Map();
  // A variant can cite its base's cell. Keep all reverse links and give the cell the first numbered drawing.
  for (const record of [...catalogue].sort((a, b) => a.no - b.no)) {
    const location = bookSourceCell(record.source);
    if (location === null) continue;
    const key = bookCellKey(location);
    if (!indexed.has(key)) continue;
    if (sources.has(key)) sources.get(key).push(record.id);
    else sources.set(key, [record.id]);
  }
  const totals = emptyBookCounts();
  const frames = {};
  const pages = {};
  const cells = {};
  for (const cell of index) {
    const key = bookCellKey(cell);
    const crestIds = sources.get(key);
    const status = crestIds !== undefined ? "drawn" : held.has(key) ? "held" : "missing";
    cells[key] = { status, ...(crestIds === undefined ? {} : { crestIds }) };
    addCell(totals, status);
    addCell(frames[cell.frame] ??= emptyBookCounts(), status);
    addCell(pages[bookPageKey(cell)] ??= emptyBookCounts(), status);
  }
  return { cells, counts: { totals, frames, pages } };
}

export function writeBookStates(catalogue) {
  const index = readBookFile("book-1892.json");
  const heldCells = readBookFile("book-1892-holds.json");
  const states = bookStates(index, catalogue, heldCells);
  writeFileSync(bookFile("book-1892-states.json"), JSON.stringify(states, null, 2) + "\n");
}

export function bookData(index, manifest, familyLabels, states) {
  const byId = new Map(manifest.map((record) => [record.id, record]));
  const familyNames = new Map(familyLabels.map((family) => [family.ja, family.en]));

  const pages = [...index].sort((a, b) => a.frame - b.frame || b.page.localeCompare(a.page) || a.row - b.row || a.col - b.col);
  const links = new Map();
  const cells = pages.map(({ frame, page, row, col, label, name, reading, family }) => {
    const location = { frame, page, row, col };
    const { status, crestIds = [] } = states.cells[bookCellKey(location)];
    const record = byId.get(crestIds[0]);
    if (crestIds.length > 0) {
      const query = new URLSearchParams({ tab: "book", frame: String(frame), page });
      const href = "?" + query.toString() + "#cell-" + bookCellKey(location);
      for (const id of crestIds) {
        if (!links.has(id)) links.set(id, []);
        links.get(id).push({ href, ...location });
      }
    }
    return {
      ...location, label, family, status,
      ourId: record?.id ?? null,
      name: record?.name.ja ?? name,
      reading: record?.name.reading ?? reading,
      nameEn: record?.name.en ?? null,
    };
  });

  const families = [...new Set(cells.map(({ family }) => family).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "ja"))
    .map((ja) => ({ ja, en: familyNames.get(ja) ?? null }));
  return { cells, families, counts: states.counts, links: Object.fromEntries(links) };
}
