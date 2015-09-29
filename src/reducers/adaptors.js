import { Map, Record } from 'immutable'

export const Adaptor = Record({
  name: null,
  location: null,
  position: null,
})

export default function reducer(state=Map(), action) {
  if (action.type === 'SET_ADAPTORS') {
    return Map().withMutations(state => {
      action.adaptors.forEach(adaptor => {
        state.set(adaptor.name, new Adaptor(adaptor))
      })
    })
  } else if (action.type === 'ADD_ADAPTOR') {
    return state.set(action.adaptor.name, new Adaptor(action.adaptor))
  } else if (action.type === 'SET_ADAPTOR_PLACE') {
    return state.withMutations(state => {
      state.setIn([action.adaptor, 'location'], action.location)
      state.setIn([action.adaptor, 'position'], action.position)
    })
  }
  return state
}
