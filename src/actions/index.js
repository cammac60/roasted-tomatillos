export const addMovies = movies => ({
  type: 'ADD_MOVIES',
  movies
});

export const addLoaded = isLoaded => ({
  type: 'IS_LOADED',
  isLoaded
});

export const hasError = error => ({
  type: 'HAS_ERROR',
  error
})

export const addRatings = ratings => ({
  type: 'ADD_RATINGS',
  ratings
});

export const addRating = rating => ({
  type: 'ADD_RATING',
  rating
});

export const addUser = user => ({
  type: 'ADD_USER',
  user
});

export const removeUser = () => ({
  type: 'REMOVE_USER',
  user: null
});
