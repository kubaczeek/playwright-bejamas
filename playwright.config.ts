
import { Env } from "./data-types/enums/env";
import { Site } from "./data-types/enums/sites";
import { defineConfig, devices } from "playwright/test";

if (!process.env.ENV_FILE) {
  process.env.ENV_FILE = Env.Prod;
}

if (!process.env.VERIFY_IMAGES) {
  process.env.VERIFY_IMAGES = "true";
}

if (!process.env.DEFAULT_TEST_TIMEOUT) {
  process.env.DEFAULT_TEST_TIMEOUT = "60";
}

let allureResultDir = "allure-results";

if (!process.env.DEFAULT_EXPECT_TIMEOUT) {
  process.env.DEFAULT_EXPECT_TIMEOUT = "30";
}

const configFile = require("dotenv").config({
  path: `./config/${process.env.ENV_FILE}.env`,
});

export let baseUrl = configFile.parsed[Site.Bejamas];

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const maxDiffPixelRatio = 0.01;
const mobilePhone = "Pixel 5";

const createProject = (
  name,
  site,
  size = "large",
  device = "Desktop Chrome"
) => ({
  expect: {
    timeout: Number(process.env.DEFAULT_EXPECT_TIMEOUT) * 1000,
    toHaveScreenshot: { maxDiffPixelRatio },
  },
  name,
  use: {
    ...devices[device],
    userAgent: devices[device].userAgent,

    baseURL: configFile.parsed[site],
    ...(size === "large" && { viewport: { height: 1920, width: 1080 } }),
  },
});

const sites = [Site.Bejamas];

const desktopProjects = sites.map((site) => createProject(site, site));
const mobileProjects = sites.map((site) =>
  createProject(`MOBILE_CHROME_${site}`, site, "small", mobilePhone)
);

export default defineConfig({
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  /* Retry on CI only */
  retries: 1,
  testDir: "./tests",
  /* Run tests in files in parallel */
  timeout: Number(process.env.DEFAULT_TEST_TIMEOUT) * 1000,
  /* Opt out of parallel tests on CI. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    baseURL: baseUrl,
    permissions: ["geolocation", "clipboard-read", "clipboard-write"],
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    // screenshot: 'on',
    video: "off",
  },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  workers: process.env.CI ? 3 : undefined,

  reporter: [
    ["html"],
    ["junit", { outputFile: "test-results/results.xml" }],
    ["json", { outputFile: `test-results/json/test-results.json` }],
    [
      "allure-playwright",
      {
        detail: true,
        outputFolder: allureResultDir,
        environmentInfo: {
          Browser: process.env.SITE,
          Environment: process.env.ENV_FILE,
        },
        suiteTitle: false,
      },
    ],
  ],

  projects: [...desktopProjects, ...mobileProjects],
});
