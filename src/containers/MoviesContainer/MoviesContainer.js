import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MoviesContainer.scss';
import SmallMovieCard from '../../components/SmallMovieCard/SmallMovieCard';
import LoadingImage from '../../components/LoadingImage/LoadingImage';

export class MoviesContainer extends Component {

  createCards = dataset => {
    return dataset.map(movie => (
      <SmallMovieCard
        key={movie.id}
        id={movie.id}
        img={movie.poster_path}
        rate={movie.average_rating}
        title={movie.title} />
    ));
  }

  render() {
    const { movies, isLoaded, error } = this.props;
    const notification = (error !== '')
      ? <h2 className="error">{error}</h2>
      : <LoadingImage />

    return (
      <main className="movies-container">
        { (isLoaded && error === '')
            ? this.createCards(movies)
            : notification }
      </main>
    )
  }
}

export const mapStateToProps = ({movies, isLoaded, error}) => ({
  movies,
  isLoaded,
  error
})

export default connect(mapStateToProps)(MoviesContainer);
