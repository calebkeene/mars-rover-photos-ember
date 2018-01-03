import Controller from '@ember/controller';
import ENV from "../config/environment";
import RoverManifest from '../models/rover-manifest';

export default Ember.Controller.extend({
	init() {
		this._super();

		this._fetchAllManifests().then( result => {
			this.set('roverManifests', result);
		})
	},

	_fetchAllManifests() {
		let roverNames = ENV.roverNames;
		let promise = new Promise((resolve, reject) => {
			this._fetchManifest(roverNames[0], null).then(result => {
				return this._fetchManifest(roverNames[1], result);
			})
			.then(result => {
				return this._fetchManifest(roverNames[2], result)
			})
			.then(finalResult => {
				resolve(finalResult);
			});
		});
		return promise;
	},

	_fetchManifest(roverName, previousResult) {
		let promise = new Promise((resolve, reject) => {
			Ember.$.ajax({
        url: `${ENV.apiBaseUrl}/manifests/${roverName}?api_key=${ENV.apiKey}`,
        type: 'GET',
        dataType: 'json'
      }).then(response => {
      	let responseData = response['photo_manifest'];

      	let manifest = RoverManifest.create({
      		name: responseData['name'],
      		landingDate: responseData['landing_date'],
      		launchDate: responseData['launch_date'],
      		status: responseData['status'],
      		maxSol: responseData['max_sol'],
      		maxDate: responseData['max_date'],
      		totalPhotos: responseData['total_photos'],
      		photos: responseData['photos']
      	});

      	console.log("successfully built manifest!, name => " + manifest.name);
      	
      	if(previousResult == null) {
      		var returnValue = [manifest];
      	}
      	else {
      		previousResult.push(manifest);
      		var returnValue = previousResult;
      	}
      	resolve(returnValue);
      });
		});

		return promise;
	}
});
