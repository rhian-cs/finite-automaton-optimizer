const { isLastIndexInArray, emptyArrayOrUndefined }  = require('./arrays')
const { printTable } = require('console-table-printer')

function statesTable(automaton) {
  let table = splitPaths(automaton)
  table.unshift(automatonHeader(automaton))

  return table
}

function printAutomaton(automaton) {
  printTable(statesTable(automaton))
  printFinalStates(automaton)
}

function formatStateList(stateList, stateSymbol = 'q') {
  if (emptyArrayOrUndefined(stateList)) { return '-' }

  let formattedStateList = ''

  stateList.forEach((state, index) => {
    formattedStateList += `${stateSymbol}${state}`

    if(isLastIndexInArray(stateList, index)) {
      formattedStateList += ','
    }
  })

  return formattedStateList
}

// Private Functions

function splitPaths(automaton) {
  return automaton.states.map((state, index) => {
    let row = [`q${index}`]

    addStateListToRow(row, automaton, state)
    addEmptyStatesToRow(row, automaton, state)

    return row
  })
}

function addStateListToRow(row, automaton, state) {
  automaton.symbols.forEach(sym => {
    row.push(formatStateList(state.paths[sym]))
  })
}

function addEmptyStatesToRow(row, automaton, state) {
  if(automaton.type == 'nfa-empty') {
    row.push(formatStateList(state.emptyPaths))
  }
}

function automatonHeader(automaton) {
  header = ['δ', automaton.symbols].flat()

  if(automaton.type == 'nfa-empty') {
    header.push('ε')
  }

  return header
}

function printFinalStates(automaton) {
  let finalStates = []
  automaton.states.forEach((state, index) => {
    if(state.isFinal) { finalStates.push(index) }
  });

  console.log('F = {', formatStateList(finalStates), '}');
}

module.exports = {
  statesTable,
  printAutomaton,
  formatStateList,
}
