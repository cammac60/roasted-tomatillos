import { combineReducers } from 'redux'
import { movies } from './movies'
import { isLoaded } from './isLoaded'
import { error } from './error'
import { combineReducers } from 'redux';
import { movies } from './movies';
import { isLoaded } from './isLoaded';
import { error } from './error';
import { user } from './user';
import { ratings } from './ratings';

const rootReducer = combineReducers({
  movies,
  ratings,
  isLoaded,
  error,
  user
})

export default rootReducer
