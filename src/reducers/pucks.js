import { Map, Record } from 'immutable'

export const Puck = Record({
  name: null,
  receptacle: null,
  receptacleType: null,
  slot: null,
  note: '',
  owner: '',
})

export default function reducer(state=Map(), action) {
  switch (action.type) {
    case 'SET_PUCKS': {
      return Map().withMutations(state => {
        action.pucks.forEach(puck => {
          state.set(puck.name, new Puck(puck))
        })
      })
    }
    case 'ADD_PUCK': {
      return state.set(action.puck.name, new Puck(action.puck))
    }
    case 'SET_PUCK_RECEPTACLE': {
      return state.withMutations(state => {
        state.setIn([action.puck, 'receptacle'], action.receptacle)
        state.setIn([action.puck, 'receptacleType'], action.receptacleType)
        state.setIn([action.puck, 'slot'], action.slot)
      })
    }
    case 'UPDATE_PUCK': {
      return state.mergeIn([action.puck], action.update)
    }
  }
  return state
}
