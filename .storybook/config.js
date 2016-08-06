import { configure } from '@kadira/storybook';

// Isso coloca automaticamente todos os arquivos
// com nome *-story.js no Storybook.
// Referência: https://github.com/kadirahq/react-storybook/blob/master/docs/configure_storybook.md

const req = require.context('../app', true, /.story\.js$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module);