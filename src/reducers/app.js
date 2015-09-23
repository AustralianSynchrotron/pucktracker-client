import {Map} from 'immutable'

export default function(state=Map(), action) {
  switch (action.type) {
    case 'SET_SELECTED_HOLDER':
      return state.set('selectedHolder', action.holder)
  }
  return state
}
