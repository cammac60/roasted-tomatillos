import React from 'react';
import { connect } from 'react-redux';
import './MovieInfoComponent.scss'

const MovieInfoComponent = (props) => {
  const film = props.movie
  const cardStyles = {
    backgroundImage: `url("${film.poster_path}")`,
    backgroundSize: '100%',
    backgroundPosition: 'center',
    width: '230px',
    height: '300px'
  }
  return (
    <div>
      <div className='title-div'><h2>{film.title}</h2></div>
      <article className='img-container' style={cardStyles}>
      <article className='release-date'></article>
      </article>

      <section className='overview-box'>
        <h3>Released: {film.release_date}</h3>
        <p>{film.overview}</p>
      </section>
    </div>
  )
}

export const mapStateToProps = (state, props) => {
  return ({  
      movie: state.movies.find(movie => movie.id === parseInt(props.id))
  })
}

export default connect(mapStateToProps)(MovieInfoComponent);


// id: 3
// title: "Frozen II"
// poster_path: "https://image.tmdb.org/t/p/original//pjeMs3yqRmFL3giJy4PMXWZTTPa.jpg"
// backdrop_path: "https://image.tmdb.org/t/p/original//xJWPZIYOEFIjZpBL7SVBGnzRYXp.jpg"
// release_date: "2019-11-20"
// overview: "Elsa, Anna, Kristoff and Olaf head far into the forest to learn the truth about an ancient mystery of their kingdom."
// average_rating: 8