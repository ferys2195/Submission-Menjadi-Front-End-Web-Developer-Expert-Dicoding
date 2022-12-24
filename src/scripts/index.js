import 'regenerator-runtime'; /* for async await transpile */
import '../styles/loading.scss';
import '../styles/main.scss';
import '../styles/responsive.scss';
import swRegister from './utils/sw-register';
import App from './views/app';
import StickyHeaderInitiator from './utils/sticky-header-initiator';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

StickyHeaderInitiator.init(document.querySelector('header'));

const app = new App({
  button: document.querySelector('#menu'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#main-content'),
  menuItem: document.querySelectorAll('.nav__item'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  app.renderPage();
  await swRegister();
});
