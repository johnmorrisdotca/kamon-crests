// Match book cells to the current catalogue at site build time.
const normalize = (text) => text?.normalize("NFKC").trim() ?? "";
const isSettled = (cell) => cell.labelConfidence !== "unsure" && Boolean(cell.name && cell.reading);

function addName(index, name, value) {
  const key = normalize(name);
  if (!key) return;
  if (!index.has(key)) index.set(key, new Set());
  index.get(key).add(value);
}

export function bookData(index, manifest, familyLabels) {
  const byId = new Map(manifest.map((record) => [record.id, record]));
  const names = new Map();
  const namesInBook = new Map();
  for (const record of manifest) {
    for (const name of [record.name.ja, ...record.aliases]) addName(names, name, record);
  }
  for (const cell of index) addName(namesInBook, cell.name, cell);
  const familyNames = new Map(familyLabels.map((family) => [family.ja, family.en]));

  const pages = [...index].sort((a, b) => a.frame - b.frame || b.page.localeCompare(a.page) || a.row - b.row || a.col - b.col);
  const links = new Map();
  const cells = pages.map((cell) => {
    const settled = isSettled(cell);
    const name = normalize(cell.name);
    const candidates = names.get(name);
    // A cell with an ID waits for that exact drawing. Repeated labels and shared names need an editorial match.
    const record = cell.ourId !== null
      ? byId.get(cell.ourId)
      : settled && namesInBook.get(name)?.size === 1 && candidates?.size === 1
        ? candidates.values().next().value
        : undefined;
    const ourId = record?.id ?? null;
    if (ourId !== null) {
      const { frame, page, row, col } = cell;
      const query = new URLSearchParams({ tab: "book", frame: String(frame), page });
      const href = `?${query}#cell-${frame}-${page}-${row}-${col}`;
      if (!links.has(ourId)) links.set(ourId, []);
      links.get(ourId).push({ href, frame, page, row, col });
    }
    return {
      ...cell,
      ourId,
      nameEn: record?.name.en ?? null,
      status: settled ? ourId === null ? "missing" : "drawn" : "held",
    };
  });

  const families = [...new Set(cells.map(({ family }) => family).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "ja"))
    .map((ja) => ({ ja, en: familyNames.get(ja) ?? null }));
  return { cells, families, links: Object.fromEntries(links) };
}
