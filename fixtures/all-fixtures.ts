import { mergeTests } from "playwright/test";



import { test as dataFixtures } from "./data-fixtures";
import { test as stateFixtures } from "./state-fixtures";
import { Site } from "../data-types/enums/sites";

export const mergeTest = mergeTests(dataFixtures, stateFixtures);

export function stepWithParam(
  target: Function,
  context: ClassMethodDecoratorContext
) {
  return function replacementMethod(...args: any) {
    let name = "";

    if (args) {
      name += " args: " + args.join(" ");
    }
    name += " Stack: " + this.constructor.name + "." + (context.name as string);

    return test.step(name, async () => {
      return await target.call(this, ...args);
    });
  };
}

export function customStep(customStep: string, notHandled?: never) {
  function stepWithParam(
    target: Function,
    context: ClassMethodDecoratorContext
  ) {
    return function replacementMethod(...args: any) {
      let name = customStep;

      if (args) {
        name += " args: " + args.join(" ");
      }
      name +=
        " Stack: " + this.constructor.name + "." + (context.name as string);

      return test.step(name, async () => {
        return await target.call(this, ...args);
      });
    };
  }

  return stepWithParam;
}

export const test = mergeTest.extend<{ testHook: void }>({
  testHook: [skipLogic, { auto: true }],
});

async function skipLogic({}, use, testInfo) {
  process.env.SITE = testInfo.project.name.replace(
    "MOBILE_CHROME_",
    ""
  ) as Site;

  await use();
}

export { expect } from "playwright/test";
