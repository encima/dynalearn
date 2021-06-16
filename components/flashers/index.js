var html = require('choo/html')
var Component = require('choo/component')

var Flasher = require('./flasher')

module.exports = class Flashers extends Component {
    constructor(name, state, emit) {
        super(name)
        this.state = state
        this.emit = emit
        this.local = this.state.components[name] = {}
        this.local.idx = 0
        this.local.initial = false
        this.local.cards = []
        this.parser(this.state.storeon.doc.content)
    }

    parser(root) {
        root.map((block) => {
            if (block['note'] && block.content.indexOf('#flash') !== -1) {
                this.local.cards.push({ qu: block.content.replace('#flash', ''), ans: block.note })
            }
        })
        this.emit('@dispatch', ['learn/setCards', this.local.cards])
    }

    setState() {
        this.local.initial = this.state.storeon.initial
        this.local.idx = this.state.storeon.idx
    }

    update() {
        if (this.state.storeon.cards.length === 0) {
            return false
        } else {
            this.setState()
            return true
        }
    }
    createElement() {
        return html`<section class="flasher">       
            ${Flasher(this.state, this.local.cards, this.local.idx, this.emit)}
        </section>`
    }
}