/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'mars-rover-photos-ember',
    environment,
    rootURL: '/',
    locationType: 'auto',
    apiKey: '6dWdXtuFW7tEPgiWYVFYf3kUxwgU77sARhf5aRtC',
    apiBaseUrl: 'https://api.nasa.gov/mars-photos/api/v1',
    roverNames: ['spirit', 'opportunity', 'curiosity'],
    roverCameras: {
      fhaz: 'Front Hazard Avoidance Camera',
      rhaz: 'Rear Hazard Avoidance Camera',
      mast: 'Mast Camera',
      chemcam: 'Chemistry and Camera Complex',
      mahli: 'Mars Hand Lens Imager',
      mardi: 'Mars Descent Imager',
      navcam: 'Navigation Camera',
      pancam: 'Panoramic Camera',
      minites: 'Miniature Thermal Emission Spectrometer (Mini-TES)'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
