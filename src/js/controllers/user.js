import {controller} from 'crizmas-mvc';
import {validate} from 'crizmas-form';

import {setAuthToken, removeAuthToken} from '../http';
import {currentUser, User} from '../models/user';
import * as userApi from '../api/user';
import router from '../router';

export const getUsernameValidator = () =>
  validate(({input}) => User.validateUsername(input.getValue()));

export const getPasswordValidator = () =>
  validate(({input}) => User.validatePassword(input.getValue()));

export default controller({
  checkAuthenticated: async () => {
    const token = localStorage.getItem('token');

    if (token) {
      setAuthToken(token);

      try {
        const {user} = await userApi.getCurrentUser();

        currentUser.updateAuthenticated(user);
      } catch (e) {
        clearExistingToken();
      }
    }
  },

  register: ({username, email, password}) => {
    return userApi.register({username, email, password}).then(({user}) => {
      setAuthenticated(user);
    });
  },

  login: ({email, password}) => {
    return userApi.login({email, password}).then(({user}) => {
      setAuthenticated(user);
    });
  },

  update: ({username, email, password, image, bio}) => {
    return userApi.update({username, email, password, image, bio}).then(() => {
      currentUser.update({username, email, image, bio});
    });
  },

  setFollowing: (user) => {
    if (!currentUser.isAuthenticated) {
      router.transitionTo('/register');

      return Promise.reject(new Error('The user is not authenticated'));
    }

    return userApi.setFollowing({
      username: user.username,
      follow: !user.following
    }).then(({profile}) => {
      user.setFollowing(profile.following);
    });
  },

  logout: () => {
    User.logout();
    clearExistingToken();
  }
});

const setAuthenticated = (userData) => {
  currentUser.updateAuthenticated(userData);
  setAuthToken(userData.token);
  localStorage.setItem('token', userData.token);
};

const clearExistingToken = () => {
  removeAuthToken();
  localStorage.removeItem('token');
};
