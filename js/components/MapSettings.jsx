import React from 'react';
import Reflux from 'reflux';
import uid from 'lodash/utility/uniqueId';
import assign from 'lodash/object/extend';

import TitleSelector from './TitleSelector.jsx';
import TitleCheckboxes from './TitleCheckboxes.jsx';
import Actions from '../actions/map';

import MapStore from '../store/map';
import ProjectsStore from '../store/projects';

function getStateFromStores() {
  return {
    titles: ProjectsStore.getTitles(),
    settings: MapStore.getSettings()
  }
}

// * Select marker title
//
// * Select fields to find place by:
//   types: [lat/lng, address]
//   - lat/lng - selects with all fields
//   - address => selects + add field

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
    console.log(getStateFromStores().settings);
  },

  save(event) {
    event.preventDefault();
    Actions.save();
  },

  render() {
    if (!this.state.titles || !this.state.titles.length) {
      return null;
    }

    let markerField = (
      <div className="form-group">
        <h3>Select field to be displayed in the marker</h3>
        <TitleSelector titles={this.state.titles} onChange={Actions.setMarkerField} />
      </div>
    );

    let name = uid('name_');
    let addressType = (
      <div className="form-group">
        <h3>Select address type</h3>
        <label className="checkbox-inline">
          <input
            type="radio"
            name={name}
            value="latlng"
            checked={this.state.settings.addressType === 'latlng'}
            onChange={Actions.setAddressType.bind(Actions, 'latlng')}
            /> Latitude / Longitude
        </label>

        <label className="checkbox-inline">
          <input
            type="radio"
            name={name}
            value="address"
            checked={this.state.settings.addressType === 'address'}
            onChange={Actions.setAddressType.bind(Actions, 'address')}
            /> Address
        </label>
      </div>
    );

    let latLngAddress = (
      <div className="form-group">
        <h3>Select latitude/longitude fields:</h3>
        <label>Latitude</label>
        <TitleSelector
          titles={this.state.titles}
          onChange={Actions.setAddressLat}
          value={this.state.settings.addressLat}
          />

        <label>Longitude</label>
        <TitleSelector
          titles={this.state.titles}
          onChange={Actions.setAddressLng}
          value={this.state.settings.addressLng}
          />
      </div>
    );

    let fullAddress = (
      <div className="form-group">
        <h3>Address contains fields:</h3>
        <TitleCheckboxes
          titles={this.state.titles}
          onChange={Actions.setAddressFields}
          checked={this.state.settings.addressFields}
          />
      </div>
    );
    return (
      <form onSubmit={this.save}>
        <h1>Map settings!</h1>
        {markerField}
        {addressType}
        {this.state.settings.addressType === 'latlng' ? latLngAddress : fullAddress}
        <button>Save</button>
      </form>
    );
  }
});
