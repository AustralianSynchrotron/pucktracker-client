import {fromJS} from 'immutable'

const initialState = fromJS({
  selectedHolder: null,
  selectedPuck: null,
  selectedReceptacles: {
    left: {adaptor: null, dewar: null},
    right: {adaptor: null, dewar: null},
  },
  newDewarText: '',
})

export default function(state=initialState, action) {
  switch (action.type) {
    case 'SET_SELECTED_HOLDER':
      return state.set('selectedHolder', action.holder)
    case 'SET_SELECTED_RECEPTACLE':
      const path = ['selectedReceptacles', action.side, action.receptacleType]
      return state.setIn(path, action.receptacleName)
    case 'SET_SELECTED_PUCK':
      return state.set('selectedPuck', action.puck)
    case 'SET_NEW_DEWAR_TEXT':
      return state.set('newDewarText', action.text)
  }
  return state
}
