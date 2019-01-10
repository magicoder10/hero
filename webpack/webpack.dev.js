const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HotReloadPlugin = require('./plugins/hot-reload');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    mode: 'development',
    plugins: [
        new HotReloadPlugin()
    ]
});
