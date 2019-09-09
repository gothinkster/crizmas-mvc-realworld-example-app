import {get, post, put, del} from '../http';
import {toJson, getResponseErrors} from './utils';

const normalizeDates = (obj) => {
  obj.createdAt = new Date(obj.createdAt);
  obj.updatedAt = new Date(obj.updatedAt);
};

const handleArticlesResult = (result) => {
  result.articles.forEach(normalizeDates);

  return result;
};

export const getGlobalFeed = ({offset, limit}) => {
  return get('articles', {offset, limit})
    .then(toJson)
    .then(handleArticlesResult);
};

export const getOwnFeed = ({offset, limit}) => {
  return get('articles/feed', {offset, limit})
    .then(toJson)
    .then(handleArticlesResult);
};

export const getTagFeed = ({tag, offset, limit}) => {
  return get('articles', {tag, offset, limit})
    .then(toJson)
    .then(handleArticlesResult);
};

export const getOwnArticles = ({author, limit, offset}) => {
  return get('articles', {author, offset, limit})
    .then(toJson)
    .then(handleArticlesResult);
};

export const getFavoriteArticles = ({favorited, limit, offset}) => {
  return get('articles', {favorited, offset, limit})
    .then(toJson)
    .then(handleArticlesResult);
};

export const getArticle = ({slug}) => {
  return get(`articles/${encodeURIComponent(slug)}`)
    .then(toJson)
    .then(({article}) => {
      normalizeDates(article);

      return {article};
    });
};

export const saveArticle = ({title, description, body, tagList}) => {
  return post('articles', {
    article: {
      title,
      description,
      body,
      tagList
    }
  }).then(toJson, getResponseErrors);
};

export const updateArticle = ({slug, title, description, body, tagList}) => {
  return put(`articles/${encodeURIComponent(slug)}`, {
    article: {
      title,
      description,
      body,
      tagList
    }
  }).then(toJson, getResponseErrors);
};

export const setFavorite = ({slug, isFavorite}) => {
  const httpFunc = isFavorite ? post : del;

  return httpFunc(`articles/${slug}/favorite`).then(toJson);
};

export const getArticleComments = ({slug}) => {
  return get(`articles/${encodeURIComponent(slug)}/comments`)
    .then(toJson)
    .then(({comments}) => {
      comments.forEach(normalizeDates);

      return {comments};
    });
};

export const deleteArticle = ({slug}) => {
  return del(`articles/${encodeURIComponent(slug)}`);
};

export const postComment = ({slug, comment}) => {
  return post(`articles/${encodeURIComponent(slug)}/comments`, {
    comment: {body: comment}
  }).then(toJson).then(({comment}) => {
    normalizeDates(comment);

    return {comment};
  });
};

export const deleteComment = ({slug, commentId}) => {
  return del(`articles/${encodeURIComponent(slug)}/comments/${commentId}`);
};
