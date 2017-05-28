import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'crizmas-router';
import {Input} from 'crizmas-components';

export default class Register extends Component {
  constructor() {
    super();

    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.controller.form.submit();
    };
  }

  render() {
    const {form, serverErrors, isPending} = this.props.controller;

    return <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            {serverErrors && <ul className="error-messages">
              {serverErrors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>}

            <form onSubmit={this.onSubmit}>
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
                disabled={isPending}>Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>;
  }
}

Register.propTypes = {
  controller: PropTypes.object.isRequired
};
