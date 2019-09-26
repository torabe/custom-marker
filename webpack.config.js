const path = require('path');
const glob = require('glob');
const Reg = new RegExp('./src/');

// entry point js
const jsTargets = glob.sync('./src/js/index.js');
const jsEntries = {};
jsTargets.forEach(value => {
  const key = value.replace(Reg, '');
  jsEntries[key] = value;
});

module.exports = (env, argv) => [
  {
    entry:jsEntries,
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name]'
    },
    devtool:argv.devtool,
    mode: argv.mode,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env',{
                    useBuiltIns: 'usage',
                    corejs:3
                  }]
                ]
              }
            }
          ]
        }
      ]
    }
  }
];