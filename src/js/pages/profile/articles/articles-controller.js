import {controller} from 'crizmas-mvc';

import * as articleApi from '../../../api/article';
import {Article} from '../../../models/article';
import articleController from '../../../controllers/article';

const tabs = {
  own: Symbol(),
  favorite: Symbol()
};

export default controller(function ArticlesController() {
  const ctrl = {
    username: null,
    articlesOffset: 0,
    articlesLimit: 5,
    totalArticlesCount: 0,
    tabs,
    selectedTab: tabs.own,
    articles: null,
    articleController
  };

  ctrl.onEnter = ({routeFragment}) => {
    ctrl.username = routeFragment.parent.controllerObject.username;
    ctrl.selectedTab = routeFragment.abstractPath === 'favorites'
      ? tabs.favorite
      : tabs.own;

    ctrl.getArticles();
  };

  ctrl.getArticles = () => {
    const getArticlesFunc = ctrl.selectedTab === tabs.own
      ? getOwnArticles
      : getFavoriteArticles;

    return getArticlesFunc().then(({articles, articlesCount}) => {
      ctrl.articles = articles.map((articleData) => new Article(articleData));
      ctrl.totalArticlesCount = articlesCount;
    });
  };

  const getOwnArticles = () => {
    return articleApi.getOwnArticles({
      author: ctrl.username,
      offset: ctrl.articlesOffset,
      limit: ctrl.articlesLimit
    });
  };

  const getFavoriteArticles = () => {
    return articleApi.getFavoriteArticles({
      favorited: ctrl.username,
      offset: ctrl.articlesOffset,
      limit: ctrl.articlesLimit
    });
  };

  ctrl.getPageArticles = ({offset}) => {
    ctrl.articlesOffset = offset;

    ctrl.getArticles();
  };

  return ctrl;
});
