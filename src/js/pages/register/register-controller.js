import Mvc from 'crizmas-mvc';
import Form, {validation} from 'crizmas-form';

import router from '../../router';
import {currentUser} from '../../models/user';
import userController, {getUsernameValidator, getPasswordValidator} from '../../controllers/user';

export default Mvc.controller(function RegisterController() {
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
          name: 'username',
          validate: validation(validation.required(), getUsernameValidator())
        },
        {
          name: 'email',
          validate: validation.required()
        },
        {
          name: 'password',
          validate: validation(validation.required(), getPasswordValidator())
        }
      ],

      actions: {
        submit: () => {
          ctrl.register(ctrl.form.getResult());
        }
      },

      onFormChange: () => {
        ctrl.serverErrors = null;
      }
    });
  };

  ctrl.register = ({username, email, password}) => {
    ctrl.serverErrors = null;

    return userController.register({username, email, password}).then(
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
