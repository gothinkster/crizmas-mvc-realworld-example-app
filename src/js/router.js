import Router from 'crizmas-router';

import RootRouteController from './pages/root-controller';

const resolveWith = async (componentPromise, routeControllerPromise) => ({
  component: (await componentPromise).default,
  controller: (await routeControllerPromise).default
});

export default new Router({
  basePath: process.env.basePath,
  routes: [
    {
      controller: RootRouteController,
      children: [
        Router.fallbackRoute({to: '/'}),
        {
          resolve: () => resolveWith(
            import(/* webpackChunkName: 'home' */ './pages/home/home'),
            import(/* webpackChunkName: 'home' */ './pages/home/home-controller'))
        },
        {
          path: 'register',
          resolve: () => resolveWith(
            import(/* webpackChunkName: 'register' */ './pages/register/register'),
            import(/* webpackChunkName: 'register' */ './pages/register/register-controller'))
        },
        {
          path: 'login',
          resolve: () => resolveWith(
            import(/* webpackChunkName: 'login' */ './pages/login/login'),
            import(/* webpackChunkName: 'login' */ './pages/login/login-controller'))
        },
        {
          path: 'settings',
          resolve: () => resolveWith(
            import(/* webpackChunkName: 'settings' */ './pages/settings/settings'),
            import(/* webpackChunkName: 'settings' */ './pages/settings/settings-controller'))
        },
        {
          path: ':atUsername',
          children: [
            {},
            {path: 'favorites'}
          ],
          resolve: () => Promise.all([
            import(/* webpackChunkName: 'profile' */ './pages/profile/profile'),
            import(/* webpackChunkName: 'profile' */ './pages/profile/profile-controller'),
            import(/* webpackChunkName: 'articles' */ './pages/profile/articles/articles'),
            import(/* webpackChunkName: 'articles' */
              './pages/profile/articles/articles-controller')
          ]).then(([
            {default: Profile},
            {default: ProfileRouteController},
            {default: ProfileArticles},
            {default: ProfileArticlesRouteController}
          ]) => ({
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
          }))
        },
        {
          path: 'editor',
          children: [
            {},
            {path: ':slug'}
          ],
          resolve: () => Promise.all([
            import(/* webpackChunkName: 'editor' */ './pages/editor/editor'),
            import(/* webpackChunkName: 'editor' */ './pages/editor/editor-controller')
          ]).then(([{default: Editor}, {default: EditorRouteController}]) => ({
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
          }))
        },
        {
          path: 'article/:slug',
          resolve: () => resolveWith(
            import(/* webpackChunkName: 'article' */ './pages/article/article'),
            import(/* webpackChunkName: 'article' */ './pages/article/article-controller'))
        }
      ]
    }
  ]
});
