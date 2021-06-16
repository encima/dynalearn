var html = require('choo/html')
var Component = require('choo/component')

module.exports = Body

function Body(emit) {

      return html`
      <div class="level" class="field">
        <label class="label">Enter Your Dynalist API Key</label>
        <div class="control">
          <input class="input" id="dl-key" type="text" placeholder="API Key here">
        </div>
        <p class="help">You can find your API Key at the <a href='https://dynalist.io/developer'>Dynalist Developer Page</a>.</p>
        <div class="control level-item">
          <button class="button is-primary" onclick=${saveKey}>Get My Notes</button>
        </div>
      </div>
      `

  function saveKey(e) {
    const val = document.body.querySelector('#dl-key').value
    emit('@dispatch', ['dyna/auth', val])
    emit('pushState', `/docs`)
    emit('render')
  }
}