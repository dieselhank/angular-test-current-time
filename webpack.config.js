var webpack = require('webpack');
module.exports = {
context: __dirname + '/src',
entry: {
app: './main.ts',
polyfills: './polyfills.ts'/*,
vendor: './app/vendor.ts'*/
},
output: {
path: __dirname + '/dist',
filename: 'current-time.bundle.js'
},
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
resolve: {
  extensions: ['.ts', '.js']
},
plugins: [
new webpack.optimize.CommonsChunkPlugin({name:'polyfills', filename:'polyfills.bundle.js'})
]
}; 