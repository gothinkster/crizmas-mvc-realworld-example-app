import Mvc from 'crizmas-mvc';

import * as articleApi from 'js/api/article';
import * as tagsApi from 'js/api/tags';
import {currentUser} from 'js/models/user';
import articleController from 'js/controllers/article';

const tabs = {
  own: Symbol(),
  global: Symbol(),
  tag: Symbol()
};

export default Mvc.controller(function HomeController() {
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
      ? ctrl.getOwnFeed
      : ctrl.selectedTab === tabs.global
        ? ctrl.getGlobalFeed
        : ctrl.getTagsFeed;

    return getArticlesFunc().then(({articles, articlesCount}) => {
      ctrl.articles = articles;
      ctrl.totalArticlesCount = articlesCount;
    });
  };

  ctrl.getGlobalFeed = () => {
    return articleApi.getGlobalFeed({offset: ctrl.articlesOffset, limit: ctrl.articlesLimit});
  };

  ctrl.getOwnFeed = () => {
    return articleApi.getOwnFeed({offset: ctrl.articlesOffset, limit: ctrl.articlesLimit});
  };

  ctrl.getTagsFeed = () => {
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
