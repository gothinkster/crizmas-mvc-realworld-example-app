import {User} from './user';

export function Article(articleData) {
  const article = {
    title: articleData.title,
    author: new User(articleData.author),
    description: articleData.description,
    body: articleData.body,
    slug: articleData.slug,
    createdAt: articleData.createdAt,
    updatedAt: articleData.updatedAt,
    favorited: articleData.favorited,
    favoritesCount: articleData.favoritesCount,
    tagList: articleData.tagList,
    comments: null
  };

  article.setFavorite = ({favorited, favoritesCount}) => {
    article.favorited = favorited;
    article.favoritesCount = favoritesCount;
  };

  article.setComments = (comments) => {
    article.comments = comments;
  };

  article.addComment = (comment) => {
    article.comments.unshift(comment);
  };

  article.deleteComment = (commentId) => {
    const index = article.comments.findIndex((comment) => comment.id === commentId);

    if (index !== -1) {
      article.comments.splice(index, 1);
    }
  };

  return article;
}
