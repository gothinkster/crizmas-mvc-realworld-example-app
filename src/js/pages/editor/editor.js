import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input} from 'crizmas-components';

export default class Editor extends Component {
  constructor() {
    super();

    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.controller.form.submit();
    };

    this.onTagStringKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.props.controller.form.get('tagString').submit();
      }
    };
  }

  render() {
    const {form, serverErrors, isPending, removeTag} = this.props.controller;
    const tagList = form.get('tagList').getValue();

    return <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {serverErrors && <ul className="error-messages">
              {serverErrors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>}

            <form onSubmit={this.onSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <Input
                    type="text"
                    inputClassName="form-control form-control-lg"
                    placeholder="Article Title"
                    disabled={isPending}
                    {...form.get('title')} />
                </fieldset>
                <fieldset className="form-group">
                  <Input
                    type="text"
                    inputClassName="form-control"
                    placeholder="What's this article about?"
                    disabled={isPending}
                    {...form.get('description')} />
                </fieldset>
                <fieldset className="form-group">
                  <Input
                    type="textarea"
                    inputClassName="form-control"
                    placeholder="Write your article (in markdown)"
                    inputProps={{rows: "8"}}
                    disabled={isPending}
                    {...form.get('body')} />
                </fieldset>
                <fieldset className="form-group">
                  <Input
                    type="text"
                    inputClassName="form-control"
                    placeholder="Enter tags"
                    disabled={isPending}
                    {...form.get('tagString')}
                    inputProps={{onKeyPress: this.onTagStringKeyPress}} />
                  {!!tagList.length && <div className="tag-list">
                    {tagList.map((tag, i) => <span
                      key={i}
                      className="tag-default tag-pill">
                        <i className="ion-close-round" onClick={removeTag.bind(null, i)} />
                        {tag}
                      </span>)}
                  </div>}
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  disabled={isPending}>
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>;
  }
}

Editor.propTypes = {
  controller: PropTypes.object.isRequired
};
