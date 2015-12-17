/**
 * Modules
 */

var isArray = require('@f/is-array')
var isObject = require('@f/is-object')
var isFunction = require('@f/is-function')
var isPromise = require('@f/is-promise')
var arrayToPromise = require('@f/array-to-promise')
var objToPromise = require('@f/obj-to-promise')
var thunkToPromise = require('@f/thunk-to-promise')
var supportsGen = require('@f/supports-gen')

if (supportsGen()) {
  var isGenerator = require('@f/is-generator')
  var genToPromise = require('@f/gen-to-promise')
}


/**
 * Expose toPromise
 */

module.exports = toPromise['default'] = toPromise

/**
 * Convert to promise
 * @param  {Mixed} val
 * @param  {Boolean} dontForce whether to resolve unrecognized types
 * @return {Promise}
 */

function toPromise (val, dontForce) {
  if (isPromise(val)) return val
  if (isArray(val)) return arrayToPromise(val)
  if (isObject(val)) return objToPromise(val)
  if (supportsGen() && isGenerator(val)) {
    return genToPromise(val)
  }
  if (isFunction(val)) return thunkToPromise(val)
  if (!dontForce) return Promise.resolve(val)
  return val
}
