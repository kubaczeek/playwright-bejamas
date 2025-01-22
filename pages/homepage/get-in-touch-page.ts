import { expect, stepWithParam } from "../../fixtures/all-fixtures";
import { BasePage } from "../base/base-page";

export class GetInTouchPage extends BasePage {
  private emailInput = this.page.locator('input[type="email"]')
  private messageInput = this.page.locator('textarea')
  private submitButton = this.page.locator('button[type="submit"]')

  public async goToWorkPage() {
    await this.navbar.clickWorkHref();
  }

  @stepWithParam
  async assertPageLoaded(isMobile: boolean) {
    await this.assertNavbarLoaded(isMobile);
    await expect(this.emailInput).toBeVisible();
    await expect(this.messageInput).toBeVisible();
  }

  @stepWithParam
  async assertFormIsEnabled() {
    await expect(this.emailInput).toBeEnabled();
    await expect(this.messageInput).toBeEnabled();
    await expect(this.submitButton).toBeEnabled();
  }
}
