import {Map, fromJS} from 'immutable'

export default function reducer(state=Map(), action) {
  if (action.type === 'SET_ADAPTORS') {
    return fromJS(action.adaptors)
  } else if (action.type === 'ADD_ADAPTOR') {
    return state.set(action.name, fromJS(action.data))
  } else if (action.type === 'SET_ADAPTOR_PLACE') {
    return state.setIn([action.adaptor, 'place'], fromJS(action.place))
  }
  return state
}
