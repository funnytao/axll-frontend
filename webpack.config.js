const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }   
      },
      {
        test: /\.(ts|tsx)?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader", //2
            options: {
              modules: {
                localIdentName: "[local]__[hash:base64:5]"
              }
            }
          },
          "sass-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', ".tsx"]
  },
  output: {
    filename: "bundle.js"
  },

  devServer: {
    port: 4000,
    open: true,
    hot: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      hash: true,
      filename: 'index.html'
    }),
  ]
}