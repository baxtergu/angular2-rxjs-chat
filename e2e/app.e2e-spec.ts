import { Angular2RxjsChatPage } from './app.po';

describe('angular2-rxjs-chat App', () => {
  let page: Angular2RxjsChatPage;

  beforeEach(() => {
    page = new Angular2RxjsChatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
