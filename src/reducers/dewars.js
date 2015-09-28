import {List, fromJS} from 'immutable'

export default function reducer(state=List(), action) {
  switch (action.type) {
   case 'SET_DEWARS': {
    return fromJS(action.dewars)
   }
  }
  return state
}
