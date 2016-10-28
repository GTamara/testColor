import { ColorPickerPage } from './app.po';

describe('color-picker App', function() {
  let page: ColorPickerPage;

  beforeEach(() => {
    page = new ColorPickerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
