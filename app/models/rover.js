// import DS from 'ember-data';

// export default DS.Model.extend({
// 	name: DS.attr(),
// 	landingDate: DS.attr('date'),
// 	launchDate: DS.attr('date'),
// 	status: DS.attr(),
// 	maxSol: DS.attr(),
// 	maxDate: DS.attr('date'),
// 	totalPhotos: DS.attr(),
// 	cameras: DS.attr(),
// });

const Rover = Ember.Object.extend({
  init() {
    console.log(`initialising Rover: ${this.get('name')}`);
  }
});

export default Rover;
