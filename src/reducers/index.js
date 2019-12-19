import { combineReducers } from 'redux';
import { movies } from './movies';
import { isLoaded } from './isLoaded';
import { error } from './error';
import { user } from './user';

const rootReducer = combineReducers({
  movies,
  isLoaded,
  error,
  user
})

export default rootReducer
