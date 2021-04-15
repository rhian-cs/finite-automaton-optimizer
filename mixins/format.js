const { printTable } = require('console-table-printer')

function statesTable(automaton) {
  let table = splitPaths(automaton)
  table.unshift(automatonHeader(automaton))

  return table
}

function printAutomaton(automaton) {
  printTable(statesTable(automaton))
}

// Private functions

function splitPaths(automaton) {

  return automaton.states.map((state, index) => {
    let row = [`q${index}`]
    for (const sym in state.paths) {
      row.push(separateStateList(state.paths[sym]))
    }

    if(automaton.type == "nfa-empty") {
      row.push(separateStateList(state.emptyPaths))
    }

    return row
  })
}

function separateStateList(stateList) {
  if (!stateList.length) {
    return '-'
  }

  let string = ''

  stateList.forEach((state, index) => {
    string += `q${state}`

    if(index != stateList.length -1) {
      string += ','
    }
  })

  return string
}

function automatonHeader(automaton) {
  header = ['d', automaton.symbols].flat()

  if(automaton.type == "nfa-empty") {
    header.push('ε')
  }

  return header
}

module.exports = { statesTable, printAutomaton }
