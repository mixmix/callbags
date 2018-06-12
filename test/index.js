const c = require('../')(['pipe', 'interval', 'map', 'observe'])

c.pipe(
  c.interval(1000),
  c.map(x => x * 1.5),
  c.observe(console.log)
)

const cb = require('../')('pipe', 'interval', 'map', 'observe')

cb.pipe(
  cb.interval(1000),
  cb.map(x => x * 15),
  cb.observe(console.log)
)
