const log = require('webpack-log');
const logger = log({ name: 'Template URL Loader'});
module.exports = function (source) {
    logger.info(`Loading templateUrl in ${this.resourcePath}`);
    return source.replace(/templateUrl:\s*([`'"]\.\S+[`'"])/g, `template: require($1)`);
};
