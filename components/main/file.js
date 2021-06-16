var html = require('choo/html')

module.exports = File

function File (file, state, emit) {
  return html`
  <section>
    <article class="tile is-child notification is-info" if=${file.id}>
      <p class="title" onclick=${load}>${file.title.replace('#dynalearn', '')}</p>
    </article>
  </section>
  `

  async function load () {
    const e = emit
    emit('@dispatch', ['learn/setCards', []])
    emit('@dispatch', ['dyna/load', file.id])
    setTimeout(() => {
      if (state.storeon.doc['title']) {
        const title = encodeURI(state.storeon.doc.title)
        emit('pushState', `/learn/${title}`)
      }
    }, 200)

  }
}
