import {fromJS} from 'immutable'

const initialState = fromJS({
  connected: false,
  selectedHolder: null,
  selectedPuck: null,
})

export default function(state=initialState, action) {
  switch (action.type) {
    case 'SET_CONNECTED':
      return state.set('connected', action.connected)
    case 'SET_SELECTED_HOLDER':
      return state.set('selectedHolder', action.holder)
    case 'SET_SELECTED_PUCK':
      return state.set('selectedPuck', action.puck)
  }
  return state
}
