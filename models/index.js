const requireAll = require('require-all');

module.exports = requireAll({
  dirname: __dirname,
  filter: /^(?!index\.js$).*(\.js)$/, // Filter untuk menghindari file index.js
  recursive: true
});