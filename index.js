var {keygen} = require('tls-keygen')
var mkdirp = require('mkdirp')
var http2 = require('http2')
var path = require('path')
var fs = require('fs')
var os = require('os')

var port = 8080

;(async function main () {
  var dir = path.join(os.homedir(), '/.cache/playground-http2-push')
  mkdirp.sync(dir)
  var {key, cert} = await keygen({
    key: path.join(dir, 'key.pem'),
    cert: path.join(dir, 'cert.pem')
  })

  key = fs.readFileSync(key, 'utf8')
  cert = fs.readFileSync(cert, 'utf8')

  console.log(`key: ${key.length ? 'ok' : 'not'}\ncert: ${cert.length ? 'ok' : 'not ok'}`)

  http2.createSecureServer({ key, cert, allowHTTP1: true }, (req, res) => {
    console.log('request received on /')
    res.end('supper')
  }).listen(port, () => console.log(`listening on ${port}`))
})()
