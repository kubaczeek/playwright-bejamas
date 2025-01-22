import { routes } from "../data-types/const/routes";
import { Tag } from "../data-types/enums/tags";
import { expect, test } from "../fixtures/all-fixtures";
import { baseUrl } from "../playwright.config";

test.describe('Homepage', () => {
  test("Dead links on homepage", { tag: Tag.Mobile }, async ({ initTest, isMobile }) => {
    const homepage = initTest;

    await homepage.assertPageLoaded(isMobile);
    await homepage.checkDeadLinks();
  });

  test("Go to work page", async ({ initTest, isMobile }) => {
    const homepage = initTest;

    await homepage.assertPageLoaded(isMobile);
    await homepage.navbar.clickWorkHref();
    await homepage.navbar.clickWorkHref();
    await expect(homepage.page).toHaveURL(baseUrl + routes.work)
  });
});
