let fs = require('fs')
let deepAssign = require('deep-assign')
let fileSize = require('filesize')
let gzipSize = require('gzip-size')

const brand = process.env.BRAND || 'acom'
const env = process.env.ENV || 'development'

console.log('BRAND:', process.env.BRAND)
console.log('ENV:', process.env.ENV)

exports.config = {
  hot: true,

  files: {
    javascripts: { joinTo: 'app.js' },
    stylesheets: { joinTo: 'app.css' }
  },

  plugins: {
    babel: { presets: ['es2015', 'react'] }
  },

  hooks: {
    preCompile: (end) => {
      const baseConfig = require('./app/config/base.json')
      const brandConfig = require('./app/config/' + brand + '.base.json')
      const brandEnvConfig = require('./app/config/' + brand + '.' + env + '.json')
      fs.writeFile('app/generated-config.js', 'export default ' + JSON.stringify(deepAssign({}, baseConfig, brandConfig, brandEnvConfig)), (err) => {
        if (err) throw err;
        console.log('Config generated.');
        end();
      });
    },
    onCompile: (generatedFiles, changedAssets) => {
      generatedFiles.forEach(logGzipSize)
      changedAssets.forEach(logGzipSize)
    }
  }
};

function logGzipSize({ path }) {
  const fileContents = fs.readFileSync(path);
  console.log('Size (gzipped) of ' + path + ': ' + fileSize(gzipSize.sync(fileContents)));
}