import React from 'react';
import Reflux from 'reflux';

import ImportArea from './ImportArea.jsx';
import ProjectsStore from '../store';

export default React.createClass({
  mixins: [Reflux.connect(ProjectsStore, 'projects')],
  render() {
    return <ImportArea />;
  }
});
