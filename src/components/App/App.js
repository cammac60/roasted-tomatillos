import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.scss';
import MoviesContainer from '../../containers/MoviesContainer/MoviesContainer';
import Header from '../Header/Header.js';
import MovieInfoComponent from '../MovieInfoComponent/MovieInfoComponent';
import { Route } from 'react-router-dom';
import { getMovies, getRatings } from '../../apiCalls/apiCalls';
import { addMovies, addLoaded, hasError, addRatings } from '../../actions';

export class App extends Component {
  componentDidMount() {
    const {isLoaded, login} = this.props;
    if (!isLoaded) this.fetchMoviesData()
    if (login) this.fetchRatingsData()
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

  fetchRatingsData = async () => {
    const { addRatings, user } = this.props;
    try {
      const result = await getRatings(user.id);
      addRatings(result.ratings);
    }
    catch {
      addRatings([ ]);
    }
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={() =>
          <>
            <Header />
            <MoviesContainer />
          </>
        }/>
        <Route path="/login" render={() => <div color="white">Temporary text</div>}/>
        <Route path="/movies/:id" render={( { match } ) =>
          <>
            <Header />
            <MovieInfoComponent id={match.params.id} />
          </>
        }/>
      </div>
    );
  }
}

export const mapStateToProps = ({isLoaded, user, login}) => ({
  user,
  isLoaded,
  login
})

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addMovies,
    addLoaded,
    hasError,
    addRatings
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
