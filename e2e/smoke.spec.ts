import { test, expect } from "@playwright/test";

test.describe("marketing site smoke", () => {
  test("homepage loads with hero and sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /building/i })).toBeVisible();
    await expect(page.getByText("Our Ecosystem")).toBeVisible();
    await expect(page.getByText("Our Philosophy")).toBeVisible();
    await expect(page.getByText("Portfolio")).toBeVisible();
  });

  test("navigation reaches key pages", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "About", exact: true }).click();
    await expect(page).toHaveURL(/\/about/);
    await page.getByRole("link", { name: "Insights", exact: true }).click();
    await expect(page).toHaveURL(/\/insights/);
  });

  test("insight article renders body", async ({ page }) => {
    await page.goto("/insights/what-makes-a-digital-asset-acquirable");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".prose-digiteq")).not.toBeEmpty();
  });

  test("legal pages resolve", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.locator(".prose-digiteq")).toBeVisible();
    await page.goto("/terms");
    await expect(page.locator(".prose-digiteq")).toBeVisible();
  });
});
