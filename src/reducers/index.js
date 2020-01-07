import { combineReducers } from 'redux';
import { movies } from './movies';
import { isLoaded } from './isLoaded';
import { error } from './error';
import { user } from './user';
import { ratings } from './ratings';
import { selectedMovie } from './selectedMovie';

const rootReducer = combineReducers({
  movies,
  ratings,
  isLoaded,
  error,
  user,
  selectedMovie
})

export default rootReducer
