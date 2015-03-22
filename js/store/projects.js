import Reflux from 'reflux';
import Actions from '../actions';
import CSV from '../vendor/csv';
import sortBy from 'lodash/collection/sortBy';

export default Reflux.createStore({
  listenables: [Actions],

  projects: [],

  filter: '',

  sortField: null,
  sortOrder: 'ASC',

  isAllChecked: false,

  getProjects() {
    let projects = this.projects;
    let filter = this.filter.trim().toLowerCase();
    let sortField = this.sortField;
    let sortOrder = this.sortOrder;

    // filtering
    if (filter) {
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
    }


    // sorting
    if (sortField) {
      projects = sortBy(projects, sortField);

      if (sortOrder === 'DESC') {
        // copy and reverse (not mutate existing)
        projects = projects.slice(0).reverse();
      }
    }

    // determine all checked state
    this.isAllChecked = projects.every((project) => project.show);

    return {
      projects: projects,
      isAllChecked: this.isAllChecked
    };
  },

  onSortBy(field) {
    // change order
    if (field === this.sortField) {
      this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortField = field;
      this.sortOrder = 'ASC';
    }

    this.trigger(this.getProjects());
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
        project.show = true;
        this.isAllChecked = true;
      }, this);

      this.projects = projects;

      this.trigger(this.getProjects());
    } catch (e) {}
  },

  onToggleProjects() {
    this.isAllChecked = !this.isAllChecked;
    let state = this.isAllChecked;

    this.projects = this.projects.map((project) => {
      project.show = state;
      return project;
    });

    this.trigger(this.getProjects());
  },

  onToggleProject(uid) {
    this.projects = this.projects.map((project) => {
      if (project._uid === uid) {
        project.show = !project.show;
      }

      return project;
    });

    this.trigger(this.getProjects());
  }
})
