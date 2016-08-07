# Simple Basket

## Getting Started

### Instalação

`npm install`

### Rodando o projeto

`npm start`

Agora é só abrir um browser e acessar `localhost:3333`.

O projeto funciona com *Hot Module Reloading*, e a página recebe um update sem precisar de refresh cada vez que algum arquivo é modificado no diretório `/app`.

Antes do build, o arquivo de configuração é gerado. Para escolher uma marca e definir o *environment*, utilize as variáveis `BRAND` e `ENV`:

`BRAND=shop ENV=staging npm start`

Ferramenta utilizada para build: [Brunch](http://brunch.io/). Por quê? Porque inicialmente parece uma ferramenta que vai manter o processo de build simples e fácil de entender, e também tem uma ótima performance.

### Compilando uma versão para deploy

`BRAND=shop ENV=production npm run prod`

### Rodando os testes

`npm test`

E para rodar os testes em *watch mode*:

`npm run test:watch`

Cada vez que algum arquivo for modificado na pasta `/app`, os testes irão rodar novamente.

**ATENÇÃO:** Todos os testes estão definidos em arquivos com o formato `*.spec.js`, na própria pasta `/app`. A idéia é que todo arquivo que precise de teste tenha um arquivo spec na mesma pasta, com os respectivos testes. A idéia é tratar os testes como cidadãos de primeira classe do projeto, e não isolá-los em uma pasta separada.

Ferramenta utilizada para testes: [Mocha](https://mochajs.org/). Por quê? É simples e integra bem com o Babel.

### Rodando o Storybook

O projeto possui um [Storybook](https://github.com/kadirahq/react-storybook). A idéia é utilizá-lo para desenvolver os componentes de UI de forma *separada* da aplicação, utilizá-lo para debug de componentes, e também fazer um showcase dos componentes para outras equipes externas ao Checkout Front.

Para rodar o Storybook:

`npm run storybook`

E abrir o browser em `localhost:4444`. O Storybook também opera com `Hot Module Reloading`.

**ATENÇÃO:** Assim como com os testes, os arquivos com as histórias estão no formato `*.story.js`, e estão no mesmo diretório dos componentes originais.

## Desenvolvimento a Simple Basket

### O processo

A idéia é deixar sempre o projeto, os testes e o storybook *rodando em paralelo*. Dessa maneira, acreditamos que o ciclo de feedback de desenvolvimento vai ser o mais rápido possível.

### Paradigmas utilizados

O projeto utiliza o framework [React](https://facebook.github.io/react/) para organizar os componentes de UI, e o framework [Redux](http://redux.js.org/index.html) para organizar a lógica da aplicação.

**É altamente recomendável a leitura da documentação e assistir aos vídeos do Dan Abramov, o criador do Redux!** O Redux como framework é bem pequeno e simples, mas é muito poderoso como paradigma de desenvolvimento de aplicações front end.

### Origanização do projeto

O ponto de entrada da aplicação é o arquivo `initialize.js`. Ali é feito o setup da Store, e a montagem dos componentes React na DOM (além do setup do hot module reloading em desenvolvimento). O arquivo `root.js` contém o componente raiz do projeto, e o arquivo `reducers.js` contém o reducer principal, que é a composição de todos os reducers da aplicação.

O `index.html` é gerado pelo template `index.static.handlebars`. As variáveis de contexto iniciais estão todas definidas no arquivo `brunch-config.js`.

Os arquivos SASS estão na pasta `styles`, e qualquer asset adicional (como imagens) estão na pasta `assets`.

A aplicação é dividida em *features*. Cada feature é um container (no sentido definido pelo Redux). Cada feature possui um diretório próprio, como `basket`, `summary` e `televendas`. Cada diretório possui um arquivo `index.js`, que é a interface da feature para o "mundo".

O Startup é uma feature especial: ela toma conta da lógica de montar um Cart com as informações recebidas pelos cookies, storage e url.

**ATENÇÃO:** É importante que nenhuma parte da aplicação acesse diretamente nenhum módulo de uma feature! Todos os imports devem referenciar o `index.js` da feature, como boa prática para manter a organização do projeto.

Caso duas features reutilizem um mesmo componente, este componente deve ser movido para a pasta `commons`, e as duas features devem importá-lo de lá.

### Nomenclatura das Actions

As actions são tratadas como *comandos* ou *eventos*. Comandos são utilizados quando não se sabe o resultado de uma ação, como quando o usuário pede para mudar a quantidade de um produto na basket. Os comandos são todos escritos no *imperativo*, como `CHANGE_QUANTITY` ou `REMOVE_PRODUCT`. Os comandos são as *async actions*, e normalmente envolvem requests para as APIs.

Eventos são as actions mais simples, que representam algo que aconteceu com certeza. Por isso, são escritos no *passado*, como `QUANTITY_CHANGED` ou `SELLER_DETAILS_SHOWED`.

Vamos tentar utilizar o padrão `type/payload/error/meta` descrito em [Flux Standard Actions](https://github.com/acdlite/flux-standard-action), com uma única diferença: a action de erro *não ter o mesmo type* do comando. Mas é interessante trabalhar com `error: true` para ações de erro.

Eventos são as actions padrão do Redux, e o projeto utiliza o padrão de [thunks](https://github.com/gaearon/redux-thunk) para implementar os comandos.

### Métricas / Analytics

Para enviar uma métrica para as ferramentas de analytics, foi implementado um middleware do Redux, para isso ser feito *declarativamente*, e não necessitar usar thunks o tempo todo.

Para enviar um evento, é só colocar uma propriedade `meta` na action, como o exemplo:

```js
{
  type: SOME_ACTION_WITH_METRICS,
  payload: {
    some: 'action data'
  },
  meta: {
    analytics: {
      type: 'some:action',
      payload: { some: 'metric data' }
    }
  }
}
```

O código para este middleware está na pasta `metrics`.

## Cookies / Storage

Quando for necessário guardar alguma informação nos cookies / local storage, também há um middleware para fazer isso de forma declarativa.

Exemplo de action que salva um cart id nos cookies:

```js
{
  type: SOME_ACTION_WITH_STORAGE,
  payload: {
    some: 'action data'
  },
  meta: {
    storage: {
      type: 'COOKIE', // ou LOCAL_STORAGE ; SESSION_STORAGE
      payload: { key: 'cart.id', value: '123456' } // sempre strings!
    }
  }
}
```

## Bibliografia

Este post ajuda a entender como funciona um componente React:
https://facebook.github.io/react/docs/thinking-in-react.html

Existem dois tipos de componentes; a maioria deve ser cuidar da parte estética (o que estamos chamando de *components*), e alguns devem cuidar de como a aplicação se comporta (o que estamos chamando de *containers*):
https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.mec2wlw68

A documentação do Redux é fantástica:
http://redux.js.org/

Os cursos do Egghead também são muito bons, e explicam tudo que é necessário pra entender React + Redux na sua totalidade:
https://egghead.io/courses/react-fundamentals
(Recomendo muito assistir ao curso completo do Redux no Egghead. É tudo muito bem explicado, e o cara "monta" o Redux aos pouquinhos nas aulas. Perfeito pra entender de fato o paradigma)
https://egghead.io/courses/getting-started-with-redux
https://egghead.io/courses/building-react-applications-with-idiomatic-redux


