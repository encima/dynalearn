var html = require('choo/html')
var Component = require('choo/component')

var File = require('./file')

module.exports = class List extends Component {
  constructor (name, state, emit) {
    super(name)
    this.state = state
    this.emit = emit
    this.local = this.state.components[name] = {}
    this.local.files = []
    this.local.dynalistKey = this.state.storeon.dynalistKey
    if (this.local.dynalistKey !== undefined) {
        emit('@dispatch', ['dyna/list'])
        emit('render')
        this.setState()
    } else {
        emit('pushState', '/')
    }
  }

  setState () {
    this.local.files = this.state.storeon.files
  }

  update () {
    if (this.state.storeon.files.length === 0) {
      return false
    } else {
      this.setState()
      return true
    }
  }

  createElement () {
    return html`<section class="main"><br>
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-4">
          ${this.state.storeon.files.map(file => File(file, this.state, this.emit))}
        </div>
      </div>
    </section>`
  }
}