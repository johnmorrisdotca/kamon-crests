// Read the crest entries from the project's Keep a Changelog file, in its release and bullet order.
const STATUS = new Map([["Added", "new"], ["Changed", "redrawn"], ["Fixed", "fixed"]]);

function excerpt(bullet) {
  // A heading that only names one crest would repeat the row's title. Start at its description.
  const text = bullet.replace(/^\*\*[^*]+\(`[^`]+`\)(?:, [^.]+)?\.\*\*\s+/, "");
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z“"`])/, 1)[0]
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*|`/g, "")
    .replace(/\*([^*]+)\*/g, "$1");
}

export function latestReleases(markdown, crestIds) {
  const known = new Set(crestIds);
  return markdown.replace(/\r\n/g, "\n").split(/^## /m).slice(1).flatMap((release) => {
    const [heading, ...sections] = release.split(/^### /m);
    const match = /^\[(Unreleased|\d+\.\d+\.\d+[\w.+-]*)\](?: - (\d{4}-\d{2}-\d{2}))?\s*$/.exec(heading.split("\n", 1)[0]);
    if (match === null) return [];
    const [, version, date] = match;
    const entries = sections.flatMap((section) => {
      const [heading, ...lines] = section.split("\n");
      const status = STATUS.get(heading.trim());
      if (status === undefined) return [];

      return [...lines.join("\n").matchAll(/^[-*+] (.+(?:\n[ \t]+\S.*)*)/gm)].flatMap(([, bullet]) => {
        const ids = new Set([...bullet.matchAll(/`([^`\n]+)`/g)].map(([, id]) => id).filter((id) => known.has(id)));
        const note = excerpt(bullet.replace(/\n[ \t]+/g, " ").trim());
        return [...ids].map((id) => ({ id, status, note }));
      });
    });

    return entries.length === 0 ? [] : [{ version, date: date ?? null, entries }];
  });
}
