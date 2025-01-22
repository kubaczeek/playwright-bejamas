
import { customStep } from "../../fixtures/all-fixtures";


import { Base } from "./base";

export class BaseComponent extends Base {

  @customStep('assert that navbar is loaded')
  assertNavbarLoaded() {
    // await expect.soft(this.workHrefButton).toBeVisible();
    // await expect.soft(this.servicesHrefButton).toBeVisible();
    // await expect.soft(this.aboutHrefButton).toBeVisible();
    // await expect.soft(this.getInTouchHrefButton).toBeVisible();
  }
}
