---
title: 現在の使用
section: concept
order: 6
description: 家紋を今使っている者を、出典付きの事実として示します。
---

公開されたページが、ある企業のマークがある家紋に由来する、またはある団体がその家紋を使っていると述べている場合、その家紋の記録の `usedBy` に、それが載ります。両言語の名前、種類（企業、政府、神社・寺院、自治体、チーム、その他）、関係、両言語の説明、それを述べている公開ページと、各ページを閲覧した日です。

```ts
import { manifest } from "@johnmorrisdotca/kamon-crests/manifest";

for (const user of manifest("igeta")?.usedBy ?? []) console.log(user.name.en, user.relation, user.sources[0].url);
```

関係は、`logo-derived`（ロゴがその家紋に由来）、`uses`（使用）、`emblem`（紋章）、`name-derived`（名称がその図柄に由来）です。

このパッケージが描くのは歴史上の家紋だけで、企業のロゴや商標は描きません。関係は出典が述べるとおりに記し、出典が述べていないことは載せないので、一覧は短く、使用者の数を表すものではありません。出典は [NOTICE.md](../../../NOTICE.md) にあります。
