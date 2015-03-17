import React from 'react';
import Reflux from 'reflux';

// * Select marker title
//
// * Select fields to find place by:
//   types: [lat/lng, address]
//   - lat/lng - selects with all fields
//   - address => selects + add field

export default React.createClass({
  render() {
    if (!this.props.projects.length) {
      return null;
    }

    let titles = Object.keys(this.props.projects[0]);
    let selected = titles[0];

    let markerTitle = (
      <div>
        <h1>Map settings:</h1>
        <label htmlFor="marker-title">Marker title:</label>
        <select value={selected}>
          {titles.map((title, index) => <option key={index} children={title}></option>)}
        </select>
      </div>
    );

    let markerPositionType = (
      <div className="mapMarkerType">
        <label htmlFor="marker-type-latlng">Latitude / Longitude</label>
        <input name="markerType" type="radio" value="latlng" />

        <label htmlFor="marker-type-address">Address</label>
        <input name="markerType" type="radio" value="address" />
      </div>
    );

    return (
      <div>
        {markerTitle}
        {markerPositionType}
      </div>
    );
  }
});
