class Automaton {
  constructor(q, sigma, delta, f, q0 = undefined) {
    this.states = q
    this.symbols = sigma
    this.initalState = q0 ? q0 : q[0]
  }
}