import {get} from '../http';
import {toJson} from './utils';

export const getTags = () => {
  return get('tags').then(toJson);
};
