module.exports = {
  context: __dirname + '/src',
  entry: {
    javascript: './index.js',
    html: './index.html',
  },
  output: {
    filename: 'app.js',
    path: __dirname + '/dist',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader'],
      },
      { test: /\.html$/, loader: 'file?name=[name].[ext]' },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(jpg|gif|png|svg|woff2?|ttf|eot)$/, loader: 'file-loader' },
    ],
  },
}
