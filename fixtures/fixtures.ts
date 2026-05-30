import { test as base, expect } from '@playwright/test';
import { AllPages } from '../pages/all.pages.page';

type MyFixtures = {
  app: AllPages;
  loggedInApp: AllPages;
};

export const test = base.extend<MyFixtures>({

  app: async ({ page }, use) => {
    const app = new AllPages(page);
    await use(app);
  },


loggedInApp: async ({ browser }, use) => {
  const context = await browser.newContext({
    storageState: 'playwright/.auth/logged_user.json'
  });

  const page = await context.newPage();
  const loggedInApp = new AllPages(page);

  await use(loggedInApp);
  await context.close();
}
});

export { expect };

