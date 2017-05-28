import Router from 'crizmas-router';

import RootRouteController from 'js/pages/root-controller';
import Home from 'js/pages/home/home';
import HomeRouteController from 'js/pages/home/home-controller';
import Register from 'js/pages/register/register';
import RegisterRouteController from 'js/pages/register/register-controller';
import Login from 'js/pages/login/login';
import LoginRouteController from 'js/pages/login/login-controller';
import Settings from 'js/pages/settings/settings';
import SettingsRouteController from 'js/pages/settings/settings-controller';
import Profile from 'js/pages/profile/profile';
import ProfileRouteController from 'js/pages/profile/profile-controller';
import ProfileArticles from 'js/pages/profile/articles/articles';
import ProfileArticlesRouteController from 'js/pages/profile/articles/articles-controller';
import Editor from 'js/pages/editor/editor';
import EditorRouteController from 'js/pages/editor/editor-controller';
import Article from 'js/pages/article/article';
import ArticleRouteController from 'js/pages/article/article-controller';

export default new Router({
  basePath: process.env.basePath,
  routes: [
    {
      controller: RootRouteController,
      children: [
        Router.fallbackRoute({to: '/'}),
        {
          component: Home,
          controller: HomeRouteController
        },
        {
          path: 'register',
          component: Register,
          controller: RegisterRouteController
        },
        {
          path: 'login',
          component: Login,
          controller: LoginRouteController
        },
        {
          path: 'settings',
          component: Settings,
          controller: SettingsRouteController
        },
        {
          path: ':atUsername',
          component: Profile,
          controller: ProfileRouteController,
          children: [
            {
              component: ProfileArticles,
              controller: ProfileArticlesRouteController
            },
            {
              path: 'favorites',
              component: ProfileArticles,
              controller: ProfileArticlesRouteController
            }
          ]
        },
        {
          path: 'editor',
          children: [
            {
              component: Editor,
              controller: EditorRouteController
            },
            {
              path: ':slug',
              component: Editor,
              controller: EditorRouteController
            }
          ]
        },
        {
          path: 'article/:slug',
          component: Article,
          controller: ArticleRouteController
        }
      ]
    }
  ]
});
