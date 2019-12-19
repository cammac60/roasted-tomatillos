import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './MoviesContainer.scss';
import { getMovies } from '../../apiCalls/apiCalls';
import { addMovies, addLoaded, hasError } from '../../actions';
import SmallMovieCard from '../../components/SmallMovieCard/SmallMovieCard';
import LoadingImage from '../../components/LoadingImage/LoadingImage';

export class MoviesContainer extends Component {
  componentDidMount() {
    if (!this.props.movies.length)
      this.fetchMoviesData()
  }

  fetchMoviesData = async () => {
    const { addMovies, addLoaded, hasError} = this.props
    try {
      const result = await getMovies()
      addMovies(result.movies)
      addLoaded(true)
    }
    catch (error) {
      addLoaded(false)
      hasError(error.message)
    }
  }

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
      ? <h2>{error}</h2>
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

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addMovies,
    addLoaded,
    hasError
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(MoviesContainer);
