import React from 'react';

export default React.createClass({
  toRow(item, options = { isHeader: false, key: 'header-row' }) {
    let content = [];

    for (let key in item) {
      let value = item[key];

      if (options.isHeader) {
        content.push(<th key={key}>{key}</th>);
      } else {
        content.push(<td key={key}>{value}</td>);
      }
    }

    return <tr key={options.key}>{content}</tr>;
  },

  render() {

    if (!this.props.rows) {
      return null;
    }

    let rows = this.props.rows;

    let titleRow = this.toRow(rows[0], { isHeader: true, key: 'header' });
    let contentRows = rows.map((row, index) => this.toRow(row, { key: `row-${index}` }));

    return (
      <table className="table table-striped">
        {titleRow}
        {contentRows}
      </table>
    );
  }
});
