import { defineConfig } from "vitest/config";

export default defineConfig({
  // Many tests pass over every crest, so they grow with the catalogue; a hosted runner is several times slower than a desk.
  test: { include: ["src/**/*.test.{ts,js}"], testTimeout: 30_000 },
});
