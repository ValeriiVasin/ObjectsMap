import React from 'react';
import Reflux from 'reflux';

import MapSettings from './MapSettings.jsx';

import MapStore from '../store/map';
import ProjectsStore from '../store/projects';

function getStateFromStores() {
  return {
    edit: MapStore.edit
  };
}

export default React.createClass({
  mixins: [
    Reflux.listenTo(ProjectsStore, '_onChange'),
    Reflux.listenTo(MapStore, '_onChange')
  ],

  getInitialState() {
    return getStateFromStores();
  },

  _onChange() {
    this.setState(getStateFromStores());
  },

  render() {
    return (
      <div>
        {this.state.edit ? <MapSettings /> : <h1>Google maps!</h1>}
      </div>
    );
  }
});
