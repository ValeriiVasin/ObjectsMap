import React from 'react';
import Reflux from 'reflux';

import ImportArea from './ImportArea.jsx';
import Table from './Table.jsx';
import Map from './Map.jsx';
import Actions from '../actions/projects';

export default React.createClass({
  onFilterChange(event) {
    Actions.filter(event.target.value.trim());
  },

  render() {
    return <div>
      <Map />
      <ImportArea />
      <input onChange={this.onFilterChange} />
      <Table />
    </div>;
  }
});
