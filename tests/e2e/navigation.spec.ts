import { test, expect } from "@playwright/test";

test("navigating through pages with toptasks", async ({ page }) => {
  // Navigate to the landing page
  await page.goto("http://localhost:3000");

  // IMPORTANT: add ? at the end of the href if search parameters are used again
  // Click on each of the four toptask links and verify navigation
  await page.click('a[href="/General-information"]');
  await expect(page).toHaveURL("http://localhost:3000/General-information");

  await page.goto("http://localhost:3000"); // Go back to the landing page

  await page.click('a[href="/Entitlements"]');
  await expect(page).toHaveURL("http://localhost:3000/Entitlements");

  await page.goto("http://localhost:3000"); // Go back to the landing page

  await page.click('a[href="/Self-service"]');
  await expect(page).toHaveURL("http://localhost:3000/Self-service");

  await page.goto("http://localhost:3000"); // Go back to the landing page

  await page.click('a[href="/Onboarding"]');
  await expect(page).toHaveURL("http://localhost:3000/Onboarding");
});

// test("updating search parameters through navbar links", async ({ page }) => {
//   // Navigate to the landing page
//   await page.goto("http://localhost:3000");

//   // Click on the first navbar link that changes search params
//   await page.click('a[href="?user=Data-Producer"]');
//   await expect(page).toHaveURL("http://localhost:3000?user=Data-Producer");

//   // Click on the second navbar link that changes search params
//   await page.click('a[href="?user=Data-Consumer"]');
//   await expect(page).toHaveURL("http://localhost:3000?user=Data-Consumer");

//   // Click on the third navbar link that changes search params
//   await page.click('a[href="?user=Developer"]');
//   await expect(page).toHaveURL("http://localhost:3000?user=Developer");
// });

test("navigating to an external webpage", async ({ page }) => {
  // Navigate to the landing page
  await page.goto("http://localhost:3000");

  // Click on the external link in the navbar
  const externalLink = page.locator('a[href="https://docs.osdu.equinor.com/"]'); // Replace with the actual external link
  await externalLink.click();

  // Verify that the external website has loaded
  const currentUrl = page.url();
  if (currentUrl.includes("login")) {
    await expect(page).toHaveURL(/^https:\/\/login.microsoftonline\.com/);
  } else {
    await expect(page).toHaveURL(currentUrl);
  }
});

test("clicking navbar title and logo to navigate to the landing page", async ({
  page,
}) => {
  // Navigate to another page than the landing page
  await page.goto("http://localhost:3000/General-information");

  // Click on the navbar title
  await page.click('a[aria-label="logo"]');
  await expect(page).toHaveURL("http://localhost:3000"); // Ensure we are back on the landing page

  // Navigate to another page than the landing page
  await page.goto("http://localhost:3000/General-information");

  // Click on the navbar logo
  await page.click('a[aria-label="title"]');
  await expect(page).toHaveURL("http://localhost:3000"); // Ensure we are back on the landing page
});

test.describe("Footer Navigation", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the homepage or your base URL
    await page.goto("http://localhost:3000");
  });

  // Change when the code is not a template anymore
  test("should navigate to Info page when Info link is clicked", async ({
    page,
  }) => {
    await page.click('a[href="/about"]'); // Info link
    await expect(page).toHaveURL("http://localhost:3000/about");
  });

  test("should navigate to Organization page when Organization link is clicked", async ({
    page,
  }) => {
    await page.click('a[href="/team"]'); // Organization link
    await expect(page).toHaveURL("http://localhost:3000/team");
  });

  test("should navigate to Contact page when Contact link is clicked", async ({
    page,
  }) => {
    await page.click('a[href="https://www.example.com/contact"]'); // Contact link
    await expect(page).toHaveURL("https://www.example.com/contact");
  });
});

test.describe("Links list Navigation", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the homepage
    await page.goto("http://localhost:3000/");
  });

  // Change when the code is not a template anymore
  test("should navigate to react documentation when learn more link is clicked", async ({
    page,
  }) => {
    await page
      .locator('a[aria-label="Link item - React Documentation"]')
      .click();
    const [newTab] = await Promise.all([
      page.waitForEvent("popup"), // Wait for the new tab to open
    ]);
    await expect(newTab).toHaveURL("https://react.dev/");
  });

  test("should navigate to next.js documentation when learn more link is clicked", async ({
    page,
  }) => {
    await page.locator('a[aria-label="Link item - Next.js"]').click();
    const [newTab] = await Promise.all([
      page.waitForEvent("popup"), // Wait for the new tab to open
    ]);
    await expect(newTab).toHaveURL("https://nextjs.org/");
  });

  test("should navigate to playwright documentation when learn more link is clicked", async ({
    page,
  }) => {
    await page.locator('a[aria-label="Link item - Playwright"]').click();
    const [newTab] = await Promise.all([
      page.waitForEvent("popup"), // Wait for the new tab to open
    ]);
    await expect(newTab).toHaveURL("https://playwright.dev/");
  });
});

test.describe("Step-card list Navigation", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the homepage
    await page.goto("http://localhost:3000/");
  });

  // Change when the code is not a template anymore
  test("should navigate to react documentation when learn more link is clicked", async ({
    page,
  }) => {
    await page
      .locator('a[aria-label="Step card - React Documentation"]')
      .click();
    const [newTab] = await Promise.all([
      page.waitForEvent("popup"), // Wait for the new tab to open
    ]);
    await expect(newTab).toHaveURL("https://react.dev/");
  });

  test("should navigate to next.js documentation when learn more link is clicked", async ({
    page,
  }) => {
    await page.locator('a[aria-label="Step card - Next.js"]').click();
    const [newTab] = await Promise.all([
      page.waitForEvent("popup"), // Wait for the new tab to open
    ]);
    await expect(newTab).toHaveURL("https://nextjs.org/");
  });

  test("should navigate to playwright documentation when learn more link is clicked", async ({
    page,
  }) => {
    await page.locator('a[aria-label="Step card - Playwright"]').click();
    const [newTab] = await Promise.all([
      page.waitForEvent("popup"), // Wait for the new tab to open
    ]);
    await expect(newTab).toHaveURL("https://playwright.dev/");
  });
});
