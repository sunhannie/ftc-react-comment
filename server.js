var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
config.entry.signup.unshift("webpack-dev-server/client?http://localhost:3000/")
config.entry.signup.unshift("webpack/hot/dev-server")

config.entry.index.unshift("webpack-dev-server/client?http://localhost:3000/")
config.entry.index.unshift("webpack/hot/dev-server")

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    inline:true,
    // contentBase: '/',
    hot: true,
    historyApiFallback: true,
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    stats: {
      // Config for minimal console.log mess.
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    },
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Request-Headers':'X-Custom-Header',
        'Access-Control-Max-Age': 1728000,
        'Access-Control-Request-Method': 'GET,PUT,POST'
    }
}).listen(3000, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }

  console.log('Listening at localhost:3000');
});