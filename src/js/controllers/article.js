import Mvc from 'crizmas-mvc';

import {currentUser} from 'js/models/user';
import * as articleApi from 'js/api/article';
import router from 'js/router';

export default Mvc.controller({
  setFavorite: (article) => {
    if (!currentUser.isAuthenticated) {
      return router.transitionTo('/register');
    }

    return articleApi.setFavorite({slug: article.slug, isFavorite: !article.favorited})
      .then((result) => {
        article.favorited = result.article.favorited;
        article.favoritesCount = result.article.favoritesCount;
      });
  }
});
