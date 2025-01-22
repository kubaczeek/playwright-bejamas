import { routes } from "../data-types/const/routes";
import { Tag } from "../data-types/enums/tags";
import { expect, test } from "../fixtures/all-fixtures";
import { baseUrl } from "../playwright.config";

test.describe('Get in touch form', () => {
  test("Check form on check", { tag: Tag.Mobile }, async ({ initGetInTouchTest, isMobile }) => {
    const getInTouchPage = initGetInTouchTest;

    await getInTouchPage.assertPageLoaded(isMobile);
    await getInTouchPage.assertFormIsEnabled();
  });
});
