import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './RatingsPage.scss'
import SmallMovieCard from '../SmallMovieCard/SmallMovieCard'

export class RatingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirected: false
    }
  }

  redirect = () => {
    this.setState({isRedirected: true})
  }

  createCards = (movies, ratings) => {
    return ratings.map(rating => {
      const movie = movies.find(movie => movie.id === rating.movie_id);
      return (
        <SmallMovieCard
          key={rating.id}
          id={rating.id}
          img={movie.poster_path}
          rate={rating.rating}
          title={movie.title}
          deleteButton={true}/>
      )
    });
  }

  render() {
    let { movies, ratings, login } = this.props;
    const notification = (login)
      ? 'You don\'t have any rating yet!'
      : 'Please, log in to see your ratings!'

    return (
      (this.state.isRedirected)
        ? <Redirect to='/' />
        : <div className="ratings">
          <button onClick={this.redirect}>&#8592; back to all movies</button>
          { (login && ratings.length !== 0)
              ? this.createCards(movies, ratings)
              : <h2 className="error">{notification}</h2>
          }
        </div>
    );
  }
}

export const mapStateToProps = state => ({
  movies: state.movies,
  ratings: state.ratings,
  login: state.login
})

export default connect(mapStateToProps)(RatingsPage);
