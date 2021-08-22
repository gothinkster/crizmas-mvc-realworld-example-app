import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'crizmas-router';
import {Input} from 'crizmas-components';
import marked from 'marked';
import classNames from 'classnames';

import ArticleAuthor from '../../components/article-author';
import TagList from '../../components/tag-list';
import {longDate} from '../../date-utils';

export default class Article extends Component {
  constructor() {
    super();

    this.onDelete = () => {
      this.props.controller.deleteArticle();
    };

    this.setFollowing = () => {
      this.props.controller.setFollowing();
    };

    this.setFavorite = () => {
      this.props.controller.setFavorite();
    };

    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.controller.form.submit();
    };
  }

  renderArticleMeta() {
    const {article, currentUser, pending} = this.props.controller;

    return <div className="article-meta">
      <ArticleAuthor article={article} />

      {article.author.username === currentUser.username && <span>
        <Link
          to={`/editor/${article.slug}`}
          className="btn btn-sm btn-outline-secondary">
          <i className="ion-edit" />&nbsp;
          Edit Article
        </Link>
        &nbsp;
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={this.onDelete}
          disabled={pending.has('deleteArticle')}>
          <i className="ion-trash-a" />&nbsp;
          Delete Article
        </button>
      </span>}
      {article.author.username !== currentUser.username && <span>
        <button
          className={classNames('btn btn-sm', {
            'btn-secondary': article.author.following,
            'btn-outline-secondary': !article.author.following
          })}
          onClick={this.setFollowing}
          disabled={pending.has('setFollowing')}>
          <i className="ion-plus-round" />&nbsp;
          {article.author.following ? 'Unfollow' : 'Follow'} {article.author.username}
        </button>
        &nbsp;
        <button
          className={classNames('btn btn-sm', {
            'btn-primary': article.favorited,
            'btn-outline-primary': !article.favorited
          })}
          onClick={this.setFavorite}
          disabled={pending.has('setFavorite')}>
          <i className="ion-heart" />&nbsp;
          {article.favorited ? 'Unfavorite Article' : 'Favorite Article'}
          ({article.favoritesCount})
        </button>
      </span>}
    </div>;
  }

  render() {
    const {article, article: {comments}, currentUser, form, deleteComment} = this.props.controller;

    return <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>

          {this.renderArticleMeta()}
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <div dangerouslySetInnerHTML={{__html: marked(article.body)}} />
            <TagList article={article} />
          </div>
        </div>

        <hr />

        <div className="article-actions">
          {this.renderArticleMeta()}
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form" onSubmit={this.onSubmit}>
              <div className="card-block">
                <Input
                  type="textarea"
                  inputClassName="form-control"
                  placeholder="Write a comment..."
                  inputProps={{rows: "3"}}
                  {...form} />
              </div>
              <div className="card-footer">
                <img
                  src={currentUser.image}
                  className="comment-author-img" />
                <button className="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>

            {comments && !!comments.length && comments.map((comment, i) => <div
              key={i}
              className="card">
              <div className="card-block">
                <p className="card-text">
                  {comment.body}
                </p>
              </div>
              <div className="card-footer">
                <Link
                  to={`/@${encodeURIComponent(comment.author.username)}`}
                  className="comment-author">
                  <img src={comment.author.image} className="comment-author-img" />
                </Link>
                &nbsp;&nbsp;
                <Link
                  to={`/@${encodeURIComponent(comment.author.username)}`}
                  className="comment-author">{comment.author.username}</Link>
                <span className="date-posted">{longDate(comment.createdAt)}</span>
                {comment.author.username === currentUser.username && <span className="mod-options">
                  <i className="ion-trash-a" onClick={deleteComment.bind(null, comment.id)} />
                </span>}
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </div>;
  }
}

Article.propTypes = {
  controller: PropTypes.object.isRequired
};
