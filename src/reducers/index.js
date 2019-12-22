import { combineReducers } from 'redux'
import { movies } from './movies'
import { isLoaded } from './isLoaded'
import { error } from './error'
import { ratings } from './ratings'

const rootReducer = combineReducers({
  movies,
  ratings,
  isLoaded,
  error
})

export default rootReducer
