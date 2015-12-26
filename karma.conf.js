module.exports = function(config) {
  config.set({

    browsers: ['PhantomJS'],

    frameworks: ['jasmine-jquery', 'jasmine'],

    preprocessors: {
      '**/*.html': ['ng-html2js']
    },

    files: [
      // bower dist dependencies
      'public/bower_components/angular/angular.js',
      'public/bower_components/angular-ui/build/angular-ui.js',
      'public/bower_components/lodash/lodash.js',
      'public/bower_components/d3/d3.js',
      'public/bower_components/nvd3/build/nv.d3.js',
      'public/bower_components/angular-nvd3/dist/angular-nvd3.js',
      'public/bower_components/ngstorage/ngstorage.js',

      // bower test dependencies
      'public/bower_components/angular-ui-router/release/angular-ui-router.js',
      'public/bower_components/angular-mocks/angular-mocks.js',

      //Spec Helpers
      // 'spec-helpers/spec-helper-main.js',
      // 'spec-helpers/**.js',

      // your implementation files
      'public/javascripts/core.js',
      'public/javascripts/partial/**/*.js',
      'public/javascripts/partial/**/*.html',
      'public/javascripts/directive/**/*.js',
      'public/javascripts/directive/**/*.html',
      'public/javascripts/service/**/*.js'
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
