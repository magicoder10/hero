const log = require('webpack-log');
const logger = log({ name: 'Raw SCSS Loader'});

const sass = require('node-sass');

module.exports = function () {
    logger.info(`Compiling ${this.resourcePath} to CSS`);
    const result = sass.renderSync({
        file: this.resourcePath,
        outputStyle: 'compressed'
    });
    const cssBuffer = result.css;
    const css = cssBuffer.toString();

    return `module.exports = \`${css}\``;
};
