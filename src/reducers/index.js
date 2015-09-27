import { combineReducers } from 'redux'
import app from './app'
import adaptors from './adaptors'
import pucks from './pucks'

export default combineReducers({
  app,
  adaptors,
  pucks,
})
