const getAppFromConfig = require('@angular/cli/utilities/app-utils').getAppFromConfig;
const appConfig = getAppFromConfig();

module.exports = function (config) {
  config.set({
    files: [
      // Exclude files so we can include only particular files later on
      '!./**/*.ts',
      '!./**/*.js',
      `!./${appConfig.root}/**/*.d.ts`,

      // Include source files and flag them for mutation
      { pattern: `./${appConfig.root}/**/*.ts`, included: false, mutated: true },

      // Exclude test files to later include them again without the mutated flag set to true
      `!./${appConfig.root}/**/*.spec.ts`,
      `!./${appConfig.root}/test.ts`,
      { pattern: `./${appConfig.root}/**/*.spec.ts`, included: false, mutated: false },
      { pattern: `./${appConfig.root}/test.ts`, included: false, mutated: false },

      // Ignore environment configuration files
      `!./${appConfig.root}/environments/*.ts`,

      // Other assets (HTML and CSS for the browser)
      `./${appConfig.root}/**/*.html`,
      `./${appConfig.root}/**/*.css`,
    ],
    testRunner: 'karma',
    mutator: 'typescript',
    transpilers: ['webpack'],
    reporter: ['html', 'clear-text', 'progress'],
    testFramework: 'jasmine',
    coverageAnalysis: 'off',
    karmaConfig: {
      frameworks: ['jasmine'],
      browsers: ['ChromeHeadless'],
      plugins: [
        require.resolve('karma-jasmine'),
        require.resolve('karma-chrome-launcher')
      ]
    },
    tsconfigFile: 'tsconfig.json',
    webpack: {
      configFile: 'webpack-stryker.conf.js'
    },
    logLevel: 'info',
    timeoutMs: 10000
  });
};
