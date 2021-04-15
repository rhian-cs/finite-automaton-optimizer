const { arrayEquals } = require('../mixins/arrays')

function convertNFAtoDFA(automaton) {
  const symbols = automaton.symbols
  const originalStates = automaton.states

  let newStates = [
    {
      containingStates: [0]
    }
  ]

  for (let i = 0; i < newStates.length; i++) {
    newState = newStates[i]

    if(typeof newState.newPath !== 'undefined') { continue }

    newState.containingStates.forEach(containingState => {
      let originalPaths = originalStates[containingState].paths

      for (const sym in originalPaths) {
        const originalPathStates = originalPaths[sym]

        if(!originalPathStates.length) { continue }

        let newStateIndex = findNewStateIndex(newStates, originalPathStates)

        // testConsoleLog(newState, sym, originalPathStates, newStateIndex)

        if(newStateIndex == -1) {
          newStates.push({
            containingStates: originalPaths[sym],
          })

          newState.newPath = newStates.length
        } else {
          newState.newPath = newStateIndex
        }
      }
    })
  }

  console.log(newStates);

  return automaton
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

function testConsoleLog(newState, sym, originalPathStates, newStateIndex) {
  console.log(newState.containingStates, ", "+sym+ " =" , originalPathStates, "(", newStateIndex, ")")
}

module.exports = { convertNFAtoDFA }
