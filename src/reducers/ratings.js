export const ratings = (state = [], action) => {
  switch (action.type) {
    case 'ADD_RATINGS':
      return action.ratings;
    case 'ADD_RATING':
      return [...state, action.rating]
    default:
      return state;
  }
}
