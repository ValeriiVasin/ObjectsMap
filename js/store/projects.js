import Reflux from 'reflux';
import Actions from '../actions/projects';
import CSV from '../vendor/csv';

import sortBy from 'lodash/collection/sortBy';
import _ from 'lodash';

export default Reflux.createStore({
  listenables: [Actions],

  projects: [],

  titles: [],

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

    return projects;
  },

  getTitles() {
    return this.titles;
  },

  onSortBy(field) {
    // change order
    if (field === this.sortField) {
      this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortField = field;
      this.sortOrder = 'ASC';
    }

    this.trigger();
  },

  onFilter(filter) {
    this.filter = filter;
    this.trigger();
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
      this.titles = _.chain(projects).first().keys().without('show', '_uid').value();

      this.trigger();
    } catch (e) {}
  },

  onToggleProjects() {
    this.isAllChecked = !this.isAllChecked;
    let state = this.isAllChecked;

    this.projects = this.projects.map((project) => {
      project.show = state;
      return project;
    });

    this.trigger();
  },

  onToggleProject(uid) {
    this.projects = this.projects.map((project) => {
      if (project._uid === uid) {
        project.show = !project.show;
      }

      return project;
    });

    this.isAllChecked = this.getProjects().every((project) => project.show);

    this.trigger();
  }
})
