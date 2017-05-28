import {get} from 'js/http';
import {toJson} from 'js/api/utils';

export const getTags = () => {
  return get('tags').then(toJson);
};
