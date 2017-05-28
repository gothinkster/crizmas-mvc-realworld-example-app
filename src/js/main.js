import Mvc from 'crizmas-mvc';

import router from 'js/router';
import Layout from 'js/pages/layout';

new Mvc({
  domElement: document.querySelector('#app'),
  component: Layout,
  router
});
