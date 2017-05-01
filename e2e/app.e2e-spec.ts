import { JahadPage } from './app.po';

describe('jahad App', function() {
  let page: JahadPage;

  beforeEach(() => {
    page = new JahadPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
