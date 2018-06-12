var browserify = require('browserify')
var assert = require('assert')
var { join } = require('path')
var { readFileSync } = require('fs')

var transform = require('../transform')

var expected = readFileSync(join(__dirname, './data/transformed-example.js'), 'utf8')

browserify()
  .add(join(__dirname, './data/example.js'))
  .transform(transform)
  .bundle(function (err, code) {
    if (err) assert.ifError(err)

    code = String(code)

    assert.equal(code, expected, 'code is not expected')
  })
