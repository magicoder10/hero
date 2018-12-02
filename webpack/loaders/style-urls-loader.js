const log = require('webpack-log');
const logger = log({name: 'Style URLs Loader'});
module.exports = function (source) {
    logger.info(`Loading styleUrls in ${this.resourcePath}`);
    return source.replace(/styleUrls:\s*\[\s*([`'"].+[`'"])\s*]/g, (_, styleUrls) => {
        styleUrls = styleUrls.replace(/(['"`]\.[^'"`]+['"`])/g, `require($1)`);
        logger.info(styleUrls);
        return `styles: [${styleUrls}]`;
    });
};
