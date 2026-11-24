// Who uses each crest today, with the public pages that say so and the day each was read. Only what a source states is here:
// the package draws the historical crest, never a company's own logo, and the relation is stated as a fact with its source.
import type { UsedByEntry } from "./types.ts";

const READ = "2026-11-24";

export const USED_BY: Record<string, UsedByEntry[]> = {
  "mitsu-gashiwa": [
    {
      name: { en: "Mitsubishi", ja: "三菱" },
      kind: "company",
      relation: "logo-derived",
      note: {
        en: "Mitsubishi's three-diamond mark is described by Mitsubishi Electric as suggestive of the three-leaf crest of the Tosa Clan, Yataro Iwasaki's first employer, and of the three stacked rhombuses of the Iwasaki family crest.",
        ja: "三菱電機は、三菱のスリーダイヤのマークを、岩崎弥太郎の最初の主君であった土佐藩の三つ葉の家紋と、岩崎家の三階菱の家紋を思わせるものと説明しています。",
      },
      sources: [{ title: "More about the Logo (Mitsubishi Electric)", url: "https://www.mitsubishielectric.com/en/about/history/logo/logo_more.html", read: READ }],
    },
  ],
  igeta: [
    {
      name: { en: "Sumitomo Group", ja: "住友グループ" },
      kind: "company",
      relation: "logo-derived",
      note: {
        en: "The Sumitomo trademark is an igeta, a diamond-shaped grid like a well's wooden frame, first used for Riemon Soga's Kyoto copper business in 1590; in 1913 Sumitomo drew its own version with proportions of its own, which is the mark in use.",
        ja: "住友の商標は井桁（井戸の木枠のような菱形の格子）で、1590年に蘇我理右衛門が京都で始めた銅の商いに用いたのが最初です。1913年に住友独自の比率で描き直したものが現在のマークです。",
      },
      sources: [{ title: "Close History of Igeta, the Sumitomo Trademark (Sumitomo Group)", url: "https://www.sumitomo.gr.jp/english/history/chronology/08", read: READ }],
    },
  ],
  kikko: [
    {
      name: { en: "Kikkoman", ja: "キッコーマン" },
      kind: "company",
      relation: "name-derived",
      note: {
        en: "Kikkoman's name is written 亀甲萬: kikkō is the tortoise-shell pattern, and its hexagon mark is said to have been first used around 1820.",
        ja: "キッコーマンの名は、亀の甲羅の模様である「亀甲」に由来します。六角形マークは1820年ごろに使われ始めたと言われています。",
      },
      sources: [
        { title: "しょうゆのはてな (Kikkoman)", url: "https://www.kikkoman.co.jp/homecook/kids/hatena.html", read: READ },
        { title: "「キッコーマン六角形マーク」について (Kikkoman)", url: "https://www.kikkoman.com/jp/quality/ip/topics3.html", read: READ },
      ],
    },
  ],
};
