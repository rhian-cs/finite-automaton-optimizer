function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}

function pushToArrayIfNotPresent(array, item) {
  if(!array.includes(item)) {
    array.push(item)
  }
}

module.exports = { arrayEquals, pushToArrayIfNotPresent }
