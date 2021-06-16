var html = require('choo/html') // cannot require choo/html because it's a nested repo

var List = require('../components/main/list')
var Header = require('../components/header')

module.exports = mainView

function mainView (state, emit) {

  emit('DOMTitleChange', 'Dynalearn - Docs')
  return html`
    <body>
      ${state.cache(Header, 'header').render()}
      ${state.cache(List, 'list').render()}
    </body>
  `
}