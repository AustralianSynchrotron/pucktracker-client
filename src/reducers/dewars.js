import { OrderedMap, Record } from 'immutable'

export const Dewar = Record({
  name: null,
  epn: '',
  owner: '',
  note: '',
  onsite: null,
})

export default function reducer(state=OrderedMap(), action) {
  switch (action.type) {
    case 'SET_DEWARS': {
      return OrderedMap().withMutations(state => {
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
    case 'SET_DEWAR_OFFSITE': {
      return state.setIn([action.dewar, 'onsite'], false)
    }
  }
  return state
}
