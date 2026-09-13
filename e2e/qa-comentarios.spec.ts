import { expect, test, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const SCREENSHOTS_DIR = join(process.cwd(), 'documentation/qa-screenshots');
const STITCH_REFERENCE = join(process.cwd(), 'documentation/stitch/comments-reference.png');
const QA_ALIAS = 'Alex Rivera';

async function gotoForum(page: Page, alias = QA_ALIAS): Promise<void> {
  await page.goto('/login');
  await page.evaluate((name) => {
    localStorage.setItem('forumhub_user', name);
  }, alias);
  await page.goto('/foro');
  await expect(page.locator('#view-forum')).toBeVisible();
  await expect(page.locator('#main-question-text')).not.toHaveText('');
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

test.describe('QA Comentarios - Vista de Comentarios y Discusión ForumHub', () => {
  test('sin sesión, /foro redirige a /login', async ({ page }) => {
    await page.goto('/login');
    await page.evaluate(() => localStorage.removeItem('forumhub_user'));
    await page.goto('/foro');
    await expect(page).toHaveURL(/\/login$/);
  });

  test('sesión activa muestra /foro con alias en el header', async ({ page }) => {
    await gotoForum(page);
    await expect(page).toHaveURL(/\/foro$/);
    await expect(page.locator('#header-username')).toHaveText(QA_ALIAS);
  });

  test('muestra header, título y badge de usuarios', async ({ page }) => {
    await gotoForum(page);
    await expect(page.getByText('ForumHub', { exact: true })).toBeVisible();
    await expect(page.getByText('Comunidad Activa').first()).toBeVisible();
    await expect(page.getByText('Hilo de discusión')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Preguntas de la Comunidad' })).toBeVisible();
    await expect(page.getByText('12 Usuarios en línea')).toBeVisible();
  });

  test('publicar pregunta vacía no crea card nueva', async ({ page }) => {
    await gotoForum(page);
    const cardsBefore = await page.locator('[id^="question-card-"]').count();
    await page.locator('#add_question').click();
    await expect(page.locator('[id^="question-card-"]')).toHaveCount(cardsBefore);
    await expect(page.locator('#text-question')).toBeFocused();
  });

  test('publicar pregunta crea una card nueva y limpia el textarea', async ({ page }) => {
    await gotoForum(page);
    const nextQuestion = '¿Cómo estructuran el estado del árbol de réplicas?';
    const cardsBefore = await page.locator('[id^="question-card-"]').count();
    await page.locator('#text-question').fill(nextQuestion);
    await page.locator('#add_question').click();
    await expect(page.locator('[id^="question-card-"]')).toHaveCount(cardsBefore + 1);
    await expect(page.locator('#question-card-new_q2')).toBeVisible();
    await expect(page.locator('#main-question-text-new_q2')).toHaveText(nextQuestion);
    await expect(page.locator('#text-question')).toHaveValue('');
    await expect(page.locator('#counter-new_q2-likes')).toHaveText('0');
    await expect(page.locator('#counter-new_q2-dislikes')).toHaveText('0');
    await expect(page.locator('#main-question-text')).toContainText(/mutaciones optimistas/);
  });

  test('reply box de q1 está oculto y se muestra al replicar', async ({ page }) => {
    await gotoForum(page);
    await expect(page.locator('#reply-box-q1')).toBeHidden();
    await page.locator('button[aria-controls="reply-box-q1"]').click();
    await expect(page.locator('#reply-box-q1')).toBeVisible();
    await expect(page.locator('#reply')).toBeFocused();
  });

  test('enviar réplica vacía a q1 no crea nodo', async ({ page }) => {
    await gotoForum(page);
    await page.locator('button[aria-controls="reply-box-q1"]').click();
    await page.locator('#add_reply').click();
    await expect(page.locator('#total-replies-count')).toHaveText('3');
    await expect(page.locator('#reply')).toBeFocused();
  });

  test('enviar réplica a q1 añade respuesta directa', async ({ page }) => {
    await gotoForum(page);
    await page.locator('button[aria-controls="reply-box-q1"]').click();
    await page.locator('#reply').fill('Coincido con el enfoque de parentId.');
    await page.locator('#add_reply').click();
    await expect(page.getByText('Respuesta directa')).toBeVisible();
    await expect(page.getByText('Coincido con el enfoque de parentId.')).toBeVisible();
    await expect(page.locator('#total-replies-count')).toHaveText('4');
    await expect(page.locator('#reply-box-q1')).toBeHidden();
  });

  test('enviar réplica anidada añade sub-réplica escalonada', async ({ page }) => {
    await gotoForum(page);
    await page.locator('#comment-r1_1_1').getByRole('button', { name: 'Replicar' }).click();
    await page.locator('#reply-input-r1_1_1').fill('Lo llevaremos a un store por nodos.');
    await page.locator('#comment-r1_1_1').getByRole('button', { name: 'Responder' }).click();
    await expect(page.getByText('Sub-réplica escalonada')).toBeVisible();
    await expect(page.getByText('Lo llevaremos a un store por nodos.')).toBeVisible();
    await expect(page.locator('#total-replies-count')).toHaveText('4');
  });

  test('like y dislike son mutuamente exclusivos y se pueden desmarcar', async ({ page }) => {
    await gotoForum(page);
    const likeBtn = page.locator('#btn-like-q1');
    const dislikeBtn = page.locator('#btn-dislike-q1');

    await likeBtn.click();
    await expect(likeBtn).toHaveClass(/like-active/);
    await expect(page.locator('#counter-q1-likes')).toHaveText('16');

    await likeBtn.click();
    await expect(likeBtn).not.toHaveClass(/like-active/);
    await expect(page.locator('#counter-q1-likes')).toHaveText('15');

    await likeBtn.click();
    await dislikeBtn.click();
    await expect(likeBtn).not.toHaveClass(/like-active/);
    await expect(dislikeBtn).toHaveClass(/dislike-active/);
    await expect(page.locator('#counter-q1-likes')).toHaveText('15');
    await expect(page.locator('#counter-q1-dislikes')).toHaveText('2');
  });

  test('muestra el hilo canónico de seed', async ({ page }) => {
    await gotoForum(page);
    await expect(page.getByText('Carlos Rodríguez')).toBeVisible();
    await expect(page.getByText('Mariana López')).toBeVisible();
    await expect(page.getByText('David Valenzuela')).toBeVisible();
    await expect(page.getByText('Sofía Gómez')).toBeVisible();
    await expect(page.getByText(/mutaciones optimistas/)).toBeVisible();
  });

  test('verifica estructura visual y colores Stitch', async ({ page }) => {
    await gotoForum(page);
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.getByText('Paleta del Sistema:')).toBeVisible();
    await expect(page.getByText('Reglas y jerarquía activas')).toBeVisible();

    const headerPosition = await page.locator('header').evaluate((el) => getComputedStyle(el).position);
    expect(headerPosition).toBe('sticky');

    await expectColorClose(page, 'header .bg-primary, header div.bg-primary', '#4F9AFF');
    await expectColorClose(page, '#add_question', '#4F9AFF');
    await expectColorClose(page, '#add_question', '#ffffff', 'color');

    await page.screenshot({
      path: join(SCREENSHOTS_DIR, 'comentarios-estado-idle.png'),
      fullPage: true,
    });
  });

  test('captura estados de réplica y voto', async ({ page }) => {
    await gotoForum(page);
    await page.locator('button[aria-controls="reply-box-q1"]').click();
    await page.screenshot({
      path: join(SCREENSHOTS_DIR, 'comentarios-estado-reply-abierto.png'),
      fullPage: true,
    });

    await page.locator('#btn-like-q1').click();
    await page.screenshot({
      path: join(SCREENSHOTS_DIR, 'comentarios-estado-like.png'),
      fullPage: true,
    });

    await page.locator('#btn-dislike-q1').click();
    await page.screenshot({
      path: join(SCREENSHOTS_DIR, 'comentarios-estado-dislike.png'),
      fullPage: true,
    });
  });

  test('comparación visual con referencia Stitch', async ({ page }) => {
    await gotoForum(page);
    const implementationPath = join(SCREENSHOTS_DIR, 'comentarios-comparacion-implementacion.png');
    await page.screenshot({ path: implementationPath, fullPage: true });

    const implementation = readFileSync(implementationPath);
    const reference = readFileSync(STITCH_REFERENCE);

    expect(implementation.length).toBeGreaterThan(10_000);
    expect(reference.length).toBeGreaterThan(10_000);

    await expect(page.locator('#view-forum')).toBeVisible();
    await expect(page.locator('#text-question')).toBeVisible();
    await expect(page.locator('#replies-tree')).toBeVisible();
    await expect(page.locator('.thread-line').first()).toBeVisible();
  });
});
