export const selectedMovie = (state = null, action) => {
  switch (action.type) {
    case 'ADD_SELECTED_MOVIE':
      return action.id;
    default:
      return state;
  }
}
