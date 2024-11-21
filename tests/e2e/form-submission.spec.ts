import { test, expect } from "@playwright/test";

test("submitting the feedback form", async ({ page }) => {
  // Navigate to the landing page
  await page.goto("http://localhost:3000");

  // Fill out the form
  await page.fill('input[name="firstName"]', "John");
  await page.fill('input[name="lastName"]', "Doe");
  await page.fill('input[name="email"]', "john.doe@example.com");
  await page.fill(
    'textarea[name="description"]',
    "This is a positive feedback!"
  );

  // Select the feedback type radio button (for example, "suggestions")
  await page.click('input[name="feedbackType"][value="suggestions"]');

  // Submit the form
  await page.click('button[type="submit"]');

  // Verify that form submission was successful
  // Change when API is implemented
  // Verify that the form fields are cleared after submission
  await expect(page.locator('input[name="firstName"]')).toHaveValue("");
  await expect(page.locator('input[name="lastName"]')).toHaveValue("");
  await expect(page.locator('input[name="email"]')).toHaveValue("");
  await expect(page.locator('textarea[name="description"]')).toHaveValue("");
});
