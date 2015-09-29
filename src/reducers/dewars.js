import { Map, Record } from 'immutable'

export const Dewar = Record({
  name: null,
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
  }
  return state
}
