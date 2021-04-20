const { formatStateList } = require('../mixins/format')
const { isUndefined }     = require('../mixins/utils')
const {
  arrayEquals,
  pushToArrayIfNotPresent,
  emptyArrayOrUndefined
} = require('../mixins/arrays')

function convertNFAtoDFA(automaton, isPrintCalculations = true) {
  const originalStates = automaton.states
  const symbols = automaton.symbols
  const finalStates = originalStates.map(state => state.isFinal)
  let eStates = [{ containingStates: [0] }]

  calculateAllEStates(eStates, originalStates, symbols, finalStates, isPrintCalculations)
  deleteUnusedProperties(eStates)

  return createAutomatonFromEStates(eStates, symbols)
}

// Private Functions

function calculateAllEStates(eStates, originalStates, symbols, finalStates, isPrintCalculations) {
  for (let index = 0; index < eStates.length; index++) {
    let eState = eStates[index]

    calculateDelta(eStates, index, symbols, originalStates, isPrintCalculations)
    calculateFinalStates(eState, finalStates)
  }
}

function calculateDelta(allEStates, index, symbols, originalStates, isPrintCalculations) {
  const eState = allEStates[index]
  eState.paths = {}

  const allPaths = findAllPaths(eState.containingStates, originalStates, symbols, isPrintCalculations)
  attributePathsToEState(allEStates, eState, symbols, allPaths)

  return allPaths
}

function findEStateIndex(allEStates, originalPathStates) {
  let returnIndex = -1

  allEStates.forEach((allEStates, index) => {
    if(arrayEquals(allEStates.containingStates, originalPathStates)) {
      returnIndex = index
    }
  })

  return returnIndex
}

function calculateFinalStates(eState, finalStates) {
  eState.isFinal = isEStateFinal(eState.containingStates, finalStates)
}

function findAllPaths(containingStates, originalStates, symbols, isPrintCalculations) {
  let allPaths = {}

  containingStates.forEach(containingState => {
    findPathBySymbols(allPaths, originalStates[containingState].paths)
  })

  if(isPrintCalculations) {
    printEStateCalculations(symbols, containingStates, allPaths)
  }

  return allPaths
}

function findPathBySymbols(allPaths, originalPaths) {
  for (const sym in originalPaths) {
    if(isUndefined(allPaths[sym])) { allPaths[sym] = [] }

    originalPaths[sym].forEach(path => {
      pushToArrayIfNotPresent(allPaths[sym], path)
    })
  }
}

function attributePathsToEState(allEStates, eState, symbols, allPaths) {
  symbols.forEach(sym => {
    const newPath = allPaths[sym]
    if(emptyArrayOrUndefined(newPath)) return

    let pathIndex = addPathToIndexIfNotPresent(allEStates, newPath)

    eState.paths[sym] = [pathIndex]
  })
}

function addPathToIndexIfNotPresent(allEStates, newPath) {
  let pathIndex = findEStateIndex(allEStates, newPath)

  if(pathIndex === -1) {
    pathIndex = allEStates.length

    allEStates.push({ containingStates: newPath })
  }

  return pathIndex
}

function isEStateFinal(containingStates, finalStates) {
  let isFinal = false

  containingStates.forEach(stateIndex => {
    if(finalStates[stateIndex]) {
      isFinal = true
    }
  })

  return isFinal
}

function deleteUnusedProperties(eStates) {
  eStates.forEach(eState => delete eState.containingStates )
}

function createAutomatonFromEStates(eStates, symbols) {
  return {
    type: 'dfa',
    symbols,
    states: eStates
  }
}

function printEStateCalculations(symbols, containingStates, allPaths) {
  symbols.forEach(sym => {
    const paths = allPaths[sym]
    if(!paths) return

    console.log(`[${formatStateList(containingStates)}], ${sym} = [${formatStateList(paths)}]`);
  });
  console.log('');
}

module.exports = { convertNFAtoDFA }
