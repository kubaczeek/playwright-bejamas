import { Page } from "playwright";
import { customStep, expect, stepWithParam } from "../../fixtures/all-fixtures";
import axios from "axios";
import { baseUrl } from "../../playwright.config";
import { Base } from "./base";
import { NavbarSection } from "../component/navbar";

export class BasePage extends Base {
  navbar: NavbarSection;

  public constructor(page: Page) {
    super(page);
    this.navbar = new NavbarSection(page);
  }

  @customStep('assert that navbar is loaded')
  async assertNavbarLoaded(isMobile: boolean) {
    await this.navbar.assertLoaded(isMobile);
  }
}
