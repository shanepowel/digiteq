import { test, expect } from "@playwright/test";

test.describe("marketing site smoke", () => {
  test("homepage loads with hero and sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /building/i })).toBeVisible();
    await expect(page.getByText("Our Ecosystem", { exact: true })).toBeVisible();
    await expect(page.getByText("Our Philosophy", { exact: true })).toBeVisible();
    await expect(page.getByText("Portfolio", { exact: true }).first()).toBeVisible();
  });

  test("navigation reaches key pages", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "About", exact: true }).click();
    await expect(page).toHaveURL(/\/about/);
    await page.getByRole("link", { name: "Ventures", exact: true }).click();
    await expect(page).toHaveURL(/\/ventures/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/venture formation/i);
    await page.getByRole("link", { name: "Insights", exact: true }).click();
    await expect(page).toHaveURL(/\/insights/);
    await page.getByRole("navigation").getByRole("link", { name: "Case Studies", exact: true }).click();
    await expect(page).toHaveURL(/\/case-studies/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/proof in operating systems/i);
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
