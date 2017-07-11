import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'crizmas-router';
import classNames from 'classnames';

export default class Profile extends Component {
  constructor() {
    super();

    this.setFollowing = () => {
      this.props.controller.setFollowing();
    };
  }

  render() {
    const {profile, isCurrentUser, isPending} = this.props.controller;
    const {children} = this.props;

    return <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={profile.image} className="user-img" />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>
              {isCurrentUser && <Link
                className="btn btn-sm btn-outline-secondary action-btn"
                to="/settings">
                <i className="ion-gear-a" />
                &nbsp;
                Edit Profile Settings
              </Link>}

              {!isCurrentUser && <button
                className={classNames('btn btn-sm action-btn', {
                  'btn-secondary': profile.following,
                  'btn-outline-secondary': !profile.following
                })}
                onClick={this.setFollowing}
                disabled={isPending}>
                <i className="ion-plus-round" />
                &nbsp;
                {profile.following ? 'Unfollow' : 'Follow'} {profile.username}
              </button>}
            </div>
          </div>
        </div>
      </div>

      {children}
    </div>;
  }
}

Profile.propTypes = {
  controller: PropTypes.object.isRequired,
  children: PropTypes.any
};
