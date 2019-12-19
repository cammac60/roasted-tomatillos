export const getMovies = async () => {
  const url = 'https://rancid-tomatillos.herokuapp.com/api/v1/movies'
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('There was an error getting movies.');
  }
  const movies = await response.json();
  return movies
}

export const postSignIn = async (user) => {
  const url = 'https://rancid-tomatillos.herokuapp.com/api/v1/login';
  let options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
     'Content-Type': 'application/json'
    }
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('There was a problem signing in')
  }
  const newUser = await response.json();
  console.log(newUer);
  return newUser;
}
