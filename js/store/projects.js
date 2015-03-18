import Reflux from 'reflux';
import Actions from '../actions';
import CSV from '../vendor/csv';

export default Reflux.createStore({
  listenables: [Actions],

  projects: [],

  filter: '',

  getProjects() {
    let projects = this.projects;
    let filter = this.filter.trim().toLowerCase();

    // filtering
    if (!filter) {
      return projects;
    }

    projects = projects.filter((project) => {
      for (let key in project) {
        if (project.hasOwnProperty(key)) {
          if (String(project[key]).toLowerCase().indexOf(filter) !== -1) {
            return true;
          }
        }
      }

      return false;
    });

    return projects;
  },

  onFilter(filter) {
    this.filter = filter;
    this.trigger(this.getProjects());
  },

  onImport(text) {
    try {
      let projects = CSV.parse(text);

      // add uniq ids to result
      projects.forEach(function(project, index) {
        project._uid = index;
      });

      this.projects = projects;

      this.trigger(this.getProjects());
    } catch (e) {}
  }
})
