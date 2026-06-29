import { test, expect } from "@playwright/test";

test.describe("marketing site smoke", () => {
  test("homepage loads with hero and sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /we build, acquire, supply/i })).toBeVisible();
    await expect(page.getByText("What we do", { exact: true })).toBeVisible();
    await expect(page.getByText("Our thesis", { exact: true })).toBeVisible();
    await expect(page.getByText("Portfolio", { exact: true }).first()).toBeVisible();
  });

  test("navigation reaches key pages", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "About", exact: true }).click();
    await expect(page).toHaveURL(/\/about/);
    await page.getByRole("link", { name: "Invest", exact: true }).click();
    await expect(page).toHaveURL(/\/investment/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/invest with digiteq/i);
    await page.getByRole("link", { name: "Insights", exact: true }).click();
    await expect(page).toHaveURL(/\/insights/);
    await page.getByRole("link", { name: "Portfolio", exact: true }).click();
    await expect(page).toHaveURL(/\/portfolio/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/companies we build/i);
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
    await expect(page.locator(".prose-digiteq")).not.toBeEmpty();
  });
});
