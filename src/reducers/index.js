import { combineReducers } from 'redux';
import { movies } from './movies';
import { isLoaded } from './isLoaded';
import { error } from './error';
import { login } from './login';

const rootReducer = combineReducers({
  movies,
  isLoaded,
  error,
  login
})

export default rootReducer
