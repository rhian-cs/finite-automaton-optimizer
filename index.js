const { printAutomaton } = require('./mixins/format')
const { readAutomatonFromFile } = require('./mixins/io')

const { convertNFAtoDFA } = require('./optimizations/nfa-to-dfa')

const file_directories = [
  // './automata/nfa-empty-1.json',
  // './automata/nfa-1.json',
  './automata/nfa-2.json',
  // './automata/dfa-1.json',
]

file_directories.forEach(directory => {
  const automaton = readAutomatonFromFile(directory)
  if(automaton) {
    printAutomaton(automaton)
    nfa = convertNFAtoDFA(automaton)
    printAutomaton(nfa)
  }
})
