import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.scss';
import MoviesContainer from '../../containers/MoviesContainer/MoviesContainer';
import Header from '../Header/Header.js';
import RatingsPage from '../RatingsPage/RatingsPage';
import MovieInfoComponent from '../MovieInfoComponent/MovieInfoComponent';
import { Route } from 'react-router-dom';
import { getMovies, getRatings } from '../../apiCalls/apiCalls';
import { addMovies, addLoaded, hasError, addRatings, addSelectedMovie } from '../../actions';
import Login from '../../containers/Login/Login';

export class App extends Component {
  componentDidMount() {
    if (!this.props.isLoaded) this.fetchMoviesData()
    if (this.props.user) this.fetchRatingsData()
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
        <Route exact path='/' render={() => {
          if (this.props.user) this.fetchRatingsData()
          return (
            <>
              <Header />
              {this.props.user && <NavLink to="/ratings">&#9733; See your ratings</NavLink>}
              <MoviesContainer />
            </>
          )
        }
        }/>
        <Route path="/ratings" render={() => {
          if (this.props.user) this.fetchRatingsData()
          return (
            <>
              <Header />
              <RatingsPage />
            </>
          )
        }}/>
        <Route path="/login" render={() => <Login />}/>
        <Route path="/movies/:id" render={( { match } ) => {
          this.props.addSelectedMovie(1);
          return (
            <>
              <Header />
              <MovieInfoComponent />
            </>
          )
        }}/>
      </div>
    );
  }
}

export const mapStateToProps = ({isLoaded, user}) => ({
  user,
  isLoaded
})

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addMovies,
    addLoaded,
    hasError,
    addRatings,
    addSelectedMovie
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
