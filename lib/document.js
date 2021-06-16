var dedent = require('dedent')
var hyperstream = require('hstream')

module.exports = document

function document () {
  return hyperstream({
    'meta[name="viewport"]': {
      content: 'width=device-width, initial-scale=1.0, viewport-fit=cover'
    },
    head: {
      _prependHtml: dedent`
      <title>Dynalearn</title>
	    <meta name='theme-color' content='#333333'>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">
        <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
      `,
      _appendHtml: dedent`
        <link rel="shortcut icon" href="/favicon.ico">
      `
    }
  })
}