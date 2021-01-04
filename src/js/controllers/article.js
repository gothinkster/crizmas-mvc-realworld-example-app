import {controller} from 'crizmas-mvc';

import {currentUser} from '../models/user';
import * as articleApi from '../api/article';
import router from '../router';

export default controller({
  setFavorite: (article) => {
    if (!currentUser.isAuthenticated) {
      router.transitionTo('/register');

      return Promise.reject(new Error('The user is not authenticated'));
    }

    return articleApi.setFavorite({slug: article.slug, isFavorite: !article.favorited})
      .then((result) => {
        article.setFavorite(result.article);
      });
  }
});
