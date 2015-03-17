import React from 'react';

export default React.createClass({
  onChange(event) {
    let value = this.refs.select.getDOMNode().value;

    if (this.props.onChange) {
      this.props.onChange(value)
    }
  },

  render() {
    if (!this.props.titles.length) {
      return null;
    }

    return (
      <select ref="select" value={this.props.value} onChange={this.onChange}>
        {
          this.props.titles.map((title) => {
            return <option children={title} key={title}></option>
          })
        }
      </select>
    );
  }
});
