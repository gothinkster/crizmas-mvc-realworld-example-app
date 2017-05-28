import React from 'react';
import PropTypes from 'prop-types';

const TagList = ({article}) => !!article.tagList.length && <ul className="tag-list">
  {article.tagList.map((tag, i) => <li
    key={i}
    className="tag-default tag-pill tag-outline">
    {tag}
  </li>)}
</ul>;

TagList.propTypes = {
  article: PropTypes.object.isRequired
};

export default TagList;
