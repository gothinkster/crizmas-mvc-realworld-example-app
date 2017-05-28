import Mvc from 'crizmas-mvc';
import Form from 'crizmas-form';

import * as articleApi from 'js/api/article';
import * as userApi from 'js/api/user';
import {currentUser} from 'js/models/user';
import router from 'js/router';
import articleController from 'js/controllers/article';

export default Mvc.controller(function ArticleController() {
  const ctrl = {
    article: null,
    comments: null,
    currentUser,
    form: null
  };

  ctrl.onEnter = () => {
    const slug = router.params.get('slug');
    const articlesPromise = ctrl.getArticle(slug);

    articlesPromise.then(() => {
      ctrl.getComments(slug);
    });

    return articlesPromise.then(
      init,

      () => {
      router.transitionTo('/');

      return false;
    });
  };

  const init = () => {
    ctrl.form = new Form({
      actions: {
        submit: () => {
          ctrl.postComment(ctrl.form.getResult());
        }
      }
    });
  };

  ctrl.getArticle = (slug) => {
    return articleApi.getArticle({slug}).then(({article}) => {
      ctrl.article = article;
    });
  };

  ctrl.getComments = (slug) => {
    return articleApi.getArticleComments({slug}).then(({comments}) => {
      ctrl.comments = comments;
    });
  };

  ctrl.deleteArticle = () => {
    return articleApi.deleteArticle({slug: ctrl.article.slug}).then(() => {
      router.transitionTo('/');
    });
  };

  ctrl.setFollowed = () => {
    if (!currentUser.isAuthenticated) {
      return router.transitionTo('/register');
    }

    return userApi.setFollowed({
      username: ctrl.article.author.username,
      follow: !ctrl.article.author.following
    }).then(({profile}) => {
      ctrl.article.author.following = profile.following;
    });
  };

  ctrl.setFavorite = () => {
    return articleController.setFavorite(ctrl.article);
  };

  ctrl.postComment = (comment) => {
    return articleApi.postComment({slug: ctrl.article.slug, comment}).then(({comment}) => {
      ctrl.comments.unshift(comment);
      ctrl.form.clear();
    });
  };

  ctrl.deleteComment = (commentId) => {
    return articleApi.deleteComment({slug: ctrl.article.slug, commentId}).then(() => {
      const index = ctrl.comments.findIndex((comment) => comment.id === commentId);

      if (index !== -1) {
        ctrl.comments.splice(index, 1);
      }
    });
  };

  return ctrl;
});
