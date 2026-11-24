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

## 家紋帳の順と「種類」

家紋帳は家紋をIDでは並べません。七つの分類（植物紋、動物紋、自然紋・天文紋、器物紋、建造物紋、文様紋・図形紋、文字紋）に分け、分類の中では紋の種類を名前の読みの五十音順（桔梗、菊、桐）に並べ、一つの種類の中では、基本の紋を先に、変わり紋をその後に並べます。このパッケージも同じ順に並べ、どのレコードにも位置が書いてあります。

| 項目 | 内容 |
| --- | --- |
| `family` | 図柄の種類のID（`MotifFamily`）。藤の家紋はすべて `fuji`。家紋を用いた家を表す `families` とは別のものです。 |
| `familyReading` | 種類の読み（ひらがな）。分類の中で種類が並ぶ順です。 |
| `base` | その家紋が何の変わり紋か。枠付きの家紋では、枠のない同じ家紋。それ以外の家紋では、その種類の基本形。基本形自身では、自分のID。 |
| `variantKind` | `base`（基本形）、`form`（裏・鬼・右向きなどの形違い）、`tone`（陰）、`count`（二つ・三つ）、`frame`（丸に・亀甲に）、`arrangement`（並び・違い・向かい）、`combination`（ほかの図柄との組み合わせ）、`house`（家の名で呼ばれる変わり紋）。家紋帳が並べる順です。 |
| `variantRank` | 同じ種類の中で、同じ区分の家紋が並ぶ順番（1から）。 |
| `no` | 家紋帳に印刷された番号のような通し番号。最初に一度、家紋帳の順で付け、あとから変えません。あとで加えた家紋は、並ぶ位置に関係なく次の番号になります。 |

`MANIFEST` はこの順で、数で並べ替えない検索もこの順です。`MOTIF_FAMILIES` と `CHAPTERS` が種類と分類を、`variantsOf(id)` が、その家紋と同じ種類の家紋をこの順で（基本形が先頭）返します。枠付きの家紋は、必ず枠のない同じ家紋の後ろに来ます。下がり藤が丸に下がり藤より先、橘が丸に橘より先です。

```ts
import { MOTIF_FAMILIES, manifest, variantsOf } from "@johnmorrisdotca/kamon-crests/manifest";
import { findCrests } from "@johnmorrisdotca/kamon-crests/search";

variantsOf("maru-ni-sagari-fuji").map((record) => record.id); // ["sagari-fuji", "maru-ni-sagari-fuji", "fuji-no-maru"]
manifest("fuji-no-maru")?.variantKind;                        // "arrangement"
MOTIF_FAMILIES.find((family) => family.id === "fuji")?.ja;    // "藤"
findCrests({ text: "wisteria" });                             // 藤の家紋が先頭、基本形が最初
findCrests({ motifFamily: "fuji" });                          // その種類だけ
```

枠付きの家紋は、枠だけが基本の家紋と違います（テストで確かめています。図柄が同じで、枠以外の形の数も同じです）。並べ方や数が違う家紋、ほかの図柄を加えた家紋は、枠付きにはなりません。デモの「図柄でまとめる」は、枠付きの家紋を基本の家紋のタイルに数としてまとめますが、それらの家紋は自分のタイルのままです。

## 数えたもの

どの家紋のレコードにも `stats` があります。コンパスと定規でその家紋を描くときの数です。`pnpm data` が作図データから数え、テストが手順からもう一度数えます。手で書いた数は一つもありません。

| 項目 | English | 数えるもの |
| --- | --- | --- |
| `circles` | Circles | コンパスで描く円（どれも一周分）。アニメーションが実際に描く数で、回したり裏返したりして作る位置では、その位置でも数えます。すでに描いた円と重なる円（家紋の中心を中心とする円など）は一つと数えます。 |
| `lines` | Ruled lines | 定規で引く直線。円と同じ数え方で、どの位置でも数え、すでに引いた直線と重なるものは一つです。四角のように辺がいくつもある補助線は、辺ごとに数えます。 |
| `arcs` | Arcs | 墨を入れる弧（どの位置でも数えます）。同じ円の上で続く弧は一つと数えるので、円一周は一つです。まだ本からなぞっている家紋は曲線一つを一つと数えるため、数百になります。 |
| `steps` | Steps | 作図の手順の数。補助線、描く形、回して写す手順、補助線を消す手順を数えます。 |
| `widths` | Compass widths | コンパスの幅の種類。円の半径が何種類あるかです。 |
| `fills` | Fills | 塗りつぶした形の数。 |
| `score` | Score | 点数。弧一つを3、円一つを2、直線一本を1、コンパスの幅を変えるごとに5と数えます。下の「複雑さ」を見てください。 |
| `meter` | Complexity | 点数を0から100の決まった目盛りに直したもの。 |
| `grade` | Grade | 点数を五つに分けた級。1（入門）から5（達人）まで。 |
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

家紋の**点数**（`score`）は `3 × 弧 + 2 × 円 + 直線 + 5 ×（コンパスの幅の種類 − 1）` です。弧がいちばん気を使う作業で、コンパスの幅を変えるのがいちばん時間のかかる動きだからです。**複雑さ**（`meter`）は点数を0から100の決まった目盛りに直したもの、**級**（`grade`）は点数をきりのよい数（25、100、300、1000）で五つに分けたものです。レコードの `stats.score`、`stats.meter`、`stats.grade` に入っています。くわしくは[複雑さ](complexity.md)を見てください。同じ点数の家紋は `steps`（手順）の少ない順、その次は一覧の順に並びます。蛇の目は15点（目盛り29）、丸に三つ葉葵は1249点（目盛り77）です。

```ts
import { findCrests, rankCrests } from "@johnmorrisdotca/kamon-crests/search";

rankCrests();                                       // すべての家紋を簡単な順に
rankCrests({ by: "circles", order: "desc" });       // どの数でも、多い順にも
rankCrests({}, findCrests({ ring: true }));         // 輪のある家紋を簡単な順に
rankCrests({ redrawing: true });                    // 描き直し中の家紋も、ほかの家紋と一緒に並べる
findCrests({ score: { max: 20 } });                 // 点数もほかの数と同じように検索できます
findCrests({ grade: 4 });                           // 目盛りと級も同じです
```

七つの家紋は、まだ昔の紋帳からなぞった形のままで、コンパスと定規で描き直しているところです（レコードの `redrawing: true`）。なぞった輪郭は短い曲線が多いので、弧の数が実際よりずっと多く出ます。描き直しが済むまで、`rankCrests()` はこの七つを別に並べて、どちらの順でも最後に置きます。`redrawing: true` を渡すと、ほかの家紋と一緒に並べます。

デモの「複雑さ」タブ（Complexity）は、この並びを格子で見せます。家紋ごとに数が下に出ます。どの数でも並べ替えられ、部品で絞り込めて、家紋を開くと作図が見られます。

## 現在の使用者

`findCrests({ usedBy: true })` は、公開された出典が、今使っている者がいると述べている家紋を、`{ usedBy: "company" }` は企業が使っている家紋を見つけます。[現在の使用](used-today.md)を見てください。
