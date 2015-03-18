import React from 'react';
import Reflux from 'reflux';
import uid from 'lodash/utility/uniqueId';
import assign from 'lodash/object/extend';

import TitleSelector from './TitleSelector.jsx';
import TitleCheckboxes from './TitleCheckboxes.jsx';
import Actions from '../actions';
import MapStore from '../store/map';

// * Select marker title
//
// * Select fields to find place by:
//   types: [lat/lng, address]
//   - lat/lng - selects with all fields
//   - address => selects + add field

export default React.createClass({
  getInitialState() {
    return {
      markerField: this.props.titles[0],

      // latlng or address
      addressType: 'latlng',

      // lat/lng fields (for latlng type)
      addressLatLng: {
        lat: this.props.titles[0],
        lng: this.props.titles[0]
      },

      // full address (for address type)
      addressFields: {}
    }
  },

  save(event) {
    event.preventDefault();
    Actions.saveMapSettings(this.state);
  },

  setMarkerField(field) {
    this.setState({ markerField: field });
  },

  setAddressType(field) {
    this.setState({ addressType: field })
  },

  setAddressLatLng(type, field) {
    this.setState({
      addressLatLng: assign({}, this.state.addressLatLng, {
        [type]: field
      })
    });
  },

  setAddressFields(fields) {
    this.setState({
      addressFields: fields
    });
  },

  render() {
    if (!this.props.titles || !this.props.titles.length) {
      return null;
    }

    let markerField = (
      <div className="form-group">
        <h3>Select field to be displayed in the marker</h3>
        <TitleSelector titles={this.props.titles} onChange={this.setMarkerField} />
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
            checked={this.state.addressType === 'latlng'}
            onChange={this.setAddressType.bind(this, 'latlng')}
            /> Latitude / Longitude
        </label>

        <label className="checkbox-inline">
          <input
            type="radio"
            name={name}
            value="address"
            checked={this.state.addressType === 'address'}
            onChange={this.setAddressType.bind(this, 'address')}
            /> Address
        </label>
      </div>
    );

    let latLngAddress = (
      <div className="form-group">
        <h3>Select latitude/longitude fields:</h3>
        <label>Latitude</label>
        <TitleSelector
          titles={this.props.titles}
          onChange={this.setAddressLatLng.bind(this, 'lat')}
          value={this.state.addressLatLng.lat}
          />

        <label>Longitude</label>
        <TitleSelector
          titles={this.props.titles}
          onChange={this.setAddressLatLng.bind(this, 'lng')}
          value={this.state.addressLatLng.lng}
          />
      </div>
    );

    let fullAddress = (
      <div className="form-group">
        <h3>Address contains fields:</h3>
        <TitleCheckboxes
          titles={this.props.titles}
          onChange={this.setAddressFields}
          />
      </div>
    );

    return (
      <form onSubmit={this.save}>
        <h1>Map settings!</h1>
        {markerField}
        {addressType}
        {this.state.addressType === 'latlng' ? latLngAddress : fullAddress}
        <button>Save</button>
      </form>
    );
  }
});
