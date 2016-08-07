let fs = require('fs')
let fileSize = require('filesize')
let gzipSize = require('gzip-size')
let chalk = require('chalk')

let configGenerator = require('./config/config-generator')

//
// ENVIRONMENT AND GENERATED CONSTANTS
//

const brand        = process.env.BRAND         || 'acom'
const env          = process.env.ENV           || 'development'
const themeVersion = process.env.THEME_VERSION || '2.1.38'

const theme      = `https://cdn.b2w/theme.${brand}.${themeVersion}.css`

const revision = 'some-revision-0.13.6'

// ---

exports.config = {
  hot: true,

  files: {
    javascripts: { joinTo: 'basket.js' },
    stylesheets: { joinTo: { 'basket.css': `app/styles/basket.${brand}.scss` } }
  },

  modules: {
    autoRequire: { 'basket.js': ['initialize'] }
  },

  conventions: {
    ignored: [ /spec\.js$/, /story\.js$/ ]
  },

  plugins: {
    static: {
      processors: [
        require('html-brunch-static')({
          handlebars: {
            enableProcessor: true
          },
          defaultContext: { brand, env, theme, revision }
        })
      ]
    }
  },

  hooks: {
    preCompile: (end) => {
      configGenerator(env, brand, end);
    },
    onCompile: () => {
      // logs final gzipped file sizes
      const publicFolder = 'public/';
      const publicFiles = fs.readdirSync(publicFolder);
      console.log(chalk.gray('\nFinal gzipped file sizes:\n'));
      publicFiles.forEach(file => logGzipSize(publicFolder + file));
      console.log(chalk.gray('\n----------\n'));
    }
  }
};

function logGzipSize(path) {
  const fileContents = fs.readFileSync(path);
  console.log('> ' + chalk.cyan(path) + ': ' + fileSize(gzipSize.sync(fileContents)));
}