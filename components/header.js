var html = require('choo/html')
var Component = require('choo/component')

module.exports = class Header extends Component {
    constructor(name, state, emit) {
        super(name)
        this.state = state
        this.emit = emit
        this.local = this.state.components[name] = {}
    }

    setState() {
    }

    update() {
    }

    createElement() {
        return html`
            <section class="hero is-primary">
            <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    Dynalearn
                </h1>
                <h2 class="subtitle">
                    Write once, learn forever
                </h2>
            </div>
            </div>
        </section>
        `
    }
}