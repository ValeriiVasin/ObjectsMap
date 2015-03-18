import React from 'react';
import Reflux from 'reflux';

import MapSettings from './MapSettings.jsx';

export default React.createClass({
  render() {
    if (!this.props.projects.length) {
      return null;
    }

    let titles = Object.keys(this.props.projects[0]);

    return (
      <div>
        {<MapSettings titles={titles} />}
      </div>
    );
  }
});
