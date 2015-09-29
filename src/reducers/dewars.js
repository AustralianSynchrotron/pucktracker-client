import { Map, Record } from 'immutable'

export const Dewar = Record({
  name: null,
  epn: '',
})

export default function reducer(state=Map(), action) {
  switch (action.type) {
    case 'SET_DEWARS': {
      return Map().withMutations(state => {
        action.dewars.forEach(dewar => {
          state.set(dewar.name, new Dewar(dewar))
        })
      })
    }
    case 'ADD_DEWAR': {
      if (state.has(action.dewar.name)) { return state }
      return state.set(action.dewar.name, new Dewar(action.dewar))
    }
    case 'UPDATE_DEWAR': {
      return state.mergeIn([action.dewar], action.update)
    }
  }
  return state
}
