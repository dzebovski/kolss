import { test, expect } from "@playwright/test";

test("home renders and contact endpoint validates", async ({
  page,
  request,
}) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Otrzymaj wstępną wycenę" }).click();
  await expect(page).toHaveURL(/#kontakt/);

  const invalid = await request.post("/api/contact", {
    data: { name: "", email: "" },
  });
  expect(invalid.status()).toBe(400);
  const invalidJson = await invalid.json();
  expect(invalidJson).toEqual({
    ok: false,
    fieldErrors: {
      name: "Podaj imię i nazwisko.",
      email: "Podaj poprawny adres e-mail.",
    },
  });

  const valid = await request.post("/api/contact", {
    data: { name: "Jan Kowalski", email: "jan@example.com" },
  });
  expect(valid.status()).toBe(200);
  const validJson = await valid.json();
  expect(validJson).toEqual({ ok: true });
});
