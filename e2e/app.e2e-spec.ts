import { YaScrumWebPage } from './app.po';

describe('ya-scrum-web App', function() {
  let page: YaScrumWebPage;

  beforeEach(() => {
    page = new YaScrumWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
