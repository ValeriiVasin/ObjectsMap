import React from 'react';
import uid from 'lodash/utility/uniqueId'
import assign from 'lodash/object/extend'

export default React.createClass({
  getInitialState() {
    return {
      checked: {}
    };
  },

  onChange(title, event) {
    let fieldObj = {
      [title]: event.target.checked
    }

    let checked = assign({}, this.state.checked, fieldObj);

    this.setState({
      checked: checked
    });

    if (this.props.onChange) {
      this.props.onChange(checked);
    }
  },

  render() {
    if (!this.props.titles || !this.props.titles.length) {
      return null;
    }

    let checkboxes = this.props.titles.map((title) => {
      let _uid = uid('title_uid_');
      return (
        <div className="checkbox" key={title}>
          <label>
            <input
              type="checkbox"
              onChange={this.onChange.bind(this, title)}
              />{title}
          </label>
        </div>
      );
    });

    return (
      <div className="form-group">{checkboxes}</div>
    )
  }
});
