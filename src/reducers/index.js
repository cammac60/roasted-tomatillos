import { combineReducers } from 'redux'
import { movies } from './movies'
import { isLoaded } from './isLoaded'
import { error } from './error'

const rootReducer = combineReducers({
  movies,
  isLoaded,
  error
})

export default rootReducer
