export const isLoaded = (state = false, action) => {
  switch (action.type) {
    case 'IS_LOADED':
      return action.isLoaded
    default:
      return state
  }
}
