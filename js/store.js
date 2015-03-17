import Reflux from 'reflux';
import Actions from './actions';
import CSV from './vendor/csv';

export default Reflux.createStore({
  listenables: [Actions],

  onImport(text) {
    try {
      let projects = CSV.parse(text);

      // add uniq ids to result
      projects.forEach(function(project, index) {
        project._uid = index;
      });

      this.trigger(projects);
    } catch (e) {}
  }
})
