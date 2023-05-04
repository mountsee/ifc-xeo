// const path = require('path');

// module.exports = {
//   target: 'web',
//   entry: './viewer.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   mode: 'production',
//   module: {
//     // type: 'module'
//   }
// };

module.exports = {
  // ...
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};