import Reflux from 'reflux';
import Actions from './actions';
import CSV from './vendor/csv';

export default Reflux.createStore({
  listenables: [Actions],

  onImport(text) {
    try {
      let result = CSV.parse(text);
      this.trigger(result);
    } catch (e) {}
  }
})
