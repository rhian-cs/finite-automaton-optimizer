const { printTable } = require('console-table-printer');

const symbols = ['0', '1']

const states = [
  {
    paths: {
      '0': [0, 1],
      '1': []
    },
    is_final: false
  },
  {
    paths: {
      '0': [],
      '1': [1, 2, 3]
    },
    is_final: false
  },
  {
    paths: {
      '0': [],
      '1': [3]
    },
    is_final: true
  },
  {
    paths: {
      '0': [],
      '1': [2]
    },
    is_final: true
  }
]

function statesTable(states, symbols) {
  let table = splitPaths(states)
  table.unshift(['d', symbols].flat())
  return table
}

function splitPaths(states) {

  return states.map((state, index) => {
    let row = [`q${index}`]
    // let row = []
    for (const sym in state.paths) {
      row.push(separateStateList(state.paths[sym]))
    }

    return row
  });
}

function separateStateList(stateList) {
  string = []
  stateList.forEach((state, index) => {
    string += `q${state}`

    if(index != stateList.length -1) {
      string += ','
    }
  })
  return string
}

const table = statesTable(states, symbols)
printTable(table)
// console.log(table)