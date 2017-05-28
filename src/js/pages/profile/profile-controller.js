import Mvc from 'crizmas-mvc';

import router from 'js/router';
import * as userApi from 'js/api/user';
import {currentUser} from 'js/models/user';

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
      ctrl.profile = profile;
    });
  };

  ctrl.setFollowed = () => {
    if (!currentUser.isAuthenticated) {
      return router.transitionTo('/register');
    }

    return userApi.setFollowed({
      username: ctrl.username,
      follow: !ctrl.profile.following
    }).then(({profile}) => {
      ctrl.profile.following = profile.following;
    });
  };

  return ctrl;
});
