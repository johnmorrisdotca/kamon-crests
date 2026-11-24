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

## 現在の使用者

`findCrests({ usedBy: true })` は、公開された出典が、今使っている者がいると述べている家紋を、`{ usedBy: "company" }` は企業が使っている家紋を見つけます。[現在の使用](used-today.md)を見てください。
