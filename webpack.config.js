const path = require('path');
module.exports = {
  entry: './www/js/app.js',
  // resolve: {
  //   extensions: ['.js', '.jsx', '.ts', '.tsx'],
  //   symlinks: false,
  // },
  output: {
    filename: 'bundled-app.js',
    path: path.resolve(__dirname, 'www/distjs/')
  },
  module: {
    rules:[
      {
        test: /\.f7.html$/,
        use:[
          "babel-loader",
          "framework7-loader",
        ],
      },
      {
        test: /\.css$/i,
        use:[
          "style-loader",
          "css-loader",
        ],
      },
    ]
  },
  
  mode: 'none'
}