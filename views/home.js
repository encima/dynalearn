var html = require('choo/html') // cannot require choo/html because it's a nested repo

var Body = require('../components/home/body')
var Header = require('../components/header')
var Nav = require('../components/nav')
module.exports = mainView

function mainView (state, emit) {
  emit('DOMTitleChange', 'Dynalearn')
  return html`
    <body>
      ${state.cache(Nav, 'nav').render()}
      ${state.cache(Header, 'header').render()}
      ${Body(emit)} 
    </body>
  `
}