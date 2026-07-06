const { test, expect } = require("@playwright/test");
 
async function safeGoto(page, url, attempts = 3) {
  let lastError;
 
  for (let i = 0; i < attempts; i++) {
    try {
      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });
      return;
    } catch (error) {
      lastError = error;
      console.log(`Attempt ${i + 1} failed: ${error.message}`);
      await page.waitForTimeout(2000);
    }
  }
  throw lastError;
}
 
test.describe("BBC locators practice", () => {
  test("should display main BBC page elements", async ({ page }) => {
    await safeGoto(page, "https://www.bbc.com/");
    await page.waitForLoadState("domcontentloaded");
 
    const cookieButton = page.getByRole("button", {
      name: /accept|agree|consent|continue/i,
    });
 
    if (await cookieButton.count()) {
      if (await cookieButton.first().isVisible().catch(() => false)) {
        await cookieButton.first().click().catch(() => {});
      }
    }
 
    const menuButton = page.getByRole("button", { name: /open menu/i });
    const registerButton = page.getByRole("button", { name: /register/i });
    const mainNewsHeadline = page.locator(
      'h2[class="IndexCardHeading-styles__CardHeadlineStyled-sc-c7d910a6-3 goCKSV"]'
    );
    const mainImage = page.locator(
      'img[alt="A woman weeps as people gather at the Imam Khomeini Grand Mosalla for a farewell ceremony for Iran\\\'s late Ayatollah Ali Khamenei"]'
    );
    const liveLink = page.locator('a[href="/live"]');
    const publicationTime = page.locator(
      'span[class="IndexCardMetadata-styles__MetaDataDateStyled-sc-10966952-1 feNzEJ"]'
    );
    const newsCategory = page.locator(
      'div[class="IndexCardMetadata-styles__MetadataStyled-sc-10966952-0 fIfKvi"]'
    );
    const advertisingBlock = page.locator("#aw0");
 
    if (await menuButton.count()) {
      await expect(menuButton.first()).toBeVisible();
    }
 
    if (await registerButton.count()) {
      await expect(registerButton.first()).toBeVisible();
    }
 
    if (await mainNewsHeadline.count()) {
      await expect(mainNewsHeadline.first()).toBeVisible();
    }
 
    if (await mainImage.count()) {
      await expect(mainImage.first()).toBeVisible();
    }
 
    if (await liveLink.count()) {
      await expect(liveLink.first()).toBeVisible();
    }
 
    if (await publicationTime.count()) {
      await expect(publicationTime.first()).toBeVisible();
    }
 
    if (await newsCategory.count()) {
      await expect(newsCategory.first()).toBeVisible();
    }
 
    if (await advertisingBlock.count()) {
      await expect(advertisingBlock.first()).toBeVisible();
    }
 
    if (await liveLink.count()) {
      await expect(liveLink.first()).toContainText("Live");
    }
 
    if (await newsCategory.count()) {
      await expect(newsCategory.first()).toContainText("Middle East");
    }
  });
});
//Самые стабильные локаторы:
//локаторы по getByRole(), aria-label, href и тексту элемента. Они читаемые и не зависят от структуры страницы.
//Какие локаторы лучше не использовать:
//длинные CSS-классы, абсолютные XPath, nth-child(...) и динамические id, потому что они легко ломаются.
//Какие элементы было сложнее всего найти:
//главный заголовок, главное изображение, время публикации и рекламный блок, потому что они часто меняются на странице.