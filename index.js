const { printAutomaton } = require('./mixins/format')
const { readAutomatonFromFile } = require('./mixins/io')

const { convertNFAtoDFA } = require('./optimizations/nfa-to-dfa')

const file_directories = [
  // './sample/nfa-empty-1.json',
  './sample/nfa-1.json',
  // './sample/dfa-1.json',
]

file_directories.forEach(directory => {
  const automaton = readAutomatonFromFile(directory)
  if(automaton) {
    // printAutomaton(automaton)
    dfa = convertNFAtoDFA(automaton)
    // printAutomaton(dfa)
  }
})
