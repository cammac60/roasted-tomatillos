import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MovieInfoComponent.scss'
import { Redirect } from 'react-router-dom';
import RatingBox from '../RatingBox/RatingBox'

class MovieInfoComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRedirected: false
    }
  }
  redirect = () => {
    this.setState({isRedirected: true})
  }

  render() {
    const { movie, rating, user} = this.props
    const { id, title, release_date, poster_path, overview, average_rating} = movie;
    const year = release_date.split('-')[0];

    const cardStyles = {
      backgroundImage: `url(${poster_path})`,
      backgroundSize: '100%',
      backgroundPosition: 'center',
      width: '230px',
      height: '300px'
    }

    return (
      (this.state.isRedirected)
        ? <Redirect to='/' />
        : <main className="single-movie-info">
          <button onClick={this.redirect}>&#8592; back to all movies</button>
          <div className='title-div'><h2>{`${title} (${year})`}</h2></div>
          <div className='img-container' style={cardStyles}></div>
          <section className='overview-box'>
            <h3>Avr.Rating: {average_rating.toFixed(1)}</h3>
            {user && rating && <h3>{`Your rating: ${rating.rating}`}</h3>}
            <p>{overview}</p>
            <footer>
              {user && !rating && <RatingBox movie_id={id} user_id={user.id} />}
            </footer>
          </section>
        </main>
    )
  }
}

export const mapStateToProps = ({movies, ratings, user}, props) => ({
  movie: movies.find(movie => movie.id === parseInt(props.id)),
  rating: ratings.find(rating => rating.movie_id === parseInt(props.id)),
  user
});

export default connect(mapStateToProps)(MovieInfoComponent);


// id: 3
// title: "Frozen II"
// poster_path: "https://image.tmdb.org/t/p/original//pjeMs3yqRmFL3giJy4PMXWZTTPa.jpg"
// backdrop_path: "https://image.tmdb.org/t/p/original//xJWPZIYOEFIjZpBL7SVBGnzRYXp.jpg"
// release_date: "2019-11-20"
// overview: "Elsa, Anna, Kristoff and Olaf head far into the forest to learn the truth about an ancient mystery of their kingdom."
// average_rating: 8
