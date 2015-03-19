import React from 'react';

import Actions from '../actions';

export default React.createClass({
  toRow(item) {
    let content = [];

    for (let key in item) {
      let value = item[key];
      content.push(<td key={key}>{value}</td>);
    }

    return <tr key={item._uid}>{content}</tr>;
  },

  sortBy(field) {
    Actions.sortBy(field);
  },

  render() {

    if (!this.props.projects.length) {
      return null;
    }

    let contentRows = this.props.projects.map((row, index) => this.toRow(row));
    let headerRows = (
      <tr>{this.props.titles.map((title) => {
        return (
          <th key={title}>
            <a href="javascript:void(0)" onClick={this.sortBy.bind(this, title)}>{title}</a>
          </th>
        );
      })}</tr>
    );

    return (
      <table className="table table-striped">
        <tbody>
          {headerRows}
          {contentRows}
        </tbody>
      </table>
    );
  }
});
