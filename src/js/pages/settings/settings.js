import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input} from 'crizmas-components';

export default class Settings extends Component {
  constructor() {
    super();

    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.controller.form.submit();
    };

    this.onClickLogout = () => {
      this.props.controller.logout();
    };
  }

  render() {
    const {form, serverErrors, isPending} = this.props.controller;

    return <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            {serverErrors && <ul className="error-messages">
              {serverErrors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>}

            <form onSubmit={this.onSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <Input
                    inputClassName="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    disabled={isPending}
                    {...form.get('image')} />
                </fieldset>
                <fieldset className="form-group">
                  <Input
                    inputClassName="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    disabled={isPending}
                    {...form.get('username')} />
                </fieldset>
                <fieldset className="form-group">
                  <Input
                    inputClassName="form-control form-control-lg"
                    type="textarea"
                    placeholder="Short bio about you"
                    inputProps={{rows: "8"}}
                    disabled={isPending}
                    {...form.get('bio')} />
                </fieldset>
                <fieldset className="form-group">
                  <Input
                    inputClassName="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    disabled={isPending}
                    {...form.get('email')} />
                </fieldset>
                <fieldset className="form-group">
                  <Input
                    inputClassName="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    disabled={isPending}
                    {...form.get('password')} />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  disabled={isPending}>Update Settings</button>
              </fieldset>
            </form>

            <hr />

            <button
              className="btn btn-outline-danger"
              disabled={isPending}
              onClick={this.onClickLogout}>Or click here to logout.</button>
          </div>
        </div>
      </div>
    </div>;
  }
}

Settings.propTypes = {
  controller: PropTypes.object.isRequired
};
