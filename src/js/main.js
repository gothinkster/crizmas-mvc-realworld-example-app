import Mvc from 'crizmas-mvc';

import router from './router';
import Layout from './pages/layout';

new Mvc({
  domElement: document.querySelector('#app'),
  component: Layout,
  router
});
