import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'crizmas-router';

import {longDate} from '../date-utils';

const ArticleAuthor = ({article}) => <span>
  <Link to={`/@${encodeURIComponent(article.author.username)}`}>
    <img src={article.author.image} />&nbsp;
  </Link>
  <div className="info">
    <Link
      to={`/@${encodeURIComponent(article.author.username)}`}
      className="author">{article.author.username}</Link>
    <span className="date">{longDate(article.createdAt)}</span>
  </div>
</span>;

ArticleAuthor.propTypes = {
  article: PropTypes.object.isRequired
};

export default ArticleAuthor;
