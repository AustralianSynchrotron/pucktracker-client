import {fromJS} from 'immutable'

const initialState = fromJS({
  selectedHolder: null,
  selectedPuck: null,
})

export default function(state=initialState, action) {
  switch (action.type) {
    case 'SET_SELECTED_HOLDER':
      return state.set('selectedHolder', action.holder)
    case 'SET_SELECTED_PUCK':
      return state.set('selectedPuck', action.puck)
  }
  return state
}
