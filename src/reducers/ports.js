import {Map, List, Record} from 'immutable'

export const Port = Record({
  containerType: null,
  container: null,
  number: null,
  state: 'unknown',
})

export default function reducer(state=Map(), action) {
  switch (action.type) {
    case 'SET_PORTS': {
      return Map().withMutations(state => {
        action.ports.forEach(port => {
          const key = List.of(port.container, port.number)
          state.set(key, new Port(port))
        })
      })
    }
    case 'SET_PORT_STATE': {
      const path = [List.of(action.container, action.number), 'state']
      return state.setIn(path, action.state)
    }
    case 'SET_MULTIPLE_PORT_STATES': {
      return state.withMutations(state => {
        action.numbers.forEach(number => {
          const key = List.of(action.container, number)
          if (state.has(key)) {
            state.setIn([key, 'state'], action.state)
          }
        })
      })
    }
  }
  return state
}
