import {controller} from 'crizmas-mvc';

import userController from '../controllers/user';

export default controller(function RootController() {
  return {
    onEnter: ({router}) => {
      return userController.checkAuthenticated().then(() => {
        const path = router.url.searchParams.get('path');

        if (path) {
          router.transitionTo(`${path}${router.url.hash}`);
        }
      });
    }
  };
});
