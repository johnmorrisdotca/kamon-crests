---
title: はじめに
section: tutorial
order: 1
description: 家紋を一つ読み込み、IDで別の家紋を読み込み、ページに置きます。
---

## 家紋を一つ読み込む

```ts
import aoi from "@johnmorrisdotca/kamon-crests/crests/mitsuba-aoi";

document.querySelector("#crest")!.innerHTML = aoi;
```

家紋のモジュールは、SVG文字列だけを持ちます。周囲の文字色（`currentColor`）で、背景なしの200×200のページに描かれているので、大きさはCSSで、色は `color` で決められます。家紋ごとに独立したモジュールなので、ページが運ぶのは読み込んだ家紋だけです。

## IDで読み込む

```ts
import { crest } from "@johnmorrisdotca/kamon-crests/load";

const svg = await crest("maru-ni-juji", { color: "#8a1c1c" });
```

ルートはIDと道具、`/load` は実行時に決まるID、`/manifest` は名前と事実、`/search` は部品による検索、`/animate` は作図アニメーション、任意の `/element/define` は `<kamon-crest>` タグのためのものです。[読み込み](loading-crests.md)、[部品と検索](parts-and-search.md)、[要素](element-and-events.md)、[家紋の作図](how-crests-are-constructed.md)を見てください。

## タグ一つで置く

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@johnmorrisdotca/kamon-crests@0/dist/element-define.js"></script>
<kamon-crest crest="sasa-rindo" size="96" animate></kamon-crest>
```

インストールしても、実行時の依存関係もホスティングサービスも増えません。
