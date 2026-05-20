import { expect, test } from "@playwright/test";

test("gallery filters and lightbox controls work", async ({ page }) => {
  await page.goto("/gallery");

  await expect(
    page.getByRole("heading", { name: "Galeria realizacji KOLSS" }),
  ).toBeVisible();
  await expect(
    page.locator('[data-gallery-category="kitchens"]').first(),
  ).toBeVisible();
  await expect(page.locator('[data-gallery-ready="true"]')).toBeVisible();

  await page.getByRole("button", { name: /Szafy i garderoby/i }).click();
  await expect(
    page.locator('[data-gallery-category="wardrobes"]').first(),
  ).toBeVisible();
  await expect(page.locator('[data-gallery-category="kitchens"]')).toHaveCount(
    0,
  );

  await page.locator('[data-gallery-category="wardrobes"]').first().click();
  const dialog = page.getByRole("dialog");

  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(/Zdjęcie 1 z/)).toBeVisible();

  await dialog.getByRole("button", { name: "Następne zdjęcie" }).click();
  await expect(dialog.getByText(/Zdjęcie 2 z/)).toBeVisible();

  await dialog.getByRole("button", { name: "Poprzednie zdjęcie" }).click();
  await expect(dialog.getByText(/Zdjęcie 1 z/)).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});
