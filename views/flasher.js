var html = require('choo/html') // cannot require choo/html because it's a nested repo

var Flashers = require('../components/flashers')
var Header = require('../components/header')

module.exports = flasherView

function flasherView (state, emit) {
  emit('DOMTitleChange', `Dynalearn - ${state.storeon.doc.title}`)
  return html`
    <body>
      ${state.cache(Header, 'header').render()}
      ${state.cache(Flashers, 'flashers').render()}
    </body>
  `
}