(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const interval = period => (start, sink) => {
  if (start !== 0) return;
  let i = 0;
  const id = setInterval(() => {
    sink(1, i++);
  }, period);
  sink(0, t => {
    if (t === 2) clearInterval(id);
  });
};

module.exports = interval;

},{}],2:[function(require,module,exports){
/**
 * callbag-map
 * -----------
 *
 * Callbag operator that applies a transformation on data passing through it.
 * Works on either pullable or listenable sources.
 *
 * `npm install callbag-map`
 *
 * Example:
 *
 *     const fromIter = require('callbag-from-iter');
 *     const iterate = require('callbag-iterate');
 *     const map = require('callbag-map');
 *
 *     const source = map(x => x * 0.1)(fromIter([10,20,30,40]));
 *
 *     iterate(x => console.log(x))(source); // 1
 *                                           // 2
 *                                           // 3
 *                                           // 4
 */

const map = f => source => (start, sink) => {
  if (start !== 0) return;
  source(0, (t, d) => {
    sink(t, t === 1 ? f(d) : d)
  });
};

module.exports = map;

},{}],3:[function(require,module,exports){
const observe = operation => source => {
  source(0, (t, d) => {
    if (t === 1) operation(d);
  });
}

module.exports = observe;

},{}],4:[function(require,module,exports){
/**
 * callbag-pipe
 * ------------
 *
 * Utility function for plugging callbags together in chain. This utility
 * actually doesn't rely on Callbag specifics, and is basically the same as
 * Ramda's `pipe` or lodash's `flow`. Anyway, this exists just to play nicely
 * with the ecosystem, and to facilitate the import of the function.
 *
 * `npm install callbag-pipe`
 *
 * Example:
 *
 * Create a source with `pipe`, then pass it to a `forEach`:
 *
 *     const interval = require('callbag-interval');
 *     const forEach = require('callbag-for-each');
 *     const combine = require('callbag-combine');
 *     const pipe = require('callbag-pipe');
 *     const take = require('callbag-take');
 *     const map = require('callbag-map');
 *
 *     const source = pipe(
 *       combine(interval(100), interval(350)),
 *       map(([x, y]) => `X${x},Y${y}`),
 *       take(10)
 *     );
 *
 *     forEach(x => console.log(x))(source); // X2,Y0
 *                                           // X3,Y0
 *                                           // X4,Y0
 *                                           // X5,Y0
 *                                           // X6,Y0
 *                                           // X6,Y1
 *                                           // X7,Y1
 *                                           // X8,Y1
 *                                           // X9,Y1
 *                                           // X9,Y2
 *
 *
 * Or use `pipe` to go all the way from source to sink:
 *
 *     const interval = require('callbag-interval');
 *     const forEach = require('callbag-for-each');
 *     const combine = require('callbag-combine');
 *     const pipe = require('callbag-pipe');
 *     const take = require('callbag-take');
 *     const map = require('callbag-map');
 *
 *     pipe(
 *       combine(interval(100), interval(350)),
 *       map(([x, y]) => `X${x},Y${y}`),
 *       take(10),
 *       forEach(x => console.log(x))
 *     );
 *     // X2,Y0
 *     // X3,Y0
 *     // X4,Y0
 *     // X5,Y0
 *     // X6,Y0
 *     // X6,Y1
 *     // X7,Y1
 *     // X8,Y1
 *     // X9,Y1
 *     // X9,Y2
 *
 *
 * Nesting
 * -------
 *
 * To use pipe inside another pipe, you need to give the inner pipe an
 * argument, e.g. `s => pipe(s, ...`:
 *
 *     const interval = require('callbag-interval');
 *     const forEach = require('callbag-for-each');
 *     const combine = require('callbag-combine');
 *     const pipe = require('callbag-pipe');
 *     const take = require('callbag-take');
 *     const map = require('callbag-map');
 *
 *     pipe(
 *       combine(interval(100), interval(350)),
 *       s => pipe(s,
 *         map(([x, y]) => `X${x},Y${y}`),
 *         take(10)
 *       ),
 *       forEach(x => console.log(x))
 *     );
 *
 *
 * This means you can use pipe to create a new operator:
 *
 *     const mapThenTake = (f, amount) =>
 *       s => pipe(s, map(f), take(amount));
 *
 *     pipe(
 *       combine(interval(100), interval(350)),
 *       mapThenTake(([x, y]) => `X${x},Y${y}`, 10),
 *       forEach(x => console.log(x))
 *     );
 *
 */

function pipe(...cbs) {
  let res = cbs[0];
  for (let i = 1, n = cbs.length; i < n; i++) res = cbs[i](res);
  return res;
}

module.exports = pipe;

},{}],5:[function(require,module,exports){
const c = function () {
  var callbags = {}
  callbags['pipe'] = require('callbag-pipe')
  callbags['interval'] = require('callbag-interval')
  callbags['map'] = require('callbag-map')
  callbags['observe'] = require('callbag-observe')
  return callbags
}()


c.pipe(
  c.interval(1000),
  c.map(x => x * 1.5),
  c.observe(console.log)
)

const cb = function () {
  var callbags = {}
  callbags['pipe'] = require('callbag-pipe')
  callbags['interval'] = require('callbag-interval')
  callbags['map'] = require('callbag-map')
  callbags['observe'] = require('callbag-observe')
  return callbags
}()


cb.pipe(
  cb.interval(1000),
  cb.map(x => x * 15),
  cb.observe(console.log)
)

},{"callbag-interval":1,"callbag-map":2,"callbag-observe":3,"callbag-pipe":4}]},{},[5]);
