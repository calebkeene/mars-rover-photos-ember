import Controller from '@ember/controller';
import ENV from "../config/environment";
import Rover from '../models/rover';

export default Controller.extend({
	init: function() {
		this._super();
		console.log("initialising application controller")
		// this._fetchAllRovers().then( result => {
		// 	this.set('rovers', result);
		// })
		this.set('displayableRoverNames', ENV.roverNames);
		this.set('rovers', {});
		this.set('currentRover', '');
	},

	showRover: false,

	actions: {
		setCurrentRover: function(roverName) {

			if(this.get('rovers')[roverName]){
				console.log('already fetched rover, setting currentRover and returning');
				this.set('currentRover', this.get('rovers')[roverName]);
				console.log('currentRover set to: ' + this.get('currentRover').name);
				return;
			}
			this._fetchRover(roverName, null).then( result => {
				console.log('result name: ' + result.name);
				this._pushToRovers(roverName, result);
				
				this.set('currentRover', this.get('rovers')[roverName]);
				console.log('set currentRover');
				console.log('name: ' + this.get('currentRover').name);

				if(!$.isEmptyObject(this.get('rovers'))){
					console.log("this.rovers is not empty");
					this.set('showRover', true);
				}

			});
		}
	},

	_fetchRover: function(roverName, previousResult) {
		let promise = new Promise((resolve, reject) => {
			Ember.$.ajax({
        url: `${ENV.apiBaseUrl}/rovers/${roverName}?api_key=${ENV.apiKey}`,
        type: 'GET',
        dataType: 'json'
      }).then(response => {
      	let responseData = response['rover'];

      	let rover = Rover.create({
      		name: responseData['name'],
      		landingDate: responseData['landing_date'],
      		launchDate: responseData['launch_date'],
      		status: responseData['status'],
      		maxSol: responseData['max_sol'],
      		maxDate: responseData['max_date'],
      		totalPhotos: responseData['total_photos'],
      		cameras: responseData['cameras']
      	});

      	console.log(rover);
      	console.log("successfully built Rover!, name => " + rover.name);

      	resolve(rover);
      });
		});

		return promise;
	},

	_pushToRovers: function(roverName, rover) {
		let currentRovers = this.get('rovers');
		currentRovers[roverName] = rover;
		this.set('rovers', currentRovers);
	}
});
