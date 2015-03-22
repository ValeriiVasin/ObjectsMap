import React from 'react';
import Reflux from 'reflux';

import ImportArea from './ImportArea.jsx';
import Table from './Table.jsx';
import Map from './Map.jsx';
import TitleSelector from './TitleSelector.jsx';
import TitleCheckboxes from './TitleCheckboxes.jsx';

import ProjectsStore from '../store/projects';
import Actions from '../actions';

export default React.createClass({
  mixins: [Reflux.listenTo(ProjectsStore, 'onChange')],

  getInitialState() {
    return {
      projects: [],
      titles: [],
      isAllChecked: false
    };
  },

  onChange(payload) {
    let projects = payload.projects;

    this.setState({
      projects: projects || [],
      titles: projects && projects.length ?
              Object.keys(projects[0]).filter((name) => name !== '_uid') :
              [],
      isAllChecked: payload.isAllChecked
    });
  },

  onFilterChange(event) {
    Actions.filter(event.target.value.trim());
  },

  render() {
    return <div>
      <Map projects={this.state.projects} />
      <ImportArea />
      <input onChange={this.onFilterChange} />
      <Table
        projects={this.state.projects}
        titles={this.state.titles}
        isAllChecked={this.state.isAllChecked}
        />
    </div>;
  }
});
