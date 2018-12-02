const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HotModuleReplacementPlugin = require('./plugins/hot-reload');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    mode: 'development',
    plugins: [
        new HotModuleReplacementPlugin({
            includes: [
                '\/hero/src/component/*'
            ]
        })
    ]
});
