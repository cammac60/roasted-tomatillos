export const getMovies = () => {
  return fetch('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
    .then(response => {
      if (!response.ok) {
        throw Error(`Movies were not fetched`)
      }
      return response.json()
    })
}
