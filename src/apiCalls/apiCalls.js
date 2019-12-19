export const getMovies = async () => {
  const url = 'https://rancid-tomatillos.herokuapp.com/api/v1/movies'
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('There was an error getting movies.');
  }
  const movies = await response.json();
  return movies
}
