import { expect, test, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const SCREENSHOTS_DIR = join(process.cwd(), 'documentation/qa-screenshots');
const STITCH_REFERENCE = join(process.cwd(), 'documentation/stitch/login-reference.png');

async function gotoLogin(page: Page): Promise<void> {
  await page.goto('/login');
  await page.evaluate(() => {
    localStorage.removeItem('forumhub_user');
    localStorage.removeItem('forumhub_token');
  });
  await page.reload();
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace('#', '');
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function colorDistance(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number },
): number {
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
}

async function expectColorClose(
  page: Page,
  selector: string,
  expectedHex: string,
  property: 'color' | 'backgroundColor' = 'backgroundColor',
): Promise<void> {
  const actual = await page.locator(selector).first().evaluate((el, prop) => {
    const value = getComputedStyle(el)[prop as 'color' | 'backgroundColor'];
    const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) {
      return null;
    }
    return { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) };
  }, property);

  expect(actual).not.toBeNull();
  const distance = colorDistance(actual!, hexToRgb(expectedHex));
  expect(distance).toBeLessThan(30);
}

test.describe('QA Login - Vista de Login Foro de Comentarios', () => {
  test.beforeEach(async ({ page }) => {
    await gotoLogin(page);
  });

  test('carga la ruta /login correctamente', async ({ page }) => {
    await expect(page).toHaveURL(/\/login$/);
    await expect(page).toHaveTitle(/ForumHub/i);
  });

  test('muestra header con ForumHub y badges', async ({ page }) => {
    await expect(page.getByText('ForumHub', { exact: true })).toBeVisible();
    await expect(page.getByText('Portal de Acceso')).toBeVisible();
    await expect(page.getByText('Servidor en línea')).toBeVisible();
  });

  test('campo alias tiene autofocus al cargar', async ({ page }) => {
    const input = page.locator('#username');
    await expect(input).toBeFocused();
  });

  test('submit vacío muestra error de validación', async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    await expect(
      page.getByText('Por favor ingresa un nombre de usuario válido.'),
    ).toBeVisible();
    await page.screenshot({ path: join(SCREENSHOTS_DIR, 'login-estado-error.png'), fullPage: true });
  });

  test('submit con alias válido muestra loading y luego éxito', async ({ page }) => {
    await page.locator('#username').fill('moises_dev');
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    await expect(submitButton).toBeDisabled();

    await page.screenshot({ path: join(SCREENSHOTS_DIR, 'login-estado-loading.png'), fullPage: true });

    await expect(page.getByText('¡Acceso verificado con éxito!')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('¡Bienvenido, moises_dev!')).toBeVisible();
    await expect(page.getByText(/Bienvenido @moises_dev/)).toBeVisible();

    const storedAlias = await page.evaluate(() => localStorage.getItem('forumhub_user'));
    const storedToken = await page.evaluate(() => localStorage.getItem('forumhub_token'));
    expect(storedAlias).toBe('moises_dev');
    expect(storedToken).toBeTruthy();

    await page.screenshot({ path: join(SCREENSHOTS_DIR, 'login-estado-success.png'), fullPage: true });
  });

  test('no permite doble submit durante loading', async ({ page }) => {
    await page.locator('#username').fill('usuario_qa');
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    await expect(submitButton).toBeDisabled();
    await submitButton.click({ force: true });
    await expect(page.getByText('¡Acceso verificado con éxito!')).toBeVisible({ timeout: 10000 });
  });

  test('verifica estructura visual principal', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.getByText('¡Bienvenido a ForumHub!')).toBeVisible();
    await expect(page.getByText('Sin contraseña requerida')).toBeVisible();
    await expect(page.getByText('Acceso instantáneo')).toBeVisible();
    await expect(page.getByText('Paleta del Sistema:')).toBeVisible();
    await expect(page.getByText('ForumHub v2.0')).toBeVisible();

    const phosphorIcons = page.locator('i.ph');
    await expect(phosphorIcons).toHaveCount(8);

    await page.screenshot({ path: join(SCREENSHOTS_DIR, 'login-estado-idle.png'), fullPage: true });
  });

  test('verifica colores del diseño Stitch', async ({ page }) => {
    await expectColorClose(page, 'button[type="submit"]', '#4F9AFF');
    await expectColorClose(
      page,
      'header .rounded-xl.bg-primary, header div.bg-primary',
      '#4F9AFF',
    );
    await expect(page.locator('.text-danger, .text-\\[\\#D60F1C\\]').first()).toHaveCount(0);

    await page.locator('button[type="submit"]').click();
    await expect(page.getByText('Por favor ingresa un nombre de usuario válido.')).toBeVisible();
    await expectColorClose(page, '#error-feedback', '#D60F1C', 'color');
  });

  test('comparación visual con referencia Stitch', async ({ page }) => {
    const implementationPath = join(SCREENSHOTS_DIR, 'login-comparacion-implementacion.png');
    await page.screenshot({ path: implementationPath, fullPage: true });

    const implementation = readFileSync(implementationPath);
    const reference = readFileSync(STITCH_REFERENCE);

    expect(implementation.length).toBeGreaterThan(10_000);
    expect(reference.length).toBeGreaterThan(10_000);

    const card = page.locator('main .rounded-2xl').first();
    await expect(card).toBeVisible();
    const box = await card.boundingBox();
    expect(box?.width).toBeGreaterThan(350);
    expect(box?.width).toBeLessThan(500);

    const headerPosition = await page.locator('header').evaluate((el) => getComputedStyle(el).position);
    expect(headerPosition).toBe('sticky');

    const submitBg = await page.locator('button[type="submit"]').evaluate((el) => {
      const { backgroundColor } = getComputedStyle(el);
      const match = backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      return match ? { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) } : null;
    });
    expect(colorDistance(submitBg!, hexToRgb('#4F9AFF'))).toBeLessThan(30);
  });
});
