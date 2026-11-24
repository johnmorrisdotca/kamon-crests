// The documents: the guides in both languages, the family's community files, the notice, and nothing in the repository
// that names a tool. A guide has a Japanese twin with the same front matter shape; every relative link points at a file.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const guides = readdirSync("docs/guides").filter((file) => file.endsWith(".md"));
const front = (text) => Object.fromEntries((/^---\n([\s\S]*?)\n---\n/.exec(text)?.[1] ?? "").split("\n").map((line) => [line.slice(0, line.indexOf(":")), line.slice(line.indexOf(":") + 1).trim()]));

describe("the guides", () => {
  it("are in English and in Japanese, one for one", () => {
    expect(guides.length).toBeGreaterThanOrEqual(9);
    expect(readdirSync("docs/guides/ja").filter((file) => file.endsWith(".md")).sort()).toEqual([...guides].sort());
  });

  for (const file of guides) {
    it(`${file} has the same front matter shape in both languages, and the Japanese in Japanese`, () => {
      const en = readFileSync(join("docs/guides", file), "utf8");
      const ja = readFileSync(join("docs/guides/ja", file), "utf8");
      expect(Object.keys(front(en))).toEqual(["title", "section", "order", "description"]);
      expect(Object.keys(front(ja))).toEqual(Object.keys(front(en)));
      expect(front(ja).order).toBe(front(en).order);
      expect(front(ja).section).toBe(front(en).section);
      expect(front(ja).title).toMatch(/[぀-ヿ㐀-鿿]/);
      expect(ja).toMatch(/[぀-ヿ]/);
      const fences = (text) => (text.match(/^```/gm) ?? []).length;
      expect(fences(ja)).toBe(fences(en));
    });
  }

  it("link only to files that exist", () => {
    const places = ["README.md", "CONTRIBUTING.md", "NOTICE.md", ...guides.map((g) => `docs/guides/${g}`), ...guides.map((g) => `docs/guides/ja/${g}`), "docs/plan.md", "docs/provenance.md"];
    for (const place of places) {
      const text = readFileSync(place, "utf8").replace(/```[\s\S]*?```/g, "");
      for (const link of text.matchAll(/\]\((?!https?:|#|mailto:)([^)\s#]+)(?:#[^)]*)?\)/g)) {
        expect(existsSync(resolve(dirname(place), link[1])), `${place} links to ${link[1]}`).toBe(true);
      }
    }
  });
});

describe("the repository's own files", () => {
  it("keep the family's community files and the shared start of CONTRIBUTING.md", () => {
    for (const file of ["SECURITY.md", "CODE_OF_CONDUCT.md"]) expect(readFileSync(file, "utf8"), file).toBe(readFileSync(`scripts/community/${file}`, "utf8"));
    const master = readFileSync("scripts/community/CONTRIBUTING.md", "utf8").trimEnd();
    expect(readFileSync("CONTRIBUTING.md", "utf8").startsWith(master)).toBe(true);
    expect(readFileSync("CONTRIBUTING.md", "utf8")).toContain("## Particular to Kamon Crests");
  });

  it("states the licence as MIT, names the sources of every present-day user, and carries the two notes", () => {
    const notice = readFileSync("NOTICE.md", "utf8");
    expect(readFileSync("LICENSE", "utf8")).toMatch(/^MIT License/);
    expect(notice).toContain("Article 4(1)(i)");
    expect(notice).toContain("菊花紋章");
    for (const url of ["mitsubishielectric.com/en/about/history/logo/logo_more.html", "sumitomo.gr.jp/english/history/chronology/08", "kikkoman.co.jp/homecook/kids/hatena.html", "kikkoman.com/jp/quality/ip/topics3.html"]) expect(notice).toContain(url);
    expect(readFileSync("README.md", "utf8")).toContain("Article 4(1)(i)");
    expect(readFileSync("docs/guides/using-these-crests.md", "utf8")).toContain("Article 4(1)(i)");
    expect(readFileSync("docs/guides/ja/using-these-crests.md", "utf8")).toContain("第4条第1項第1号");
  });

  it("names the port block in AGENTS.md, and the workflows by the names npm's trusted publisher expects", () => {
    expect(readFileSync("AGENTS.md", "utf8")).toContain("8850 to 8874");
    expect(existsSync(".github/workflows/release.yml")).toBe(true);
    expect(readFileSync(".github/workflows/release.yml", "utf8")).toContain("npm publish --provenance");
  });

  it("names no tool that wrote anything, and carries no attribution line", () => {
    const banned = new RegExp([["Co-Authored", "By"].join("-"), ["Generated", "with"].join(" "), ["Clau", "de"].join(""), ["Anthro", "pic"].join(""), ["Chat", "GPT"].join(""), ["Copi", "lot"].join("")].join("|"), "i");
    const skip = new Set(["node_modules", ".git", "dist", "site", "test-results", "playwright-report", "pnpm-lock.yaml"]);
    const walk = (dir) => readdirSync(dir).flatMap((name) => (skip.has(name) ? [] : statSync(join(dir, name)).isDirectory() ? walk(join(dir, name)) : [join(dir, name)]));
    for (const file of walk(".").filter((one) => /\.(md|ts|js|mjs|json|yml|yaml|css|cff|html)$/.test(one))) expect(readFileSync(file, "utf8").match(banned)?.[0], file).toBeUndefined();
  });
});
