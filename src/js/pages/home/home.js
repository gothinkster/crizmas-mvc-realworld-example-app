import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ArticlePreview from '../../components/article-preview';
import Pagination from '../../components/pagination';

export default class Home extends Component {
  constructor() {
    super();

    this.selectTab = (tab, e) => {
      e.preventDefault();
      this.props.controller.selectTab(tab);
    };

    this.onTagClick = (tag, e) => {
      e.preventDefault();
      this.props.controller.selectTag(tag);
    };
  }

  render() {
    const {currentUser, selectedTab, tabs, articles, pending, tags, selectedTag, articleController,
      articlesOffset, articlesLimit, totalArticlesCount, getPageArticles} = this.props.controller;

    return <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {currentUser.isAuthenticated && <li className="nav-item">
                  <a
                    className={classNames('nav-link', {active: selectedTab === tabs.own})}
                    href=""
                    onClick={this.selectTab.bind(this, tabs.own)}>Your Feed</a>
                </li>}
                <li className="nav-item">
                  <a
                    className={classNames('nav-link', {active: selectedTab === tabs.global})}
                    href=""
                    onClick={this.selectTab.bind(this, tabs.global)}>Global Feed</a>
                </li>
                {selectedTab === tabs.tag && <li className="nav-item">
                  <a className="nav-link active">
                    <i className="ion-pound" /> {selectedTag}
                  </a>
                </li>}
              </ul>
            </div>

            {articles && (articles.length
              ? articles.map((article, i) => <ArticlePreview
                key={i}
                article={article}
                articleController={articleController} />)
              : <div className="article-preview">No articles are here... yet.</div>)}

            {pending.has('getArticles')
              && <div className="article-preview">Loading articles...</div>}

            <Pagination
              totalItemsCount={totalArticlesCount}
              offset={articlesOffset}
              itemsPerPage={articlesLimit}
              onChange={getPageArticles} />
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              {pending.has('getTags') && <p>Loading tags...</p>}
              {!pending.has('getTags') && (
                tags.length
                  ? <div className="tag-list">
                    {tags.map((tag, i) => <a
                      key={i}
                      href=""
                      className="tag-pill tag-default"
                      onClick={this.onTagClick.bind(this, tag)}>{tag}</a>)}
                  </div>
                  : <p>No tags yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}

Home.propTypes = {
  controller: PropTypes.object.isRequired
};
