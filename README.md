# Callbags

A helper to trim down the requiring of callbags.

```js
const c = require('callbags')('pipe', 'interval', 'map', 'observe')

c.pipe(
  c.interval(1000),
  c.map(x => x * 1.5),
  c.observe(console.log)
)
```

This is the equivalent of 

```
cont pipe = require('callbage-pipe')
cont interval = require('callbage-interval')
cont map = require('callbage-map')
cont observe = require('callbage-observe')

pipe(
  interval(1000),
  map(x => x * 1.5),
  observe(console.log)
)
```

## Browser

`callbags/transform` is a [`browserify`](https://github.com/browserify/browserify/) transform that lets you use `callbags` in the browser.

Using the `browserify` cli:

```shell
browserify entry.js -t callbags/transform
```

Using your package.json:

```json
{
  "browserify": {
    "transform": [
      "callbags/transform"
    ]
  }
}
```
