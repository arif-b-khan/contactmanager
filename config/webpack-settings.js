const path = require('path');
const root = path.dirname(__dirname);
const outputPath = `${root}/build`;
const isProduction = typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';

module.exports = {root, outputPath, mode};