import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'crizmas-router';
import classNames from 'classnames';

import ArticlePreview from '../../../components/article-preview';
import Pagination from '../../../components/pagination';

export default class Articles extends Component {
  constructor() {
    super();

    this.setFollowing = () => {
      this.props.controller.setFollowing();
    };
  }

  render() {
    const {username, selectedTab, tabs, articles, pending, articleController,
      articlesOffset, articlesLimit, totalArticlesCount, getPageArticles} = this.props.controller;

    return <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-10 offset-md-1">
          <div className="articles-toggle">
            <ul className="nav nav-pills outline-active">
              <li className="nav-item">
                <Link
                  className={classNames('nav-link', {active: selectedTab === tabs.own})}
                  to={`/@${encodeURIComponent(username)}`}>My Articles</Link>
              </li>
              <li className="nav-item">
                <Link
                  className={classNames('nav-link', {active: selectedTab === tabs.favorite})}
                  to={`/@${encodeURIComponent(username)}/favorites`}>
                  Favorited Articles
                </Link>
              </li>
            </ul>
          </div>

          {articles && (articles.length
            ? articles.map((article, i) => <ArticlePreview
              key={i}
              article={article}
              articleController={articleController} />)
            : <div className="article-preview">No articles are here... yet.</div>)}

          {pending.has('getArticles') && <div className="article-preview">Loading articles...</div>}

          <Pagination
            totalItemsCount={totalArticlesCount}
            offset={articlesOffset}
            itemsPerPage={articlesLimit}
            onChange={getPageArticles} />
        </div>
      </div>
    </div>;
  }
}

Articles.propTypes = {
  controller: PropTypes.object.isRequired
};
