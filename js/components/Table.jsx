import React from 'react';

export default React.createClass({
  toRow(item) {
    let content = [];

    for (let key in item) {
      let value = item[key];
      content.push(<td key={key}>{value}</td>);
    }

    return <tr key={item._uid}>{content}</tr>;
  },

  render() {

    if (!this.props.projects.length) {
      return null;
    }

    let contentRows = this.props.projects.map((row, index) => this.toRow(row));

    return (
      <table className="table table-striped">
        <tbody>
          <tr>{this.props.titles.map((title) => <th key={title}>{title}</th>)}</tr>
          {contentRows}
        </tbody>
      </table>
    );
  }
});
