const getAppFromConfig = require('@angular/cli/utilities/app-utils').getAppFromConfig;
const appConfig = getAppFromConfig();

module.exports = function (config) {
  config.set({
    mutate: [
      'src/app/*.component.ts'
    ],
    testRunner: 'karma',
    mutator: 'typescript',
    transpilers: ['webpack'],
    reporter: ['html', 'clear-text', 'progress'],
    testFramework: 'jasmine',
    coverageAnalysis: 'off',
    karmaConfig: {
      frameworks: ['jasmine'],
      customContextFile: require.resolve('@angular/cli/plugins/karma-context.html'),
      customDebugFile: require.resolve('@angular/cli/plugins/karma-debug.html'),
      plugins: [
        require.resolve('karma-jasmine'),
        require.resolve('karma-chrome-launcher'),
      ],
      proxies: {
        "/_karma_webpack_/": "/base/dist/"
      },
      files: [
        { pattern: './dist/*.js', included: false }
      ],
      browsers: ['ChromeHeadless']
    },
    tsconfigFile: 'tsconfig.json',
    webpack: {
      configFile: 'webpack-stryker.conf.js'
    },
    logLevel: 'info',
    timeoutMs: 10000
  });
};
