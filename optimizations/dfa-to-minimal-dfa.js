const { isUndefined } = require('../mixins/utils')

function convertDFAtoMinimalDFA(automaton) {
  let differenceList = createDifferenceList(automaton)

  calculateAllDifferences(automaton.states, differenceList)

  console.log(differenceList);

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
    const combination = differenceList[i];

    if(combination.isDifferent) { continue }

    const result = calculateCombinationResults(states, combination)

    console.log(combination);
    console.log(result);

  }
}

function calculateCombinationResults(states, combination) {
  let result = {}

  combination.containingStates.forEach(stateIndex => {
    const paths = states[stateIndex].paths

    for (const sym in paths) {
      if(isUndefined(result[sym])) {
        result[sym] = []
      }
      result[sym].push(paths[sym][0])
    }
  });

  return result
}

module.exports = { convertDFAtoMinimalDFA }
