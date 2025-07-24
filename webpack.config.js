// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: "inline-source-map",
<<<<<<< HEAD
  entry: "./src/pages/index.js",
=======
  entry: {
    main: "./src/pages/index.js",
  },
>>>>>>> 1dcf5b6 (fixes to code review)
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
<<<<<<< HEAD
=======
    assetModuleFilename: "assets/[hash][ext][query]",
>>>>>>> 1dcf5b6 (fixes to code review)
  },
  target: ["web", "es5"],
  stats: "errors-only",
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    compress: true,
    port: 8080,
    open: true,
    liveReload: true,
    hot: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
<<<<<<< HEAD
=======
      favicon: "./src/favicon.ico",
>>>>>>> 1dcf5b6 (fixes to code review)
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
