import Mvc from 'crizmas-mvc';
import {validation} from 'crizmas-form';

import {setAuthToken, removeAuthToken} from 'js/http';
import {currentUser, User} from 'js/models/user';
import * as userApi from 'js/api/user';
import router from 'js/router';

export const usernameValidator = validation.validate(User.validateUsername);

export const passwordValidator = validation.validate(User.validatePassword, {events: ['blur']});

export default Mvc.controller({
  checkAuthenticated: async () => {
    const token = localStorage.getItem('token');

    if (token) {
      setAuthToken(token);

      const {user} = await userApi.getCurrentUser();

      currentUser.updateAuthenticated(user);
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
    removeAuthToken();
    localStorage.removeItem('token');
  }
});

const setAuthenticated = (userData) => {
  currentUser.updateAuthenticated(userData);
  setAuthToken(userData.token);
  localStorage.setItem('token', userData.token);
};
