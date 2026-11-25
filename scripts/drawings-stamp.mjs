// One fingerprint of every crest's finished drawing (the generated modules in src/crests), so that a test can tell when a
// drawing has changed since the README's pictures were taken. `pnpm pictures` writes it in docs; the test reads it.
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";

export const STAMP = "docs/pictures-drawings.sha256";

export const drawingsStamp = () => {
  const hash = createHash("sha256");
  for (const name of readdirSync("src/crests").filter((one) => one.endsWith(".ts")).sort()) hash.update(`${name}\n`).update(readFileSync(`src/crests/${name}`));

  return hash.digest("hex");
};
