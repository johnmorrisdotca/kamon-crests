// The demo's own tests: a real browser, real taps. `pnpm test:demo` builds the demo and runs them. Port 8851 is this
// project's tests' port; it is named here and in the server's command, so a run never lands on another session's server.
// A second checkout or worktree runs its tests on a port of its own from the project's block: `KAMON_TEST_PORT=8856 pnpm test:demo`.
import process from "node:process";

import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.KAMON_TEST_PORT ?? 8851);
const phone = { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true };

export default defineConfig({
  testDir: "e2e",
  testMatch: "*.demo.mjs",
  fullyParallel: true,
  forbidOnly: true,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: { baseURL: `http://127.0.0.1:${port}`, locale: "en-US" },
  webServer: { command: `node scripts/serve.mjs ${port}`, url: `http://127.0.0.1:${port}/`, reuseExistingServer: false, timeout: 30000 },
  projects: [
    { name: "chromium-phone", use: { ...devices["Desktop Chrome"], ...phone } },
    { name: "chromium-desk", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } } },
    // WebKit on a desktop viewport with touch: `isMobile` is Chromium's to honour.
    { name: "webkit-phone", use: { ...devices["Desktop Safari"], viewport: phone.viewport, hasTouch: true } },
  ],
});
