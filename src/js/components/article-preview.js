import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'crizmas-router';
import classNames from 'classnames';

import ArticleAuthor from './article-author';
import TagList from './tag-list';

export default class ArticlePreview extends Component {
  constructor() {
    super();

    this.state = {
      isFavoritePending: false
    };

    this.setFavorite = () => {
      this.setState({isFavoritePending: true});
      this.props.articleController.setFavorite(this.props.article).then(() => {
        this.setState({isFavoritePending: false});
      });
    };
  }

  render() {
    const {article} = this.props;

    return <div className="article-preview">
      <div className="article-meta">
        <ArticleAuthor article={article} />
        <button
          className={classNames('btn btn-sm pull-xs-right', {
            'btn-primary': article.favorited,
            'btn-outline-primary': !article.favorited
          })}
          onClick={this.setFavorite}
          disabled={this.state.isFavoritePending}>
          <i className="ion-heart"></i> {article.favoritesCount}
        </button>
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <TagList article={article} />
      </Link>
    </div>;
  }
}

ArticlePreview.propTypes = {
  article: PropTypes.object.isRequired,
  articleController: PropTypes.object.isRequired
};
