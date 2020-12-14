const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // loads css captured by css-loader into style tag
          'css-loader'] // captures css
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'], // to avoid need of specify directory/index.js or .jsx
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new InterpolateHtmlPlugin(HtmlWebPackPlugin, {
      PUBLIC_URL: 'http://localhost:8080',
    }),
  ],
  devServer: {
    contentBase: './build',
    historyApiFallback: true
  }
}