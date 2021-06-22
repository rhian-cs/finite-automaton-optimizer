const { printAutomaton } = require('./mixins/format')
const { readAutomatonFromFile } = require('./mixins/io')

const { convertNFAtoDFA } = require('./optimizations/nfa-to-dfa')

const file_directories = [
  './automata/nfa-1.json',
  './automata/nfa-2.json',
  './automata/atividades/2021-04-13/ex1-nfa.json',
  './automata/atividades/2021-04-27/ex1-nfa.json'
]

file_directories.forEach(directory => {
  const automaton = readAutomatonFromFile(directory)

  if(automaton) {
    console.log("\n\n\n########             Automaton:             ########")
    console.log(`\n>>>>>>>> Directory: ${directory}\n`);
    console.log('####      NFA - Before conversion     ####')
    printAutomaton(automaton)

    console.log('#### Calculating the new automaton... ####')
    minimalDfa = convertNFAtoDFA(automaton)

    console.log('####      DFA - After conversion      ####')
    printAutomaton(minimalDfa)
    console.log(`######## ---------------------------------- ########`)
  }
})
