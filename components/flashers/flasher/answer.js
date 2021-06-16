var html = require('choo/html')

module.exports = Answer

function Answer (toggle, ans) {
  if (toggle) {
    return html`
        <p class="subtitle" class="initial">${ans}</p>
    `
  } else {
    return html`
        <p class="subtitle" class="initial"></p>
    `
  }
}
