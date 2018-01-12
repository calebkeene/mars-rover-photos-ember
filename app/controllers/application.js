import Controller from '@ember/controller';
import ENV from "../config/environment";
import Rover from '../models/rover';
import RoverApiService from '../services/mars-rover-api';

export default Controller.extend({
	init: function() {
		this._super();
		console.log("initialising application controller")
		// this._fetchAllRovers().then( result => {
		// 	this.set('rovers', result);
		// })
		this.set('displayableRoverNames', ENV.roverNames);
		this.set('rovers', {});
		this.set('currentRover', null);
		this.set('serviceName', this.get('marsRoverApi').serviceName);
	},

	marsRoverApi: Ember.inject.service(),

	showRover: false,

	actions: {
		setCurrentRover: function(roverName) {

			if (this.get('rovers')[roverName]) {
				this.set('currentRover', this.get('rovers')[roverName]);
				this._setDatePicker();
				return;
			}

			this.get('marsRoverApi')._fetchRover(roverName).then( result => {
				this._pushToRovers(roverName, result);
				this.set('currentRover', this.get('rovers')[roverName]);
				this._setDatePicker();

				if(!$.isEmptyObject(this.get('rovers'))){
					this.set('showRover', true);
				}
			});
		},

		setCurrentCamera: function(cameraShortName) {
			let rover = this.get('currentRover');
			this.set('currentCamera', rover.cameraByName(cameraShortName));
		}
	},

	_dateRange: function() {
		let rover = this.get('currentRover');
		let minYear = new Date(rover.landingDate).getFullYear();
		let maxYear = new Date(rover.maxDate).getFullYear();
		return [minYear, maxYear];
	},

	_setDatePicker: function(self) {		
		this.set('datePickerYearRange', this._dateRange());
		this.set('currentDate', this.get('currentRover').maxDate);
		console.log('datePickerYearRange set => ' + this.get('datePickerYearRange'));
		console.log('currentDate set => ' + this.get('currentDate'));
	},

	_pushToRovers: function(roverName, rover) {
		let currentRovers = this.get('rovers');
		currentRovers[roverName] = rover;
		this.set('rovers', currentRovers);
	}
});
