import React from 'react';
import uid from 'lodash/utility/uniqueId'

export default React.createClass({
  render() {
    if (!this.props.titles || !this.props.titles.length) {
      return null;
    }

    let checkboxes = this.props.titles.map((title) => {
      let _uid = uid('title_uid_');
      return (
        <label key={_uid} htmlFor={_uid} className="checkbox-inline" value={title}>
          <input type="checkbox" id={_uid} />{title}
        </label>
      );
    });

    return (
      <div className="form-group">{checkboxes}</div>
    )
  }
});
