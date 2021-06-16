var html = require('choo/html')

var Icon = require('./icon')
var Answer = require('./answer')

module.exports = Flasher

function Flasher(state, cards, index, emit) {
    let block = cards[index]

    if (block === undefined || block === {}) {
        return html`<div></div>`
    } else {
        return html`
        <div class="level">
        <div class="field level-item">
            <input id="switchAns" type="checkbox" name="switchAns" class="switch" checked="${state.storeon.switchAns}" onchange=${switchAns}>
            <label for="switcAns">Switch Qu/Ans Order</label>
            </div>
        </div>
    <div class="card">
    <div class="card-content" onclick=${toggle}>
        <div class="level">
            ${Icon(state.storeon.initial)}
            <p class="title level-item">
                ${state.storeon.switchAns ? cards[state.storeon.idx].ans : cards[state.storeon.idx].qu}
            </p>
        </div>
        ${Answer(state.storeon.initial, state.storeon.switchAns ? cards[state.storeon.idx].qu : cards[state.storeon.idx].ans)}
    </div>
    <footer class="card-footer">
        <p class="card-footer-item button is-success" id="easy" onclick=${ans}>
        <span>
            Easy
        </span>
        </p>
        <p class="card-footer-item button is-warning" id="med" onclick=${ans}>
        <span>
            Meh
        </span>
        </p>
        <p class="card-footer-item button is-danger" id="hard" onclick=${ans}>
        <span>
            Dayum
        </span>
        </p>
    </footer>
    </div>
    `
    }

    function toggle() {
        emit('@dispatch', ['learn/showAns', !state.storeon.initial])
    }    

    function switchAns(e) {
        emit('@dispatch', ['learn/switchAns', !state.storeon.switchAns])
    }

    function ans(e) {
        emit('@dispatch', ['learn/nextCard', Math.floor(Math.random() * (cards.length - 0 + 1))])
        emit('@dispatch', ['learn/answer', e.target.id])
        emit('@dispatch', ['learn/showAns', false])
    }
}
