import React from 'react';
import uid from 'lodash/utility/uniqueId'

import TitleSelector from './TitleSelector.jsx';

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

    return (
      <div>
        <h1>Map settings!</h1>
        {markerField}
      </div>
    );
  }
});
