import Mvc from 'crizmas-mvc';
import Form, {validation} from 'crizmas-form';

import router from '../../router';
import {currentUser} from '../../models/user';
import userController, {usernameValidator, passwordValidator} from '../../controllers/user';

export default Mvc.controller(function SettingsController() {
  const ctrl = {
    userController,
    form: null,
    serverErrors: null
  };

  ctrl.onEnter = () => {
    if (!currentUser.isAuthenticated) {
      router.transitionTo('/login');

      return false;
    }

    init();
  };

  const init = () => {
    ctrl.form = new Form({
      children: [
        {
          name: 'image',
          initialValue: currentUser.image
        },
        {
          name: 'username',
          initialValue: currentUser.username,
          validate: validation(validation.required(), usernameValidator)
        },
        {
          name: 'bio',
          initialValue: currentUser.bio
        },
        {
          name: 'email',
          initialValue: currentUser.email,
          validate: validation.required()
        },
        {
          name: 'password',
          validate: passwordValidator
        }
      ],

      actions: {
        submit: () => {
          ctrl.update(ctrl.form.getResult());
        }
      },

      onFormChange: () => {
        ctrl.serverErrors = null;
      }
    });
  };

  ctrl.update = ({username, email, password, image, bio}) => {
    ctrl.serverErrors = null;

    return userController.update({username, email, password, image, bio}).then(
      () => {
        router.transitionTo('/');
      },

      (serverErrors) => {
        ctrl.serverErrors = serverErrors;
      }
    );
  };

  ctrl.logout = () => {
    userController.logout();
    router.transitionTo('/');
  };

  return ctrl;
});
