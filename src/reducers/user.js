export const user = (state = null, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return action.user
    case 'REMOVE_USER':
      return null
    default:
      return state;
  }
}
