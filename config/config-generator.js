let fs = require('fs')
let deepAssign = require('deep-assign')

module.exports = function(env, brand, endFunction) {

  const baseConfig = require('./base.json')
  const brandConfig = require('./' + brand + '.base.json')
  const brandEnvConfig = require('./' + brand + '.' + env + '.json')

  const finalConfig = deepAssign({}, baseConfig, brandConfig, brandEnvConfig);

  const configFileContents = 'export default ' + JSON.stringify(finalConfig);

  fs.writeFile('app/generated-config.js', configFileContents, (err) => {
    if (err) throw err;
    endFunction();
  });
}
