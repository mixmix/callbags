var staticModule = require('static-module')
var { PassThrough, Readable } = require('stream')

module.exports = function transform (filename, options) {
  return staticModule({
    'callbags': function (bags) {
      if (!Array.isArray(bags)) bags = Array.from(arguments)
      return new Readable({
        read () {
          this.push(toCode(bags))
          this.push(null)
        }
      })
    }
  })
}

var toCode = (bags) => `function () {
  var callbags = {}${bags.map(bag => `
  callbags['${bag}'] = require('callbag-${bag}')`
  ).join('')}
  return callbags
}()
`
