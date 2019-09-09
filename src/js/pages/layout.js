import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'crizmas-router';

import {currentUser} from '../models/user';

const Layout = ({router, children}) => <div>
  {router.isTransitioning && <div className="transition-overlay" />}

  <nav className="navbar navbar-light">
    <div className="container">
      <Link className="navbar-brand" to="/">conduit</Link>
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        {currentUser.isAuthenticated && [
          <li
            key="new-post"
            className="nav-item">
            <Link className="nav-link" to="/editor">
              <i className="ion-compose" />&nbsp;New Article
            </Link>
          </li>,
          <li
            key="settings"
            className="nav-item">
            <Link className="nav-link" to="/settings">
              <i className="ion-gear-a" />&nbsp;Settings
            </Link>
          </li>,
          <li
            key="profile"
            className="nav-item">
            <Link className="nav-link" to={`/@${encodeURIComponent(currentUser.username)}`}>
              <img className="user-pic" src={currentUser.image} />
              {currentUser.username}
            </Link>
          </li>
        ]}
        {!currentUser.isAuthenticated && [
          <li
            key="sign-in"
            className="nav-item">
            <Link className="nav-link" to="/login">Sign in</Link>
          </li>,
          <li
            key="sign-up"
            className="nav-item">
            <Link className="nav-link" to="/register">Sign up</Link>
          </li>
        ]}
      </ul>
    </div>
  </nav>

  {children}

  <footer>
    <div className="container">
      <Link to="/" className="logo-font">conduit</Link>
      <span className="attribution">
        An interactive learning project from <a href="https://thinkster.io">Thinkster</a>.
        Code &amp; design licensed under MIT.
      </span>
    </div>
  </footer>
</div>;

Layout.propTypes = {
  router: PropTypes.object.isRequired,
  children: PropTypes.any
};

export default Layout;
