var html = require('choo/html')

module.exports = Icon

function Icon (toggle) {
  if (toggle) {
    return html`
        <span class="icon has-text-info level-left"><i class="fas fa-arrow-down"></i></span>
    `
  } else {
    return html`
        <span class="icon has-text-info level-left"><i class="fas fa-arrow-right"></i></span>
    `
  }
}
