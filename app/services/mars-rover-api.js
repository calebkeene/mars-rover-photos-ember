import Service from '@ember/service';
import ENV from "../config/environment";
import Rover from '../models/rover';

export default Service.extend({
	description: "Useful service that does the API calls so the controller doesn't have to",

	init: function() {
		this._super(...arguments);
		console.log('mars-rover-api service initialised')
		this.set('serviceName', 'I am a really cool service!');
	},

	_fetchRover: function(roverName) {
		let promise = new Promise((resolve) => {
			Ember.$.ajax({
        url: this._fetchRoverUrl(roverName),
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
      	resolve(rover);
      });
		});

		return promise;
	},

	_fetchRoverUrl: function(roverName) {
		return `${ENV.apiBaseUrl}/rovers/${roverName}?api_key=${ENV.apiKey}`;
	}
});
