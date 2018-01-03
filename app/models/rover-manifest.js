const RoverManifest = Ember.Object.extend({
	init() {
		console.log(`initialising Manifest: ${this.get('name')}`);
	}
});

export default RoverManifest;
