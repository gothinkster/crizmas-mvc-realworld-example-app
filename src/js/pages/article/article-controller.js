import {controller} from 'crizmas-mvc';
import Form from 'crizmas-form';

import * as articleApi from '../../api/article';
import {currentUser} from '../../models/user';
import {Article} from '../../models/article';
import router from '../../router';
import userController from '../../controllers/user';
import articleController from '../../controllers/article';

export default controller(function ArticleController() {
  const ctrl = {
    article: null,
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
      }
    );
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
      ctrl.article = new Article(article);
    });
  };

  ctrl.getComments = (slug) => {
    return articleApi.getArticleComments({slug}).then(({comments}) => {
      ctrl.article.setComments(comments);
    });
  };

  ctrl.deleteArticle = () => {
    return articleApi.deleteArticle({slug: ctrl.article.slug}).then(() => {
      router.transitionTo('/');
    });
  };

  ctrl.setFollowing = () => {
    return userController.setFollowing(ctrl.article.author);
  };

  ctrl.setFavorite = () => {
    return articleController.setFavorite(ctrl.article);
  };

  ctrl.postComment = (comment) => {
    if (!currentUser.isAuthenticated) {
      return router.transitionTo('/register');
    }

    return articleApi.postComment({slug: ctrl.article.slug, comment}).then(({comment}) => {
      ctrl.article.addComment(comment);
      ctrl.form.clear();
    });
  };

  ctrl.deleteComment = (commentId) => {
    return articleApi.deleteComment({slug: ctrl.article.slug, commentId}).then(() => {
      ctrl.article.deleteComment(commentId);
    });
  };

  return ctrl;
});
