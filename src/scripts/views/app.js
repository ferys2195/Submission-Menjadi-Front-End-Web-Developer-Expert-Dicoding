import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
import DrawerInitiator from '../utils/drawer-initiator';
import ErrorPage from './pages/error-page';

class App {
  constructor({ button, drawer, content, menuItem }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._menuItem = menuItem;
    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
      menuItem: this._menuItem,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    try {
      this._content.innerHTML = await page.render();
      await page.afterRender();
    } catch (error) {
      this._content.innerHTML = ErrorPage.render();
      ErrorPage.afterRender(error);
    }
    this._content.focus();
    const skipLinkElem = document.querySelector('.skip-link');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      this._content.focus();
    });
  }
}
export default App;
