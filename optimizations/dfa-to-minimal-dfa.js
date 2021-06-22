const { isUndefined } = require('../mixins/utils')
const { arrayIncludesSorted } = require('../mixins/arrays')
const { formatStateList } = require('../mixins/format')

function convertDFAtoMinimalDFA(automaton) {
  let differenceList = createDifferenceList(automaton)

  calculateAllDifferences(automaton.states, differenceList)

  console.log(differenceList)

  equalStates = calculateEqualStates(automaton.states.length, differenceList)

  return automaton
}

// Private functions

function createDifferenceList(automaton) {
  let list = []
  const len = automaton.states.length

  for (let i = 0; i < len-1; i++) {
    for (let j = i+1; j < len; j++) {
      list.push(newListEntry(automaton.states, i, j))
    }
  }

  return list
}

function newListEntry(states, i, j) {
  const isDifferent = states[i].isFinal != states[j].isFinal

  return {
    containingStates: [i, j],
    isDifferent: isDifferent
  }
}

function calculateAllDifferences(states, differenceList) {
  for (let i = 0; i < differenceList.length; i++) {
    const combination = differenceList[i]

    if(combination.isDifferent) { continue }

    const isDifferent = calculateCombinationDifference(states, differenceList, combination)

    if(isDifferent) {
      combination.isDifferent = isDifferent
      i = 0; // Restarting because it may affect other states
      console.log("Restarting!");
    }
  }
}

function calculateCombinationDifference(states, differenceList, combination) {
  let combinationResults = {}

  combination.containingStates.forEach(stateIndex => {
    const paths = states[stateIndex].paths

    for (const sym in paths) {
      if(isUndefined(combinationResults[sym])) { combinationResults[sym] = [] }

      const symbolResult = paths[sym][0]

      combinationResults[sym].push(symbolResult)
    }
  })

  printMathNotationForCombinationResults(combination.containingStates, combinationResults)

  return differenceListContainsCombination(differenceList, combinationResults)
}

function printMathNotationForCombinationResults(containingStates, combinationResults) {
  for (const sym in combinationResults) {
    console.log(
      `(${formatStateList(containingStates, 'e')}) ->`,
      sym,
      '=',
      formatStateList(combinationResults[sym].sort(), 'e')
    )
  }

  console.log()
}

function differenceListContainsCombination(differenceList, stateCombination) {
  return arrayIncludesSorted(differentStates(differenceList), stateCombination)
}

function differentStates(differenceList) {
  return differenceList.filter((combination) => {
    return combination.isDifferent
  })
}

function equalStates(differenceList) {
  return differenceList.filter((combination) => {
    return !combination.isDifferent
  })
}

function calculateEqualStates(statesQuantity, differenceList) {
  console.log(statesQuantity);
}

module.exports = { convertDFAtoMinimalDFA }
