import Reflux from 'reflux';
import Actions from '../actions';
import CSV from '../vendor/csv';

export default Reflux.createStore({
  listenables: [Actions],

  projects: [],

  onFilter(filterStr) {
    filterStr = filterStr.toLowerCase();

    let projects = this.projects.filter((project) => {
      for (let key in project) {
        if (project.hasOwnProperty(key)) {
          if (String(project[key]).toLowerCase().indexOf(filterStr) !== -1) {
            return true;
          }
        }
      }

      return false;
    });

    this.trigger(projects);
  },

  onImport(text) {
    try {
      let projects = CSV.parse(text);

      // add uniq ids to result
      projects.forEach(function(project, index) {
        project._uid = index;
      });

      this.projects = projects;

      this.trigger(projects);
    } catch (e) {}
  }
})
