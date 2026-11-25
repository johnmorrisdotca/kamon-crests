---
name: review-a-crest
description: Check a newly drawn kamon-crests crest before its pull request — the side-by-side sheet, the construction rules, the licence rule, the words, the checks and the commits. Use when asked to review, QA or check a crest.
---

# Review a crest

Run the `crest-reviewer` agent on the crest, in a fresh context so the reviewer is not the conversation that built it. Give it the crest's id and the path of its side-by-side sheet.

If the agent is not available, do its checks yourself, in the same order, from the crest-reviewer agent's own file, and be as strict: list every difference from the book cell, every broken rule, any sign that shapes came from Commons or another modern drawing, any wrong Japanese, the results of `pnpm check` and `pnpm test:demo`, and any commit with a co-author trailer naming a model or tool, a line saying a tool made the change, or a tool or model name.

End with **pass** or **fix these** and a numbered list. Fix nothing until the person has read the list.
