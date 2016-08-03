let fs = require('fs')
let deepAssign = require('deep-assign')
let fileSize = require('filesize')
let gzipSize = require('gzip-size')

const brand        = process.env.BRAND         || 'acom'
const env          = process.env.ENV           || 'development'
const themeVersion = process.env.THEME_VERSION || '2.1.38'

const theme        = `https://cdn.b2w/theme.${brand}.${themeVersion}.css`
const localStyle   = `app.${brand}.css`

exports.config = {
  hot: true,

  files: {
    javascripts: { joinTo: 'app.js' },
    stylesheets: { joinTo: 'app.css' }
  },

  plugins: {
    babel: { presets: ['es2015', 'react'] },
    static: {
      processors: [
        require('html-brunch-static')({
          handlebars: {
            enableProcessor: true
          },
          defaultContext: { brand, env, theme, localStyle }
        })
      ]
    }
  },

  hooks: {
    preCompile: (end) => {
      const baseConfig = require('./config/base.json')
      const brandConfig = require('./config/' + brand + '.base.json')
      const brandEnvConfig = require('./config/' + brand + '.' + env + '.json')
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