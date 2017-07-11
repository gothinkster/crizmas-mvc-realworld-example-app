import Mvc from 'crizmas-mvc';

import router from 'js/router';
import * as userApi from 'js/api/user';
import {currentUser, User} from 'js/models/user';
import userController from 'js/controllers/user';

export default Mvc.controller(function ProfileController() {
  const ctrl = {
    username: null,
    profile: null,
    articles: null,

    get isCurrentUser() {
      return ctrl.username === currentUser.username;
    }
  };

  ctrl.onEnter = () => {
    const atUsername = router.params.get('atUsername');

    if (atUsername[0] !== '@' || atUsername.length === 1) {
      router.transitionTo('/');

      return false;
    }

    ctrl.username = atUsername.slice(1);

    return ctrl.getProfile().catch(() => {
      router.transitionTo('/');

      return false;
    });
  };

  ctrl.getProfile = () => {
    return userApi.getProfile({username: ctrl.username}).then(({profile}) => {
      ctrl.profile = new User(profile);
    });
  };

  ctrl.setFollowing = () => {
    return userController.setFollowing(ctrl.profile);
  };

  return ctrl;
});
