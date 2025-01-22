import { expect, stepWithParam } from "../../fixtures/all-fixtures";
import { BasePage } from "../base/base-page";

export class HomePage extends BasePage {


  public async goToWorkPage() {
    await this.navbar.clickWorkHref();
  }

  @stepWithParam
  async assertPageLoaded(isMobile: boolean) {
    await this.assertNavbarLoaded(isMobile);
  }
}
