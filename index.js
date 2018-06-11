module.exports = function callbags (bags) {
  if (!Array.isArray(bags)) bags = Array.from(arguments)

  return bags.reduce((soFar, name) => {
    soFar[name] = require('callbag-' + name)
    return soFar
  }, {})
}
