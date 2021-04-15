const { arrayEquals } = require('../mixins/arrays')

function convertNFAtoDFA(automaton) {
  const originalStates = automaton.states
  const symbols = automaton.symbols
  const finalStates = originalStates.map(state => state.isFinal)

  let newStates = [
    {
      containingStates: [0]
    }
  ]

  for (let i = 0; i < newStates.length; i++) {
    newState = newStates[i]

    if(typeof newState.paths !== 'undefined') { continue }

    newState.paths = {}

    newState.containingStates.forEach(containingState => {
      let originalPaths = originalStates[containingState].paths

      // TODO: Qual das duas formas é melhor?
      // for (const sym in originalPaths) {
      symbols.forEach(sym => {
        const originalPathStates = originalPaths[sym]

        if(!originalPathStates.length) { return console.log(`(e${i})`, newState.containingStates, ", "+sym+" = -"); } // TODO: REMOVER
        if(!originalPathStates.length) { return }

        let newStateIndex = findNewStateIndex(newStates, originalPathStates)

        if(newStateIndex == -1) {
          newStateIndex = newStates.length

          newStates.push({
            containingStates: originalPaths[sym],
          })
        }
        newState.paths[sym] = [newStateIndex]
        newState.emptyPaths = []

        console.log(`(e${i})`, newState.containingStates, ", "+sym+" =", originalPathStates, `(e${newStateIndex})`);
      })

      newState.isFinal = isNewStateFinal(newState.containingStates, finalStates)
    })
    console.log("")
  }

  newStates.forEach(newState => {
    delete newState.containingStates
  });

  return {
    type: 'dfa',
    symbols,
    states: newStates
  }
}

// Private functions

function findNewStateIndex(newStates, originalPathStates) {
  let returnIndex = -1

  newStates.forEach((newState, index) => {
    if(arrayEquals(newState.containingStates, originalPathStates)) {
      returnIndex = index
    }
  })

  return returnIndex
}

function isNewStateFinal(containingStates, finalStates) {
  let isFinal = false

  containingStates.forEach(stateIndex => {
    if(finalStates[stateIndex]) {
      isFinal = true
    }
  })

  return isFinal
}

module.exports = { convertNFAtoDFA }
