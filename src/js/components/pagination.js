import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Pagination extends Component {
  onPageClick(pageIndex, e) {
    e.preventDefault();
    this.props.onChange({offset: pageIndex * this.props.itemsPerPage});
  }

  render() {
    const {totalItemsCount, offset, itemsPerPage} = this.props;
    const pagesCount = Math.ceil(totalItemsCount / itemsPerPage);

    if (pagesCount <= 1) {
      return false;
    }

    const currentPageIndex = Math.trunc(offset / itemsPerPage);

    return <nav>
      <ul className="pagination">
        {Array.from({length: pagesCount}, (item, i) => <li
          key={i}
          className={classNames('page-item', {active: i === currentPageIndex})}>
          <a
            href=""
            className="page-link"
            onClick={this.onPageClick.bind(this, i)}>{i + 1}</a>
        </li>)}
      </ul>
    </nav>;
  }
}

Pagination.propTypes = {
  totalItemsCount: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};
