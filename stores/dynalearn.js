require('regenerator-runtime/runtime')
import createStore from 'storeon'
import persistState from '@storeon/localstorage'

let dynalearn = store => {
  store.on('@init', () => ({ dynalistKey: undefined,
    baseUrl: "https://dynalist.io/api/v1/",
    cards: [],
    files: [],
    doc: {},
    idx: 0,
    switchAns: false,
    initial: false }))
  store.on('dyna/auth', (state, key) => { 
    state.dynalistKey = key
    return state
  }),
  store.on('dyna/list', async (state) => { 
    const resp = await fetch('https://dynalist.io/api/v1/file/list', {method: 'POST', body: JSON.stringify({"token": state.dynalistKey})})
    const body = await resp.json()
    let files = body['files'].filter((file) => {
      return file.type === "document" && file.title.indexOf("#dynalearn") !== -1
    })
    store.dispatch('dyna/storeFiles', files)
  })
  store.on('dyna/storeFiles', (state, files) => ({
    files: files
  })),
  store.on('dyna/load', async( state, id) => {
    const resp = await fetch('https://dynalist.io/api/v1/doc/read', {method: 'POST', body: JSON.stringify({"token": state.dynalistKey, "file_id": id})})
    const body = await resp.json()
    let doc = {
      id: id,
      title: body['title'],
      content: body['nodes']
    }
    state.idx = Math.floor(Math.random() * (state.cards.length - 0 + 1))
    store.dispatch('dyna/setDoc', doc)
    // store.dispatch('learn/next')
  })
  store.on('dyna/setDoc', (state, doc) => ({doc: doc}))
  store.on('learn/switchAns', (state, val) => ({switchAns: val}))
  store.on('learn/setCards', (state, cards) => ({cards: cards})) 
  store.on('learn/showAns', (state, val) => ({ initial : val }))
  store.on('learn/nextCard', (state, val) => ({ idx : val }))
  store.on('learn/answer', (state, resp) => { 
    state.cards[state.idx]['resp'] = resp
    store.dispatch('learn/next')
  })
  store.on('learn/next', (state) => {
    state.idx = Math.floor(Math.random() * (state.cards.length - 0 + 1))
    state.initial = false
  })
}


export const store = createStore([dynalearn, persistState()])
// export const store = createStore([dynalearn])
