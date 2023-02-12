module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['detectBrowsers', 'jasmine'],
    files: ['src/tests/fingerprintjs.mock.js', { pattern: 'build/tests/**/*.spec.js' }],
    reporters: ['progress'],
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,
    failOnSkippedTests: true,
    detectBrowsers: {
      enable: true,
      usePhantomJS: false,
      preferHeadless: true,
      postDetection: function(availableBrowser) {
        const result = availableBrowser.filter(browser => browser !== 'Safari');
        return result;
      },
    },
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-edge-launcher',
      'karma-firefox-launcher',
      'karma-ie-launcher',
      // 'karma-safari-launcher',
      // 'karma-safaritechpreview-launcher',
      'karma-opera-launcher',
      'karma-detect-browsers',
    ],
  });
};
