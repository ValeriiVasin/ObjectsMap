import React from 'react';
import Actions from '../actions';

export default React.createClass({
  onSubmit(event) {
    event.preventDefault();
    Actions.import(this.refs.textarea.getDOMNode().value);
  },

  render() {
    return (
      <form role="form" onSubmit={this.onSubmit}>
        <h1>Import</h1>
        <div className="form-group">
          <textarea
            className="form-control"
            cols="30"
            rows="20"
            placeholder="Insert your data here"
            ref="textarea"
            ></textarea>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    );
  }
});
