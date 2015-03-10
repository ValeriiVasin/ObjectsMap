import Reflux from 'reflux';
import Actions from './actions';

export default Reflux.createStore({
  listenables: [Actions],

  onImport(text) {
    console.log('Process data:', text);
  }
})
