const querystring = require('node:querystring')

 const baseUrl = 'https://siteviagem.com.br'

const uri = querystring.stringify({ destino: 'Rio de Janeiro', periodo: 'verão' })
 const url =`${baseUrl}${uri}`

console.log(url)

const parsedUri = querystring.parse(uri)
console.log(uri)
console.log(parsedUri)
console.log(parsedUri.destino)

const uri2 = querystring.escape('São paulo')
console.log(uri2)
const unescapedUri2 = querystring.unescape(uri2)
console.log(unescapedUri2)
