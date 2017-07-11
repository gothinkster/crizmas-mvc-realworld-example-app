import Mvc from 'crizmas-mvc';

import {currentUser} from 'js/models/user';
import * as articleApi from 'js/api/article';
import router from 'js/router';

export default Mvc.controller({
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
