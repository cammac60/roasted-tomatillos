import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './RatingsPage.scss'
import SmallMovieCard from '../SmallMovieCard/SmallMovieCard'

export class RatingsPage extends Component {
  createCards = (movies, ratings) => {
    return ratings.map(rating => {
      const movie = movies.find(movie => movie.id === rating.movie_id);
      return (
        <SmallMovieCard
          key={rating.id}
          id={movie.id}
          img={movie.poster_path}
          rate={rating.rating}
          title={movie.title}
          deleteButton={true}/>
      )
    });
  }

  render() {
    let { movies, ratings, user } = this.props;
    const notification = (user)
      ? 'You don\'t have any rating yet!'
      : 'Please, log in to see your ratings!'

    return (
      <div className="ratings">
        <NavLink to='/'>&#8592; back to all movies</NavLink>
        { (user && ratings.length !== 0)
            ? this.createCards(movies, ratings)
            : <h2 className="error">{notification}</h2>
        }
      </div>
    );
  }
}

export const mapStateToProps = ({movies, ratings, user}) => ({
  movies,
  ratings,
  user
})

export default connect(mapStateToProps)(RatingsPage);
