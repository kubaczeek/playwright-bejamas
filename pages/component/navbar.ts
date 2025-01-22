import { Page } from "playwright";
import { customStep, expect, stepWithParam } from "../../fixtures/all-fixtures";
import { BaseComponent } from "../base/base-component";

export class NavbarSection extends BaseComponent {
    private container = this.page.locator('header nav');
    private workHrefButton = this.container.locator(this.hrefByText('Work'));
    private servicesHrefButton = this.container.locator(this.hrefByText('Services'));
    private aboutHrefButton = this.container.locator(this.hrefByText('About'));
    private getInTouchHrefButton = this.container.locator(this.hrefByText('Get in touch'));
    private mobileNavToggle = this.page.locator('label[for="nav-toggle"][class*="hamburger-menu"]');

  @customStep('assert that navbar is loaded')
  async assertLoaded(isMobile: boolean) {
    if (isMobile) {
        await expect(this.mobileNavToggle).toBeVisible();
    } else {
        await expect.soft(this.workHrefButton).toBeVisible();
        await expect.soft(this.servicesHrefButton).toBeVisible();
        await expect.soft(this.aboutHrefButton).toBeVisible();
        await expect.soft(this.getInTouchHrefButton).toBeVisible();
    }
  }

  @stepWithParam
  async clickWorkHref() {
    await this.workHrefButton.click();
  }
}
