import { GestionDeOrdenesPage } from './app.po';

describe('gestion-de-ordenes App', () => {
  let page: GestionDeOrdenesPage;

  beforeEach(() => {
    page = new GestionDeOrdenesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
