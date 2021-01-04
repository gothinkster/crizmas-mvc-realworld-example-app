import {controller} from 'crizmas-mvc';
import Form, {required} from 'crizmas-form';

import router from '../../router';
import {currentUser} from '../../models/user';
import userController from '../../controllers/user';

export default controller(function LoginController() {
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
          validate: required()
        },
        {
          name: 'password',
          validate: required()
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
