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
