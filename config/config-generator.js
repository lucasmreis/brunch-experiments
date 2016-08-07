let fs = require('fs')
let deepAssign = require('deep-assign')

module.exports = function(env, brand, endFunction) {

  const baseConfig = require('./base.json')
  const brandConfig = require('./' + brand + '/base.json')
  const brandEnvConfig = require('./' + brand + '/' + env + '.json')

  const finalConfig = deepAssign({ env, brand }, baseConfig, brandConfig, brandEnvConfig);

  const configFileContents =`
// DON'T CHANGE THIS FILE!

// This is generated on build. To change application config, change the files
// on ./config directory, and run the build again.

// ENV: ${env}

// BRAND: ${brand}

export default ${JSON.stringify(finalConfig)};`;

  fs.writeFile('app/generated-config.js', configFileContents, (err) => {
    if (err) throw err;
    endFunction();
  });
}
