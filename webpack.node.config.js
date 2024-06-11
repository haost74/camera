
const path = require('path')

module.exports = function(env) {
    return {
        mode: 'none',
        name: 'server',
        target: 'node',
        entry: path.resolve(__dirname, 'server', 'index.js'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'server.js',
            clean: true,
        },
        module:{
          rules:[
            {
                test: /\.(?:tsx|js|mjs)$/,
                exclude: /node_modules/,
                use:{
                  loader: 'babel-loader',
                  options:{
                      presets:[
                           ['@babel/preset-env', { targets: "defaults" }]
                      ]
                  }
                }
              },
          ]
        },
    }
}