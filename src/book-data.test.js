import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { bookData } from "../scripts/book-data.mjs";
import { RECORDS } from "./data/records.data.ts";

const cell = (values) => ({
  frame: 39, page: "R", row: 1, col: 1, label: "きく", name: "菊", reading: "きく", family: "菊",
  labelConfidence: "sure", ourId: null, ...values,
});
const crest = (id, ja, aliases = []) => ({ id, name: { ja, en: "Chrysanthemum" }, aliases });

describe("1892 book data", () => {
  it("recognizes later catalogue entries and preserves the book order and reverse links", () => {
    const input = [cell({ page: "L", col: 2, name: "裏菊", ourId: "ura" }), cell({ col: 2, name: "菊二" }), cell({})];
    const families = [{ ja: "菊", en: "Chrysanthemum" }];
    expect(bookData(input, [], families).cells.map(({ status }) => status)).toEqual(["missing", "missing", "missing"]);
    const result = bookData(input, [crest("kiku", "菊"), crest("ura", "裏菊")], families);
    expect(result.cells.map(({ page, col, ourId, status }) => [page, col, ourId, status])).toEqual([
      ["R", 1, "kiku", "drawn"],
      ["R", 2, null, "missing"],
      ["L", 2, "ura", "drawn"],
    ]);
    expect(result.links.kiku).toEqual([{ href: "?tab=book&frame=39&page=R#cell-39-R-1-1", frame: 39, page: "R", row: 1, col: 1 }]);
    expect(result.families).toEqual(families);
  });

  it("leaves unresolved labels, duplicate names and unknown explicit IDs for review", () => {
    const result = bookData([
      cell({ name: "一つ菊", ourId: "future" }),
      cell({ col: 2, labelConfidence: "unsure", name: "裏菊" }),
      cell({ col: 3 }),
      cell({ col: 4 }),
      cell({ row: 2, name: "十六菊" }),
    ], [crest("kiku", "菊", ["一つ菊", "十六菊"]), crest("ura", "裏菊", ["十六菊"])], []);
    expect(result.cells.map(({ status }) => status)).toEqual(["missing", "held", "missing", "missing", "missing"]);
    expect(result.links).toEqual({});
  });

  it("keeps every indexed cell and resolves at least one published drawing", () => {
    const index = JSON.parse(readFileSync(new URL("../docs/coverage/book-1892.json", import.meta.url), "utf8"));
    const { cells, links } = bookData(index, RECORDS, []);
    expect(cells).toHaveLength(index.length);
    expect(new Set(cells.map(({ frame, page, row, col }) => `${frame}-${page}-${row}-${col}`)).size).toBe(index.length);
    expect(cells.some(({ status }) => status === "held")).toBe(true);
    expect(Object.keys(links).length).toBeGreaterThan(0);
  });
});
