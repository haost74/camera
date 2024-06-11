const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')



module.exports = function (env) {
  var isDev = env.mode === 'development'
  return {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'inline-source-map' : 'source-map',
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
      path: path.join(__dirname, 'build', 'public'),
      filename: '[name].[contenthash].js',
      clean: true,
      publicPath: '/',
      assetModuleFilename: 'static/images/[name][ext]'
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.join(__dirname, 'public', 'index.html') }),
    ],
    devServer: isDev && {
      static: path.resolve(__dirname, 'build'),
      port: env.port ?? 3000,
      compress: true,
      open: true,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.(?:tsx|js|mjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|ttf|eot)$/,
          type: 'asset/resource',
          generator: {
            filename: './fonts/[name][ext]',
          },
        },
      ],
      noParse: [require.resolve("typescript/lib/typescript.js")],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".*", ".mjs", ".js", ".json"],
    },
  }
}