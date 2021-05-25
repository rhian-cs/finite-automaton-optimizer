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

function isLastIndexInArray(array, index) {
  return index != array.length -1
}

function emptyArrayOrUndefined(array) {
  return !array || !array.length
}

function numberArray(length) {
  return [...Array(length + 1).keys()].slice(1)
}

function arrayIncludesSorted(arr, val) {
  if(!Array.isArray(arr) || !arr.length) { return false }

  if(Array.isArray(val)) {
    val.sort()
  }

  let present = false

  arr.map((arrVal) => {
    if(Array.isArray(arrVal)) {
      arrVal.sort()
    }

    if(val == arrVal) {
      present = true;
    }
  })

  return present
}

module.exports = {
  arrayEquals,
  pushToArrayIfNotPresent,
  isLastIndexInArray,
  emptyArrayOrUndefined,
  numberArray,
  arrayIncludesSorted,
}
