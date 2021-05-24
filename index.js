const { printAutomaton } = require('./mixins/format')
const { readAutomatonFromFile } = require('./mixins/io')

const { convertNFAtoDFA } = require('./optimizations/nfa-to-dfa')
const { convertDFAtoMinimalDFA } = require('./optimizations/dfa-to-minimal-dfa')

const file_directories = [
  // './automata/nfa-empty-1.json',
  // './automata/nfa-1.json',
  // './automata/nfa-2.json',
  './automata/dfa-1.json',
  // './automata/atividades/2021-04-13/ex1-nfa.json',
  // './automata/atividades/2021-04-19/ex6-dfa.json',
  // './automata/atividades/2021-04-27/ex1-nfa.json'
]

file_directories.forEach(directory => {
  const automaton = readAutomatonFromFile(directory)
  if(automaton) {
    // printAutomaton(automaton)
    minimalDfa = convertDFAtoMinimalDFA(automaton)
    // printAutomaton(minimalDfa)
  }
})
