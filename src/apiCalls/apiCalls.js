export const getMovies = async () => {
  const url = 'https://rancid-tomatillos.herokuapp.com/api/v1/movies'
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('There was an error getting movies.');
  }
  const movies = await response.json();
  return movies
}

export const getRatings = async (id) => {
  const url = `https://rancid-tomatillos.herokuapp.com/api/v1/users/${id}/ratings`
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('There was an error getting ratings.');
  }
  const ratings = await response.json();
  return ratings
}

export const postRating = async (rating, user_id) => {
  const url = `https://rancid-tomatillos.herokuapp.com/api/v1/users/${user_id}/ratings`;
  const options = {
    method: 'POST',
    body: JSON.stringify(rating),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('There was an error posting rating.');
  }

  const result = await response.json();
  return result;
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
  return newUser;
}
