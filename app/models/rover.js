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
  cameraByName: function(cameraName) {
    let cameras = this.get('cameras');
    for(var i = 0; i < cameras.length; i++) {
      let camera = cameras[i];
      if(camera['name'] === cameraName) {
        return { shortName: camera['name'], fullName: camera['full_name'] };
      }
    }
  }

});

export default Rover;
