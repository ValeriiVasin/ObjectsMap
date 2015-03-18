import React from 'react';
import uid from 'lodash/utility/uniqueId'

import TitleSelector from './TitleSelector.jsx';

// * Select marker title
//
// * Select fields to find place by:
//   types: [lat/lng, address]
//   - lat/lng - selects with all fields
//   - address => selects + add field

export default React.createClass({
  getInitialState() {
    return {
      markerField: null,

      // latlng or address
      addressType: 'latlng',

      // lat/lng fields (for latlng type)
      addressLatLng: { lat: null, lng: null },

      // full address (for address type)
      addressFields: {}
    }
  },

  setMarkerField(field) {
    this.setState({ markerField: field });
  },

  setAddressType(value) {
    this.setState({ addressType: value })
    console.log(value);
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

    let uidLat = uid('label_');
    let uidLng = uid('label_');
    let name = uid('name_');

    let addressType = (
      <div className="form-group">
        <h3>Select address type</h3>
        <label htmlFor={uidLat} className="checkbox-inline">
          <input
            type="radio"
            name={name}
            id={uidLat}
            value="latlng"
            selected={this.state.addressType === 'latlng'}
            onChange={this.setAddressType.bind(this, 'latlng')}
            />Latitude / Longitude
        </label>

        <label htmlFor={uidLng} className="checkbox-inline">
          <input
            type="radio"
            name={name}
            id={uidLng}
            value="address"
            selected={this.state.addressType === 'address'}
            onChange={this.setAddressType.bind(this, 'address')}
            />Address
        </label>
      </div>
    );

    return (
      <div>
        <h1>Map settings!</h1>
        {markerField}
        {addressType}
      </div>
    );
  }
});
