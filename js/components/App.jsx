import React from 'react';
import Reflux from 'reflux';

import ImportArea from './ImportArea.jsx';
import Table from './Table.jsx';

import ProjectsStore from '../store';

export default React.createClass({
  mixins: [Reflux.connect(ProjectsStore, 'projects')],
  render() {
    return <div>
      <ImportArea />
      <Table rows={this.state.projects} />
    </div>;
  }
});
