import { AngularTestCurrentTimePage } from './app.po';

describe('angular-test-current-time App', () => {
  let page: AngularTestCurrentTimePage;

  beforeEach(() => {
    page = new AngularTestCurrentTimePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
