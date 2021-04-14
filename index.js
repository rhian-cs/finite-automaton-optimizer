const { printAutomaton } = require('./format')
const fs = require('fs')

fs.readFile('./sample/nfa-empty-1.json', 'utf8', (err, data) => {

  if(err) {
    console.log(`Error reading file from disk: ${err}`)
    return
  }

  const automaton = JSON.parse(data)

  printAutomaton(automaton)
})
