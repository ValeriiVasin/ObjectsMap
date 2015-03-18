import Reflux from 'reflux';
import Actions from '../actions';

export default Reflux.createStore({
  listenables: [Actions],

  settings: {},

  onSaveMapSettings(settings) {
    this.settings = settings;
    this.trigger(settings);
  }
});
