import { chromium, mergeTests } from "playwright/test";
import { test as ngbData } from "./data-fixtures";
import { HomePage } from "../pages/homepage/home-page";
import { PageFactory } from "../pages/base/page-factory";
import { routes } from "../data-types/const/routes";
import { GetInTouchPage } from "../pages/homepage/get-in-touch-page";

export const baseTest = mergeTests(ngbData);

export { expect } from "playwright/test";

export interface State {
  pageFactory: PageFactory;
  initTest: HomePage;
  initGetInTouchTest: GetInTouchPage;
}

export const test = baseTest.extend<State>({
  pageFactory: async ({ page }, use) => {
    const ngbPageFactory = new PageFactory(page);

    await use(ngbPageFactory);
  },

  initTest: async ({ pageFactory, baseURL }, use) => {
    if (baseURL === undefined) {
      baseURL = "";
    }
    await pageFactory.getPage().goto(baseURL);
    await use(pageFactory.getHomePage());
  },

  initGetInTouchTest: async ({ pageFactory, baseURL }, use) => {
    await pageFactory.getPage().goto(baseURL + routes.getInTouch);
    await use(pageFactory.getGetInTouchPage());
  },
});
