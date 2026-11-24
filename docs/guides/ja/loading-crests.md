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

## 色・背景・タイトル

```ts
import { crest } from "@johnmorrisdotca/kamon-crests/load";

const svg = await crest("kikyo", { color: "#2b5f9e", background: "#f4efe4", title: "Bellflower" });
```

家紋は `currentColor` で描かれます。`<img>` はページの文字色を見られないので、画像として使う家紋は `color` を渡さない限り黒です。`toDataUri(svg, { color })` と `crestDataUri(id, { color })` は、先に色を塗ります。色は通常のCSSの色に限り、それ以外は `TypeError` になります。

## ゆるいID

IDは、`"Mitsuba Aoi"` や `" maru_ni_juji "` のようにゆるく書けます。名前・家・別名は検索の対象で、IDではありません。`findCrests({ text })` を使い、見つかった記録の `id` を取ります。
