import React from 'react';

import Actions from '../actions';

export default React.createClass({
  toRow(project) {
    let content = [
      <td key={'project_' + project._uid}>
        <input
          type="checkbox"
          checked={project.show}
          onChange={Actions.toggleProject.bind(null, project._uid)}
          title={project.show ? 'Hide project on map' : 'Show project on map'}
          />
      </td>
    ];

    for (let key in project) {
      let value = project[key];
      content.push(<td key={key}>{value}</td>);
    }

    return <tr key={project._uid}>{content}</tr>;
  },

  sortBy(field) {
    Actions.sortBy(field);
  },

  render() {

    if (!this.props.projects.length) {
      return null;
    }

    let contentRows = this.props.projects.map((project, index) => this.toRow(project));
    let headerRows = (
      <tr>
        <th><input
          type="checkbox"
          onChange={Actions.toggleProjects}
          checked={this.props.isAllChecked}
          title={ this.props.isAllChecked ? 'Hide all on map' : 'Show all on map' }
          /></th>
        {this.props.titles.map((title) => {
          return (
            <th key={title}>
              <a href="javascript:void(0)" onClick={this.sortBy.bind(this, title)}>{title}</a>
            </th>
          );
        })}
      </tr>
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
