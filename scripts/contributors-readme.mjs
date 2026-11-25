// Writes the README's "People who helped" section from scripts/contributors.mjs, between its markers. `pnpm contributors`.
import { readFileSync, writeFileSync } from "node:fs";
import { README_END, README_START, readmeSection } from "./contributors.mjs";

const text = readFileSync("README.md", "utf8");
const start = text.indexOf(README_START);
const end = text.indexOf(README_END);
if (start < 0 || end < start) throw new Error("README.md has no contributors markers");
writeFileSync("README.md", `${text.slice(0, start)}${readmeSection()}${text.slice(end + README_END.length)}`);
console.log("README.md: People who helped written");
