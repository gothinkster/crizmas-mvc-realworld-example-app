import Mvc from 'crizmas-mvc';
import Form, {validation} from 'crizmas-form';

import router from 'js/router';
import {currentUser} from 'js/models/user';
import userController from 'js/controllers/user';

export default Mvc.controller(function LoginController() {
  const ctrl = {
    userController,
    form: null,
    serverErrors: null
  };

  ctrl.onEnter = () => {
    if (currentUser.isAuthenticated) {
      router.transitionTo('/');

      return false;
    }

    init();
  };

  const init = () => {
    ctrl.form = new Form({
      children: [
        {
          name: 'email',
          validate: validation.required()
        },
        {
          name: 'password',
          validate: validation.required()
        }
      ],

      actions: {
        submit: () => {
          ctrl.login(ctrl.form.getResult());
        }
      },

      onFormChange: () => {
        ctrl.serverErrors = null;
      }
    });
  };

  ctrl.login = ({email, password}) => {
    ctrl.serverErrors = null;

    return userController.login({email, password}).then(
      () => {
        router.transitionTo('/');
      },

      (serverErrors) => {
        ctrl.serverErrors = serverErrors;
      }
    );
  };

  return ctrl;
});
