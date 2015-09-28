import { combineReducers } from 'redux'
import app from './app'
import adaptors from './adaptors'
import dewars from './dewars'
import pucks from './pucks'
import ports from './ports'

export default combineReducers({
  app,
  adaptors,
  dewars,
  pucks,
  ports,
})
