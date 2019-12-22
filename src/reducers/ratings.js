export const ratings = (state = [], action) => {
  switch (action.type) {
    case 'ADD_RATINGS':
      return action.ratings
    default:
      return state
  }
}
