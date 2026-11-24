---
title: 部品と検索
section: concept
order: 3
description: 家紋の枠・図柄・数・配置はデータなので、ページで検索できます。
---

## 部品

どの家紋も、次のもので説明されます。

- **枠**：なし、細輪、中太輪、亀甲、木瓜。
- **図柄**：何を描いたものか（桐、巴、葵、扇、三日月など）。それぞれに**数**（いくつか）と**配置**（単独、巡り、違い、下がり、品の字など）、デザインの一部である場合は**向き**（左・右）があります。

各部品には、ID、英語、日本語、ひらがなの読み、ローマ字、そして何であるかを示す一文があります。`/parts` を見てください。

```ts
import { term } from "@johnmorrisdotca/kamon-crests/parts";

console.log(term("tomoe")); // { id: "tomoe", en: "Tomoe", ja: "巴", reading: "ともえ", … }
```

## 検索

```ts
import { findCrests } from "@johnmorrisdotca/kamon-crests/search";

findCrests({ motif: "paulownia" });               // 桐を持つ家紋すべて
findCrests({ ring: true });                       // 輪のある家紋すべて
findCrests({ count: 3 });                         // 三つのものを持つ家紋すべて
findCrests({ ring: true, motifKind: "plant" });   // 輪のある植物の家紋
findCrests({ text: "Tokugawa" });                 // 名前・家・読み・部品
```

指定した項目はすべて一致する必要があり、複数の値を持つ項目はそのどれかに一致します。文字は正規化されます。大文字小文字、アクセントと長音記号、カタカナとひらがな、空白とハイフンを区別しないので、`kikko` は `Kikkō` を、`ともえ` は `トモエ` を見つけます。`facets()` は各部品を持つ家紋の数を数え、絞り込みの後にも数え直します。ページの選択肢に付ける数字です。`partsOf(record)` は、一つの家紋の部品を読む順に並べます。

## 数えたもの

どの家紋のレコードにも `stats` があります。コンパスと定規でその家紋を描くときの数です。`pnpm data` が作図データから数え、テストが手順からもう一度数えます。手で書いた数は一つもありません。

| 項目 | English | 数えるもの |
| --- | --- | --- |
| `circles` | Circles | 手順の中でコンパスで描く円（どれも一周分）。 |
| `lines` | Ruled lines | 定規で引く直線。四角のように辺がいくつもある補助線は、辺ごとに数えます。 |
| `arcs` | Arcs | 墨を入れる弧。仕上がりの形の曲がった辺の数です。同じ円の上で続く弧は一つと数えるので、円一周は一つです。まだ本からなぞっている家紋は曲線一つを一つと数えるため、数百になります。 |
| `steps` | Steps | 作図の手順の数。補助線、描く形、回して写す手順、補助線を消す手順を数えます。 |
| `widths` | Compass widths | コンパスの幅の種類。円の半径が何種類あるかです。 |
| `fills` | Fills | 塗りつぶした形の数。 |
| `score` | Score | 円・直線・弧を合わせた数。下の「複雑さ」を見てください。 |
| `symmetry` | Symmetry | `turns`：仕上がりの家紋を回して同じに見える位置の数（1はなし、0は円のようにどの向きでも同じ）。`mirror`：線対称かどうか。 |

デモのカードには `円 12・直線 6・手順 23・コンパス幅 3種` のように一行で出ます。英語では `Circles 12 · Ruled lines 6 · Steps 23 · Compass widths 3` です。

```ts
import { manifest } from "@johnmorrisdotca/kamon-crests/manifest";
import { findCrests } from "@johnmorrisdotca/kamon-crests/search";

manifest("janome")?.stats;                          // { circles: 2, lines: 0, arcs: 2, steps: 8, widths: 2, fills: 1, symmetry: { turns: 0, mirror: true } }
findCrests({ circles: 5 });                         // 円がちょうど五つの家紋すべて
findCrests({ circles: { min: 10 } });               // 円が十以上。`max` で上の端を決めます
findCrests({ sort: "strokes" });                    // 画数の少ない順。漢字を画数で並べるのと同じです
findCrests({ ring: true, sort: "arcs", order: "desc" });
```

`sort` にはどの項目も使えます。`strokes` は円・直線・弧を合わせた数です。同じ数の家紋は、一覧の順のままです。

## 複雑さ

家紋の**複雑さ**（`score`）は `circles + lines + arcs`、つまりコンパスで描く円、定規で引く直線、墨を入れる弧を合わせた数です。レコードの `stats.score` に入っています。同じ数の家紋は `steps`（手順）の少ない順、その次は一覧の順に並びます。蛇の目は4（円二つ、弧二つ）、丸に三つ葉葵は281です。

```ts
import { findCrests, rankCrests } from "@johnmorrisdotca/kamon-crests/search";

rankCrests();                                       // すべての家紋を簡単な順に
rankCrests({ by: "circles", order: "desc" });       // どの数でも、多い順にも
rankCrests({}, findCrests({ ring: true }));         // 輪のある家紋を簡単な順に
rankCrests({ redrawing: true });                    // 描き直し中の家紋も、ほかの家紋と一緒に並べる
findCrests({ score: { max: 20 } });                 // 複雑さもほかの数と同じように検索できます
```

十二の家紋は、まだ昔の紋帳からなぞった形のままで、コンパスと定規で描き直しているところです（レコードの `redrawing: true`）。なぞった輪郭は短い曲線が多いので、弧の数が実際よりずっと多く出ます。描き直しが済むまで、`rankCrests()` はこの十二を別に並べて、どちらの順でも最後に置きます。`redrawing: true` を渡すと、ほかの家紋と一緒に並べます。

デモの「複雑さ」タブ（Complexity）は、この並びを格子で見せます。家紋ごとに数が下に出ます。どの数でも並べ替えられ、部品で絞り込めて、家紋を開くと作図が見られます。

## 現在の使用者

`findCrests({ usedBy: true })` は、公開された出典が、今使っている者がいると述べている家紋を、`{ usedBy: "company" }` は企業が使っている家紋を見つけます。[現在の使用](used-today.md)を見てください。
