import Reflux from 'reflux';
import Actions from '../actions/map';

export default Reflux.createStore({
  listenables: [Actions],

  settings: {
    markerField: null,

    // latlng or address
    addressType: 'latlng',

    // lat/lng fields (for latlng type)
    addressLat: null,
    addressLng: null,

    // full address (for address type)
    addressFields: {}
  },

  getSettings() {
    return this.settings;
  },

  edit: true,

  onSave() {
    this.edit = false;
    this.trigger();
  },

  onSetMarkerField(field) {
    this.settings.markerField = field;
    this.trigger();
  },

  onSetAddressFields(fieldsObj) {
    // prevent mutability
    this.settings.addressFields = _.extend({}, fieldsObj);
    this.trigger();
  },

  onSetAddressLat(field) {
    this.settings.addressLat = field;
    this.trigger();
  },

  onSetAddressLng(field) {
    this.settings.addressLng = field;
    this.trigger();
  },

  onSetAddressType(type) {
    this.settings.addressType = type;
    this.trigger();
  }
});
