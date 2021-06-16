var choo = require('choo')
import storeonMiddleware from 'storeon-choo'
import {store} from './stores/dynalearn'

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
}
app.use(storeonMiddleware(store))

app.route('/', require('./views/home'))
app.route('/docs', require('./views/main'))
app.route('/learn/:doc_name', require('./views/flasher'))

const tree = app.mount('body')
document.body.className = 'container'
document.body.appendChild(tree)
