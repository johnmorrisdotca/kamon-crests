---
title: Used today
section: concept
order: 6
description: Who uses a crest today, stated as a fact with its source.
---

Where a public page says that a company's mark descends from a crest, or that a body uses it, the crest's record says so in `usedBy`: the name in both languages, its kind (company, government, shrine or temple, town, team, other), the relation, a note in both languages, and the public pages that state it, each with the day it was read.

```ts
import { manifest } from "@johnmorrisdotca/kamon-crests/manifest";

for (const user of manifest("igeta")?.usedBy ?? []) console.log(user.name.en, user.relation, user.sources[0].url);
```

The relations are `logo-derived` (its logo descends from the crest), `uses`, `emblem` and `name-derived` (its name comes from the design).

The package draws the historical crest only, never a company's logo or trademark. The relation is stated as the source states it, and what a source does not state is left out, so the list is short and is not a count of users. Sources are listed in [NOTICE.md](../../NOTICE.md).
