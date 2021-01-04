import {controller} from 'crizmas-mvc';

import * as articleApi from '../../api/article';
import * as tagsApi from '../../api/tags';
import {currentUser} from '../../models/user';
import {Article} from '../../models/article';
import articleController from '../../controllers/article';

const tabs = {
  own: Symbol(),
  global: Symbol(),
  tag: Symbol()
};

export default controller(function HomeController() {
  const ctrl = {
    articlesOffset: 0,
    articlesLimit: 10,
    totalArticlesCount: 0,
    tabs,
    selectedTab: currentUser.isAuthenticated
      ? tabs.own
      : tabs.global,
    currentUser,
    articles: null,
    tags: null,
    selectedTag: null,
    articleController
  };

  ctrl.onEnter = () => {
    ctrl.getArticles();
    ctrl.getTags();
  };

  ctrl.getArticles = () => {
    const getArticlesFunc = ctrl.selectedTab === tabs.own
      ? getOwnFeed
      : ctrl.selectedTab === tabs.global
        ? getGlobalFeed
        : getTagsFeed;

    return getArticlesFunc().then(({articles, articlesCount}) => {
      ctrl.articles = articles.map((articleData) => new Article(articleData));
      ctrl.totalArticlesCount = articlesCount;
    });
  };

  const getOwnFeed = () => {
    return articleApi.getOwnFeed({offset: ctrl.articlesOffset, limit: ctrl.articlesLimit});
  };

  const getGlobalFeed = () => {
    return articleApi.getGlobalFeed({offset: ctrl.articlesOffset, limit: ctrl.articlesLimit});
  };

  const getTagsFeed = () => {
    return articleApi.getTagFeed({
      offset: ctrl.articlesOffset,
      limit: ctrl.articlesLimit,
      tag: ctrl.selectedTag
    });
  };

  ctrl.getTags = () => {
    return tagsApi.getTags().then(({tags}) => {
      ctrl.tags = tags;
    });
  };

  ctrl.selectTab = (tab) => {
    ctrl.articles = null;
    ctrl.selectedTab = tab;
    ctrl.articlesOffset = 0;
    ctrl.totalArticlesCount = 0;

    ctrl.getArticles();
  };

  ctrl.selectTag = (tag) => {
    ctrl.selectedTag = tag;

    ctrl.selectTab(tabs.tag);
  };

  ctrl.getPageArticles = ({offset}) => {
    ctrl.articlesOffset = offset;

    ctrl.getArticles();
  };

  return ctrl;
});
