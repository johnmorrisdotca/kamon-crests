---
title: 家紋の読み込み
section: how-to
order: 4
description: モジュール、IDによる読み込み、データURI、色と背景。
---

## 読み込みの境界

- `@johnmorrisdotca/kamon-crests/crests/<id>`：一つの家紋を固定のインポートで。
- `@johnmorrisdotca/kamon-crests/load`：実行時に決まるIDのための `crest(id)`。家紋ごとに動的インポートなので、バンドラーが家紋ごとに小さなチャンクを作ります。
- `@johnmorrisdotca/kamon-crests/svg/<id>.svg`：同じSVGをファイルとして。`<img>` やCDNのアドレス（`crestUrl(id)`）に使います。
- `@johnmorrisdotca/kamon-crests`：`crestId`、`isCrestId`、`crestUrl`、`paint`、`toDataUri`。家紋は含まず、IDと文字列を扱う道具だけです。

## 色・背景・タイトル

```ts
import { crest } from "@johnmorrisdotca/kamon-crests/load";

const svg = await crest("kikyo", { color: "#2b5f9e", background: "#f4efe4", title: "Bellflower" });
```

家紋は `currentColor` で描かれます。`<img>` はページの文字色を見られないので、画像として使う家紋は `color` を渡さない限り黒です。`toDataUri(svg, { color })` と `crestDataUri(id, { color })` は、先に色を塗ります。色は通常のCSSの色に限り、それ以外は `TypeError` になります。

## 画像で使う

```ts
import { crestUrl } from "@johnmorrisdotca/kamon-crests";
import { crestDataUri } from "@johnmorrisdotca/kamon-crests/load";

image.src = crestUrl("janome") ?? "";                                   // CDNにあるファイル。色は黒
image.src = (await crestDataUri("janome", { color: "#8a1c1c" })) ?? ""; // 赤を塗った `data:` URI
```

`crestUrl(id, { base })` は、CDNではなく自分のフォルダーを指します。`node_modules/@johnmorrisdotca/kamon-crests/dist/svg` を自分のファイルにコピーし、`{ base: "/crests" }` のようにそのフォルダーを指定します。

## ゆるいID

IDは、`"Mitsuba Aoi"` や `" maru_ni_juji "` のようにゆるく書けます。名前・家・別名は検索の対象で、IDではありません。`findCrests({ text })` を使い、見つかった記録の `id` を取ります。`crestId(" Mitsuba Aoi ")` は、パッケージが書く形のID（`"mitsuba-aoi"`）を返し、IDでなければ `null` を返します。`isCrestId(value)` は、ちょうどその書き方のIDだけが真になります。文字列でない値は `TypeError` になります。
