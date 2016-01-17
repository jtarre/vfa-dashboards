module.exports = function(config) {
  config.set({

    browsers: ['PhantomJS'],

    frameworks: ['jasmine-jquery', 'jasmine'],

    preprocessors: {
      '**/*.html': ['ng-html2js']
    },

    files: [
      // bower dist dependencies
      'bower_components/angular/angular.js',
      'bower_components/angular-ui/build/angular-ui.js',
      'bower_components/lodash/lodash.js',
      'bower_components/d3/d3.js',
      'bower_components/nvd3/build/nv.d3.js',
      'bower_components/angular-nvd3/dist/angular-nvd3.js',
      'bower_components/ngstorage/ngStorage.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-aria/angular-aria.js',

      // bower test dependencies
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-mocks/angular-mocks.js',

      //Spec Helpers
      // 'spec-helpers/spec-helper-main.js',
      // 'spec-helpers/**.js',

      // your implementation files
      'javascripts/core.js',
      'javascripts/partial/**/*.js',
      'javascripts/partial/**/*.html',
      'javascripts/directive/**/*.js',
      'javascripts/directive/**/*.html',
      'javascripts/service/**/*.js'
    ],

    ngHtml2JsPreprocessor: {
      moduleName: 'vfaDashboard',
      // or define a custom transform function
      //      cacheIdFromPath: function(filepath) {
      //        console.error("=============>", filepath);
      //        return cacheId;
      //      }
    },

    reporters: ['mocha'],

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO
  });
};
