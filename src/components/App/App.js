import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './App.scss';
import MoviesContainer from '../../containers/MoviesContainer/MoviesContainer';
import Header from '../Header/Header.js';
import Login from '../../containers/Login/Login';
import MovieInfoComponent from '../MovieInfoComponent/MovieInfoComponent';
import { Route } from 'react-router-dom';
import { getMovies } from '../../apiCalls/apiCalls';
import { addMovies, addLoaded, hasError } from '../../actions';

export class App extends Component {
  componentDidMount() {
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

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={() =>
          <>
            <Header />
            <MoviesContainer />
          </>
        }/>
        <Route path="/login" render={() => <Login />}/>
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

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addMovies,
    addLoaded,
    hasError
  }, dispatch)
)

export default connect(null, mapDispatchToProps)(App);
