import {expect, test} from '@playwright/test';

test.describe('Home page i18n', () => {
  test('loads /uk and renders main H1', async ({page}) => {
    await page.goto('/uk');

    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('redirects from root to localized route', async ({page}) => {
    await page.goto('/');

    await expect(page).toHaveURL(/\/(uk|pl|en)(\/)?$/);
  });

  test('switches language from /uk to /en using LanguageSwitcher', async ({page}) => {
    await page.goto('/uk');

    const switcher = page.getByRole('combobox').first();
    await expect(switcher).toBeVisible();

    await switcher.selectOption('en');

    await expect(page).toHaveURL(/\/en(\/)?$/);
    await expect(switcher).toHaveValue('en');

    const mainNav = page.getByRole('navigation', {name: 'Main navigation'});
    const catalogLink = mainNav.getByRole('link', {name: 'Каталог', exact: true});
    await expect(catalogLink).toHaveAttribute('href', /(^#featured-kitchens$|^\/en\/catalog$|^\/en#featured-kitchens$)/);
  });

  test('renders at least one kitchen article card', async ({page}) => {
    await page.goto('/uk');

    const cards = page.locator('article');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test('renders contact form in contacts section', async ({page}) => {
    await page.goto('/uk');

    const form = page.getByTestId('contact-form');
    await expect(form).toBeVisible();
    await expect(form.getByRole('button', {name: 'Надіслати заявку'})).toBeVisible();
  });
});
