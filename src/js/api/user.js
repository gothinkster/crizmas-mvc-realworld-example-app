import {get, post, put, del} from '../http';
import {toJson, getResponseErrors} from './utils';

export const getCurrentUser = () => {
  return get('user').then(toJson);
};

export const register = ({username, email, password}) => {
  return post('users', {
    user: {
      username,
      email,
      password
    }
  }).then(toJson, getResponseErrors);
};

export const login = ({email, password}) => {
  return post('users/login', {
    user: {
      email,
      password
    }
  }).then(toJson, getResponseErrors);
};

export const update = ({username, email, password, image, bio}) => {
  return put('user', {
    user: {
      username,
      email,
      password,
      image,
      bio
    }
  }).catch(getResponseErrors);
};

export const getProfile = ({username}) => {
  return get(`profiles/${encodeURIComponent(username)}`).then(toJson);
};

export const setFollowing = ({username, follow}) => {
  const httpFunc = follow ? post : del;

  return httpFunc(`profiles/${encodeURIComponent(username)}/follow`).then(toJson);
};
