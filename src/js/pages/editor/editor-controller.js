import {controller} from 'crizmas-mvc';
import Form, {required} from 'crizmas-form';

import router from '../../router';
import {currentUser} from '../../models/user';
import {Article} from '../../models/article';
import * as articleApi from '../../api/article';

export default controller(function EditorController() {
  const ctrl = {
    isNew: false,
    form: null,
    serverErrors: null,
    article: null
  };

  ctrl.onEnter = ({routeFragment}) => {
    if (!currentUser.isAuthenticated) {
      router.transitionTo('/login');

      return false;
    }

    ctrl.isNew = !routeFragment.abstractPath;

    if (!ctrl.isNew) {
      return ctrl.getArticle(router.params.get('slug')).then(
        init,

        () => {
          router.transitionTo('/');

          return false;
        }
      );
    }

    init();
  };

  const init = () => {
    ctrl.form = new Form({
      children: [
        {
          name: 'title',
          initialValue: ctrl.article && ctrl.article.title,
          validate: required()
        },
        {
          name: 'description',
          initialValue: ctrl.article && ctrl.article.description
        },
        {
          name: 'body',
          initialValue: ctrl.article && ctrl.article.body,
          validate: required()
        },
        {
          name: 'tagString',

          actions: {
            submit: ctrl.updateTagList
          }
        },
        {
          name: 'tagList',
          initialValue: ctrl.article && ctrl.article.tagList || []
        }
      ],

      actions: {
        submit: () => {
          const result = ctrl.form.getResult();

          ctrl.saveArticle({
            title: result.title,
            description: result.description,
            body: result.body,
            tagList: result.tagList
          });
        }
      },

      onFormChange: () => {
        ctrl.serverErrors = null;
      }
    });
  };

  ctrl.getArticle = (slug) => {
    return articleApi.getArticle({slug}).then(({article}) => {
      ctrl.article = new Article(article);
    });
  };

  ctrl.saveArticle = ({title, description, body, tagList}) => {
    ctrl.serverErrors = null;

    const savePromise = ctrl.isNew
      ? articleApi.saveArticle({title, description, body, tagList})
      : articleApi.updateArticle({slug: ctrl.article.slug, title, description, body, tagList});

    return savePromise.then(
      ({article: {slug}}) => {
        router.transitionTo(`/article/${slug}`);
      },

      (serverErrors) => {
        ctrl.serverErrors = serverErrors;
      }
    );
  };

  ctrl.updateTagList = () => {
    const tagsListInput = ctrl.form.get('tagList');
    const existingTagsList = tagsListInput.getValue();
    const tagsStringInput = ctrl.form.get('tagString');
    const result = tagsStringInput.getResult();
    const newTagsList = result && result.split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag && !existingTagsList.includes(tag));

    tagsStringInput.clear();

    if (newTagsList && newTagsList.length) {
      tagsListInput.onChange(existingTagsList.concat(newTagsList));
    }
  };

  ctrl.removeTag = (tagIndex) => {
    const tagListInput = ctrl.form.get('tagList');
    const tagList = tagListInput.getValue();

    tagList.splice(tagIndex, 1);
  };

  return ctrl;
});
