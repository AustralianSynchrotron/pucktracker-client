import {List, fromJS} from 'immutable'

export default function reducer(state=List(), action) {
  if (action.type === 'SET_ADAPTORS') {
    return fromJS(action.adaptors)
  } else if (action.type === 'ADD_ADAPTOR') {
    return state.push(fromJS(action.adaptor))
  } else if (action.type === 'SET_ADAPTOR_PLACE') {
    const index = state.findIndex(
      adaptor => adaptor.get('name') === action.adaptor
    )
    if (index > -1) {
      return state.setIn([index, 'place'], fromJS(action.place))
    } else {
      return state
    }
  }
  return state
}
