const path = require('path');
const webpack = require('webpack');
const AngularCompilerPlugin = require('@ngtools/webpack/src/angular_compiler_plugin').AngularCompilerPlugin;

function captureKarmaConfig() {
  let karmaOptions = undefined;
  require.cache[require.resolve('karma')] = {
    exports: {
      Server: function (options, cb) {
        karmaOptions = options;
        process.nextTick(cb);
        return {
          start() { }
        }
      }
    }
  };
  let cli = require('@angular/cli/lib/cli');
  if ('default' in cli) {
    cli = cli.default;
  }
  return cli({
    cliArgs: ['test', '--watch=false'],
    inputStream: process.stdin,
    outputStream: process.stdout
  }).then(_ => karmaOptions);
}

module.exports = captureKarmaConfig().then(options => {
  const webpackConfig = options.buildWebpack.webpackConfig;
  delete webpackConfig.entry.styles;
  webpackConfig.output.publicPath = webpackConfig.output.path = path.resolve('dist');


  webpackConfig.module.rules.forEach(rule => {
    if (rule.loader === '@ngtools/webpack') {
      delete rule.loader;
      rule.loaders = [
        {
          loader: 'awesome-typescript-loader',
          options: {
            configFileName: path.resolve(options.buildWebpack.projectRoot, options.buildWebpack.options.tsConfig),
            silent: true
          }
        }, 'angular2-template-loader'
      ]
    }
  });
  webpackConfig.plugins = webpackConfig.plugins.filter(plugin => !(plugin instanceof AngularCompilerPlugin));
  webpackConfig.plugins.unshift(
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)/, path.resolve(__dirname, './src'))
  );
  return webpackConfig;
});
