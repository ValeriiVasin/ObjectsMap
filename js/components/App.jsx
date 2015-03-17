import React from 'react';
import Reflux from 'reflux';

import ImportArea from './ImportArea.jsx';
import Table from './Table.jsx';
import Map from './Map.jsx';
import TitleSelector from './TitleSelector.jsx';

import ProjectsStore from '../store';

export default React.createClass({
  mixins: [Reflux.listenTo(ProjectsStore, 'onChange')],

  getInitialState() {
    return {
      projects: [],
      titles: []
    };
  },

  onChange(projects) {
    this.setState({
      projects: projects,
      titles: Object.keys(projects[0]).filter((name) => name !== '_uid')
    });
  },

  render() {
    return <div>
      <TitleSelector titles={this.state.titles} />
      <Map projects={this.state.projects} />
      <ImportArea />
      <Table projects={this.state.projects} titles={this.state.titles} />
    </div>;
  }
});
