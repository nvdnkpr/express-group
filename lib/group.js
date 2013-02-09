/**
 * Global group registry.
 */

var registry = {};

/**
 * Get and set the global group registry.
 *
 * @param {string} key
 * @param {function|array} fn
 * @return {object|array}
 */

function group(key, fn) {
  if (!key && !fn) return registry;

  if (typeof key !== 'string') throw new Error('key has to be a string');
  if (typeof fn !== 'function' && fn && !fn.length) throw new Error('fn error');
  if (!registry[key] && !fn) throw new Error(key + ' does not exist');

  if (!registry[key]) registry[key] = [];
  if (fn) registry[key].push(fn);

  return registry[key];
}

/**
 * Expose `group(name, value)`.
 */

module.exports = group;
