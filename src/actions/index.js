export const addMovies = movies => ({
  type: 'ADD_MOVIES',
  movies
})

export const addLoaded = isLoaded => ({
  type: 'IS_LOADED',
  isLoaded
})

export const hasError = error => ({
  type: 'HAS_ERROR',
  error
})
