import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { bookCellKey, bookData, bookPageKey, bookSourceCell, bookStates } from "../scripts/book-data.mjs";
import { ALL } from "../scripts/crests/index.ts";
import { NUMBERS } from "../scripts/crests/numbers.ts";
import { RECORDS } from "./data/records.data.ts";

const cell = (values) => ({
  frame: 39, page: "R", row: 1, col: 1, label: "きく", name: "菊", reading: "きく", family: "菊",
  labelConfidence: "sure", ourId: null, ...values,
});
const source = (en, ja = "") => ({ url: "https://dl.ndl.go.jp/pid/780550", frame: 39, place: { en, ja } });
const crest = (id, no, ja, citation) => ({ id, no, name: { ja, en: "Chrysanthemum", reading: "きく" }, source: citation });

const readBookFile = (name) => JSON.parse(readFileSync(new URL("../docs/coverage/" + name, import.meta.url), "utf8"));
const countsOf = (cells) => Object.fromEntries([
  ["cells", cells.length], ...["drawn", "missing", "held"].map((status) => [status, cells.filter((cell) => cell.status === status).length]),
]);

describe("1892 book data", () => {
  it("uses exact coordinates in the source and preserves the page order and reverse links", () => {
    const index = [cell({ page: "L", col: 2, name: "裏菊", ourId: "different" }), cell({ col: 2, name: "菊" }), cell({})];
    const families = [{ ja: "菊", en: "Chrysanthemum" }];
    const manifest = [
      crest("kiku", 1, "菊", source("right page, first row, first column from the right")),
      crest("ura", 2, "裏菊", source("left page, row 1, second cell from the right")),
    ];
    const states = bookStates(index, manifest, []);
    const result = bookData(index, manifest, families, states);
    expect(result.cells.map(({ page, col, ourId, status }) => [page, col, ourId, status])).toEqual([
      ["R", 1, "kiku", "drawn"],
      ["R", 2, null, "missing"],
      ["L", 2, "ura", "drawn"],
    ]);
    expect(result.links.kiku).toEqual([{ href: "?tab=book&frame=39&page=R#cell-39-R-1-1", frame: 39, page: "R", row: 1, col: 1 }]);
    expect(result.families).toEqual(families);
  });

  it("counts a shared citation once and lets a current drawing clear a hold", () => {
    const index = [cell({ labelConfidence: "unsure", name: null, reading: null }), cell({ col: 4 }), cell({ col: 3, ourId: "shared" })];
    const citation = source("right page, first row, rightmost cell");
    const manifest = [
      crest("later", 3, "三つ菊", citation),
      crest("first", 1, "菊", citation),
      crest("different-book", 4, "菊", { ...source("right page, first row, leftmost cell"), url: "https://dl.ndl.go.jp/pid/780551" }),
    ];
    const states = bookStates(index, manifest, ["39-R-1-1", "39-R-1-4"]);
    const result = bookData(index, manifest, [], states);
    expect(result.cells.map(({ ourId, status }) => [ourId, status])).toEqual([["first", "drawn"], [null, "missing"], [null, "held"]]);
    expect(result.cells[0].reading).toBe("きく");
    expect(result.links.later).toEqual(result.links.first);
    expect(result.counts.totals).toEqual({ cells: 3, drawn: 1, missing: 1, held: 1 });
  });

  it("reads page-edge wording and the right-to-left Japanese coordinates", () => {
    expect(bookSourceCell(source("left page, third row, the cell at the page's left edge"))).toEqual({ frame: 39, page: "L", row: 3, col: 4 });
    expect(bookSourceCell(source("in the middle of the spread", "右頁、四段目、右から二列目「菊」"))).toEqual({ frame: 39, page: "R", row: 4, col: 2 });
    expect(bookSourceCell(source("somewhere on the spread"))).toBeNull();
  });

  it("matches the current catalogue's exact cited cells in every displayed count", () => {
    const index = readBookFile("book-1892.json");
    const holds = readBookFile("book-1892-holds.json");
    const stored = readBookFile("book-1892-states.json");
    const catalogue = ALL.map(({ id, source }) => ({ id, no: NUMBERS[id], source }));
    const { cells, counts, links } = bookData(index, RECORDS, [], stored);
    const indexed = new Set(index.map(bookCellKey));
    const cited = new Set(catalogue.flatMap((record) => {
      const location = bookSourceCell(record.source);
      return location !== null && indexed.has(bookCellKey(location)) ? [bookCellKey(location)] : [];
    }));
    expect(stored).toEqual(bookStates(index, catalogue, holds));
    expect(cells).toHaveLength(index.length);
    expect(indexed.size).toBe(index.length);
    expect(counts.totals).toEqual(countsOf(cells));
    expect(counts.totals.drawn).toBe(cited.size);
    expect(counts.totals.held).toBe(holds.filter((key) => indexed.has(key) && !cited.has(key)).length);
    expect(cells.filter((cell) => cell.status === "drawn").every((cell) => cell.ourId in links)).toBe(true);
    for (const [frame, summary] of Object.entries(counts.frames)) {
      expect(summary).toEqual(countsOf(cells.filter((cell) => cell.frame === Number(frame))));
    }
    for (const [page, summary] of Object.entries(counts.pages)) {
      expect(summary).toEqual(countsOf(cells.filter((cell) => bookPageKey(cell) === page)));
    }
  });
});
